import { Routes } from '@angular/router';

export const ALL_UNITS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./all-units-page').then(
        (c) => c.AllUnitsPage
      ),
  },
];
