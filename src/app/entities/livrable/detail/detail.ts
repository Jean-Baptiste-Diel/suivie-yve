import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Livrable, LivrableService} from '../service/livrable-service';

@Component({
  selector: 'app-detail',
  imports: [
    RouterLink,
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  livrable: Livrable | null = null
  constructor(private readonly livrableService: LivrableService, private readonly route: ActivatedRoute) {
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

