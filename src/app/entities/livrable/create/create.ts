import {Component, Input, numberAttribute} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {LivrableService} from '../../../services/livrable-service';



@Component({
  selector: 'app-create-livrable',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.scss']
})
export class Create {
  @Input({transform: numberAttribute}) projetId!: number;
  livrableForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private livrableService: LivrableService
  ) {
    this.livrableForm = this.formBuilder.group({
      titre: ['', Validators.required],
      fichier: ['', Validators.required]
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
    formData.append("fichier", this.selectedFile); // ← c'est le fichier réel
    formData.append("projet_id", this.projetId.toString());
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    this.livrableService.create(formData).subscribe({
      next: (response) => {
        console.log('Livrable créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
      }
    });
    console.log(this.isModalOpen)
  }
  isModalOpen = false;

  fermerModal() {
    this.isModalOpen = false;
    console.log("d")
    console.log(this.isModalOpen)
  }

}
