import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilisateurService} from '../service/utilisateur-service';
import {CommonModule} from '@angular/common';
import { Component, Input, numberAttribute, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-utilisateur-detail',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './utilisateur-detail.html',
  styleUrl: './utilisateur-detail.scss'
})
export class UtilisateurDetail implements OnInit, OnChanges {
  @Input({transform: numberAttribute}) utilisateurId!: number;
  utilisateur: any;
  constructor(private readonly utilisateurService: UtilisateurService) {}

  ngOnInit() {
    if (this.utilisateurId) {
      this.loadUtilisateur();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['utilisateurId'] && this.utilisateurId) {
      this.loadUtilisateur();
    }
  }

  loadUtilisateur() {
    this.utilisateurService.getUtilisateurById(this.utilisateurId)
      .subscribe(data => {
        this.utilisateur = data;
        console.log(this.utilisateur);
      });
  }
}
