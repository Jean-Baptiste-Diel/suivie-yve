import {Component, OnInit} from '@angular/core';
import {Navigation} from '../../../dashboard/user/supervisor-dashboard/navigation/navigation';
import {UtilisateurComponent} from '../utilisateur-component';
import {UtilisateurDetail} from '../utilisateur-detail/utilisateur-detail';
import {IUtilisateur, UtilisateurService} from '../service/utilisateur-service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-list-utilisateur',
  imports: [
    CommonModule,
    UtilisateurDetail,
    UtilisateurComponent,
  ],
  templateUrl: './list-utilisateur.html',
  styleUrl: './list-utilisateur.scss'
})
export class ListUtilisateur implements OnInit {
  constructor(private readonly utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
        this.loadUtilisateurs()
    }
  // Déclarer la propriété activeSection
  activeSection: string = 'listeUtilisateur';
  public utilisateurs: IUtilisateur[] = [];
  isOpen = false;
  setActiveSection(section: string) {
    this.activeSection = section;
  }
  // Fermer la modal quand on clique sur le fond (backdrop)
  ouvrirAjouterUtilisateur: any;
  selectedUtilisateurId: number | null = null;
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fermerDetailUtilisateur();
      this.fermerAjouterUtilisateur();
    }
  }
  DetailModal(id: number) {
    this.selectedUtilisateurId = id;
    this.isOpen = true;
  }
  loadDetailUtilisateur(id: number) {
    console.log(id)
  }
  fermerDetailUtilisateur() {
    this.isOpen = false
  }
  ajouterUtilisateurModal() {
    this.ouvrirAjouterUtilisateur = true;
  }

  fermerAjouterUtilisateur() {
    this.ouvrirAjouterUtilisateur = false;
  }

  loadUtilisateurs() {
    this.utilisateurService.liste().subscribe({
      next: (data) => this.utilisateurs = data,
      complete: () => {console.log(this.utilisateurs)},
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }
}
