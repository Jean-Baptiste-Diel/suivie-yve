import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Projet, ProjetService} from '../service/projet-service';
import {Encadrant, EncadrantService} from '../../encadrant/service/encadrant-service';

@Component({
  selector: 'app-create-projet',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './createProjet.html',
  styleUrl: './createProjet.scss'
})
export class CreateProjet implements OnInit {
  encadrants: Encadrant[] = [];
  projetForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder,
              private readonly projetService: ProjetService,
              private readonly encadrantService: EncadrantService) {
    this.projetForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      niveau: ['', [Validators.required]],
      encadrant: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
        this.listeEncadrant()
        console.log(this.listeEncadrant())
    }
  ajouterProjet(projetForm: FormGroup) {
    const projet: Projet = {
    titre: this.projetForm.value.titre,
    description: this.projetForm.value.description,
    niveau: this.projetForm.value.niveau,
    encadrant: this.projetForm.value.encadrant,
};
console.log(projet);
    this.projetService.create(projet).subscribe({
      next: (response) => {
        console.log('projet créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
  }

  listeEncadrant(){
    this.encadrantService.getAllEncadrant().subscribe({
        next: (data) => this.encadrants = data,
        error: (err) => console.error('Erreur lors du chargement', err)
      });
  }

  goBack() {

  }
}
