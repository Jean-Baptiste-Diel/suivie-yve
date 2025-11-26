import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProjetService} from '../../projet/service/projet-service';
import {Livrable, LivrableService} from '../service/livrable-service';

@Component({
  selector: 'app-liste-livrable',
  imports: [],
  templateUrl: './liste-livrable-component.html',
  styleUrl: './liste-livrable-component.scss'
})
export class ListeLivrableComponent implements OnInit, OnChanges {
  livrables: Livrable[] = [];
  @Input({transform: numberAttribute}) projetId!: number;

  constructor(
    public formBuilder: FormBuilder,
    private readonly livrableService: LivrableService,
    private readonly projetService: ProjetService,
  ) {}

  ngOnInit() {
    this.loadLivrables(this.projetId);
  }
  loadLivrables(projetId: number) {
    this.livrableService.getAll(projetId).subscribe({
      next: (data) => {
        // On ajoute le préfixe de l'URL pour chaque livrable
        this.livrables = data.map(l => ({
          ...l,
          fichier: l.fichier ? `http://127.0.0.1:8000${l.fichier}` : null
        }));
        console.log('Livrables récupérés :', this.livrables);
      },
      error: (err) => console.error('Erreur lors du chargement des livrables', err)
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['projetId']) {
      this.loadLivrables(this.projetId);
    }
  }
  deleteLivrable(id?: number) {
    if (!confirm('Voulez-vous vraiment supprimer ce livrable ?')) return;
    this.livrableService.delete(id).subscribe({
      next: () => {
        // Supprime le livrable de la liste locale
        this.livrables = this.livrables.filter(l => l.id !== id);
        console.log('Livrable supprimé avec succès');
      },
      error: (err) => console.error('Erreur lors de la suppression du livrable', err)
    });
  }
}
