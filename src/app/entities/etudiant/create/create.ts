import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Etudiant, EtudiantService} from '../../../services/etudiant-service';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {
  etudiantForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private etudiantService: EtudiantService) {
    this.etudiantForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
    })
  }
  ajouterEtudiant(etudiantForm: FormGroup) {
    const etudiant : Etudiant = {
      nom : etudiantForm.value.nom
    }
    this.etudiantService.create(etudiant).subscribe({
      next: (response) => {
        console.log('Etudiant créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
  }
}
