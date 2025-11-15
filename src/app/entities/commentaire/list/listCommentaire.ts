import {Component, OnInit} from '@angular/core';
import {Commentaire, CommentaireService} from '../../../services/commentaire-service';

@Component({
  selector: 'app-list-commentaire',
  imports: [
  ],
  templateUrl: './listCommentaire.html',
  styleUrl: './listCommentaire.scss'
})
export class ListCommentaire implements OnInit {
  public commentaires: Commentaire[] = [];
  constructor(private readonly commentaireService: CommentaireService) {

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
