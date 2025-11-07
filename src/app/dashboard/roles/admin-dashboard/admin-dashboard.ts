import {Component, OnInit} from '@angular/core';
import {List} from '../../../entities/projet/list/list';
import {ListJury} from '../../../entities/jury/list/listJury';
import {Utilisateur} from '../../../entities/utilisateur/utilisateur';
import {CreateMesssagerie} from '../../../entities/messagerie/create/createMesssagerie';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Create} from '../../../entities/livrable/create/create';
import {Navigation} from '../../../navigation/navigation';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  imports: [
    List,
    ListJury,
    Utilisateur,
    CreateMesssagerie,
    Create,
    Navigation
  ],
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'Accueil';
  ouvrirAjouterUtilisateur = false;
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
        console.log("diel");
    }

  ajouterUtilisateurModal() {
    this.ouvrirAjouterUtilisateur = true;
  }
  fermerAjouterUtilisateur() {
    this.ouvrirAjouterUtilisateur = false;
  }
    // Fermer la modal quand on clique sur le fond (backdrop)
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fermerAjouterUtilisateur();
    }
  }
  setActiveSection(section: 'Utilisateur' | 'messagerie' | 'Accueil') {
    this.activeSection = section;
  }

  nagigationPageGenererRapport() {
    this.router.navigate(['']).then();
  }

  nagigationPagePlanifierSoutenance() {
    this.router.navigate(['/soutenances']).then();
  }

  nagigationPageAjouterUtilisateur() {
    this.router.navigate(['/utilisateur']).then();
  }

  nagigationPageListeUtilisateur() {
  // fais avec un filtre
    this.router.navigate(['/utilisateurs']).then();
  }
}
