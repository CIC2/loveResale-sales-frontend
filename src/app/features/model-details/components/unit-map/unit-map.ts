import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ImageFallbackDirective } from 'shared/directives';

@Component({
  selector: 'app-unit-map',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent, ImageFallbackDirective],
  templateUrl: './unit-map.html',
  styleUrl: './unit-map.scss',
})
export class UnitMap {
  mapImageUrl = signal('/images/map-view.jpg');

  onViewVideo(): void {
    console.log('View video clicked');
  }

  onViewInteractiveMap(): void {
    console.log('View interactive map clicked');
  }
}
