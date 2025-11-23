// jury-auth-component.ts
import {Component, OnInit} from '@angular/core';
import {ListCommentaire} from '../../../entities/commentaire/list/listCommentaire';
@Component({
  selector: 'app-jury-dashboard',
  templateUrl: './jury-dashboard.html',
  imports: [
    ListCommentaire
  ],
  styleUrls: ['./jury-dashboard.scss']
})
export class JuryDashboardComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
    console.log("ok")
  }
  activeSection: 'evaluation' | 'remarques' | 'calendrier' = 'evaluation';

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

  setActiveSection(section: 'evaluation' | 'remarques' | 'calendrier') {
    this.activeSection = section;
  }
}
