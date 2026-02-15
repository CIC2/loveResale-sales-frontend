import { Component, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';

type PaymentMethod = 'card' | 'bank';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent],
  templateUrl: './payment-methods.html',
  styleUrls: ['./payment-methods.scss'],
})
export class PaymentMethods {
  selectedMethod = signal<PaymentMethod | null>(null);
  methodSelected = output<PaymentMethod>();

  selectMethod(method: PaymentMethod): void {
    this.selectedMethod.set(method);
    this.methodSelected.emit(method);
  }
}
