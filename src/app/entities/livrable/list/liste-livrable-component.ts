 import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Livrable, LivrableService} from '../../../services/livrable-service';
 import {ProjetService} from '../../projet/service/projet-service';



@Component({
  selector: 'app-liste-livrable',
  imports: [
  ],
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projetId']) {
    }
  }




  deleteLivrable(id?: number) {
    if (!id) return console.warn('id du livrable manquant');
    // Appel service pour supprimer
  }
}
