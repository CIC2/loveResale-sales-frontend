import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-projects-hero',
  standalone: true,
  imports: [TranslocoPipe, BreadcrumbModule],
  templateUrl: './projects-hero.html',
  styleUrl: './projects-hero.scss',
})
export class ProjectsHero {
  heroImageUrl = signal('/images/project-image.jpg');
  
  breadcrumbItems: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
  ];

  breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/home' };
}
