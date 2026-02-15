import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { TooltipModule } from 'primeng/tooltip';
import { Model } from 'shared/api/search/models';
import { ComparisonService } from 'shared/api/search/services/comparison';
import { ImageFallbackDirective } from 'shared/directives';

@Component({
  selector: 'app-model-info-card',
  imports: [
    TranslocoPipe,
    SvgIconComponent,
    ImageFallbackDirective,
    TooltipModule,
  ],
  templateUrl: './model-info-card.html',
  styleUrl: './model-info-card.scss',
})
export class ModelInfoCard {
  protected comparison = inject(ComparisonService);
  protected router = inject(Router);
  model = input.required<Model>();
  goToUnit(id: number) {
    this.router.navigate(['/model', id]);
  }

  onViewDetails(event: MouseEvent) {
    const isInComparison = this.comparison.isInComparison(this.model().id);
    if (isInComparison) {
      this.comparison.removeModel(this.model().id);
      if (this.comparison.count() === 0) {
        this.comparison.setIsOpened(false);
      }
    } else {
      this.comparison.addModel(this.model());
    }
    event.stopPropagation();
  }
}
