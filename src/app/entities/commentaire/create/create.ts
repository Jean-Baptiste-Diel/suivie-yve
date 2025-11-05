import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentaireService} from '../../../services/commentaire-service';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create implements OnInit {
  commentaireForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private commentiareService: CommentaireService) {
    this.commentaireForm = this.formBuilder.group({
      texte: ['', [Validators.required]],
    })
  }
   ngOnInit() {

   }
  ajouterCommentaire(commentaire: FormGroup) {
    const texte = commentaire.value.texte;
    const livrable_id = ""
  }
}
