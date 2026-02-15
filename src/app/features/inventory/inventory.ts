import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { InventorySearchHeader, InventorySearchFilters } from './components/inventory-search-header/inventory-search-header';
import { InventoryTable, InventoryUnit } from './components/inventory-table/inventory-table';
import { SalesCard } from './components/sales-card/sales-card';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TableModule,
    InventorySearchHeader,
    InventoryTable,
    SalesCard,
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Filter options
  typeOptions = signal([
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Townhouse', value: 'townhouse' },
  ]);

  projectOptions = signal([
    { label: 'New Kairo', value: 'new_kairo' },
    { label: 'Sodic East', value: 'sodic_east' },
    { label: 'Madinaty', value: 'madinaty' },
  ]);

  // Units data
  units = signal<InventoryUnit[]>([
    {
      id: 1,
      projectName: 'Project Name',
      unitNumber: '04',
      groupNumber: '03',
      buildingNumber: '123',
      status: 'Ready to move',
      createdDate: '4/10/2025',
      salesPerson: {
        name: 'Nouran Khaled',
        avatar: '/images/profile.jpg',
        status: 'Available',
      },
    },
    {
      id: 2,
      projectName: 'Project Name',
      unitNumber: '04',
      groupNumber: '03',
      buildingNumber: '123',
      status: 'Ready to move',
      createdDate: '4/10/2025',
      salesPerson: {
        name: 'Nouran Khaled',
        avatar: '/images/profile.jpg',
        status: 'Available',
      },
    },
    {
      id: 3,
      projectName: 'Project Name',
      unitNumber: '04',
      groupNumber: '03',
      buildingNumber: '123',
      status: 'Ready to move',
      createdDate: '4/10/2025',
      salesPerson: {
        name: 'Nouran Khaled',
        avatar: '/images/profile.jpg',
        status: 'Available',
      },
    },
  ]);

  selectedUnit = signal<InventoryUnit | null>(null);
  showSalesCard = signal(false);

  ngOnInit(): void {
    // Initialize component
  }

  onSearch(filters: InventorySearchFilters): void {
    // Handle search logic
    console.log('Search filters:', filters);
  }

  onKeywordClick(keyword: string): void {
    // Handle keyword click
    console.log('Keyword clicked:', keyword);
  }

  onStatusClick(unit: InventoryUnit): void {
    this.selectedUnit.set(unit);
    this.showSalesCard.set(true);
  }

  onCloseSalesCard(): void {
    this.showSalesCard.set(false);
    this.selectedUnit.set(null);
  }
}
