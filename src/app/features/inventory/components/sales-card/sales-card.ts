import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InventoryUnit } from '../inventory-table/inventory-table';

@Component({
  selector: 'app-sales-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './sales-card.html',
  styleUrl: './sales-card.scss',
})
export class SalesCard implements OnInit {
  private fb = inject(FormBuilder);
  
  unit = input.required<InventoryUnit>();

  close = output<void>();

  statusOptions = [
    { label: 'Available', value: 'available' },
    { label: 'Unavailable', value: 'unavailable' },
    { label: 'Reserved', value: 'reserved' },
  ];

  statusForm = this.fb.group({
    status: ['']
  });

  ngOnInit(): void {
    if (this.unit().salesPerson) {
      const currentStatus = this.unit().salesPerson!.status.toLowerCase();
      this.statusForm.patchValue({ status: currentStatus });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
