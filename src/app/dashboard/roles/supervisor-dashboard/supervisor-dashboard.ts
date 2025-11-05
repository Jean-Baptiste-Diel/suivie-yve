import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-supervisor-dashboard',
    templateUrl: './supervisor-dashboard.html',
    imports: [
        NgForOf,
        NgIf
    ],
    styleUrls: ['./supervisor-dashboard.scss'] // Corrigé ici
})
export class SupervisorDashboardComponent {
  activeSection: 'evaluation' | 'messagerie' = 'evaluation';
  // Données simulées pour les projets
  projets = [
    {
      id: 1,
      titre: "Système de gestion hospitalière",
      etudiant: "Marie Dupont",
      dateRemise: "2025-08-15",
      statut: "En attente d'évaluation",
      note: null
    },
    {
      id: 2,
      titre: "Application de suivi sportif",
      etudiant: "Jean Martin",
      dateRemise: "2025-08-20",
      statut: "Évalué",
      note: 16
    }
  ];
  setActiveSection(section: 'evaluation' | 'messagerie') {
    this.activeSection = section;
  }
}
