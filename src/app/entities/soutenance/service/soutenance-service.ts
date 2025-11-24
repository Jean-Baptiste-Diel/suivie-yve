import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface Soutenance {
  id: number;
  date: number;
  salle: string;
}
@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {
  private readonly apiUrl = 'http://localhost:8000/soutenances';

  constructor(private readonly http: HttpClient) { }

  // Ici on planifie l  soute : date debut et date fin
  planifier(data: any) {
    return this.http.post(`${this.apiUrl}/planifier/`, data);
  }

  // ic les soutenances
  liste(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  // Liste soutenance d'un encadreur
  listeSoutenances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/encadrant-soutenances/`);
  }
  // telc pdf
  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf/`, { responseType: 'blob' });
  }
}
