import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

interface Project {
  id: string;
  title: string;
  image: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  status: string;
  price: string;
}

@Component({
  selector: 'app-projects-listing',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, ButtonModule],
  templateUrl: './projects-listing.html',
  styleUrls: ['./projects-listing.scss'],
})
export class ProjectsListing {
  projects: Project[] = [
    {
      id: '1',
      title: 'New Cairo - New Heliopolis City',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      bedrooms: '2-4',
      bathrooms: '2-4',
      area: '60-265',
      status: 'readyToMove',
      price: '24,000,000',
    },
    {
      id: '2',
      title: 'New Cairo - New Heliopolis City',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      bedrooms: '2-4',
      bathrooms: '2-4',
      area: '60-265',
      status: 'readyToMove',
      price: '24,000,000',
    },
    {
      id: '3',
      title: 'New Cairo - New Heliopolis City',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      bedrooms: '2-4',
      bathrooms: '2-4',
      area: '60-265',
      status: 'readyToMove',
      price: '24,000,000',
    },
  ];

  viewProjectDetails(projectId: string): void {
    console.log('View project:', projectId);
  }
}
