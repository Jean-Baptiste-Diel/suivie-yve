import {Component, forwardRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUtilisateur, UtilisateurService} from '../../services/utilisateur-service';
import {AdminDashboardComponent} from '../../dashboard/roles/admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-utilisateur',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './utilisateur.html',
  styleUrl: './utilisateur.scss'
})
export class Utilisateur {
  utilisateurForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly utilisateurService: UtilisateurService
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
      motdepasse: "passer",
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
