import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Soutenance, SoutenanceService} from '../service/soutenance-service';

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
  public soutenanceForm: FormGroup;
  soutenance: Soutenance | null = null;
  public editMode = false;
  public selectedId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private soutenanceService: SoutenanceService,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire
    this.soutenanceForm = this.formBuilder.group({
      id: [null],
      nom: ['', Validators.required],
      // ajoute le reste ici
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }

  editSoutenance() {
    this.editMode = true;
    this.selectedId = this.soutenance?.id ?? null;
  }

  updateSoutenance() {
    if (this.selectedId && this.soutenanceForm.valid) {
      const data: Soutenance = this.soutenanceForm.value;
    } else {
      console.warn('Formulaire invalide ou ID manquant');
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    // Réinitialiser avec les valeurs originales au lieu de tout effacer
    if (this.soutenance) {
      this.soutenanceForm.patchValue(this.soutenance);
    }
  }

  // Méthode pour afficher les erreurs de validation
  get formControls() {
    return this.soutenanceForm.controls;
  }
}
