import {Component, OnInit} from '@angular/core';
import {Livrable, LivrableService} from '../../../services/livrable-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  livrable: Livrable | null = null
  constructor(private livrableService: LivrableService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      console.error('ID du livrable invalide');
      return;
    }

    this.livrableService.getById(id).subscribe({
      next: (data) => {
        // Ici, on récupère le livrable depuis l'API
        this.livrable = {
          ...data,
          // fichier peut être une URL ou null si non disponible
          fichier: data.fichier || null
        };
      },
      error: (err) => console.error('Erreur lors du chargement du livrable', err)
    });
  }
}

