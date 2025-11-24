import {Component, OnInit} from '@angular/core';
import {Projet, ProjetService} from '../service/projet-service';
import {DetailProjetComponent} from '../detail/detail-projet-component';

@Component({
  selector: 'app-projet-valider-component',
  imports: [
    DetailProjetComponent
  ],
  templateUrl: './projet-valider-component.html',
  styleUrl: './projet-valider-component.scss'
})
export class ProjetValiderComponent implements OnInit {
  public projets: Projet[] = [];
  ouvrirDetailProjet = false;
  protected selectedProjetId: any;
  constructor(private readonly projetService: ProjetService) {}

  ngOnInit(): void {
        this.loadProjetValider()
    }

  loadProjetValider() {
    this.projetService.projetsValider().subscribe({
      next: (data) => this.projets = data,
      error: (err) => console.error('Erreur lors du chargement', err)
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

  PlanifierModal() {

  }
}
