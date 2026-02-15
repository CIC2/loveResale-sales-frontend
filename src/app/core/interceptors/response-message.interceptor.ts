import { isPlatformBrowser } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function responseMessageInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const messageService = inject(MessageService);
  const platformId = inject(PLATFORM_ID);

  const ignoredUrls = [
    '/i18n/',
    'https://ipapi.co/json',
    '/api/inventory/customer/filter',
    '.svg',
    '.json',
    'profilePicture',
    'inventory/project',
    'nationalIdPicture',
  ];

  const shouldIgnore = ignoredUrls.some((url) => req.url.includes(url));

  const shouldShowMessage = !shouldIgnore;

  if (isPlatformBrowser(platformId) && !navigator.onLine && !shouldIgnore) {
    messageService.add({
      severity: 'secondary',
      summary: 'Offline',
      detail: 'No Internet Connection',
    });

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 0,
          statusText: 'No Internet Connection',
          url: req.url,
        })
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (shouldShowMessage) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message,
        });
      }

      return throwError(() => error);
    })
  );
}
