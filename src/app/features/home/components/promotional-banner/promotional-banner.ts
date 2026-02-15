import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-promotional-banner',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './promotional-banner.html',
  styleUrls: ['./promotional-banner.scss'],
})
export class PromotionalBanner {}
