import { Routes } from '@angular/router';

export const ADD_LEAD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-lead').then((c) => c.AddLead),
  },
];
