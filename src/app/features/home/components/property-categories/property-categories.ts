import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

interface PropertyCategory {
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-property-categories',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './property-categories.html',
  styleUrls: ['./property-categories.scss'],
})
export class PropertyCategories {
  categories: PropertyCategory[] = [
    {
      title: 'Newest Listings',
      description: 'Explore the latest properties added to our portfolio',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
      link: '/search?filter=newest',
    },
    {
      title: 'Find Your Next Home',
      description: 'Browse through our extensive collection of homes',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
      link: '/search?type=residential',
    },
    {
      title: 'Popular Properties',
      description: 'Check out the most viewed properties this month',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      link: '/search?filter=popular',
    },
    {
      title: 'Explore Your City',
      description: 'Discover properties in your preferred location',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      link: '/search',
    },
  ];
}
