import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface UnitPreviewData {
  imageUrl: string;
  location: string;
  title: string;
  type: string;
  floor: string;
  bed: string;
  bedrooms: number;
  bathrooms: number;
  finishing: string;
  delivery: string;
  area: number;
  group: string;
  unitNumber: string;
  garage: string;
}

@Component({
  selector: 'app-payment-preview',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './payment-preview.html',
  styleUrls: ['./payment-preview.scss'],
})
export class PaymentPreview {
  unit = input.required<UnitPreviewData>();
}
