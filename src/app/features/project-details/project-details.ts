import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectHero } from './components/project-hero/project-hero';
import { ProjectOverview } from './components/project-overview/project-overview';
import { ProjectFeatures } from './components/project-features/project-features';
import { ModelTypesCarousel } from './components/model-types-carousel/model-types-carousel';
import { ProjectMap } from './components/project-map/project-map';
import { ProjectGallery } from './components/project-gallery/project-gallery';
import { ProjectContactForm } from './components/project-contact-form/project-contact-form';
import { AboutProjectSidebar } from './components/about-project-sidebar/about-project-sidebar';

export interface ProjectFeature {
  icon: string;
  label: string;
}

export interface ModelType {
  id: number;
  name: string;
  imageUrl: string;
}

export interface AboutProjectInfo {
  icon: string;
  title: string;
  value: string;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    ProjectHero,
    ProjectOverview,
    ProjectFeatures,
    ModelTypesCarousel,
    ProjectMap,
    ProjectGallery,
    ProjectContactForm,
    AboutProjectSidebar,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Project data
  projectName = signal('Banan Project');
  heroImageUrl = signal('/images/project-image.jpg');
  loading = signal(true);

  // Overview
  overviewText = signal(
    'An exceptional residential community spanning over 10 million sq m that seamlessly combines sustainable living, smart authentic design, and innovative facilities to offer a peaceful urban retreat to more than 120,000 residents, fusing the perfect balance between Saudi traditions and TMG approach to revolutionize the concept of urban living for utmost integration.'
  );

  // Project Features
  projectFeatures = signal<ProjectFeature[]>([
    { icon: 'eye', label: 'projectPage.features.gardenView' },
    { icon: 'garage', label: 'projectPage.features.garage' },
    { icon: 'club', label: 'projectPage.features.pool' },
    { icon: 'bed', label: 'projectPage.features.bedrooms' },
    { icon: 'eye', label: 'projectPage.features.gardenView' },
    { icon: 'garage', label: 'projectPage.features.garage' },
    { icon: 'club', label: 'projectPage.features.pool' },
    { icon: 'bed', label: 'projectPage.features.bedrooms' },
  ]);

  // Model Types
  modelTypes = signal<ModelType[]>([
    { id: 1, name: 'Villa Type A', imageUrl: '/images/project-details/villa.png' },
    { id: 2, name: 'Villa Type B', imageUrl: '/images/project-details/residence.png' },
    { id: 3, name: 'Townhouse', imageUrl: '/images/project-details/chalets.jpg' },
    { id: 4, name: 'Apartment', imageUrl: '/images/project-details/marina.png' },
  ]);

  // Gallery images
  galleryImages = signal<string[]>([
    '/images/project-details/golf.jpg',
    '/images/project-details/lagoon.jpg',
    '/images/project-details/beach.jpg',
    '/images/project-details/marina-apartments.jpg',
  ]);

  // About Project Info
  aboutProjectInfo = signal<AboutProjectInfo[]>([
    { icon: 'unit-info-card/location', title: 'projectPage.about.address', value: 'projectPage.about.addressValue' },
    { icon: 'payment', title: 'projectPage.about.prices', value: 'projectPage.about.pricesValue' },
    { icon: 'building-type', title: 'projectPage.about.types', value: 'projectPage.about.typesValue' },
    { icon: 'calendar', title: 'projectPage.about.deliveryDate', value: 'projectPage.about.deliveryDateValue' },
  ]);

  ngOnInit(): void {
    // Get project ID from route params
    const projectId = this.route.snapshot.paramMap.get('id');
    // TODO: Load project data from API based on ID
    this.loading.set(false);
  }

  onLearnMore(): void {
    console.log('Learn more clicked');
  }

  onModelTypeClick(modelType: ModelType): void {
    this.router.navigate(['/model', modelType.id]);
  }

  onPrevModelTypes(): void {
    console.log('Previous model types');
  }

  onNextModelTypes(): void {
    console.log('Next model types');
  }

  onContactFormSubmit(formData: any): void {
    console.log('Contact form submitted:', formData);
  }
}
