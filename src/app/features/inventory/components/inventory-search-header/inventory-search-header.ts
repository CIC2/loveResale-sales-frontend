import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

export interface InventorySearchFilters {
  searchQuery: string;
  type: string | null;
  project: string | null;
}

export interface InventorySearchOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-inventory-search-header',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    SvgIconComponent,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './inventory-search-header.html',
  styleUrl: './inventory-search-header.scss',
})
export class InventorySearchHeader {
  private readonly fb = inject(FormBuilder);

  typeOptions = input<InventorySearchOption[]>([]);
  projectOptions = input<InventorySearchOption[]>([]);
  popularKeywords = input<string[]>([
    'residential',
    'palmHills',
    'twoBathrooms',
    'readyToMove',
    'office',
  ]);

  search = output<InventorySearchFilters>();
  keywordClick = output<string>();

  searchForm = this.fb.group({
    searchQuery: [''],
    selectedType: [null as string | null],
    selectedProject: [null as string | null],
  });

  onSearch(): void {
    this.search.emit({
      searchQuery: this.searchForm.value.searchQuery ?? '',
      type: this.searchForm.value.selectedType ?? null,
      project: this.searchForm.value.selectedProject ?? null,
    });
  }

  onKeywordClick(keyword: string): void {
    this.keywordClick.emit(keyword);
  }
}
