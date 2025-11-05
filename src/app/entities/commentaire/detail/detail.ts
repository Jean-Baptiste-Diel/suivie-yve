import { Component } from '@angular/core';
import {Jury, JuryService} from '../../../services/jury-service';
import {ActivatedRoute} from '@angular/router';
import {Commentaire, CommentaireService} from '../../../services/commentaire-service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [
    NgIf
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  commentaire : Commentaire | null = null;
  constructor(private commentaireService: CommentaireService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.commentaireService.getById(id).subscribe({
      next: (data) => this.commentaire = data,
      error: (err) => console.error('Erreur lors du chargement du commentaire', err)
    });
  }
}
