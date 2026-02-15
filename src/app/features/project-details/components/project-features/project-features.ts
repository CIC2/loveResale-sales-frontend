import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';

interface ProjectFeature {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-project-features',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent],
  templateUrl: './project-features.html',
  styleUrl: './project-features.scss',
})
export class ProjectFeatures {
  features = input.required<ProjectFeature[]>();
}
