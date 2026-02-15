import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { DecimalPipe } from '@angular/common';
import { PaymentInfo } from '../../model-details';

@Component({
  selector: 'app-payment-plan',
  standalone: true,
  imports: [TranslocoPipe, DecimalPipe],
  templateUrl: './payment-plan.html',
  styleUrl: './payment-plan.scss',
})
export class PaymentPlan {
  paymentInfo = input<PaymentInfo>({
    totalPrice: 0,
    downPayment: 0,
    currency: 'EGP',
  });
}
