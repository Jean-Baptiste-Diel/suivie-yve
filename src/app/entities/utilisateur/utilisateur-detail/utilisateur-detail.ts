import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilisateurService} from '../service/utilisateur-service';
import {CommonModule} from '@angular/common';
import { Component, Input, numberAttribute, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {UtilisateurComponent} from "../utilisateur-component";
import {ListeMessage} from '../../message/list/liste-message';

@Component({
  selector: 'app-utilisateur-detail',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilisateurComponent,
    ListeMessage
  ],
  templateUrl: './utilisateur-detail.html',
  styleUrl: './utilisateur-detail.scss'
})
export class UtilisateurDetail implements OnInit, OnChanges {
  @Input({transform: numberAttribute}) utilisateurId!: number;
  utilisateur: any;
  private isOpen = false;
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
  // Fermer la modal quand on clique sur le fond (backdrop)
  ouvrirEnvoyerMessage: any;
  selectedUtilisateurId: number | null = null;
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fermerEnvoyerMessage();
    }
  }
  fermerEnvoyerMessage() {
    this.isOpen = false
  }
  envoyerMessageModal() {
    this.ouvrirEnvoyerMessage = true;
  }
}
