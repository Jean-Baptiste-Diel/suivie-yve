import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Detail } from '../../../entities/soutenance/detail/detail';
import { Notifications } from '../../../entities/notifications/notifications';
import {Navigation} from './navigation/navigation';
import {AuthService} from '../../auth/service/auth.service';
import {ListeProjetDispoComponent} from '../../../entities/etudiant/liste-projet-dispo/liste-projet-dispo-component';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.scss'],
  standalone: true,
  imports: [
    CommonModule,
    Detail,
    Notifications,
    Navigation,
    ListeProjetDispoComponent,
  ]
})
export class StudentDashboardComponent implements OnInit {
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
