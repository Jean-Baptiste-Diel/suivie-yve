import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Projet, ProjetService} from '../service/projet-service';
import {ListeLivrableComponent} from '../../livrable/list/liste-livrable-component';
@Component({
  selector: 'app-detail-projet-component',
  imports: [
    RouterLink,
    ListeLivrableComponent,
  ],
  templateUrl: './detail-projet-component.html',
  styleUrl: './detail-projet-component.scss'
})
export class DetailProjetComponent implements OnInit, OnChanges {
  projet: Projet | null = null;
  @Input() projetId!: any;
  protected selectedProjetId: number | null = null;
  constructor(private readonly projetService: ProjetService, private readonly route: ActivatedRoute) {
  }
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
    this.projetService.getById(this.projetId)
      .subscribe(data => {
        this.projet = data;
        console.log(this.projet);
      });
  }
}
