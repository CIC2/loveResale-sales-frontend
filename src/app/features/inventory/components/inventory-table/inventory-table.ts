import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

export interface SalesPerson {
  name: string;
  avatar: string;
  status: string;
}

export interface InventoryUnit {
  id: number;
  projectName: string;
  unitNumber: string;
  groupNumber: string;
  buildingNumber: string;
  status: string;
  createdDate: string;
  salesPerson?: SalesPerson;
}

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    TranslocoPipe,
    TableModule,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './inventory-table.html',
  styleUrl: './inventory-table.scss',
})
export class InventoryTable {
  units = input<InventoryUnit[]>([]);

  statusClick = output<InventoryUnit>();

  onStatusClick(unit: InventoryUnit): void {
    this.statusClick.emit(unit);
  }
}
