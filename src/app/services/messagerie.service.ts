import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { catchError, map } from 'rxjs/operators';  // Pour gérer les erreurs

export interface User {
  id: number;
  nom: string;
  prenom?: string;
}

export interface Message {
  id: number;
  sender: User;
  content: string;
  created_at: string;
  is_read: boolean;
}

export interface Conversation {
  id: number;
  titre: string;
  messages: Message[];
  participants: User[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private apiUrl = 'http://127.0.0.1:8000/api/messageries';  // URL backend, ajuste si nécessaire
  private wsUrl = 'ws://127.0.0.1:8000/ws/conversation/';  // URL WebSocket
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();  // Observable pour les messages live
  private wsSubject: WebSocketSubject<any> | null = null;
  private currentConversationId: number | null = null;

  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations/`).pipe(
      catchError(error => {
        console.error('Erreur getConversations:', error);
        return of([]);  // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  createConversation(titre: string): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/conversations/`, { titre }).pipe(
      catchError(error => {
        console.error('Erreur createConversation:', error);
        return of({} as Conversation);  // Retourne un objet vide
      })
    );
  }

  addParticipant(conversationId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/participants/`, {
      conversation: conversationId,
      user: userId
    }).pipe(
      catchError(error => {
        console.error('Erreur addParticipant:', error);
        return of(null);
      })
    );
  }

  getMessages(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/?conversation=${conversationId}`).pipe(
      catchError(error => {
        console.error('Erreur getMessages:', error);
        return of([]);
      })
    );
  }

  sendMessage(conversationId: number, content: string): Observable<any> {  // ✅ Fix: Retourne un Observable
    if (this.wsSubject && this.currentConversationId === conversationId && content.trim()) {
      // Envoi via WebSocket pour live updates
      this.wsSubject.next(JSON.stringify({
        type: 'send_message',
        content,
        conversation: conversationId
      }));
      return of({ success: true });  // Retourne un Observable mock pour subscribe
    } else {
      // Fallback HTTP
      return this.http.post<any>(`${this.apiUrl}/messages/`, {
        conversation: conversationId,
        content
      }).pipe(
        catchError(error => {
          console.error('Erreur sendMessage HTTP:', error);
          return of(null);
        })
      );
    }
  }

  connectToConversation(conversationId: number): void {
    this.currentConversationId = conversationId;
    if (this.wsSubject) {
      this.wsSubject.complete();
    }
    const wsUrlFull = `${this.wsUrl}${conversationId}/`;
    this.wsSubject = WebSocketSubject.create(wsUrlFull);
    if (this.wsSubject) {
      this.wsSubject.subscribe({
        next: (data) => {
          if (data.type === 'history') {
            this.messagesSubject.next(data.messages || []);
          } else if (data.message) {
            const newMsg: Message = {
              id: data.id || Date.now(),
              sender: data.sender || { id: 0, nom: 'Anonyme' },
              content: data.content,
              created_at: data.created_at || new Date().toISOString(),
              is_read: data.is_read || false
            };
            const currentMsgs = this.messagesSubject.value;
            this.messagesSubject.next([...currentMsgs, newMsg]);
          }
        },
        error: (err) => {
          console.error('Erreur WebSocket:', err);
          this.loadMessages(conversationId);  // Fallback
        },
        complete: () => {
          console.log('WebSocket fermé');
        }
      });
      this.wsSubject.next(JSON.stringify({ type: 'join' }));
    }
    this.loadMessages(conversationId);
  }

  loadMessages(conversationId: number): void {
    this.getMessages(conversationId).subscribe({
      next: (msgs) => this.messagesSubject.next(msgs),
      error: (err) => console.error('Erreur loadMessages:', err)
    });
  }

  disconnect(): void {
    if (this.wsSubject) {
      this.wsSubject.complete();
      this.currentConversationId = null;
    }
  }

  markAsRead(messageId: number): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/messages/${messageId}/`, { is_read: true });
  }
}
