import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AddLeadForm } from './components/add-lead-form/add-lead-form';

@Component({
  selector: 'app-add-lead',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    AddLeadForm,
  ],
  templateUrl: './add-lead.html',
  styleUrl: './add-lead.scss',
})
export class AddLead implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    // Initialize component
  }

  onCancel(): void {
    this.router.navigate(['/inventory']);
  }

  onSubmit(formData: Record<string, unknown>): void {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  }
}
