import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { MobileNumberInput } from 'shared/components';
import {
  SignIn,
  signInDialogConfig,
  VerifyAccount,
  verifyAccountDialogConfig,
} from '..';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthApi } from '../../../../core/api/auth';

@Component({
  selector: 'app-forget-password',
  imports: [
    ReactiveFormsModule,
    Button,
    MobileNumberInput,
    RouterModule,
    TranslocoPipe,
  ],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
  private authService = inject(AuthApi);
  protected identifier = new FormGroup({});
  protected dialogRef = inject(DynamicDialogRef);
  readonly destroyRef = inject(DestroyRef);
  protected loading = signal(false);
  private dialog = inject(DialogService);

  submit() {
    const mobileForm: any = this.identifier.get('mobileForm')?.value;
    if (!this.identifier.valid) {
      this.identifier.markAllAsTouched();
      return;
    }
    if (!mobileForm) return;

    this.loading.set(true);

    this.authService
      .forgetPassword({
        identifier: mobileForm.phoneNumber,
        countryCode: mobileForm.code.dialCode,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res) => {
        this.verifyAccount({
          contactInfo: mobileForm.phoneNumber,
          countryCode: mobileForm.code.dialCode,
          maskedContact: res.message.split(':')[1].trim(),
        });
      });
  }

  openSignIn() {
    this.dialogRef.close();
    this.dialog.open(SignIn, signInDialogConfig);
  }
  verifyAccount(data: {
    contactInfo: string;
    countryCode: string;
    maskedContact: string;
  }) {
    this.dialogRef.close();
    this.dialog.open(VerifyAccount, {
      ...verifyAccountDialogConfig,
      data: {
        identifier: data.contactInfo,
        countryCode: data.countryCode,
        maskedContact: data.maskedContact,
      },
    });
  }
}
export const forgetPasswordDialogConfig = {
  styleClass: 'authDialog',
  showHeader: false,
  modal: true,
  dismissableMask: true,
  closable: true,
  contentStyle: { overflow: 'hidden' },
};
