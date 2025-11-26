import {Component, OnInit} from '@angular/core';
import {Projet, ProjetService} from '../service/projet-service';
import {CreateProjetComponent} from '../create/create-projet-component';
import {CreateSoutenanceComponent} from '../../soutenance/create/create-soutenance-component';
import {ProjetValiderComponent} from '../projet-valider-component/projet-valider-component';
import {DetailProjetComponent} from '../detail/detail-projet-component';

@Component({
  selector: 'app-liste-projet-component',
  imports: [
    CreateProjetComponent,
    CreateSoutenanceComponent,
    ProjetValiderComponent,
    DetailProjetComponent
  ],
  templateUrl: './liste-projet-component.html',
  styleUrl: './liste-projet-component.scss'
})
export class ListeProjetComponent implements OnInit {
  public projets: Projet[] = [];
  ouvrirDetailProjet = false;
  activeSection: string = 'listeProjet';
  protected selectedProjetId: any;
  protected ouvrirPlannifierSoutenance = false;
  constructor(private readonly projetService: ProjetService,) {
  }
  ngOnInit() {
    this.loadProjet()
  }

  setActiveSection(section: 'ajouterProjet' | 'listeProjet' | 'listeProjetFini') {
    this.activeSection = section;
    this.loadProjet();
  }

  loadProjet() {
    this.projetService.getAll().subscribe({
      next: (data) => this.projets = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }
  onBackdropClick($event: PointerEvent) {

  }
  DetailModal(id:number){
    this.selectedProjetId = id;
    this.ouvrirDetailProjet = true
  }
  fermerDetailProjet() {
    this.ouvrirDetailProjet = false;
  }

  fermerPlanifierSoutenance() {

  }

  PlanifierModal() {

  }
}
