import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commentaire} from './commentaire-service';
import {Livrable} from './livrable-service';
import {Observable} from 'rxjs';
export interface Etudiant{
  id?: number;
  nom: string;
}
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  apiUrl =  "http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) {
  }
  getById(id: number) {
    return this.http.get<Etudiant>(`${this.apiUrl}/etudiants/${id}/`);
  }

  update(id: number, etudiant: Etudiant) {
    return this.http.put<Etudiant>(`${this.apiUrl}/etudiants/${id}/`, etudiant);
  }

  getAll() {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/etudiants/`);
  }

  create(etudiant: Etudiant) {
    return this.http.post<Etudiant>(`${this.apiUrl}/etudiants/`, etudiant);
  }

  // S'attribuer un projet (l'étudiant connecté)
  attribuerProjet(data: { etudiant_id: number | undefined; projet_id: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/etudiants/lier-projet/`, data);
  }

}
