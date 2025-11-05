import { Routes } from '@angular/router';

import { ListMessagerieComponent } from './entities/messagerie/list/list';
import { DetailMessagerieComponent } from './entities/messagerie/detail/detailMessagerie';



export const routes: Routes = [





  // Dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
 { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
 { path: 'dashboard-student', loadComponent: () => import('./dashboard/roles/student-dashboard/student-dashboard').then(m => m.StudentDashboardComponent) },
 { path: 'dashboard-jury', loadComponent: () => import('./dashboard/roles/jury-dashboard/jury-dashboard').then(m => m.JuryDashboardComponent) },
 { path: 'dashboard-supervisor', loadComponent: () => import('./dashboard/roles/supervisor-dashboard/supervisor-dashboard').then(m => m.SupervisorDashboardComponent) },
 { path: 'dashboard-admin', loadComponent: () => import('./dashboard/roles/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent) },

  // CRUD utilisateur
  { path: 'utilisateur', loadComponent: () => import('./entities/utilisateur/utilisateur').then(m => m.Utilisateur) },
  // CRUD Étudiants
  { path: 'etudiants', loadComponent: () => import('./entities/etudiant/list/list').then(m => m.List) },
  { path: 'etudiants/create', loadComponent: () => import('./entities/etudiant/create/create').then(m => m.Create) },
  { path: 'etudiants/edit/:id', loadComponent: () => import('./entities/etudiant/edit/edit').then(m => m.Edit) },
  { path: 'etudiants/detail/:id', loadComponent: () => import('./entities/etudiant/detail/detail').then(m => m.Detail) },

  // CRUD Encadrants
  { path: 'encadrants', loadComponent: () => import('./entities/encadrant/list/list').then(m => m.List) },
  { path: 'encadrants/create', loadComponent: () => import('./entities/encadrant/create/create').then(m => m.Create) },
  { path: 'encadrants/edit/:id', loadComponent: () => import('./entities/encadrant/edit/edit').then(m => m.Edit) },
  { path: 'encadrants/detail/:id', loadComponent: () => import('./entities/encadrant/detail/detail').then(m => m.Detail) },

  // CRUD Administrateurs
  { path: 'administrateurs', loadComponent: () => import('./entities/administrateur/list/list').then(m => m.List) },
  { path: 'administrateurs/create', loadComponent: () => import('./entities/administrateur/create/create').then(m => m.Create) },
  { path: 'administrateurs/edit/:id', loadComponent: () => import('./entities/administrateur/edit/edit').then(m => m.Edit) },
  { path: 'administrateurs/detail/:id', loadComponent: () => import('./entities/administrateur/detail/detail').then(m => m.Detail) },

  // CRUD Projets
  { path: 'projets', loadComponent: () => import('./entities/projet/list/list').then(m => m.List) },
  { path: 'projets/create', loadComponent: () => import('./entities/projet/create/createProjet').then(m => m.CreateProjet) },
  { path: 'projets/edit/:id', loadComponent: () => import('./entities/projet/edit/edit').then(m => m.Edit) },
  { path: 'projets/detail/:id', loadComponent: () => import('./entities/projet/detail/detail').then(m => m.Detail) },

  // CRUD Livrables
  { path: 'livrables', loadComponent: () => import('./entities/livrable/list/list').then(m => m.List) },
  { path: 'livrables/create', loadComponent: () => import('./entities/livrable/create/create').then(m => m.Create) },
  { path: 'livrables/edit/:id', loadComponent: () => import('./entities/livrable/edit/edit').then(m => m.Edit) },
  { path: 'livrables/detail/:id', loadComponent: () => import('./entities/livrable/detail/detail').then(m => m.Detail) },

  // CRUD Soutenances
  { path: 'soutenances', loadComponent: () => import('./entities/soutenance/list/list').then(m => m.List) },
  { path: 'soutenances/create', loadComponent: () => import('./entities/soutenance/create/create').then(m => m.Create) },
  { path: 'soutenances/edit/:id', loadComponent: () => import('./entities/soutenance/edit/edit').then(m => m.Edit) },
  { path: 'soutenances/detail/:id', loadComponent: () => import('./entities/soutenance/detail/detail').then(m => m.Detail) },

  // CRUD Jurys
  { path: 'jurys', loadComponent: () => import('./entities/jury/list/listJury').then(m => m.ListJury) },
  { path: 'jurys/create', loadComponent: () => import('./entities/jury/create/create').then(m => m.Create) },
  { path: 'jurys/edit/:id', loadComponent: () => import('./entities/jury/edit/edit').then(m => m.Edit) },
  { path: 'jurys/detail/:id', loadComponent: () => import('./entities/jury/detail/detail').then(m => m.Detail) },

  // CRUD Messagerie

  { path: 'messageries/create', loadComponent: () => import('./entities/messagerie/create/createMesssagerie').then(m => m.CreateMesssagerie) },
  { path: 'messageries/edit/:id', loadComponent: () => import('./entities/messagerie/edit/edit').then(m => m.Edit) },


  { path: 'messageries/list', component: ListMessagerieComponent },
  { path: 'messageries/detail/:id', component: DetailMessagerieComponent },
];
[

  // CRUD Commentaires
  { path: 'commentaires', loadComponent: () => import('./entities/commentaire/list/listCommentaire').then(m => m.ListCommentaire) },
  { path: 'commentaires/create', loadComponent: () => import('./entities/commentaire/create/create').then(m => m.Create) },
  { path: 'commentaires/edit/:id', loadComponent: () => import('./entities/commentaire/edit/edit').then(m => m.Edit) },
  { path: 'commentaires/detail/:id', loadComponent: () => import('./entities/commentaire/detail/detail').then(m => m.Detail) },

  // Fallback
  { path: '**', redirectTo: 'dashboard' }

];
