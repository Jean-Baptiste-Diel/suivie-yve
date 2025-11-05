import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Commentaire {
  id: number;
  texte: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  apiUrl = "http://localhost:8000/api/commentaires"; // adapter selon ton API

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.apiUrl}/${id}/`);
  }

  update(id: number, commentaire: Commentaire): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiUrl}/${id}/`, commentaire);
  }

  getAll(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.apiUrl);
  }

  getAllForStudent(studentId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}?student_id=${studentId}`);
  }
}
