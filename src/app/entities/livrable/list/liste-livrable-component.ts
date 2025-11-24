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
        this.livrables = data;
        console.log('Livrables récupéré :', data);
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
    if (!id) return console.warn('id du livrable manquant');
    // Appel service pour supprimer
  }
}
