import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SoutenanceService} from '../../../services/soutenance-service';
import {Projet, ProjetService} from '../../../services/projet-service';
import {IUtilisateur} from '../../../services/utilisateur-service';

@Component({
  selector: 'app-create-projet',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './createProjet.html',
  styleUrl: './createProjet.scss'
})
export class CreateProjet {
  projetForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private projetService: ProjetService) {
    this.projetForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
    })
  }
  ajouterProjet(projetForm: FormGroup) {
    const projet: Projet = {
  titre: this.projetForm.value.titre,
  description: this.projetForm.value.description,
  date_soumission: this.projetForm.value.date_soumission,
  statut: this.projetForm.value.statut,
  encadrant: this.projetForm.value.encadrant,
  jury: this.projetForm.value.jury
  // soutenance est optionnel
};

    this.projetService.create(projet).subscribe({
      next: (response) => {
        console.log('projet créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
  }
  goBack() {

  }
}
