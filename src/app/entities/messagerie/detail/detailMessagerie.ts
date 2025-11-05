import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessagerieService, Conversation, Message } from '../../../services/messagerie.service';

@Component({
  selector: 'app-detail-messagerie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detailMessagerie.html',
  styleUrls: ['./detailMessagerie.scss']
})
export class DetailMessagerieComponent implements OnInit, OnDestroy {
  @Input() conversationId!: number;
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  newMessage: string = '';
  currentUser: string = 'Moi';  // ✅ String pour comparaison

  private messagesSub!: Subscription;

  constructor(private messagerieService: MessagerieService) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  ngOnDestroy(): void {
    if (this.messagesSub) this.messagesSub.unsubscribe();
    this.messagerieService.disconnect();
  }

  loadConversations(): void {
    this.messagerieService.getConversations().subscribe({
      next: (data: Conversation[]) => {
        this.conversations = data;
        if (data.length > 0 && !this.selectedConversation) {
          this.selectConversation(data[0]);
        }
      },
      error: (err: any) => {
        console.error('Erreur chargement conversations:', err);
      }
    });
  }

  selectConversation(conv: Conversation): void {
    this.selectedConversation = conv;
    this.messagerieService.connectToConversation(conv.id);
    this.messagesSub = this.messagerieService.messages$.subscribe(msgs => {
      if (this.selectedConversation) {
        this.selectedConversation.messages = msgs;
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    this.messagerieService.sendMessage(this.selectedConversation.id, this.newMessage).subscribe({
      next: (newMsg: any) => {
        console.log('Message envoyé:', newMsg);
        this.newMessage = '';
      },
      error: (err: any) => {
        console.error('Erreur envoi message:', err);
      }
    });
  }

  onMessageCreated(event: any): void {
    if (this.selectedConversation) {
      this.messagerieService.loadMessages(this.selectedConversation.id);
    }
  }
}
