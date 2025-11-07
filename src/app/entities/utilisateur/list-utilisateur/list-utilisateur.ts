import { Component } from '@angular/core';
import {Navigation} from '../../../navigation/navigation';
import {Utilisateur} from '../utilisateur';
import {UtilisateurDetail} from '../utilisateur-detail/utilisateur-detail';

@Component({
  selector: 'app-list-utilisateur',
  imports: [
    Navigation,
    Utilisateur,
    UtilisateurDetail
  ],
  templateUrl: './list-utilisateur.html',
  styleUrl: './list-utilisateur.scss'
})
export class ListUtilisateur {
// ✅ Déclarer la propriété activeSection
  activeSection: string = 'Utilisateur';

  // exemple si tu veux changer la section
  ouvrirDetailUtilisateur = false;
  setActiveSection(section: string) {
    this.activeSection = section;
  }
  // Fermer la modal quand on clique sur le fond (backdrop)
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fermerDetailUtilisateur();
    }
  }
  DetailModal() {
    this.ouvrirDetailUtilisateur = true;
  }
  fermerDetailUtilisateur() {
    this.ouvrirDetailUtilisateur = false
  }
}
