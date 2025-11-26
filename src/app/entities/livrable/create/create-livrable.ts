import {Component, Input, numberAttribute} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {LivrableService} from '../service/livrable-service';

@Component({
  selector: 'app-create-livrable',
  imports: [ReactiveFormsModule],
  templateUrl: './create-livrable.html',
  styleUrls: ['./create-livrable.scss']
})
export class CreateLivrable {
  @Input({transform: numberAttribute}) projetId!: number;
  livrableForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly livrableService: LivrableService
  ) {
    this.livrableForm = this.formBuilder.group({
      titre: ['', Validators.required],
      fichier: ['', Validators.required],
      option: ['', Validators.required]
    });
  }
  selectedFile!: File;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  ajouterLivrable(form: FormGroup) {
    if (!this.selectedFile || !this.projetId) {
      alert("Veuillez remplir le formulaire et sélectionner un fichier.");
      return;
    }
    const formData = new FormData();
    formData.append("titre", form.value.titre);
    formData.append("fichier", this.selectedFile);
    formData.append("option", form.value.option);
    formData.append("projetId", this.projetId.toString());
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }
    console.log("FORMDATA :", [...formData.entries()]);

    this.livrableService.create(formData).subscribe({
      next: (response) => {
        console.log('Livrable créé avec succès:', response);
        this.livrableForm.reset();
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
  }

}
