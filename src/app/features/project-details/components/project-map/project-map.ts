import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-project-map',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './project-map.html',
  styleUrl: './project-map.scss',
})
export class ProjectMap {
  mapImageUrl = '/images/map-view.jpg';
}
