import { Component } from '@angular/core';

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfilePageComponent],
  template: `
    <app-profile-page />
  `,
  styles: [],
})
export class Profile {}
