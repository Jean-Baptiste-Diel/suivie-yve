import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { EtudiantService } from '../../../services/etudiant-service';
import { Create } from '../../livrable/create/create';
import {Projet, ProjetService} from '../service/projet-service';
import {DetailProjetComponent} from '../detail/detail-projet-component';
import {Livrable, LivrableService} from '../../livrable/service/livrable-service';
import {ActivatedRoute} from '@angular/router';
import {ListeLivrableComponent} from '../../livrable/list/liste-livrable-component';

@Component({
  selector: 'app-liste-projet-dispo',
  templateUrl: './liste-projet-dispo-component.html',
  imports: [Create, DetailProjetComponent, ListeLivrableComponent],
  styleUrls: ['./liste-projet-dispo-component.scss']
})
export class ListeProjetDispoComponent implements OnInit {
  projets: Projet[] = [];
  monProjet: Projet | null = null;

  selectedProjetId: number | null = null;
  selectedProjet: Projet | null = null;

  isDetailModalOpen = false;
  isFormLivrableModalOpen = false;

  livrables: Livrable[] = [];
  protected ouvrirDetailProjet = false;

  constructor(
    private readonly projetService: ProjetService,
    private readonly authService: AuthService,
    private readonly etudiantService: EtudiantService,
    private readonly livrableService: LivrableService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadProjetsNonAttribues();

  }

  // Charger tous les projets non attribués ou projet de l'utilisateur
  loadProjetsNonAttribues() {
    const currentUser = this.authService.getUtilisateurId();
    if (!currentUser) return;

    this.projetService.getProjetDispo().subscribe({
      next: (data) => {

        if (data.length === 1 && data[0].etudiant!.id === currentUser) {
          this.monProjet = data[0];
          this.projets = [data[0]];

          // 🔥 ID envoyé automatiquement
          this.selectedProjetId = data[0].id!;
          localStorage.setItem('projetId', String(data[0].id));
          console.log("Projet ID envoyé :", this.monProjet.etudiant);
        }
        else {
          this.monProjet = null;
          this.projets = data;

          // 🔥 ID du premier projet par défaut
          if (this.projets.length > 0) {
            this.selectedProjetId = this.projets[0].id!;
            console.log("🔥 Premier projet ID :", this.selectedProjetId);
          }
        }

        console.log('Projets chargés :', this.monProjet);
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
