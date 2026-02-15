import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmPasswordValidator } from 'core/validators';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Password } from 'primeng/password';
import { ValidationError } from 'shared/components';
import { SignIn, signInDialogConfig } from '..';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthApi } from '../../../../core/api/auth';

@Component({
  selector: 'app-new-password',
  imports: [
    Password,
    ButtonModule,
    ReactiveFormsModule,
    ValidationError,
    TranslocoPipe,
  ],
  templateUrl: './new-password.html',
  styleUrl: './new-password.scss',
})
export class NewPassword {
  private authService = inject(AuthApi);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  private dialog = inject(DialogService);
  newPasswordForm = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[@$!%#?&])(?=\D*\d).{8,}/
        ),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: ConfirmPasswordValidator('newPassword', 'confirmPassword'),
    }
  );
  submit() {
    if (this.newPasswordForm.invalid) {
      this.newPasswordForm.markAllAsTouched();
      return;
    }
    this.authService
      .confirmPassword({
        confirmPassword: this.newPasswordForm.value.confirmPassword ?? '',
        identifier: this.dialogConfig.data.identifier,
        countryCode: this.dialogConfig.data.countryCode,
        newPassword: this.newPasswordForm.value.newPassword ?? '',
      })
      .pipe()
      .subscribe((res) => this.openSignIn());
  }
  openSignIn() {
    this.dialogRef.close();
    this.dialog.open(SignIn, signInDialogConfig);
  }
}
export const newPasswordDialogConfig = {
  styleClass: 'authDialog',
  showHeader: false,
  modal: true,
  dismissableMask: true,
  closable: true,
  contentStyle: { overflow: 'hidden' },
};
