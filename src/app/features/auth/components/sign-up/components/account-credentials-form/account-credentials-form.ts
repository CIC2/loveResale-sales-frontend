import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Nationalities } from 'core/constants/nationality.constant';
import { ConfirmPasswordValidator } from 'core/validators';
import {
  VerifyAccount,
  verifyAccountDialogConfig,
} from 'features/auth/components';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Password } from 'primeng/password';
import { Select } from 'primeng/select';
import { finalize, switchMap, tap } from 'rxjs';
import { ValidationError } from 'shared/components';
import { AuthApi } from '../../../../../../core/api/auth';
@Component({
  selector: 'app-account-credentials-form',
  imports: [
    ReactiveFormsModule,
    ValidationError,
    Select,
    Password,
    Checkbox,
    ButtonModule,
    TranslocoPipe,
  ],
  templateUrl: './account-credentials-form.html',
  styleUrl: './account-credentials-form.scss',
})
export class AccountCredentialsForm {
  private authApi = inject(AuthApi);
  protected loading = signal(false);
  checked = signal(false);
  protected shakeCheckbox = signal(false);
  protected translocoService = inject(TranslocoService);
  protected agree = new FormControl(false, Validators.required);
  protected dialogRef = inject(DynamicDialogRef);
  protected nationalities = Nationalities;
  private parentForm = inject(FormGroupDirective).control;
  private dialog = inject(DialogService);
  protected accountForm: FormGroup = new FormGroup(
    {
      nationality: new FormControl('EG', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[@$!%#?&])(?=\D*\d).{8,}/
        ),
      ]),
      repeatPassword: new FormControl('', Validators.required),
    },
    {
      validators: ConfirmPasswordValidator('password', 'repeatPassword'),
    }
  );

  ngOnInit(): void {
    if (!this.parentForm.contains('accountForm')) {
      this.parentForm.addControl('accountForm', this.accountForm);
    } else {
      this.accountForm = this.parentForm.get('accountForm') as FormGroup;
    }
  }

  signUp() {
    const invalidCheckbox = this.agree.value;
    if (this.accountForm.invalid || !invalidCheckbox) {
      this.accountForm.markAllAsTouched();
      this.agree.markAsTouched();
      if (!invalidCheckbox) {
        this.shakeCheckbox.set(true);
        setTimeout(() => this.shakeCheckbox.set(false), 500);
      }
      return;
    }
    this.loading.set(true);

    const mobileFormValue = this.parentForm.get(
      'personalForm.mobileForm'
    )!.value;

    const formValue = {
      ...this.parentForm.value.personalForm,
      ...this.accountForm.value,
      mobile: mobileFormValue.phoneNumber,
      countryCode: mobileFormValue.code.dialCode,
    };
    delete formValue['mobileForm'];
    this.authApi
      .signUp(formValue)
      .pipe(
        switchMap(() => {
          return this.authApi
            .sendOtp(formValue.countryCode, formValue.mobile)
            .pipe(
              tap((res) => {
                this.dialogRef.close();
                this.openVerify(
                  formValue.countryCode,
                  formValue.mobile,
                  res.message.split(':')[1].trim()
                );
              }),
              finalize(() => this.loading.set(false))
            );
        })
      )
      .subscribe();
  }

  openVerify(countryCode: number, phoneNumber: string, maskedContact: string) {
    this.dialog.open(VerifyAccount, {
      ...verifyAccountDialogConfig,
      data: {
        countryCode,
        phoneNumber,
        maskedContact,
      },
    });
  }
  showDialog() {
    import('shared/components/terms-dialog/terms-dialog').then((c) => {
      this.dialog.open(c.TermsDialog, {
        header: 'Terms & Conditions',
        width: '50vw',
        height: '85vh',
        showHeader: false,
        contentStyle: {
          padding: 0,
        },
        styleClass: 'termsPopup',

        modal: true,
      });
    });
  }
}
