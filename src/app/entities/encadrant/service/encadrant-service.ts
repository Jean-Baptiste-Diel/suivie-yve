import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Projet} from '../../projet/service/projet-service';
export interface Encadrant {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class EncadrantService {
  apiUrl = "http://127.0.0.1:8000/encadrant";
  apiUrl1 = "http://127.0.0.1:8000/livrables";
  constructor(private readonly http: HttpClient) {}
  // récupérer tous les encadrants pour l'admin
  getAllEncadrant(): Observable<Encadrant[]> {
    return this.http.get<Encadrant[]>(`${this.apiUrl}`);
  }
  getById(id: number | undefined): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl1}/${id}`);
  }
}
