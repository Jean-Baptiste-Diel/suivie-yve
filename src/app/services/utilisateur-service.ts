import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface IUtilisateur {
  nom: string;
  prenom: string;
  email: string;
  motdepasse: string;
  role: string;
  authentifie: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {
  }
  // Créer un utilisateur
  create(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.http.post<IUtilisateur>(`${this.apiUrl}/utilisateurs/`, utilisateur);
  }

  // Récupérer tous les utilisateurs
  getAll(){
    return this.http.get<IUtilisateur[]>(`${this.apiUrl}/login/`)
  }

  // Récupérer un utilisateur
  getById(id: number): Observable<IUtilisateur> {
    return this.http.get<IUtilisateur>(`${this.apiUrl}/utilisateur/${id}/`);
  }

  update(id: number, utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.http.put<IUtilisateur>(`${this.apiUrl}/utilisateur/${id}/`, utilisateur);
  }
}
