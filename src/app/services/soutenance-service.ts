import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
export interface Soutenance {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {
  apiUrl =  "http://127.0.0.1:8000/api/soutenances/";
  constructor(private http: HttpClient) {
  }
  getById(id: number) {
    return this.http.get<Soutenance>(`${this.apiUrl}/${id}/`);
  }

  update(id: number, soutenance: Soutenance) {
    return this.http.put<Soutenance>(`${this.apiUrl}/${id}/`, soutenance);
  }

  getAll() {
    return this.http.get<Soutenance[]>(this.apiUrl);
  }
}
