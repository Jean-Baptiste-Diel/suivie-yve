import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projet {
  id?: number;
  titre: string;
  description?: string;
  utilisateur?: any;
  date_soumission?:Date;
   statut?:string;
   encadrant?:string;
   jury?:string;
   soutenance?:any;
  etudiant?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  apiUrl = "http://127.0.0.1:8000/api/projets";

  constructor(private readonly http: HttpClient) { }

  // récupérer tous les projets pour l'admin
  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets/`);
  }
  // récupérer des projets disponible pour l'etudiant
  getProjetDispo(etudiantId: number): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.apiUrl}/disponibles/?etudiant_id=${etudiantId}`);
  }
  // récupérer un projet(id)
  getById(id: number | undefined): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/projets/projet/?projet_id=${id}`);
  }









  // mettre à jour un projet
  update(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/projets/${id}/`, projet);
  }

  // création d'un projet
  create(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/projets/`, projet);
  }

  // Projets non attribués
  getProjetsNonAttribues(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets/projets_non_attribues/`);
  }

  // Projets attribués
  getProjetsAttribues(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/projets/projets_attribues/`);
  }

  // Libérer un projet
  libererProjet(projetId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/projets/${projetId}/liberer_projet/`,
      {}
    );
  }

}
