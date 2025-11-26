import {Component, OnInit} from '@angular/core';
import {ProjetService} from '../service/projet-service';
import {DetailProjetComponent} from '../../encadrant/detail-projet-component/detail-projet-component';

@Component({
  selector: 'app-liste-projet-encadrer-component',
  imports: [
    DetailProjetComponent
  ],
  templateUrl: './liste-projet-encadrer-component.html',
  styleUrl: './liste-projet-encadrer-component.scss'
})
export class ListeProjetEncadrerComponent implements OnInit {
  protected projets: any;
  protected selectedProjetId: number | null = null;
  protected ouvrirDetailProjet = false;
    constructor(private readonly projetService: ProjetService) {
    }
    ngOnInit(): void {
        this.loadProjets();
    }

  loadProjets(): void {
    this.projetService.projetsEncadrer().subscribe({
      next: (data) => {
        console.log("Données projets :", data);
        this.projets = data;
      },
      error: (err) => console.error("Erreur :", err)
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
