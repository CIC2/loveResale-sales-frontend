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
  selector: 'app-add-lead-form',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './add-lead-form.html',
  styleUrl: './add-lead-form.scss',
})
export class AddLeadForm implements OnInit {
  private fb = inject(FormBuilder);

  cancel = output<void>();
  submit = output<Record<string, unknown>>();

  form = this.fb.group({
    name: ['Nouran Khaled Abdelwahab', Validators.required],
    mobileNumber: ['01207981817', Validators.required],
    gender: ['female', Validators.required],
    project: ['20m', Validators.required],
    email: ['Nouran.Khaled@cic.ae', [Validators.required, Validators.email]],
    interest: ['commercial', Validators.required],
    budget: ['20M', Validators.required],
  });

  genderOptions = signal<FormOption[]>([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  projectOptions = signal<FormOption[]>([
    { label: '20M', value: '20m' },
    { label: 'New Kairo', value: 'new-kairo' },
    { label: 'Madinaty', value: 'madinaty' },
    { label: 'Sodic East', value: 'sodic-east' },
  ]);

  interestOptions = signal<FormOption[]>([
    { label: 'Commercial', value: 'commercial' },
    { label: 'Residential', value: 'residential' },
    { label: 'Investment', value: 'investment' },
  ]);

  ngOnInit(): void {
    // Initialize form
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
