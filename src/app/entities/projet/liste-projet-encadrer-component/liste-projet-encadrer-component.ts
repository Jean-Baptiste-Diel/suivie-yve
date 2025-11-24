import {Component, OnInit} from '@angular/core';
import {ProjetService} from '../service/projet-service';
import {DetailProjetComponent} from '../detail/detail-projet-component';

@Component({
  selector: 'app-liste-projet-encadrer-component',
  imports: [
    DetailProjetComponent
  ],
  templateUrl: './liste-projet-encadrer-component.html',
  styleUrl: './liste-projet-encadrer-component.scss'
})
export class ListeProjetEncadrerComponent implements OnInit {
  protected projets: any;
  protected selectedProjetId: number | null = null;
  protected ouvrirDetailProjet = false;
    constructor(private readonly projetService: ProjetService) {
    }
    ngOnInit(): void {
        this.loadProjets();
    }

  loadProjets(): void {
    this.projetService.projetsEncadrer().subscribe({
      next: (projets) => {
        // projets est un tableau venant du backend
        // Exemple : [{id, titre, description, etudiants: [{nom, prenom, email}, ...]}, ...]
        console.log('Projets récupérés:', projets);

        // Tu peux stocker les projets dans une variable du composant pour les afficher
        this.projets = projets;

        // Si tu veux mapper pour un affichage spécifique, par ex. FullCalendar ou tableau
        const projetsAffichage = projets.map((p: { titre: any; description: any; niveau: any; statut: any; etudiants: any[]; }) => ({
          titre: p.titre,
          description: p.description,
          niveau: p.niveau,
          statut: p.statut,
          etudiants: p.etudiants.map((e: { prenom: any; nom: any; }) => `${e.prenom} ${e.nom}`)
        }));

        console.log('Projets formatés pour affichage:', projetsAffichage);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets:', err);
      }
    });
  }

  DetailProjetModal(id: number ) {
    this.selectedProjetId = id;
    this.ouvrirDetailProjet = true

  }
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fermerDetailProjet();
    }
  }
  fermerDetailProjet() {
    this.ouvrirDetailProjet = false;
  }
}
