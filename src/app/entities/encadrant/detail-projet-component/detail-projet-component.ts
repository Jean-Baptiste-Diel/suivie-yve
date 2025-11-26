import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Projet} from '../../projet/service/projet-service';
import {EncadrantService} from '../service/encadrant-service';
import {LivrableService} from '../../livrable/service/livrable-service';

@Component({
  selector: 'app-detail-projet-component',
  imports: [],
  templateUrl: './detail-projet-component.html',
  styleUrl: './detail-projet-component.scss'
})

export class DetailProjetComponent implements OnInit, OnChanges {
  @Input({transform: numberAttribute}) projetId!: number;
  projet: Projet | null = null;
  constructor(private readonly encadrantService: EncadrantService,
              private readonly livrableService: LivrableService) { }
  ngOnInit(): void {
    if (this.projetId) {
      this.loadDetailProjet();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['projetId'] && this.projetId) {
      this.loadDetailProjet();
    }
  }
  loadDetailProjet() {
    this.encadrantService.getById(this.projetId).subscribe({
      next: (data) => {
        this.projet = data;

        // Vérifiez que livrables existe et est un tableau
        this.projet.livrables = Array.isArray(data.livrables)
          ? data.livrables.map(l => ({
            ...l,
            fichier: l.fichier ? `http://127.0.0.1:8000${l.fichier}` : null
          }))
          : [];
      },
      error: (err) => console.error("Erreur chargement détail projet", err)
    });
  }

  protected envoyerMessage(id: number | undefined) {

  }

  protected validerLIvrable(id: number | undefined) {
    this.livrableService.validerLivrable(id).subscribe({
      next: (res) => {
        alert("Livrable validé !");
        this.loadDetailProjet(); // recharge la liste
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la validation");
      }
    });
  }

  protected ajouterCommentaire(id: number | undefined) {

  }
}
