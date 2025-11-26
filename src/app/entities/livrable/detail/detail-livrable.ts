import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Livrable, LivrableService } from '../service/livrable-service';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail-livrable.html',
  styleUrls: ['./detail-livrable.scss'],
})
export class DetailLivrable implements OnInit {
  livrable: Livrable | null = null;
  apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private readonly livrableService: LivrableService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      console.error('ID du livrable invalide');
      return;
    }

    this.livrableService.getById(id).subscribe({
      next: (data) => {
        this.livrable = {
          ...data,
          // Préfixe l'URL avec le serveur Django
          fichier: `apiUrl${data.fichier}`
        };
      },
      error: (err) => console.error('Erreur lors du chargement du livrable', err)
    });
  }
}
