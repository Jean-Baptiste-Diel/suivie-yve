import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';
import { Edit } from '../../../entities/livrable/edit/edit';
import { Detail } from '../../../entities/soutenance/detail/detail';
import { ListCommentaire } from '../../../entities/commentaire/list/listCommentaire';
import { Notifications } from '../../../entities/notifications/notifications';
import { ListMessagerieComponent } from '../../../entities/messagerie/list/list';
import{ListeProjetDispoComponent}from '../../../entities/projet/liste-projet-dispo/liste-projet-dispo-component';
import {Navigation} from './navigation/navigation';
import {ListeLivrableComponent} from '../../../entities/livrable/list/liste-livrable-component';
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
    ListeProjetDispoComponent,
    Navigation,
    Navigation,
    ListeLivrableComponent
  ]
})
export class StudentDashboardComponent implements OnInit {
  selectedConversationId: number | null = null;
  studentName: string = '';
  studentId: number | null = null;

  constructor(public authService: AuthService) {}
  activeSection = 'accueil';
  ngOnInit() {
    const id = this.authService.getUtilisateurId();
    const nom = this.authService.getNom();
    const prenom = this.authService.getPrenom();
    if (id) {
      this.studentName = `${prenom} ${nom}`;
      this.studentId = id;
    }
  }
}
