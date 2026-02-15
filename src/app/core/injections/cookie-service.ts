import { DOCUMENT, inject, Injectable, REQUEST } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  document = inject(DOCUMENT);
  request = inject(REQUEST);
  platformId = inject(PLATFORM_ID);

  get(name: string): string {
    const cookies = isPlatformServer(this.platformId)
      ? this.request?.headers.get('cookie') ?? ''
      : document.cookie;

    return cookies.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ?? '';
  }

  set(name: string, value: string, days = 365) {
    if (isPlatformBrowser(this.platformId)) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; expires=${expires}; path=/;`;
    }
  }
}
