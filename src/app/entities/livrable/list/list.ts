 import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {Livrable, LivrableService} from '../../../services/livrable-service';
import {RouterLink} from '@angular/router';
 import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-list',
  imports: [
    RouterLink,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {
  @Input() projetId!: number; // ID du projet passé depuis le parent
  livrables: Livrable[] = [];
  constructor(public formBuilder: FormBuilder, private readonly livrableService: LivrableService, private readonly authService: AuthService) {}
  ngOnInit() {
    this.loadLivrables()
  }

  loadLivrables() {
    this.livrableService.getAll(this.projetId).subscribe({
      next: (data) => {
        this.livrables = data;
        console.log('Livrables récupérés :', data);
      },
      error: (err) => console.error('Erreur lors du chargement des livrables', err)
    });
  }
  deleteLivrable(id: number | undefined) {

  }
}
