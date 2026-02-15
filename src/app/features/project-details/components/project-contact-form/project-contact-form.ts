import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-project-contact-form',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './project-contact-form.html',
  styleUrl: './project-contact-form.scss',
})
export class ProjectContactForm {
  private fb = inject(FormBuilder);
  
  formSubmit = output<ContactFormData>();
  
  contactImage = signal('/images/project-details/about.png');
  
  contactForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    subject: [''],
    message: [''],
  });

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
    }
  }
}
