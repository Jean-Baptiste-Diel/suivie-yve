import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Etudiant, EtudiantService} from '../../../services/etudiant-service';
interface ConnexionResponse {
    id: number;
    email: string;
    role: string;
}
@Component({
  selector: 'app-liste-projet-dispo',
    imports: [
        NgForOf
    ],
  templateUrl: './liste-etudiant-component.html',
  styleUrl: './liste-etudiant-component.scss'
})
export class ListeEtudiantComponent implements OnInit {
  public etudiants: Etudiant[] = [];
  private role = '';
  constructor(private etudiantService: EtudiantService,) {

  }
  ngOnInit() {
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.etudiantService.getAll().subscribe({
      next: (data: Etudiant[]) => this.etudiants = data,
      error: (err: any) => console.error('Erreur lors du chargement', err)
    });
  }
}
