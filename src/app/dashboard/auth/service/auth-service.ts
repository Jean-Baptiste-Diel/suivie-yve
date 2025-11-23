import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // Exemple de méthode
  getStudentDashboardData() {
    // Appel à ton backend Django ici
  }

  getSupervisorDashboardData() {
    // Appel à ton backend Django ici
  }

  getAdminDashboardData() {
    // Appel à ton backend Django ici
  }
}

