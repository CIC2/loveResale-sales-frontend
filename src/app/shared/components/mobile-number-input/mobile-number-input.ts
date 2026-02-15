import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as Phone from 'google-libphonenumber';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { startWith, tap } from 'rxjs';
import { ValidationError } from '../error/validation-error';
import { allCountries, TCountry } from './mobile-number-data';

@Component({
  selector: 'mobile-number-input',
  imports: [
    Select,
    ReactiveFormsModule,
    InputNumber,
    FormsModule,
    ValidationError,
  ],
  templateUrl: './mobile-number-input.html',
  styleUrls: ['./mobile-number-input.scss'],
})
export class MobileNumberInput implements OnInit {
  private http = inject(HttpClient);
  private parentForm = inject(FormGroupDirective);

  mobileForm = new FormGroup({
    phoneNumber: new FormControl(null, [
      Validators.required,
      this.phoneNumberValidator.bind(this),
    ]),
    code: new FormControl<TCountry>(
      {
        name: 'Egypt (‫مصر‬‎)',
        iso2: 'eg',
        dialCode: '+20',
        priority: 0,
      },
      {
        nonNullable: true,
      }
    ),
  });
  selectedCountry = signal<any>(null);

  phoneNumber = signal<string>('');
  loadingCountry = signal(false);
  isWrongNumber = signal(false);

  PhoneUtil = Phone.PhoneNumberUtil.getInstance();
  allCountries = allCountries;

  ngOnInit() {
    if (!this.parentForm.form.contains('mobileForm')) {
      this.parentForm.form.addControl('mobileForm', this.mobileForm);
    } else {
      this.mobileForm = this.parentForm.form.get('mobileForm') as FormGroup;
    }
  }

  selectedCountryChange = toSignal(
    this.mobileForm.controls['code'].valueChanges.pipe(
      startWith(this.mobileForm.controls['code'].value),
      tap((code: TCountry) => {
        this.mobileForm.controls['phoneNumber'].reset();
        this.selectedCountry.set(code);
      })
    )
  );

  placeholder = computed(() => {
    const country = this.selectedCountry();
    if (!country) return 'Enter your number';
    try {
      const exampleNumber = this.PhoneUtil.getExampleNumberForType(
        country.iso2.toUpperCase(),
        Phone.PhoneNumberType.MOBILE
      );
      if (exampleNumber) {
        return this.PhoneUtil.format(
          exampleNumber,
          Phone.PhoneNumberFormat.NATIONAL
        );
      }
    } catch {
      return 'Enter your number';
    }
    return 'Enter your number';
  });

  phoneNumberValidator(control: AbstractControl) {
    const country = this.selectedCountry?.();
    if (!country) return null;

    try {
      const rawValue = String(control.value).replace(/\s+/g, '');

      const normalized = rawValue.startsWith('0')
        ? rawValue.slice(1)
        : rawValue;

      const prefix = normalized.slice(0, 2);

      if (
        country.iso2 === 'eg' &&
        prefix === '15' &&
        normalized.length !== 10
      ) {
        this.isWrongNumber.set(true);
        return { wrongNumber: true };
      }

      const valueWithDialCode = normalized.startsWith(
        country.dialCode.replace('+', '')
      )
        ? `+${normalized}`
        : country.dialCode + normalized;

      const numberObj = this.PhoneUtil.parseAndKeepRawInput(
        valueWithDialCode,
        country.iso2.toUpperCase()
      );

      const isValid = this.PhoneUtil.isValidNumberForRegion(
        numberObj,
        country.iso2.toUpperCase()
      );

      this.isWrongNumber.set(!isValid);
      return isValid ? null : { wrongNumber: true };
    } catch {
      this.isWrongNumber.set(true);
      return { wrongNumber: true };
    }
  }
}
