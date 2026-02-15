import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitGallery } from './components/unit-gallery/unit-gallery';
import { UnitInfoHeader } from './components/unit-info-header/unit-info-header';
import { PaymentPlan } from './components/payment-plan/payment-plan';
import { UnitOverview } from './components/unit-overview/unit-overview';
import { UnitFeatures } from './components/unit-features/unit-features';
import { ProjectFeatures } from './components/project-features/project-features';
import { UnitMap } from './components/unit-map/unit-map';
import { ContactSalesman } from './components/contact-salesman/contact-salesman';
import { SimilarUnits } from './components/similar-units/similar-units';
import { ModelDetailsResponse } from 'core/api/search/models';

export interface UnitFeature {
  icon: string;
  label: string;
}

export interface PaymentInfo {
  totalPrice: number;
  downPayment: number;
  currency: string;
}

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [
    UnitGallery,
    UnitInfoHeader,
    PaymentPlan,
    UnitOverview,
    UnitFeatures,
    ProjectFeatures,
    UnitMap,
    ContactSalesman,
    SimilarUnits,
  ],
  templateUrl: './model-details.html',
  styleUrl: './model-details.scss',
})
export class ModelDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Unit data
  unitData = signal<ModelDetailsResponse | null>(null);
  loading = signal(true);

  // Gallery images
  galleryImages = signal<string[]>(['/images/unit-details.png']);

  // Unit features
  unitFeatures = signal<UnitFeature[]>([
    { icon: 'grass', label: 'modelDetails.features.gardenView' },
    { icon: 'garage', label: 'modelDetails.features.garage' },
    { icon: 'pool', label: 'modelDetails.features.pool' },
    { icon: 'bed', label: 'modelDetails.features.bedrooms' },
  ]);

  // Project features
  projectFeatures = signal<UnitFeature[]>([
    { icon: 'grass', label: 'modelDetails.features.gardenView' },
    { icon: 'garage', label: 'modelDetails.features.garage' },
    { icon: 'pool', label: 'modelDetails.features.pool' },
    { icon: 'bed', label: 'modelDetails.features.bedrooms' },
    { icon: 'grass', label: 'modelDetails.features.gardenView' },
    { icon: 'garage', label: 'modelDetails.features.garage' },
    { icon: 'pool', label: 'modelDetails.features.pool' },
    { icon: 'bed', label: 'modelDetails.features.bedrooms' },
  ]);

  // Payment info
  paymentInfo = signal<PaymentInfo>({
    totalPrice: 5000000,
    downPayment: 2000000,
    currency: 'EGP',
  });

  // Similar units (mock data)
  similarUnits = signal([
    {
      id: 1,
      imageUrl: '/images/standalone-villa.jpg',
      title: 'New Kairo - New Heliopolis City',
      bedrooms: 3,
      bathrooms: 3,
      area: 265,
      readyToMove: true,
      price: 24000000,
    },
    {
      id: 2,
      imageUrl: '/images/standalone-villa.jpg',
      title: 'New Kairo - New Heliopolis City',
      bedrooms: 3,
      bathrooms: 3,
      area: 265,
      readyToMove: true,
      price: 24000000,
    },
    {
      id: 3,
      imageUrl: '/images/standalone-villa.jpg',
      title: 'New Kairo - New Heliopolis City',
      bedrooms: 3,
      bathrooms: 3,
      area: 265,
      readyToMove: true,
      price: 24000000,
    },
  ]);

  // Overview text
  overviewText = signal(
    'Experience luxury living in this modern standalone villa located in the heart of New Heliopolis City, New Cairo. Designed with elegance and functionality in mind, the villa offers spacious interiors with floor-to-ceiling windows that bring in natural light and provide stunning views of the landscaped garden and private swimming pool.'
  );

  ngOnInit(): void {
    // Get resolved data from route
    const resolvedData = this.route.snapshot.data['model'] as ModelDetailsResponse;
    
    if (resolvedData) {
      this.unitData.set(resolvedData);
      this.setupGalleryImages(resolvedData);
    }
    
    this.loading.set(false);
  }

  private setupGalleryImages(data: ModelDetailsResponse): void {
    const images: string[] = [];
    
    if (data.media?.multiImages?.Main) {
      images.push(...data.media.multiImages.Main);
    }
    
    if (images.length === 0) {
      // Fallback images
      images.push(
        '/images/standalone-villa.jpg',
        '/images/villa.jpg',
        '/images/twin-house.jpg',
        '/images/apartment.jpg'
      );
    }
    
    this.galleryImages.set(images);
  }

  onViewInstallmentPlan(): void {
    console.log('View installment plan clicked');
  }

  onReserveUnit(): void {
    console.log('Reserve unit clicked');
  }

  onViewAllUnits(): void {
    this.router.navigate(['/all-units']);
  }

  onUnitClick(unitId: number): void {
    this.router.navigate(['/model', unitId]);
  }
}
