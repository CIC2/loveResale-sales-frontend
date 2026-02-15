import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ContactForm } from './contact-form/contact-form';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, SvgIconComponent, ContactForm],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerSections = [
    {
      id: 'projects-main',
      title: 'footer.sections.projects',
      links: [
        { label: 'New Kairo', route: '/projects/new-kairo' },
        { label: 'Sodic East', route: '/projects/sodic-east' },
        { label: 'Madinaty', route: '/projects/madinaty' },
        { label: 'Rehab City', route: '/projects/rehab-city' },
        { label: 'Privado', route: '/projects/privado' },
      ],
    },
    {
      id: 'developers-main',
      title: 'footer.sections.developers',
      links: [
        { label: 'New Kairo', route: '/developers/new-kairo' },
        { label: 'Sodic East', route: '/developers/sodic-east' },
        { label: 'Madinaty', route: '/developers/madinaty' },
        { label: 'Rehab City', route: '/developers/rehab-city' },
        { label: 'Privado', route: '/developers/privado' },
      ],
    },
    {
      id: 'locations-main',
      title: 'footer.sections.locations',
      links: [
        { label: 'New Cairo', route: '/locations/new-cairo' },
        { label: 'Mostakbal City', route: '/locations/mostakbal-city' },
        { label: 'Sheikh Zayed', route: '/locations/sheikh-zayed' },
        { label: 'North Coast', route: '/locations/north-coast' },
        { label: 'Sharm El Sheikh', route: '/locations/sharm' },
      ],
    },
    {
      id: 'projects-secondary',
      title: 'footer.sections.projects',
      links: [
        { label: 'New Cairo', route: '/projects/new-cairo' },
        { label: 'Sodic East', route: '/projects/sodic-east-2' },
        { label: 'Madinaty', route: '/projects/madinaty-2' },
        { label: 'Rehab City', route: '/projects/rehab-city-2' },
        { label: 'Privado', route: '/projects/privado-2' },
      ],
    },
  ];

  socialLinks = [
    { name: 'facebook', icon: 'footer/facebook', url: '#' },
    { name: 'linkedin', icon: 'footer/linkedin', url: '#' },
    { name: 'instagram', icon: 'footer/instagram', url: '#' },
    { name: 'youtube', icon: 'footer/youtube', url: '#' },
    { name: 'X', icon: 'footer/X', url: '#' },
  ];
}
