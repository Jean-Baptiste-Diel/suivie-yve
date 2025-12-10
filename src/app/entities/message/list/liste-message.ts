import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MessagerieService} from '../service/messagerie-service';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../../pages/auth/service/auth.service';

@Component({
  selector: 'app-liste-message',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './liste-message.html',
  styleUrl: './liste-message.scss'
})
export class ListeMessage implements OnInit, OnDestroy, OnChanges{
  messages: any = [];
  message = '';
  destinataireId!: number;
  userId = Number(localStorage.getItem('userId'));
  @Input() utilisateurId!: number;

  constructor(private readonly msgService: MessagerieService,private authService: AuthService) {}

  ngOnDestroy() {
    this.msgService.closeSocket();
  }
  ngOnChanges() {
    if (!this.utilisateurId || isNaN(this.utilisateurId)) {
      console.warn("ID destinataire invalide !");
      return;
    }
    this.connectWebSocket();
    this.loadMessages();
  }

  ngOnInit() {
    const uid = this.authService.getUtilisateurId();
    if (!uid) {
      console.error("Utilisateur non connecté ou ID invalide !");
      return;
    }
    this.userId = uid;

    if (this.utilisateurId) {
      this.connectWebSocket();
      this.loadMessages();
    }
  }
  loadMessages() {
    this.msgService.getMessages(this.utilisateurId).subscribe(res => {
      this.messages = res;
    });
  }
  connectWebSocket() {
    if (!this.userId || !this.utilisateurId) {
      console.warn("Impossible de connecter le socket : ID manquant");
      return;
    }
    this.msgService.connectSocket(this.utilisateurId, this.userId);

    this.msgService.newMessageCallback = (msg) => {
      this.messages.push(msg);
    };
  }

  send() {
    if (!this.message) return;

    this.msgService.sendMessage(this.utilisateurId, this.message).subscribe(() => {
      this.msgService.sendSocketMessage(this.message, this.userId);
      this.message = '';
    });
  }

}
