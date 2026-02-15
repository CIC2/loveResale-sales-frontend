import { inject, Provider, InjectionToken, LOCALE_ID } from '@angular/core';
import { AppConstants, AvailableLangs, Language } from 'core/constants/app';
import { registerLocaleData } from '@angular/common';
import localeArEG from '@angular/common/locales/ar';
import localeEnUS from '@angular/common/locales/en';
import { CookieService } from './cookie-service';

export const APP_LANG_TOKEN = new InjectionToken<string>('APP_LANG');

export const provideAppLang = (): Provider => {
  return [
    {
      provide: APP_LANG_TOKEN,
      useFactory: () => {
        const cookieService = inject(CookieService);
        const lang = cookieService.get(AppConstants.LANG_KEY);
        if (!AvailableLangs.includes(lang)) {
          return AppConstants.DEFAULT_LANG;
        }
        return lang;
      },
    },
    {
      provide: LOCALE_ID,
      useFactory: () => {
        const lang = inject(APP_LANG_TOKEN);
        if (lang === Language.ARABIC) {
          registerLocaleData(localeArEG);
          return 'ar-EG';
        }
        registerLocaleData(localeEnUS);
        return 'en-US';
      },
    },
  ];
};
