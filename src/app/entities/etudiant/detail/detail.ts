import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Etudiant, EtudiantService} from '../../../services/etudiant-service';
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
  etudiant: Etudiant | null = null;
  constructor(private etudiantService: EtudiantService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.etudiantService.getById(id).subscribe({
      next: (data) => this.etudiant = data,
      error: (err) => console.error('Erreur lors du chargement de l\'etudiant', err)
    });
  }
}
