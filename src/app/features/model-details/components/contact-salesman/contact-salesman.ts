import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

export interface FormOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-contact-salesman',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './contact-salesman.html',
  styleUrl: './contact-salesman.scss',
})
export class ContactSalesman implements OnInit {
  private fb = inject(FormBuilder);

  contactClick = output<void>();
  bookClick = output<void>();
  viewInstallmentPlan = output<void>();
  reserveUnit = output<void>();

  customerCount = signal(0);

  reserveForm = this.fb.group({
    payment: ['5 Years', Validators.required],
    finishing: ['Luxury', Validators.required],
    maintenance: ['5 Years', Validators.required],
    roiDiscount: ['5000', Validators.required],
  });

  paymentOptions = signal<FormOption[]>([
    { label: '5 Years', value: '5 Years' },
    { label: '10 Years', value: '10 Years' },
    { label: '15 Years', value: '15 Years' },
  ]);

  finishingOptions = signal<FormOption[]>([
    { label: 'Luxury', value: 'Luxury' },
    { label: 'Super', value: 'Super' },
    { label: 'Semi-Finished', value: 'Semi-Finished' },
  ]);

  maintenanceOptions = signal<FormOption[]>([
    { label: '5 Years', value: '5 Years' },
    { label: '10 Years', value: '10 Years' },
    { label: '15 Years', value: '15 Years' },
  ]);

  reservationAmount = signal('2,000,000 EGP');
  deliveryPeriod = signal('5 Years');
  totalPrice = signal('14,000,000 EGP');

  ngOnInit(): void {
    // Initialize component
  }

  onViewInstallmentPlan(): void {
    this.viewInstallmentPlan.emit();
  }

  onReserveUnit(): void {
    if (this.reserveForm.valid) {
      this.reserveUnit.emit();
    } else {
      this.reserveForm.markAllAsTouched();
    }
  }
}
