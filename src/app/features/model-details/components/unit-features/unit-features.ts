import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { UnitFeature } from '../../model-details';

@Component({
  selector: 'app-unit-features',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent],
  templateUrl: './unit-features.html',
  styleUrl: './unit-features.scss',
})
export class UnitFeatures {
  features = input<UnitFeature[]>([]);
}
