import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Select } from 'primeng/select';
import { SvgIconComponent } from 'angular-svg-icon';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  tag?: string;
  status: string;
  isFavorite: boolean;
}

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoPipe,
    CardModule,
    ButtonModule,
    TagModule,
    Select,
    SvgIconComponent,
  ],
  templateUrl: './featured-properties.html',
  styleUrls: ['./featured-properties.scss'],
})
export class FeaturedProperties {
  private readonly fb = inject(FormBuilder);

  typeOptions: SelectOption[] = [
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Duplex', value: 'duplex' },
    { label: 'Penthouse', value: 'penthouse' },
  ];

  projectOptions: SelectOption[] = [
    { label: 'New Kairo', value: 'new-kairo' },
    { label: 'New Heliopolis City', value: 'new-heliopolis' },
    { label: 'Mostakbal City', value: 'mostakbal' },
    { label: 'Madinaty', value: 'madinaty' },
  ];

  bedroomOptions: SelectOption[] = [
    { label: '1-2', value: '1-2' },
    { label: '2-4', value: '2-4' },
    { label: '3-5', value: '3-5' },
    { label: '5+', value: '5+' },
  ];

  bathroomOptions: SelectOption[] = [
    { label: '1-2', value: '1-2' },
    { label: '2-4', value: '2-4' },
    { label: '3-4', value: '3-4' },
    { label: '4+', value: '4+' },
  ];

  priceOptions: SelectOption[] = [
    { label: '5M - 8M', value: '5-8' },
    { label: '8M - 9M', value: '8-9' },
    { label: '9M - 12M', value: '9-12' },
    { label: '12M+', value: '12+' },
  ];

  filtersForm = this.fb.group({
    selectedType: [this.typeOptions[0] as SelectOption | null],
    selectedProject: [this.projectOptions[0] as SelectOption | null],
    selectedBedrooms: [this.bedroomOptions[1] as SelectOption | null],
    selectedBathrooms: [this.bathroomOptions[1] as SelectOption | null],
    selectedPrice: [this.priceOptions[1] as SelectOption | null],
  });

  properties: Property[] = [
    {
      id: 1,
      title: 'Standalone Villa - New Kairo',
      location: 'New Heliopolis City',
      price: '24,000,000',
      beds: 4,
      baths: 2,
      area: '265 m²',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      status: 'Ready to Move',
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Standalone Villa - New Kairo',
      location: 'New Heliopolis City',
      price: '24,000,000',
      beds: 4,
      baths: 2,
      area: '265 m²',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      status: 'Ready to Move',
      isFavorite: true,
    },
    {
      id: 3,
      title: 'Standalone Villa - New Kairo',
      location: 'New Heliopolis City',
      price: '24,000,000',
      beds: 4,
      baths: 2,
      area: '265 m²',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      status: 'Ready to Move',
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Standalone Villa - New Kairo',
      location: 'New Heliopolis City',
      price: '24,000,000',
      beds: 4,
      baths: 2,
      area: '265 m²',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      status: 'Ready to Move',
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Standalone Villa - New Kairo',
      location: 'New Heliopolis City',
      price: '24,000,000',
      beds: 4,
      baths: 2,
      area: '265 m²',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      status: 'Ready to Move',
      isFavorite: true,
    },
    {
      id: 6,
      title: 'Standalone Villa - New Kairo',
      location: 'New Heliopolis City',
      price: '24,000,000',
      beds: 4,
      baths: 2,
      area: '265 m²',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      status: 'Ready to Move',
      isFavorite: false,
    },
  ];

  toggleFavorite(propertyId: number): void {
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      property.isFavorite = !property.isFavorite;
    }
  }

  viewPropertyDetails(propertyId: number) {
    console.log('View property:', propertyId);
  }
}
