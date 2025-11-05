import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Jury, JuryService} from '../../../services/jury-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-jury',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './listJury.html',
  styleUrl: './listJury.scss'
})
export class ListJury implements OnInit {
  public jurys: Jury[] = [];
  constructor(private juryService: JuryService) {

  }
  ngOnInit() {
    this.loadJurys();
  }

  loadJurys() {
    this.juryService.getAll().subscribe({
      next: (data: Jury[]) => this.jurys = data,
      error: (err: any) => console.error('Erreur lors du chargement', err)
    });
  }

  deleteJury(id: any) {

  }
}
