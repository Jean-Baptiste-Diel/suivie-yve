import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { EtudiantService } from '../../../services/etudiant-service';
import { Create } from '../../livrable/create/create';
import {Projet, ProjetService} from '../service/projet-service';
import {Livrable, LivrableService} from '../../../services/livrable-service';

@Component({
  selector: 'app-liste-projet-dispo',
  templateUrl: './liste-projet-component.html',
  imports: [Create],
  styleUrls: ['./liste-projet-component.scss']
})
export class ListeProjetComponent implements OnInit {
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
    private readonly livrableService: LivrableService,
  ) {}

  ngOnInit(): void {
    this.loadProjetsNonAttribues();
    //this.loadLivrables(this.projetId)
  }

  // Charger tous les projets non attribués ou projet de l'utilisateur
  loadProjetsNonAttribues() {
    const currentUser = this.authService.getUtilisateurId();
    if (!currentUser) return;

    this.projetService.getProjetDispo(currentUser).subscribe({
      next: (data) => {
        if (data.length === 1 && data[0].etudiant === currentUser) {

          // L'étudiant a déjà un projet
          this.monProjet = data[0];
          this.projets = [data[0]];

          if (this.monProjet?.id) {
            localStorage.setItem('projetId', String(this.monProjet.id));
            console.log("🔥 Projet ID enregistré :", this.monProjet.id);
          }
        } else {

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
        localStorage.setItem('projetId', String(projet.id));
        console.log("🔥 Projet ID enregistré (lier) :", projet.id);
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
    this.isFormLivrableModalOpen = true;
  }

  closeFormLivrableModal() {
    this.isFormLivrableModalOpen = false;
    this.selectedProjetId = null;
    this.livrables = [];
  }
  loadLivrables(projetId: number) {
    this.livrableService.getAll(projetId).subscribe({
      next: (data) => {
        this.livrables = data;
        console.log('Livrables récupéré :', data);
      },
      error: (err) => console.error('Erreur lors du chargement des livrables', err)
    });
  }
}
