import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Jury, JuryService} from '../../../services/jury-service';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
  standalone: true,
})
export class Edit implements OnInit{
    juryForm: FormGroup;
    jury: Jury | null = null;
    public editMode = false;
    public selectedId: number | null = null;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private juryService: JuryService) {
      // Initialisation du formulaire
      this.juryForm = this.formBuilder.group({
        id: 1,
        nom: ['', Validators.required],
      });
      }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.juryService.getById(id).subscribe({
        next: (data) => {
          this.jury = data;
          this.juryForm.patchValue(data);
        },
        error: (error) => {console.log(error);}
      })
      }
}
  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    // Réinitialiser avec les valeurs originales au lieu de tout effacer
    if (this.jury) {
      this.juryForm.patchValue(this.jury);
    }
  }
  updateJury() {
    if (this.selectedId && this.juryForm.valid) {
      const data: Jury = this.juryForm.value;
      this.juryService.update(this.selectedId, data).subscribe({
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
    return this.juryForm.controls;
  }
  editJury() {
    this.editMode = true;
    this.selectedId = this.jury?.id ?? null;
  }
}
