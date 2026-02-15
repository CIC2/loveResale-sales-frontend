import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject, REQUEST } from '@angular/core';
import { Observable } from 'rxjs';

export function cookiesSSRInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const request: Request | null = inject(REQUEST);
  if (request) {
    const cloned = req.clone({
      headers: req.headers.append(
        'Cookie',
        request.headers.get('cookie') ?? ''
      ),
    });
    return next(cloned);
  }

  return next(req);
}
