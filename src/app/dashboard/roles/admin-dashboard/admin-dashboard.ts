import { Component } from '@angular/core';
import {List} from '../../../entities/projet/list/list';
import {ListJury} from '../../../entities/jury/list/listJury';
import {Utilisateur} from '../../../entities/utilisateur/utilisateur';
import {CreateMesssagerie} from '../../../entities/messagerie/create/createMesssagerie';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  imports: [
    List,
    ListJury,
    Utilisateur,
    CreateMesssagerie
  ],
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  activeSection: string = 'Accueil';
constructor(private router: Router) {
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
    this.router.navigate(['/utilisateur/list']).then();
  }
}
