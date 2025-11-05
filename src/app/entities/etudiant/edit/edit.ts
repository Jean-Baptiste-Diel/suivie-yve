import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Jury, JuryService} from '../../../services/jury-service';
import {ActivatedRoute} from '@angular/router';
import {Etudiant, EtudiantService} from '../../../services/etudiant-service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {
  etudiantForm: FormGroup;
  etudiant: Etudiant | null = null;
  public editMode = false;
  public selectedId: number | null = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private etudiantService: EtudiantService) {
    // Initialisation du formulaire
    this.etudiantForm = this.formBuilder.group({
      id: 1,
      nom: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.etudiantService.getById(id).subscribe({
        next: (data) => {
          this.etudiant = data;
          this.etudiantForm.patchValue(data);
        },
        error: (error) => {console.log(error);}
      })
    }
  }
  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    // Réinitialiser avec les valeurs originales au lieu de tout effacer
    if (this.etudiant) {
      this.etudiantForm.patchValue(this.etudiant);
    }

  }

  updateEtudiant() {
    if (this.selectedId && this.etudiantForm.valid) {
      const data: Jury = this.etudiantForm.value;
      this.etudiantService.update(this.selectedId, data).subscribe({
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
  // Méthode pour afficher les erreurs de validation
  get formControls() {
    return this.etudiantForm.controls;
  }

  editEtudiant() {
    this.editMode = true;
    this.selectedId = this.etudiant?.id ?? null;
  }
}
