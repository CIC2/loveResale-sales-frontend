import { Component, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ValidationPipe } from './pipe/validation.pipe';

@Component({
  selector: 'validation-error',
  imports: [ValidationPipe],
  template: `@if ( (control().dirty ||control().touched) && control().invalid) {
    <span>{{ control() | validation : control().errors }}</span>
    }`,
  styleUrl: './error.scss',
})
export class ValidationError {
  control = input.required<AbstractControl | FormControl>();
}
