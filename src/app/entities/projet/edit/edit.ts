import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Projet, ProjetService} from '../../../services/projet-service';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit implements OnInit {
  public projetForm: FormGroup;
  projet: Projet | null = null;
  public editMode = false;
  public selectedId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      // ajoute le reste ici
    });
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.projetService.getById(id).subscribe({
        next: (data) => {
          this.projet = data;
          // Pré-remplir le formulaire avec les données existantes
          this.projetForm.patchValue(data);
        },
        error: (err) => console.error('Erreur lors du chargement', err)
      });
    } else {
      console.error('ID non trouvé dans les paramètres de route');
    }
  }
  editProjet() {
    this.editMode = true;
    this.selectedId = this.projet?.id ?? null;
  }
  updateProjet() {
    if (this.selectedId && this.projetForm.valid) {
      const data: Projet = this.projetForm.value;
      this.projetService.update(this.selectedId, data).subscribe({
        next: () => {
          this.cancelEdit();
          // Recharger les données après mise à jour
          this.ngOnInit();
        },
        error: (err: any) => console.error('Erreur lors de la mise à jour', err)
      });
    } else {
      console.warn('Formulaire invalide ou ID manquant');
    }
  }
  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    // Réinitialiser avec les valeurs originales au lieu de tout effacer
    if (this.projet) {
      this.projetForm.patchValue(this.projet);
    }
  }
  // Méthode pour afficher les erreurs de validation
  get formControls() {
    return this.projetForm.controls;
  }
}
