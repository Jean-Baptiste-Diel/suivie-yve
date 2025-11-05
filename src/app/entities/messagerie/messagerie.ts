import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMessagerieComponent } from './list/list';
import { DetailMessagerieComponent } from './detail/detailMessagerie';
import { CreateMesssagerie } from './create/createMesssagerie';

@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [CommonModule, ListMessagerieComponent, DetailMessagerieComponent, CreateMesssagerie],
 templateUrl: './messagerie.html',

  styleUrls: ['./messagerie.scss']
})
export class MessagerieComponent {
  selectedConversationId: number | null = null;

  onConversationSelected(conv: any): void {
    this.selectedConversationId = conv.id;
  }

  onMessageCreated(): void {
    // Quand un message est envoyé, on recharge les messages
    console.log('Message envoyé avec succès');
  }
}
