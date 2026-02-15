import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';

type PropertyCategory = 'residential' | 'coastal' | 'commercial';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoPipe, ButtonModule, InputTextModule, Select],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.scss'],
})
export class HeroSection {
  private readonly fb = inject(FormBuilder);
  
  selectedCategory = signal<PropertyCategory>('residential');

  propertyTypes = [
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Penthouse', value: 'penthouse' },
  ];

  areaOptions = [
    { label: '165 m² -265 m²', value: '165-265' },
    { label: '100 m² - 150 m²', value: '100-150' },
    { label: '266 m² - 400 m²', value: '266-400' },
    { label: '400 m² +', value: '400+' },
  ];

  searchForm = this.fb.group({
    searchQuery: [''],
    selectedType: [this.propertyTypes[0]],
    selectedArea: [this.areaOptions[0]],
  });

  popularKeywords = [
    'residential',
    'palmHills',
    'twoBathrooms',
    'readyToMove',
    'office'
  ];

  selectCategory(category: PropertyCategory) {
    this.selectedCategory.set(category);
  }

  onSearch() {
    console.log('Search:', {
      category: this.selectedCategory(),
      query: this.searchForm.value.searchQuery,
      type: this.searchForm.value.selectedType,
      area: this.searchForm.value.selectedArea,
    });
  }

  onKeywordClick(keyword: string) {
    console.log('Keyword clicked:', keyword);
  }
}
