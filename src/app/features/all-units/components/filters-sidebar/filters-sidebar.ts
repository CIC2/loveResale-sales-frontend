import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FiltersState {
  sortBy: string | null;
  location: string | null;
  project: string | null;
  type: string | null;
  areaRange: [number, number];
  totalAmountRange: [number, number];
  depositAmountRange: [number, number];
  installmentPeriod: string | null;
  priceRange: [number, number];
  bedrooms: string | null;
  bathrooms: string | null;
  view: string | null;
  garden: boolean;
  finishingType: string | null;
  deliveryDate: string | null;
  model: string | null;
}

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  imports: [
    TranslocoPipe,
    ReactiveFormsModule,
    AccordionModule,
    SelectModule,
    SliderModule,
    CheckboxModule,
  ],
  templateUrl: './filters-sidebar.html',
  styleUrl: './filters-sidebar.scss',
})
export class FiltersSidebar implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  // Input options
  sortOptions = input<FilterOption[]>([
    { label: 'Lowest Price First', value: 'price_asc' },
    { label: 'Highest Price First', value: 'price_desc' },
  ]);
  locationOptions = input<FilterOption[]>([]);
  projectOptions = input<FilterOption[]>([]);
  typeOptions = input<FilterOption[]>([]);
  bedroomOptions = input<FilterOption[]>([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5+', value: '5' },
  ]);
  bathroomOptions = input<FilterOption[]>([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4+', value: '4' },
  ]);
  viewOptions = input<FilterOption[]>([
    { label: 'Garden View', value: 'garden' },
    { label: 'Pool View', value: 'pool' },
    { label: 'Street View', value: 'street' },
  ]);
  finishingOptions = input<FilterOption[]>([
    { label: 'Fully Finished', value: 'fully_finished' },
    { label: 'Semi Finished', value: 'semi_finished' },
    { label: 'Core & Shell', value: 'core_shell' },
  ]);
  deliveryOptions = input<FilterOption[]>([]);
  modelOptions = input<FilterOption[]>([]);
  installmentOptions = input<FilterOption[]>([
    { label: '1 Year', value: '1' },
    { label: '2 Years', value: '2' },
    { label: '3 Years', value: '3' },
    { label: '5 Years', value: '5' },
    { label: '7 Years', value: '7' },
    { label: '10 Years', value: '10' },
  ]);

  // Range limits
  areaMin = input(50);
  areaMax = input(500);
  priceMin = input(0);
  priceMax = input(50000000);
  totalAmountMin = input(0);
  totalAmountMax = input(50000000);
  depositMin = input(0);
  depositMax = input(10000000);

  // Output
  filtersChange = output<Partial<FiltersState>>();
  resetFilters = output<void>();

  // Reactive Form
  filtersForm = this.fb.group({
    sortBy: [null as string | null],
    selectedLocation: [null as string | null],
    selectedProject: [null as string | null],
    selectedType: [null as string | null],
    areaRange: [[50, 500] as [number, number]],
    totalAmountRange: [[0, 50000000] as [number, number]],
    depositAmountRange: [[0, 10000000] as [number, number]],
    selectedInstallment: [null as string | null],
    selectedView: [null as string | null],
    hasGarden: [false],
    selectedFinishing: [null as string | null],
    selectedDelivery: [null as string | null],
    selectedModel: [null as string | null],
  });

  // State for bedrooms/bathrooms chips (not part of form)
  selectedBedrooms = signal<string | null>(null);
  selectedBathrooms = signal<string | null>(null);

  ngOnInit() {
    this.filtersForm.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.emitFilterChange());
  }

  onBedroomSelect(value: string) {
    this.selectedBedrooms.set(value);
    this.emitFilterChange();
  }

  onBathroomSelect(value: string) {
    this.selectedBathrooms.set(value);
    this.emitFilterChange();
  }

  emitFilterChange() {
    const formValue = this.filtersForm.value;
    this.filtersChange.emit({
      sortBy: formValue.sortBy ?? null,
      location: formValue.selectedLocation ?? null,
      project: formValue.selectedProject ?? null,
      type: formValue.selectedType ?? null,
      areaRange: formValue.areaRange as [number, number],
      totalAmountRange: formValue.totalAmountRange as [number, number],
      depositAmountRange: formValue.depositAmountRange as [number, number],
      installmentPeriod: formValue.selectedInstallment ?? null,
      priceRange: [this.priceMin(), this.priceMax()],
      bedrooms: this.selectedBedrooms(),
      bathrooms: this.selectedBathrooms(),
      view: formValue.selectedView ?? null,
      garden: formValue.hasGarden ?? false,
      finishingType: formValue.selectedFinishing ?? null,
      deliveryDate: formValue.selectedDelivery ?? null,
      model: formValue.selectedModel ?? null,
    });
  }

  onReset() {
    this.filtersForm.reset({
      sortBy: null,
      selectedLocation: null,
      selectedProject: null,
      selectedType: null,
      areaRange: [this.areaMin(), this.areaMax()],
      totalAmountRange: [this.totalAmountMin(), this.totalAmountMax()],
      depositAmountRange: [this.depositMin(), this.depositMax()],
      selectedInstallment: null,
      selectedView: null,
      hasGarden: false,
      selectedFinishing: null,
      selectedDelivery: null,
      selectedModel: null,
    });
    this.selectedBedrooms.set(null);
    this.selectedBathrooms.set(null);
    this.resetFilters.emit();
  }

  formatPrice(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    }
    return value.toString();
  }

  // Getter for template access to form values
  get areaRangeValue(): [number, number] {
    return this.filtersForm.get('areaRange')?.value as [number, number] ?? [50, 500];
  }

  get totalAmountRangeValue(): [number, number] {
    return this.filtersForm.get('totalAmountRange')?.value as [number, number] ?? [0, 50000000];
  }

  get depositAmountRangeValue(): [number, number] {
    return this.filtersForm.get('depositAmountRange')?.value as [number, number] ?? [0, 10000000];
  }
}
