import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JuryService} from '../../../services/jury-service';
import {SoutenanceService} from '../../../services/soutenance-service';

@Component({
  selector: 'app-create',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {
  soutenanceForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private soutenanceService: SoutenanceService) {
    this.soutenanceForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
    })
  }
  ajouterSoutenance(soutenance: FormGroup) {
    const nom = soutenance.value.nom;
  }

  goBack() {

  }
}
