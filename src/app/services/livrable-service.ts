import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Livrable {
  id?: number;
  titre: string;
  fichier: File;
  projet_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LivrableService {
  private apiUrl = 'http://127.0.0.1:8000/api/livrables';

  constructor(private http: HttpClient) {}

  // Créer un livrable
  create(formData : FormData): Observable<Livrable> {
    return this.http.post<Livrable>(`${this.apiUrl}/ajouter-livrable/`, formData);
  }

  // Récupérer tous les livrables d'un projet
  getAll(id: number): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}/liste-livrables/?projet_id=${id}`);
  }

  // Récupérer un livrable
  getById(id: number): Observable<Livrable> {
    return this.http.get<Livrable>(`${this.apiUrl}/${id}/`);
  }

  // Mettre à jour un livrable
  update(id: number, livrable: Livrable): Observable<Livrable> {
    return this.http.put<Livrable>(`${this.apiUrl}/${id}/`, livrable);
  }
}
