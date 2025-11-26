import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface Etudiant{
  id?: number;
  nom: string;
  prenom: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  apiUrl =  "http://127.0.0.1:8000/etudiants";
  constructor(private http: HttpClient) {
  }
// S'attribuer un projet (l'étudiant connecté)
  attribuerProjet(data: { etudiant_id: number | null; projet_id: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/lier-projet/`, data);
  }
}
