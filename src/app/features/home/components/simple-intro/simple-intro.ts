import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-simple-intro',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './simple-intro.html',
  styleUrls: ['./simple-intro.scss'],
})
export class SimpleIntro {}
