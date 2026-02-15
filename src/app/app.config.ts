import { DatePipe } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { AvailableLangs } from 'core/constants/app';
import { AppInitializeService, TranslocoHttpLoader } from 'core/injections';
import { provideAppLang } from 'core/injections/app-lang';
import { IconLoaderService } from 'core/injections/icon-loader';
import { interceptors } from 'core/interceptors';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from './app.routes';
import { AppTheme } from './theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors(interceptors)),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideAppLang(),
    providePrimeNG(AppTheme),
    provideBrowserGlobalErrorListeners(),
    DialogService,
    MessageService,
    DatePipe,
    provideAngularSvgIcon(),
    provideClientHydration(withEventReplay()),
    provideEnvironmentInitializer(() => inject(IconLoaderService).loadIcons()),
    provideAppInitializer(() => inject(AppInitializeService).initialize()),
    provideTransloco({
      config: {
        availableLangs: AvailableLangs,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
