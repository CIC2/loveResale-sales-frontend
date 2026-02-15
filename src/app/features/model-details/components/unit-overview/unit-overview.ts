import { Component, input, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-unit-overview',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './unit-overview.html',
  styleUrl: './unit-overview.scss',
})
export class UnitOverview {
  description = input<string>('');
  
  isExpanded = signal(false);

  get displayText(): string {
    const text = this.description();
    if (this.isExpanded() || text.length <= 200) {
      return text;
    }
    return text.substring(0, 200) + '...';
  }

  get showExpandButton(): boolean {
    return this.description().length > 200;
  }

  toggleExpand(): void {
    this.isExpanded.update((v) => !v);
  }
}
