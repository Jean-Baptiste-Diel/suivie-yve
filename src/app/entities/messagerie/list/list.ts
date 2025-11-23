import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MessagerieService, Conversation } from '../../../services/messagerie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-projet-dispo-messagerie',
  standalone: true,
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  imports: [CommonModule]
})
export class ListMessagerieComponent implements OnInit {
  conversations: Conversation[] = [];

  @Output() conversationSelected = new EventEmitter<Conversation>();

  constructor(private readonly messagerieService: MessagerieService) {}

  ngOnInit(): void {
    this.loadConversations(); // ✅ Appel la méthode de chargement (au lieu de dupliquer le code)
  }

  // ✅ Ajouté : Méthode pour charger/recharger les conversations (fixe l'erreur ligne 24)
  loadConversations(): void {
    this.messagerieService.getConversations()
      .subscribe({
        next: (res: Conversation[]) => {
          this.conversations = res;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des conversations:', err);
          this.conversations = [];
        }
      });
  }

  selectConversation(conv: Conversation): void {
    this.conversationSelected.emit(conv);
  }
}
