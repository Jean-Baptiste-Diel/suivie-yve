// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const infoUtilisateur = localStorage.getItem('currentUser');
    let parsedUser = null;
    if (infoUtilisateur && infoUtilisateur !== 'undefined') {
      try {
        parsedUser = JSON.parse(infoUtilisateur);
      } catch (e) {
        console.error('Erreur de parsing JSON', e);
        parsedUser = null;
      }
    }

    this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  connexion(identifiant: string, motdepasse: string) {
    const donnee = { email: identifiant, password: motdepasse };
    return this.http.post<any>(`${this.apiUrl}/login/`, donnee).pipe(
      map(response => {
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('role', response.user.role);
          this.currentUserSubject.next(response.user);
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }

  // Accès direct à l’utilisateur connecté
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // <-- Méthode requise : retourne le rôle
  public getUserRole(): string | null {
    const u = this.currentUserValue;
    return u && u.role ? u.role : null;
  }
}
