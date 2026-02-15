import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputOtp } from 'primeng/inputotp';
import { finalize } from 'rxjs';
import {
  NewPassword,
  newPasswordDialogConfig,
} from '../new-password/new-password';
import { SignIn, signInDialogConfig } from '../sign-in/sign-in';
import { AuthApi } from '../../../../core/api/auth';

@Component({
  selector: 'app-verify-otp',
  imports: [InputOtp, ReactiveFormsModule, ButtonModule, TranslocoPipe],
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.scss',
})
export class VerifyAccount {
  private authApi = inject(AuthApi);
  readonly destroyRef = inject(DestroyRef);
  private dialog = inject(DialogService);
  protected config = inject(DynamicDialogConfig);
  protected dialogRef = inject(DynamicDialogRef);
  protected loading = signal(false);
  protected mobile = this.config.data?.phoneNumber;
  protected maskedContact = this.config.data.maskedContact;
  protected otp = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
  ]) as FormControl & {
    _name: string;
  };
  constructor() {
    this.otp._name = 'otp';
  }

  submit() {
    if (this.otp.invalid) {
      this.otp.markAsTouched();
      return;
    }
    this.loading.set(true);
    if (this.mobile) {
      this.authApi
        .verifyOtp({
          countryCode: this.config.data?.countryCode,
          mobile: this.config.data?.phoneNumber,
          otp: this.otp.value,
        })
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe((res) => {
          this.dialogRef.close();
        });
      return;
    }

    this.authApi
      .verifyResetOtp({
        otp: this.otp.value!,
        countryCode: this.config.data?.countryCode,
        identifier: this.config.data?.identifier,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((res) => this.newPasswordDialog());
  }

  openSignIn() {
    this.dialogRef.close();
    this.dialog.open(SignIn, signInDialogConfig);
  }
  newPasswordDialog() {
    this.dialogRef.close();
    this.dialog.open(NewPassword, {
      ...newPasswordDialogConfig,
      data: {
        countryCode: this.config.data?.countryCode,
        identifier: this.config.data?.identifier,
      },
    });
  }
  preventSpace(event: any) {
    event.preventDefault();
  }
}
export const verifyAccountDialogConfig = {
  styleClass: 'authDialog',
  showHeader: false,
  modal: true,
  closable: true,
  dismissableMask: true,
  contentStyle: { overflow: 'hidden' },
};
