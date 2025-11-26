import { Component, OnInit } from '@angular/core';
import { CreateLivrable } from '../../livrable/create/create-livrable';
import {Projet, ProjetService} from '../../projet/service/projet-service';
import {DetailProjetComponent} from '../../projet/detail/detail-projet-component';
import {Livrable} from '../../livrable/service/livrable-service';
import {ListeLivrableComponent} from '../../livrable/list/liste-livrable-component';
import {EtudiantService} from '../service/etudiant-service';
import {AuthService} from '../../../pages/auth/service/auth.service';

@Component({
  selector: 'app-liste-projet-dispo',
  templateUrl: './liste-projet-dispo-component.html',
  imports: [CreateLivrable, DetailProjetComponent, ListeLivrableComponent],
  styleUrls: ['./liste-projet-dispo-component.scss']
})
export class ListeProjetDispoComponent implements OnInit {
  projets: Projet[] = [];
  livrables: Livrable[] = [];

  monProjet: Projet | null = null;

  selectedProjetId: number | null = null;

  isOpen = false;
  protected ouvrirDetailProjet = false;

  constructor(
    private readonly projetService: ProjetService,
    private readonly authService: AuthService,
    private readonly etudiantService: EtudiantService,
  ) {}
  ngOnInit(): void {
    this.loadProjetsNonAttribues();
  }
  // Charger tous les projets non attribués ou projet de l'utilisateur
  loadProjetsNonAttribues() {
    const utilisateurId = this.authService.getUtilisateurId();
    if (!utilisateurId) return;
    this.projetService.getProjetDispo().subscribe({
      next: (data) => {
        if (data.length === 1 && data[0].etudiant && data[0].etudiant.id === utilisateurId) {
          this.monProjet = data[0];
          this.projets = [data[0]];
          // ID envoyé automatiquement
          this.selectedProjetId = data[0].id!;
          localStorage.setItem('projetId', String(data[0].id));
          console.log("Projet ID envoyé :", this.monProjet.etudiant);
        }
        else {
          this.monProjet = null;
          this.projets = data;
          // ID du premier projet par défaut
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
  // fonction ouvrir et fermer la modale ajouter livrable
  ouvrirFormLivrable(projetId: number | undefined) {
    if (!projetId) return;
    this.selectedProjetId = projetId;
    this.isOpen = true;
  }
  closeFormLivrableModal() {
    this.isOpen = false;
    this.livrables = [];
  }
  // fonction ouvrir et fermer la modale voir les details d'un projet
  DetailProjetModal(id: number ) {
    this.selectedProjetId = id;
    this.ouvrirDetailProjet = true
  }
  fermerDetailProjet() {
    this.ouvrirDetailProjet = false;
  }
  // fermeture des modal lors du click hors de la modal
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fermerDetailProjet();
      this.closeFormLivrableModal()
    }
  }
}
