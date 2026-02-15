import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';

interface AboutProjectInfo {
  icon: string;
  title: string;
  value: string;
}

@Component({
  selector: 'app-about-project-sidebar',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent],
  templateUrl: './about-project-sidebar.html',
  styleUrl: './about-project-sidebar.scss',
})
export class AboutProjectSidebar {
  infoItems = input.required<AboutProjectInfo[]>();
}
