import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { MobileNumberInput, ValidationError } from 'shared/components';

@Component({
  selector: 'app-personal-info-form',
  imports: [
    InputText,
    MobileNumberInput,
    ValidationError,
    ReactiveFormsModule,
    ButtonModule,
    TranslocoPipe,
  ],
  templateUrl: './personal-info-form.html',
  styleUrl: './personal-info-form.scss',
})
export class PersonalInfoForm implements OnInit {
  private parentForm = inject(FormGroupDirective).control;
  onNextStep = output();

  protected personalForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(
        /^\s*[A-Za-z\u0600-\u06FF]+( [A-Za-z\u0600-\u06FF]+)+\s*$/
      ),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
    ]),
    mobile: new FormControl(''),
    address: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
  });

  ngOnInit(): void {
    if (!this.parentForm.contains('personalForm')) {
      this.parentForm.addControl('personalForm', this.personalForm);
    } else {
      this.personalForm = this.parentForm.get('personalForm') as FormGroup;
    }
  }

  nextStep() {
    const trimmedFullName = this.personalForm.get('fullName')?.value?.trim();
    const trimmedEmail = this.personalForm.get('email')?.value?.trim();
    const trimmedAddress = this.personalForm.get('address')?.value?.trim();

    this.personalForm.patchValue({
      fullName: trimmedFullName,
      email: trimmedEmail,
      address: trimmedAddress,
    });

    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.onNextStep.emit();
  }
}
