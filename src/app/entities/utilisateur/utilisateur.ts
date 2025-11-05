import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUtilisateur, UtilisateurService} from '../../services/utilisateur-service';

@Component({
  selector: 'app-utilisateur',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './utilisateur.html',
  styleUrl: './utilisateur.scss'
})
export class Utilisateur {
  utilisateurForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {
    this.utilisateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [''],
      motDePasse: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ajouterLivrable(utilisateurForm: FormGroup) {
    const utilisateur : IUtilisateur = {
      nom: utilisateurForm.value.nom,
      prenom: utilisateurForm.value.prenom,
      email: utilisateurForm.value.email,
      motdepasse: utilisateurForm.value.motDePasse,
      role: utilisateurForm.value.role,
      authentifie: true
    }
    console.log(utilisateur);
    this.utilisateurService.create(utilisateur).subscribe({
      next: (response) => {
        console.log('Utilisateur créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
  }
  goBack() {

  }
}
