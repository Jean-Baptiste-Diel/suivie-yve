import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Soutenance, SoutenanceService} from '../service/soutenance-service';
import {UtilisateurDetail} from '../../utilisateur/utilisateur-detail/utilisateur-detail';
import {CreateSoutenanceComponent} from '../create/create-soutenance-component';
import {ProjetValiderComponent} from '../../projet/projet-valider-component/projet-valider-component';

@Component({
  selector: 'app-list-soutenance',
  imports: [
    UtilisateurDetail,
    CreateSoutenanceComponent,
    ProjetValiderComponent
  ],
  templateUrl: './list-soutenance-component.html',
  styleUrl: './list-soutenance-component.scss'
})
export class ListSoutenanceComponent implements OnInit {
  public soutenances: Soutenance[] = [];
  ouvrirDetailSoutenance = false;
  activeSection: string = 'listeSoutenance';
  constructor(public formBuilder: FormBuilder, private readonly soutenanceService: SoutenanceService) {}
  ngOnInit() {
    this.loadSoutenances()
  }

  setActiveSection(section: 'listeSoutenance' | 'listeProjetFini' | 'planifier') {
    this.activeSection = section;
  }

  loadSoutenances() {
    this.soutenanceService.liste().subscribe({
      next: (data) => this.soutenances = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }

  deleteSoutenance(id: number | null) {

  }

  DetailModal() {

  }

  fermerDetailUtilisateur() {

  }

  onBackdropClick($event: PointerEvent) {

  }

  telechagerPDF(planifier: string) {
      this.soutenanceService.exportPdf().subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'planning_soutenances.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
