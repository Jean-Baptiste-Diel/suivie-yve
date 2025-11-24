import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Livrable, LivrableService} from '../service/livrable-service';

@Component({
  selector: 'app-edit-livrable',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit implements OnInit {
  public livrableForm: FormGroup;
  livrable: Livrable | null = null;
  public editMode = false;
  public selectedId: number | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly livrableService: LivrableService,
    private readonly route: ActivatedRoute
  ) {
    // Initialisation du formulaire
    this.livrableForm = this.formBuilder.group({
      id: [null],
      titre: ['', Validators.required],
      fichier: [''],
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.livrableService.getById(id).subscribe({
        next: (data) => {
          this.livrable = data;
          // Pré-remplir le formulaire avec les données existantes
          this.livrableForm.patchValue(data);
        },
        error: (err) => console.error('Erreur lors du chargement du livrable', err)
      });
    } else {
      console.error('ID non trouvé dans les paramètres de route');
    }
  }

  editLivrable() {
    this.editMode = true;
    this.selectedId = this.livrable?.id ?? null;
  }

  updateLivrable() {
    if (this.selectedId && this.livrableForm.valid) {
      const data: Livrable = this.livrableForm.value;
      this.livrableService.update(this.selectedId, data).subscribe({
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
    if (this.livrable) {
      this.livrableForm.patchValue(this.livrable);
    }
  }

  // Méthode pour afficher les erreurs de validation
  get formControls() {
    return this.livrableForm.controls;
  }
}
