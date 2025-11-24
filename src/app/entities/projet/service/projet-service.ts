import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Encadrant} from '../../encadrant/service/encadrant-service';
import {Etudiant} from '../../etudiant/service/etudiant-service';
export interface Projet {
  id?: number;
  titre: string;
  description: string;
  utilisateur?: any;
  niveau?: string;
  statut?:string;
  encadrant?:Encadrant;
  soutenance?:any;
  etudiant?: Etudiant;
  date_soumission?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  apiUrl = "http://127.0.0.1:8000/projets";
  apiUrl1 = "http://127.0.0.1:8000/encadrant";

  constructor(private readonly http: HttpClient) { }

  // création d'un projet
  create(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiUrl}/ajouter-projet/`, projet);
  }
  // récupérer tous les projets pour l'admin
  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}`);
  }
  // récupérer tous les projets terminer
  projetsValider() {
    return this.http.get<Projet[]>(`${this.apiUrl}/projet-valider/`);
  }
  projetsEncadrer() {
    return this.http.get<any>(`${this.apiUrl1}/projets-encadrer/`);
  }
  // récupérer des projets disponible pour l'etudiant
  getProjetDispo(): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.apiUrl}/disponibles/`);
  }
  // récupérer un projet(id)
  getById(id: number | undefined): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/projet/?projet_id=${id}`);
  }
  // mettre à jour un projet
  update(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/projets/${id}/`, projet);
  }
}
