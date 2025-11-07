import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';

import { Create } from '../../../entities/livrable/create/create';
import { Edit } from '../../../entities/livrable/edit/edit';
import { CreateMesssagerie } from '../../../entities/messagerie/create/createMesssagerie';
import { Detail } from '../../../entities/soutenance/detail/detail';
import { ListCommentaire } from '../../../entities/commentaire/list/listCommentaire';
import { Notifications } from '../../../entities/notifications/notifications';
import { ListMessagerieComponent } from '../../../entities/messagerie/list/list';
import { DetailMessagerieComponent } from '../../../entities/messagerie/detail/detailMessagerie';
import{List}from '../../../entities/projet/list/list';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.scss'],
  standalone: true,
  imports: [
    CommonModule,
    Edit,
    Detail,
    ListCommentaire,
    Notifications,
    ListMessagerieComponent,
    DetailMessagerieComponent,
    List
  ]
})
export class StudentDashboardComponent implements OnInit {
  selectedConversationId: number | null = null;
  activeSection: string = 'dashboard';
  studentName: string = '';
  studentId: number | null = null;
  today: Date = new Date();  // ✅ Ajouté pour corriger l'erreur

  constructor(public authService: AuthService) {}

  ngOnInit() {
    const id = this.authService.getUtilisateurId();
    const nom = this.authService.getNom();
    const prenom = this.authService.getPrenom();
    if (id) {
      this.studentName = `${prenom} ${nom}`;
      this.studentId = id;
    }
  }

  setSection(section: string) {
    this.activeSection = section;
  }

  onSelectConversation(id: number) {
    this.selectedConversationId = id;
  }
}
