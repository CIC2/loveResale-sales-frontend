import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsHero } from './components/projects-hero/projects-hero';
import { ProjectCard } from './components/project-card/project-card';

export interface Project {
  id: number;
  name: string;
  subtitle: string;
  location: string;
  imageUrl: string;
  description: string;
  shortDescription: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsHero, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private router = inject(Router);

  loading = signal(true);
  
  projects = signal<Project[]>([
    {
      id: 1,
      name: 'SouthMED',
      subtitle: 'The Real Mediterranean',
      location: 'North Coast',
      imageUrl: '/images/southMed.webp',
      description: 'An internationally designed fully integrated development spanning over an area of 23 million square meters of land. Nestled in a very prime location on the Southern Mediterranean at the opulent Egyptian North Coast shoreline, SouthMED is perfectly situated at Kilo 165 on the Alexandria-Matrouh Road, offering easy accessibility. In addition to enjoying global proximity by flight distance of 2-5 hours from European and Gulf countries.',
      shortDescription: 'The Al Alamein International Airport is just an 18-minute drive away, ensuring seamless travel connections for residents and visitors alike.',
    },
    {
      id: 2,
      name: 'Eden, Al Rehab City',
      subtitle: 'A Green Haven of Serviced Luxury',
      location: 'New Cairo',
      imageUrl: '/images/noor-image.jpg',
      description: 'Discover the ultra-modern lifestyle in EDEN exclusive apartments and immerse yourself in worlds of royal pampering where hotel comfort meets home-style living and enjoy the ultimate integration with EDEN being strategically located in the heart of Al Rehab City, just north and south of Al Rehab Sporting Club.',
      shortDescription: 'Discover the ultra-modern lifestyle in EDEN exclusive apartments and immerse yourself in worlds of royal pampering where hotel comfort meets home-style living.',
    },
    {
      id: 3,
      name: 'Noor Smart City',
      subtitle: 'First Integrated Smart City',
      location: 'New Cairo',
      imageUrl: '/images/noor-image.jpg',
      description: 'Noor Smart City stands as a remarkable embodiment of modernity and sustainability in urban living. With its prime location near the New Administrative Capital and expansive area of 5,000 Feddans in East Cairo, Noor sets the stage for advanced smart technologies and eco-friendly practices.',
      shortDescription: 'Noor Smart City stands as a remarkable embodiment of modernity and sustainability in urban living.',
    },
    {
      id: 4,
      name: 'Madinaty - New Cairo',
      subtitle: 'A city with an international standards in egypt',
      location: 'New Cairo',
      imageUrl: '/images/madinaty-image.jpg',
      description: 'Madinaty\'s well-designed and detailed master plan was the result of a collaborative effort between three top U.S. design firms HHCP, SWA, and SASAKI. The outcome has been an international standards modern city spanning over an area of 8000 Feddans, providing a contemporary lifestyle for 700k inhabitants.',
      shortDescription: 'Madinaty\'s well-designed and detailed master plan was the result of a collaborative effort between three top U.S. design firms.',
    },
    {
      id: 5,
      name: 'Privado, Madinaty - New Cairo',
      subtitle: 'Discover the world within',
      location: 'New Cairo',
      imageUrl: '/images/madinaty-image.jpg',
      description: 'Privado is the exclusive community of Madinaty, developed over 276 feddans, providing its residents with integrated luxury and ultimate-privacy homes, with distinctive architectural features flourished with beautiful landscapes and serenity lake views.',
      shortDescription: 'Privado is the exclusive community of Madinaty, developed over 276 feddans, providing its residents with integrated luxury and ultimate-privacy homes.',
    },
    {
      id: 6,
      name: 'Celia - New Capital',
      subtitle: 'The heart of the new capital',
      location: 'New Capital',
      imageUrl: '/images/south-image.png',
      description: 'Spanning over 500 feddans in one of the New Capital\'s most desirable locations Celia is located. It is the sole residential compound located in the heart of the Green River, with amazing designs created by the one-of-a-kind American design firm HHCP, making it the area\'s greatest integrated project to date.',
      shortDescription: 'Spanning over 500 feddans in one of the New Capital\'s most desirable locations Celia is located.',
    },
  ]);

  ngOnInit(): void {
    // TODO: Load projects from API
    this.loading.set(false);
  }

  onProjectClick(project: Project): void {
    this.router.navigate(['/project-details', project.id]);
  }
}
