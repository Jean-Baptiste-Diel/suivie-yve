import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Jury, JuryService} from '../../../services/jury-service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  jury: Jury = {
    id: 0,
    nom: ''
  };
  constructor(private juryService: JuryService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.juryService.getById(id).subscribe({
      next: (data) => this.jury = data,
      error: (err) => console.error('Erreur lors du chargement du jury', err)
    });
  }
}
