import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Livrable, LivrableService} from '../../../services/livrable-service';
import {FormBuilder} from '@angular/forms';
import {Soutenance, SoutenanceService} from '../../../services/soutenance-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    RouterLink
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  public soutenances: Soutenance[] = [];
  constructor(public formBuilder: FormBuilder, private soutenanceService: SoutenanceService) {}
  ngOnInit() {
    this.loadSoutenances()
  }

  loadSoutenances() {
    this.soutenanceService.getAll().subscribe({
      next: (data) => this.soutenances = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }

  deleteSoutenance(id: number | null) {

  }
}
