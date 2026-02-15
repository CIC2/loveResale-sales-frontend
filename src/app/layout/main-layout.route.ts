import { Routes } from '@angular/router';
import { authGuard } from 'core/guards';
import { ModelResolver } from 'core/api/model-details/resolver/model-resolver';

export const CUSTOMER_LAYOUT: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('features/home/home').then((c) => c.Home),
  },
  
 
  {
    path: 'all-units',
    loadChildren: () =>
      import('features/all-units/all-units.route').then((m) => m.ALL_UNITS_ROUTES),
  },
  {
    path: 'model/:id',
    loadComponent: () =>
      import('features/model-details/model-details').then(
        (c) => c.ModelDetails
      ),
    resolve: {
      model: ModelResolver,
    },
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('features/profile/profile').then((c) => c.Profile),
    
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('features/projects/projects.route').then(
        (m) => m.PROJECTS_ROUTES
      ),
  },
  {
    path: 'project-details/:id',
    loadChildren: () =>
      import('features/project-details/project-details.route').then(
        (m) => m.PROJECT_DETAILS
      ),
  },
 
 
  {
    path: 'payment',
    loadComponent: () =>
      import('features/payment/payment').then((c) => c.Payment),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('features/inventory/inventory.route').then((m) => m.INVENTORY_ROUTES),
  },
  {
    path: 'add-lead',
    loadChildren: () =>
      import('features/add-lead/add-lead.route').then((m) => m.ADD_LEAD_ROUTES),
  },
  {
    path: '404',
    loadComponent: () =>
      import('shared/components').then((c) => c.NotFoundComponent),
  },
];
