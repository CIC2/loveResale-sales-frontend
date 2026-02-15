import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { SvgIconComponent } from 'angular-svg-icon';

export interface PaymentSummaryData {
  unitPrice: number;
  amountPaid: number;
  remainingTime: number;
  paymentDate: string;
  paymentAmount: number;
  currency: string;
}

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule, SvgIconComponent],
  templateUrl: './payment-summary.html',
  styleUrls: ['./payment-summary.scss'],
})
export class PaymentSummary {
  data = input.required<PaymentSummaryData>();

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
