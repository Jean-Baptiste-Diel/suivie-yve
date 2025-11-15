import {Component, OnInit} from '@angular/core';
import {CreateMesssagerie} from '../../../entities/messagerie/create/createMesssagerie';
import {Router} from '@angular/router';
import {Navigation} from '../../../navigation/navigation';
import {ListSoutenanceComponent} from '../../../entities/soutenance/list/list-soutenance-component';
import {ListeProjetComponent} from '../../../entities/projet/liste-projet-component/liste-projet-component';
import {ListUtilisateur} from '../../../entities/utilisateur/list-utilisateur/list-utilisateur';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  imports: [
    CreateMesssagerie,
    Navigation,
    ListSoutenanceComponent,
    ListeProjetComponent,
    ListUtilisateur
  ],
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'Accueil';
  constructor() {}

  ngOnInit(): void {
        console.log("diel");
    }
}
