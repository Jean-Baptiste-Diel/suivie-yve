import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Projet, ProjetService} from '../service/projet-service';
@Component({
  selector: 'app-detail',
    imports: [
        RouterLink
    ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  projet: Projet | null = null;
  constructor(private projetService: ProjetService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projetService.getById(id).subscribe({
      next: (data) => this.projet = data,
      error: (err) => console.error('Erreur lors du chargement du projet', err)
    });
  }
}
