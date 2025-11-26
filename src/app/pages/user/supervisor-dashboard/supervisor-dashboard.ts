import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Navigation} from './navigation/navigation';
import {
  ListeSoutenanceEncadrantComponent
} from '../../../entities/soutenance/liste-soutenance-encadrant-component/liste-soutenance-encadrant-component';
import {
  ListeProjetEncadrerComponent
} from '../../../entities/projet/liste-projet-encadrer-component/liste-projet-encadrer-component';

@Component({
    selector: 'app-supervisor-dashboard',
    templateUrl: './supervisor-dashboard.html',
  imports: [
    Navigation,
    ListeSoutenanceEncadrantComponent,
    ListeProjetEncadrerComponent
  ],
    styleUrls: ['./supervisor-dashboard.scss']
})
export class SupervisorDashboardComponent {
  activeSection = 'soutenance';
  constructor() {
  }
}
