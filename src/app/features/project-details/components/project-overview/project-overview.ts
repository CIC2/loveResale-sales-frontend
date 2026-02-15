import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './project-overview.html',
  styleUrl: './project-overview.scss',
})
export class ProjectOverview {
  description = input.required<string>();
  learnMoreClick = output<void>();

  onLearnMore(): void {
    this.learnMoreClick.emit();
  }
}
