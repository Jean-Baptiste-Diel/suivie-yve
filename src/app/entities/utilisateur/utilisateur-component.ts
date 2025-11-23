import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUtilisateur, UtilisateurService} from './service/utilisateur-service';

@Component({
  selector: 'app-utilisateur-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './utilisateur-component.html',
  styleUrl: './utilisateur-component.scss'
})
export class UtilisateurComponent {
  utilisateurForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly utilisateurService: UtilisateurService
  ) {
    this.utilisateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [''],
      role: ['', Validators.required],
    });
  }

  ajouterUtilisateur(utilisateurForm: FormGroup) {
    const utilisateur: IUtilisateur = this.utilisateurForm.value;
    console.log(utilisateur);
    this.utilisateurService.create(utilisateur).subscribe({
      next: (response) => {
        console.log('Utilisateur créé avec succès:', response);
        this.utilisateurForm.reset();
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
  }
  goBack() {
  }
}
