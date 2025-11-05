import { Component } from '@angular/core';
import {ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {JuryService} from '../../../services/jury-service';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})

export class Create {
  juryForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private juryService: JuryService) {
    this.juryForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
    })
  }
  ajouterJury(jury: FormGroup) {
    const nomJury = jury.value.nom;
  }

  goBack() {

  }
}
