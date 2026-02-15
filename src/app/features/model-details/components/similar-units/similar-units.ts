import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { SvgIconComponent } from 'angular-svg-icon';
import { DecimalPipe } from '@angular/common';
import { ImageFallbackDirective } from 'shared/directives';

export interface SimilarUnit {
  id: number;
  imageUrl: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  readyToMove: boolean;
  price: number;
}

@Component({
  selector: 'app-similar-units',
  standalone: true,
  imports: [
    TranslocoPipe,
    ButtonModule,
    SvgIconComponent,
    DecimalPipe,
    ImageFallbackDirective,
  ],
  templateUrl: './similar-units.html',
  styleUrl: './similar-units.scss',
})
export class SimilarUnits {
  units = input<SimilarUnit[]>([]);

  viewAllClick = output<void>();
  unitClick = output<number>();

  onViewAll(): void {
    this.viewAllClick.emit();
  }

  onUnitClick(unitId: number): void {
    this.unitClick.emit(unitId);
  }
}
