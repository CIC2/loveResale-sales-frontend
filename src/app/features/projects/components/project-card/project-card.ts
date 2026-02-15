import { Component, input, output } from '@angular/core';

interface Project {
  id: number;
  name: string;
  subtitle: string;
  location: string;
  imageUrl: string;
  description: string;
  shortDescription: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  project = input.required<Project>();
  projectClick = output<Project>();

  onClick(): void {
    this.projectClick.emit(this.project());
  }
}
