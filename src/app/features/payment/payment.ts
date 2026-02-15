import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  PaymentSummary,
  PaymentMethods,
  PaymentPreview,
} from './components';
import { PaymentSummaryData } from './components/payment-summary/payment-summary';
import { UnitPreviewData } from './components/payment-preview/payment-preview';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    TranslocoPipe,
    PaymentSummary,
    PaymentMethods,
    PaymentPreview,
    
  ],
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss'],
})
export class Payment {
  // Mock data for demonstration
  paymentSummaryData = signal<PaymentSummaryData>({
    unitPrice: 4000000,
    amountPaid: 2000000,
    remainingTime: 2000000,
    paymentDate: '22 September, 2025',
    paymentAmount: 2000000,
    currency: 'EGP',
  });

  unitPreviewData = signal<UnitPreviewData>({
    imageUrl: '/images/payment-image.jpg',
    location: 'New Heliopolis City',
    title: 'Standalone Villa - New Cairo',
    type: 'Apartment',
    floor: '1st',
    bed: 'Garden View',
    bedrooms: 4,
    bathrooms: 4,
    finishing: 'Super',
    delivery: 'Delivered',
    area: 132,
    group: '24',
    unitNumber: '24',
    garage: 'Included',
  });

  selectedPaymentMethod = signal<'card' | 'bank' | null>(null);

  onPaymentMethodSelected(method: 'card' | 'bank'): void {
    this.selectedPaymentMethod.set(method);
    console.log('Payment method selected:', method);
  }
}
