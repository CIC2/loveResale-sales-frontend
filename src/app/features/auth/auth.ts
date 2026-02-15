import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet>`,
  styles: [],
})
export class Auth {}
