import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-mobile-app-promo',
  imports: [TranslocoPipe],
  templateUrl: './mobile-app-promo.html',
  styleUrl: './mobile-app-promo.scss',
})
export class MobileAppPromo {}
