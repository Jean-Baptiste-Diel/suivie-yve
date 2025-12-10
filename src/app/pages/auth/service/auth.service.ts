// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://127.0.0.1:8000/utilisateurs';

  private readonly currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private readonly http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /** Connexion utilisateur */
  connexion(email: string, password: string) {
    const data = { email, password };

    return this.http.post<any>(`${this.apiUrl}/connexion/`, data).pipe(
      map(response => {
        if (response.access_token) {

          // 🔐 Sauvegarde du token
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          // 👤 Sauvegarde de l'utilisateur
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);

          // ⭐ Sauvegarde de l'ID utilisateur depuis le JWT
          const payload = this.decodeToken(response.access_token);
          localStorage.setItem('userId', payload.user_id); // <– CETTE LIGNE EST LA CLÉ
        }
        return response;
      })
    );
  }

  /** Récupérer le token JWT */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  /** Décoder le token pour lire ses infos */
  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (e) {
      console.error('Erreur décodage JWT', e);
      return null;
    }
  }
  /** Récupérer le rôle depuis le token */
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.role || null;
    }
    return null;
  }
  /** Récupérer l’ID utilisateur */
  getUtilisateurId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.user_id || null;
    }
    return null;
  }
  /** Récupère le nom de l'utilisateur connecté */
  getNom(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.nom || null;
    }
    return null;
  }
  /** Récupère le prénom de l'utilisateur connecté */
  getPrenom(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.prenom || null;
    }
    return null;
  }
  /** Déconnexion */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  /** Vérifie si un utilisateur est connecté */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
