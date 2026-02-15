// not-found.component.ts
import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [SvgIconComponent],
  template: `
    <div class="not-found">
      <svg-icon name="404" ></svg-icon>
      <h1 class="not-found__title">
        <span class="highlight">“404</span> Page Not Found”
      </h1>
    </div>
  `,
  styles: [
    `
      .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        padding: 2rem;
      }

      .not-found__title {
        font-family: var(--font-family);
        font-size: var(--font-size-5);
        color: var(--primary);
        font-weight: 600;
        margin-top: 1rem;
      }

      .highlight {
        color: var(--secondary);
      }

    `,
  ],
})
export class NotFoundComponent {}
