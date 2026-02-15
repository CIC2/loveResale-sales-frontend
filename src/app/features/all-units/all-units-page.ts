import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { SearchService } from 'shared/api/search/services/search';
import { SearchStore } from 'shared/api/search/store/search-store';
import {
  FiltersSidebar,
  FiltersState,
  FilterOption,
} from './components/filters-sidebar/filters-sidebar';
import { SearchHeader, SearchHeaderFilters } from './components/search-header/search-header';
import { UnitCardData } from './components/unit-card/unit-card';
import { UnitsGrid } from './components/units-grid/units-grid';

@Component({
  selector: 'app-all-units-page',
  standalone: true,
  imports: [
    SearchHeader,
    FiltersSidebar,
    UnitsGrid,
  ],
  templateUrl: './all-units-page.html',
  styleUrl: './all-units-page.scss',
})
export class AllUnitsPage implements OnInit {
  private router = inject(Router);
  private searchService = inject(SearchService);
  protected searchStore = inject(SearchStore);

  // Filter options
  typeOptions = signal<FilterOption[]>([
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Duplex', value: 'duplex' },
    { label: 'Penthouse', value: 'penthouse' },
  ]);

  projectOptions = signal<FilterOption[]>([
    { label: 'New Cairo', value: 'new_cairo' },
    { label: 'Madinaty', value: 'madinaty' },
    { label: 'SouthMED', value: 'southmed' },
    { label: 'Capital Gardens', value: 'capital_gardens' },
  ]);

  locationOptions = signal<FilterOption[]>([
    { label: 'New Cairo', value: 'new_cairo' },
    { label: 'North Coast', value: 'north_coast' },
    { label: 'New Capital', value: 'new_capital' },
    { label: '6th of October', value: 'october' },
  ]);

  deliveryOptions = signal<FilterOption[]>([
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
  ]);

  modelOptions = signal<FilterOption[]>([]);

  // Units data (mock data for display)
  units = signal<UnitCardData[]>([
    {
      id: 1,
      imageUrl: '/images/all-units-image.jpg',
      location: 'New Heliopolis City',
      title: 'Standalone Villa - New Cairo',
      bedrooms: 4,
      bathrooms: 3,
      view: 'Garden View',
      area: 265,
      garage: true,
      readyToMove: true,
      totalPrice: 24000000,
      paidAmount: 12000000,
      offerAmount: 12000000,
      isFavorite: false,
    },
    {
      id: 2,
      imageUrl: '/images/all-units-image.jpg',
      location: 'New Heliopolis City',
      title: 'Standalone Villa - New Cairo',
      bedrooms: 4,
      bathrooms: 2,
      view: 'Garden View',
      area: 265,
      garage: true,
      readyToMove: true,
      totalPrice: 24000000,
      paidAmount: 12000000,
      offerAmount: 12000000,
      isFavorite: false,
    },
    {
      id: 3,
      imageUrl: '/images/all-units-image.jpg',
      location: 'New Heliopolis City',
      title: 'Standalone Villa - New Cairo',
      bedrooms: 4,
      bathrooms: 3,
      view: 'Garden View',
      area: 265,
      garage: false,
      readyToMove: true,
      totalPrice: 24000000,
      paidAmount: 12000000,
      offerAmount: 12000000,
      isFavorite: true,
    },
    {
      id: 4,
      imageUrl: '/images/all-units-image.jpg',
      location: 'New Heliopolis City',
      title: 'Standalone Villa - New Cairo',
      bedrooms: 4,
      bathrooms: 2,
      view: 'Garden View',
      area: 261,
      garage: true,
      readyToMove: false,
      totalPrice: 24000000,
      paidAmount: 12000000,
      offerAmount: 12000000,
      isFavorite: false,
    },
    {
      id: 5,
      imageUrl: '/images/all-units-image.jpg',
      location: 'New Heliopolis City',
      title: 'Standalone Villa - New Cairo',
      bedrooms: 4,
      bathrooms: 3,
      view: 'Garden View',
      area: 265,
      garage: true,
      readyToMove: true,
      totalPrice: 24000000,
      paidAmount: 12000000,
      offerAmount: 12000000,
      isFavorite: false,
    },
    {
      id: 6,
      imageUrl: '/images/all-units-image.jpg',
      location: 'New Heliopolis City',
      title: 'Standalone Villa - New Cairo',
      bedrooms: 4,
      bathrooms: 2,
      view: 'Garden View',
      area: 261,
      garage: true,
      readyToMove: true,
      totalPrice: 24000000,
      paidAmount: 12000000,
      offerAmount: 12000000,
      isFavorite: false,
    },
  ]);

  totalRecords = signal(150);
  currentPage = signal(0);
  pageSize = signal(10);
  loading = signal(false);

  ngOnInit() {
    this.loadFilterOptions();
  }

  loadFilterOptions() {
    // Load filter options from API
    // this.searchService.getSearchModel({}).subscribe((res) => {
    //   // Populate filter options from response
    // });
  }

  onSearch(filters: SearchHeaderFilters) {
    console.log('Search filters:', filters);
    this.loading.set(true);
    // Implement search logic
    setTimeout(() => this.loading.set(false), 1000);
  }

  onKeywordClick(keyword: string) {
    console.log('Keyword clicked:', keyword);
  }

  onFiltersChange(filters: Partial<FiltersState>) {
    console.log('Filters changed:', filters);
    this.loading.set(true);
    // Implement filter logic
    setTimeout(() => this.loading.set(false), 1000);
  }

  onResetFilters() {
    console.log('Filters reset');
    this.loading.set(true);
    // Reset and reload
    setTimeout(() => this.loading.set(false), 500);
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set(event.page ?? 0);
    console.log('Page changed:', event);
    // Load new page data
  }

  onFavoriteClick(unitId: number) {
    const currentUnits = this.units();
    const updatedUnits = currentUnits.map((unit) =>
      unit.id === unitId ? { ...unit, isFavorite: !unit.isFavorite } : unit
    );
    this.units.set(updatedUnits);
  }

  onCardClick(unitId: number) {
    this.router.navigate(['/model', unitId]);
  }
}
