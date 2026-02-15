import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

export interface SearchHeaderFilters {
  searchQuery: string;
  category: string;
  type: string | null;
  project: string | null;
}

export interface SearchHeaderOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    SvgIconComponent,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './search-header.html',
  styleUrl: './search-header.scss',
})
export class SearchHeader {
  private readonly fb = inject(FormBuilder);



  private defaultProjectOptions: SearchHeaderOption[] = [
    { label: 'New Cairo', value: 'newcairo' },
    { label: 'New Heliopolis City', value: 'newheliopolis' },
    { label: 'Mostakbal City', value: 'mostakbal' },
    { label: 'Madinaty', value: 'madinaty' },
  ];

  // Inputs
  typeOptions = input<SearchHeaderOption[]>(this.defaultProjectOptions);
  projectOptions = input<SearchHeaderOption[]>(this.defaultProjectOptions);
  popularKeywords = input<string[]>([
    'residential',
    'palmHills',
    'twoBathrooms',
    'readyToMove',
    'office',
  ]);

  // Outputs
  search = output<SearchHeaderFilters>();
  keywordClick = output<string>();

  // Reactive Form with default selections
  searchForm = this.fb.group({
    searchQuery: [''],
    selectedType: ['apartment' as string | null],
    selectedProject: ['newcairo' as string | null],
  });

  // State for category (button group, not form input)
  selectedCategory = signal('residential');

  categories = [
    { key: 'residential', label: 'allUnits.categories.residential' },
    { key: 'coastal', label: 'allUnits.categories.coastal' },
    { key: 'commercial', label: 'allUnits.categories.commercial' },
  ];

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  onSearch() {
    this.search.emit({
      searchQuery: this.searchForm.value.searchQuery ?? '',
      category: this.selectedCategory(),
      type: this.searchForm.value.selectedType ?? null,
      project: this.searchForm.value.selectedProject ?? null,
    });
  }

  onKeywordClick(keyword: string) {
    this.keywordClick.emit(keyword);
  }
}
