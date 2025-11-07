import { Component, OnInit } from '@angular/core';
import { Projet, ProjetService } from '../../../services/projet-service';
import { AuthService } from '../../../core/auth.service';
import { EtudiantService } from '../../../services/etudiant-service';
import { LivrableService } from '../../../services/livrable-service';
import { Livrable } from '../../../services/livrable-service';
import { Create } from '../../livrable/create/create';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  imports: [Create],
  styleUrls: ['./list.scss']
})
export class List implements OnInit {
  projets: Projet[] = [];
  monProjet: Projet | null = null;

  selectedProjetId: number | null = null;
  selectedProjet: Projet | null = null;

  isDetailModalOpen = false;
  isFormLivrableModalOpen = false;

  livrables: Livrable[] = [];

  constructor(
    private readonly projetService: ProjetService,
    private readonly authService: AuthService,
    private readonly etudiantService: EtudiantService,
    private readonly livrableService: LivrableService
  ) {}

  ngOnInit(): void {
    this.loadProjetsNonAttribues();
    this.loadLivrables(1)
  }

  // Charger tous les projets non attribués ou projet de l'utilisateur
  loadProjetsNonAttribues() {
    const currentUser = this.authService.getUtilisateurId();
    if (!currentUser || !currentUser) return;

    this.projetService.getProjetDispo(currentUser).subscribe({
      next: (data) => {
        if (data.length === 1 && data[0].etudiant === currentUser) {
          // L'étudiant a déjà un projet
          this.monProjet = data[0];
          this.projets = [data[0]];
        } else {
          // Pas encore de projet
          this.monProjet = null;
          this.projets = data;
        }
        console.log('Projets chargés :', this.projets);
      },
      error: (err) => console.error('Erreur chargement projets :', err)
    });
  }

  // Lier un projet à l'utilisateur
  lier(projet: Projet) {
    const currentUser = this.authService.getUtilisateurId();
    if (!projet.id) return;

    const data = {
      etudiant_id: currentUser,
      projet_id: projet.id
    };

    this.etudiantService.attribuerProjet(data).subscribe({
      next: () => {
        this.monProjet = projet;
        this.projets = [projet];
      },
      error: (err) => alert('Erreur lors de l\'attribution : ' + err.error?.error)
    });
    return projet.id;
  }
  // Modal détail projet
  ouvrirDetailModal(id: number | undefined) {
    if (!id) return;
    this.isDetailModalOpen = true;
    this.projetService.getById(id).subscribe({
      next: (projet) => (this.selectedProjet = projet),
      error: (err) => console.error('Erreur chargement détail projet', err)
    });
  }
  closeDetailModal() {
    this.isDetailModalOpen = false;
    this.selectedProjet = null;
  }
  // Modal ajout livrable
  ouvrirFormLivrable(projetId: number | undefined) {
    if (!projetId) return;
    this.selectedProjetId = projetId;
    this.loadLivrables(projetId);
    this.isFormLivrableModalOpen = true;
  }

  closeFormLivrableModal() {
    this.isFormLivrableModalOpen = false;
    this.selectedProjetId = null;
    this.livrables = [];
  }

  // Charger les livrables d'un projet
  loadLivrables(projetId: number) {
    this.livrableService.getAll(projetId).subscribe({
      next: (data) => {
        this.livrables = data;
        console.log('Livrables récupérés :', data);
      },
      error: (err) => console.error('Erreur chargement livrables', err)
    });
  }
}
