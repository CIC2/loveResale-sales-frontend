import { Routes } from '@angular/router';
import { CUSTOMER_LAYOUT } from 'layout/main-layout.route';
import { MainLayout } from './layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: CUSTOMER_LAYOUT,

    // loadChildren: () => import('./features/main-layout/main-layout.route'),
  },

];
