import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private readonly api = 'http://localhost:8000/messageries';
  socket!: WebSocket;
  newMessageCallback: ((msg: any) => void) | null = null;

  constructor(private readonly http: HttpClient) {}

  getMessages(destinataireId: number) {
    return this.http.get(`${this.api}/${destinataireId}/`);
  }

  sendMessage(destinataireId: number, contenu: string) {
    return this.http.post(`${this.api}/${destinataireId}/`, { contenu, destinataire: destinataireId });
  }

  connectSocket(destinataireId: number, userId: number) {
    // Fermer l'ancien socket avant d'en ouvrir un nouveau
    this.closeSocket();

    const conv = `${userId}_${destinataireId}`;
    console.log(conv);
    this.socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${conv}/`);

    // 🔹 Lorsqu'un message est reçu
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message reçu via WebSocket :", data);
      this.newMessageCallback?.(data);
    };

    // 🔹 Connexion ouverte
    this.socket.onopen = () => console.log("WebSocket ouverte :", conv);

    // 🔹 Connexion fermée
    this.socket.onclose = (event) => console.warn("WebSocket fermée :", event);

    // 🔹 Erreur WebSocket
    this.socket.onerror = (event) => console.error("Erreur WebSocket :", event);
  }

  sendSocketMessage(message: string, sender: number) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ message, sender }));
    } else {
      console.warn("WebSocket non ouverte, impossible d'envoyer le message");
    }
  }

  closeSocket() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      this.socket.close();
    }
  }
}
