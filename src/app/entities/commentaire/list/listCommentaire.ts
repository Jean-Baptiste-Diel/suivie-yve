import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Jury, JuryService} from '../../../services/jury-service';
import {Commentaire, CommentaireService} from '../../../services/commentaire-service';

@Component({
  selector: 'app-list-commentaire',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './listCommentaire.html',
  styleUrl: './listCommentaire.scss'
})
export class ListCommentaire implements OnInit {
  public commentaires: Commentaire[] = [];
  constructor(private commentaireService: CommentaireService) {

  }
  ngOnInit() {
    this.loadCommentaires();
  }

  loadCommentaires() {
    this.commentaireService.getAll().subscribe({
      next: (data: Commentaire[]) => this.commentaires = data,
      error: (err: any) => console.error('Erreur lors du chargement', err)
    });
  }
}
