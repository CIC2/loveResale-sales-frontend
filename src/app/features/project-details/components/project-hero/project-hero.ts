import { Component, input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-project-hero',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './project-hero.html',
  styleUrl: './project-hero.scss',
})
export class ProjectHero {
  projectName = input.required<string>();
  imageUrl = input.required<string>();

  breadcrumbItems: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Projects', routerLink: '/all-units' },
  ];

  breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/home' };
}
