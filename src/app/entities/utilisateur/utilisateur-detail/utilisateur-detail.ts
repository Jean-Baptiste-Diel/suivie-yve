import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-utilisateur-detail',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './utilisateur-detail.html',
  styleUrl: './utilisateur-detail.scss'
})
export class UtilisateurDetail {

}
