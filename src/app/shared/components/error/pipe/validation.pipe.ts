import { Pipe, PipeTransform, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';

@Pipe({
  name: 'validation',
  standalone: true,
})
export class ValidationPipe implements PipeTransform {
  formGroup = inject(FormGroupDirective, { optional: true })?.control!;
  translateService = inject(TranslocoService);
  transform(control: any, errors: any): string {
    const controlName =
      (control as any)._name ??
      Object.keys(this.formGroup?.controls).find(
        (name) => this.formGroup.get(name) === control
      );

    return errors
      ? this.translateService.translate(
          `validation.${controlName}.${Object.keys(errors)[0]}`
        )
      : '';
  }
}
