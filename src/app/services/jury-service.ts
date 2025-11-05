import { Injectable } from '@angular/core';
import {Livrable} from './livrable-service';
import {HttpClient} from '@angular/common/http';
export interface Jury{
  id: number;
  nom: string;
}
@Injectable({
  providedIn: 'root'
})
export class JuryService {
  apiUrl =  "http://127.0.0.1:8000/api";
constructor(private http: HttpClient) {
}
  getById(id: number) {
    return this.http.get<Jury>(`${this.apiUrl}/jury/${id}/`);
  }

  update(id: number, jury: Jury) {
    return this.http.put<Jury>(`${this.apiUrl}/jury/${id}/`, jury);
  }

  getAll() {
    return this.http.get<Jury[]>(`${this.apiUrl}/jury/`);
  }
}
