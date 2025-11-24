import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface IUtilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motdepasse: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private readonly apiUrl = 'http://localhost:8000/utilisateurs';

  constructor(private readonly http: HttpClient) { }
  // Créer un utilisateur
  create(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.http.post<IUtilisateur>(`${this.apiUrl}/ajouter-utilisateur/`, utilisateur);
  }

  liste(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUtilisateurById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }
}
