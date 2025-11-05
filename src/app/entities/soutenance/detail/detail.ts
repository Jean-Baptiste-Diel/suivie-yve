import { Component } from '@angular/core';
import {Jury, JuryService} from '../../../services/jury-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Soutenance, SoutenanceService} from '../../../services/soutenance-service';

@Component({
  selector: 'app-detail-soutenance',
  imports: [
    RouterLink
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  soutenance: Soutenance | null = null;
  constructor(private soutenanceService: SoutenanceService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soutenanceService.getById(id).subscribe({
      next: (data) => this.soutenance = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }
}
