import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {

}
