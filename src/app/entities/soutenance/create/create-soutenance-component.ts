import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SoutenanceService} from '../service/soutenance-service';


@Component({
  selector: 'app-create-soutenance',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './create-soutenance-component.html',
  styleUrl: './create-soutenance-component.scss'
})
export class CreateSoutenanceComponent {
  soutenanceForm!: FormGroup;
  message: string | null = null;

  constructor(private readonly fb: FormBuilder, private readonly soutenanceService: SoutenanceService) {
    this.soutenanceForm = this.fb.group({
      date_debut: [''],
      date_fin: [''],
      duree: [60]
    });
  }
  planifier() {
    this.soutenanceService.planifier(this.soutenanceForm.value).subscribe({
      next: (res: any) => {
        this.message = "Soutenances planifiées avec succès !";
      },
      error: () => {
        this.message = "Erreur lors de la planification.";
      }
    });
  }
  goBack() {

  }
}
