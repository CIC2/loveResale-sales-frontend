import { Routes } from '@angular/router';

export const PROJECT_DETAILS: Routes = [
  {
    path: '',
    loadComponent: () => import('./project-details').then((c) => c.ProjectDetails),
  },
];
