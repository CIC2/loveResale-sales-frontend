import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ImageFallbackDirective } from 'shared/directives';

export interface UnitCardData {
  id: number;
  imageUrl: string;
  location: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  view: string;
  area: number;
  garage: boolean;
  readyToMove: boolean;
  totalPrice: number;
  paidAmount: number;
  offerAmount: number;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-unit-card',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent, ImageFallbackDirective],
  templateUrl: './unit-card.html',
  styleUrl: './unit-card.scss',
})
export class UnitCard {
  unit = input.required<UnitCardData>();

  favoriteClick = output<number>();
  cardClick = output<number>();

  onFavoriteClick(event: MouseEvent) {
    event.stopPropagation();
    this.favoriteClick.emit(this.unit().id);
  }

  onCardClick() {
    this.cardClick.emit(this.unit().id);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US').format(price);
  }
}
