import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): null => {
    let control = (formGroup as FormGroup).controls[controlName];
    let matchingControl = (formGroup as FormGroup).controls[
      matchingControlName
    ];
    if (!control || !matchingControl) return null;

    matchingControl.setErrors(
      !matchingControl.value
        ? { required: true }
        : control.value !== matchingControl.value
        ? { mismatch: true }
        : null
    );

    return null;
  };
}
