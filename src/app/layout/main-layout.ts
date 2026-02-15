import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, tap } from 'rxjs';
import { UserStateService } from 'shared/api';
import { ComparisonService } from 'shared/api/search/services/comparison';
import {  Footer, Header } from './components';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    Header,
    SvgIconComponent,
    Footer,
    ButtonModule,
  ],
  template: `
    <app-header></app-header>
    <main class="grow">
      <router-outlet />

      @if ((comparisonService.shouldOpenPopup() ||
      (comparisonService.isOpened()) ) &&
      (!comparisonService.isOpenedCompare())) { @if
      (!comparisonService.isVisible()) {
      <div class="compare-button-wrapper">
        <p-button
          type="button"
          (click)="showComparison()"
          styleClass="open-drawer-btn"
        >
          <svg-icon name="compare" aria-hidden="true"></svg-icon>
        </p-button>
        <span class="badge">{{ comparisonService.count() }}</span>
      </div>

      } @else {
      } }
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  protected comparisonService = inject(ComparisonService);
  protected userState = inject(UserStateService);
  private dialogService = inject(DialogService);
  private platformId = inject(PLATFORM_ID);

  showComparison(): void {
    this.comparisonService.setIsVisible(true);
  }
}
