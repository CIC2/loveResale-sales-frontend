import { Component } from '@angular/core';
import {
  HeroSection,
  PropertyCategories,
  FeaturedProperties,
  ProcessSteps,
  PromotionalBanner,
  ProjectsListing,
} from './components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    FeaturedProperties,
    ProcessSteps,
    PromotionalBanner,
    ProjectsListing,
  ],
  template: `
    <app-hero-section />
    <app-process-steps />
    <app-featured-properties />
    <app-promotional-banner />
    <app-projects-listing />
  `,
  styles: [],
})
export class Home {}
