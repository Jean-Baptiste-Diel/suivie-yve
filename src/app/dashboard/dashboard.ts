import {Component, OnInit} from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface ConnexionResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    nom: string;
    prenom: string;
    role: string;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  role: string | null = null;  // ✅ peut être null si pas connecté
  id: number = 0;
  connexionForm: FormGroup;
  private message: string = 'Erreur lors de connexion';
  identifiant: any;
  motDePasse: any;
  private erreur!: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.connexionForm = this.formBuilder.group({
      identifiant: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.role = this.authService.getRole();
  }

  seConnecter(connexion: FormGroup) {
    const identifiant = connexion.value.identifiant;
    const mot_de_passe = connexion.value.motDePasse;

    console.log('Tentative connexion avec :', identifiant, mot_de_passe);

    this.authService.connexion(identifiant, mot_de_passe).subscribe({
      next: (data: ConnexionResponse) => {
        this.role = data.user.role;
        this.id = data.user.id;

        if (this.role === 'encadrant') {
          this.router.navigate(['/dashboard-supervisor/']).then();
          console.log('Connecté comme encadrant');
        } else if (this.role === 'jurys') {
          this.router.navigate(['/dashboard-jury/']).then();
          console.log('Connecté comme jury');
        } else if (this.role === 'etudiant') {
          this.router.navigate(['/dashboard-student/']).then();
          console.log('Connecté comme étudiant');
        } else if (this.role === 'admin') {
          this.router.navigate(['/dashboard-admin/']).then();
          console.log('Connecté comme admin');
        }
      },
      error: (error: { error: { message: string } }) => {
        this.message = error.error.message || 'Erreur lors de la connexion.';
        console.error('Erreur API:', this.message);
      }
    });
  }
}
