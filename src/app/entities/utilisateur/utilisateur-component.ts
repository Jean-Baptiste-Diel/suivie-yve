import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur-service';

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
    const utilisateur : { nom: string; prenom: string; email: string; motdepasse: string; role: string } = {
      nom: utilisateurForm.value.nom,
      prenom: utilisateurForm.value.prenom,
      email: utilisateurForm.value.email,
      motdepasse: "passer",
      role: utilisateurForm.value.role,
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
