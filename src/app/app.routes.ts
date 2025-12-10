import { Routes } from '@angular/router';
import {ListeProjetDispoComponent} from './entities/etudiant/liste-projet-dispo/liste-projet-dispo-component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/auth/auth-component').then(m => m.AuthComponent) },
  { path: 'dashboard-student', loadComponent: () => import('./pages/user/student-dashboard/student-dashboard').then(m => m.StudentDashboardComponent) },
  { path: 'dashboard-student:id', component: ListeProjetDispoComponent },
  { path: 'dashboard-supervisor', loadComponent: () => import('./pages/user/supervisor-dashboard/supervisor-dashboard').then(m => m.SupervisorDashboardComponent) },
  { path: 'dashboard-admin', loadComponent: () => import('./pages/user/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent) },
  { path: '**', redirectTo: 'dashboard' }
];

  /*
  { path: 'dashboard-jury', loadComponent: () => import('./dashboard/user/jury-dashboard/jury-dashboard').then(m => m.JuryDashboardComponent) },

  // CRUD utilisateur
  { path: 'utilisateur-connecter', loadComponent: () => import('./entities/utilisateur/utilisateur-component').then(m => m.UtilisateurComponent) },
  { path: 'utilisateurs', loadComponent: () => import('./entities/utilisateur/list-utilisateur/list-utilisateur').then(m => m.ListUtilisateur) },
  // CRUD Étudiants
  { path: 'etudiants', loadComponent: () => import('./entities/etudiant/list/liste-etudiant-component').then(m => m.ListeEtudiantComponent) },
  { path: 'etudiants/create', loadComponent: () => import('./entities/etudiant/create/create').then(m => m.CreateProjetComponent) },
  { path: 'etudiants/edit/:id', loadComponent: () => import('./entities/etudiant/edit/edit').then(m => m.EditProjet) },
  { path: 'etudiants/detail/:id', loadComponent: () => import('./entities/etudiant/detail/detail').then(m => m.Detail) },

  // CRUD Encadrants
  { path: 'encadrants', loadComponent: () => import('./entities/encadrant/list/list').then(m => m.ListeMessage) },
  { path: 'encadrants/create', loadComponent: () => import('./entities/encadrant/create/create').then(m => m.CreateProjetComponent) },
  { path: 'encadrants/edit/:id', loadComponent: () => import('./entities/encadrant/edit/edit').then(m => m.EditProjet) },
  { path: 'encadrants/detail/:id', loadComponent: () => import('./entities/encadrant/detail/detail').then(m => m.Detail) },

  // CRUD Administrateurs
  { path: 'administrateurs', loadComponent: () => import('./entities/administrateur/list/list').then(m => m.ListeMessage) },
  { path: 'administrateurs/create', loadComponent: () => import('./entities/administrateur/create/create').then(m => m.CreateProjetComponent) },
  { path: 'administrateurs/edit/:id', loadComponent: () => import('./entities/administrateur/edit/edit').then(m => m.EditProjet) },
  { path: 'administrateurs/detail/:id', loadComponent: () => import('./entities/administrateur/detail/detail').then(m => m.Detail) },

  // CRUD Projets
  { path: 'projets', loadComponent: () => import('./entities/projet/liste-projet-dispo/liste-projet-dispo-component').then(m => m.ListeProjetDispoComponent) },
  { path: 'projets/create', loadComponent: () => import('./entities/projet/create/create-projet-component').then(m => m.CreateProjetComponent) },
  { path: 'projets/edit/:id', loadComponent: () => import('./entities/projet/edit/edit').then(m => m.EditProjet) },
  { path: 'projets/detail/:id', loadComponent: () => import('./entities/projet/detail/detail-projet-component').then(m => m.DetailProjetComponent) },

  // CRUD Livrables
  { path: 'livrables', loadComponent: () => import('./entities/livrable/list/liste-livrable-component').then(m => m.ListeLivrableComponent) },
  { path: 'livrables/create', loadComponent: () => import('./entities/livrable/create/create-livrable').then(m => m.CreateLivrable) },
  { path: 'livrables/edit/:id', loadComponent: () => import('./entities/livrable/edit/edit').then(m => m.EditProjet) },
  { path: 'livrables/detail/:id', loadComponent: () => import('./entities/livrable/detail/detail-livrable').then(m => m.DetailLivrable) },

  // CRUD Soutenances
  { path: 'soutenances', loadComponent: () => import('./entities/soutenance/list/list-soutenance-component').then(m => m.ListSoutenanceComponent) },
  { path: 'soutenances/create', loadComponent: () => import('./entities/soutenance/create/create-soutenance-component').then(m => m.CreateSoutenanceComponent) },
  { path: 'soutenances/edit/:id', loadComponent: () => import('./entities/soutenance/edit/edit').then(m => m.EditProjet) },
  { path: 'soutenances/detail/:id', loadComponent: () => import('./entities/soutenance/detail/detail').then(m => m.Detail) },

  // CRUD Jurys
  { path: 'jurys', loadComponent: () => import('./entities/jury/list/listJury').then(m => m.ListJury) },
  { path: 'jurys/create', loadComponent: () => import('./entities/jury/create/create').then(m => m.CreateProjetComponent) },
  { path: 'jurys/edit/:id', loadComponent: () => import('./entities/jury/edit/edit').then(m => m.EditProjet) },
  { path: 'jurys/detail/:id', loadComponent: () => import('./entities/jury/detail/detail').then(m => m.Detail) },

  // CRUD Messagerie

  { path: 'messageries/create', loadComponent: () => import('./entities/messagerie/create/createMesssagerie').then(m => m.CreateMesssagerie) },
  { path: 'messageries/edit/:id', loadComponent: () => import('./entities/messagerie/edit/edit').then(m => m.EditProjet) },


  { path: 'messageries/liste-projet-dispo', component: ListMessagerieComponent },
  { path: 'messageries/detail/:id', component: DetailMessagerieComponent },
];
[
  // CRUD Commentaires
  { path: 'commentaires', loadComponent: () => import('./entities/commentaire/list/listCommentaire').then(m => m.ListCommentaire) },
  { path: 'commentaires/create', loadComponent: () => import('./entities/commentaire/create/create').then(m => m.CreateProjetComponent) },
  { path: 'commentaires/edit/:id', loadComponent: () => import('./entities/commentaire/edit/edit').then(m => m.EditProjet) },
  { path: 'commentaires/detail/:id', loadComponent: () => import('./entities/commentaire/detail/detail').then(m => m.Detail) },
*/
  // Fallback



