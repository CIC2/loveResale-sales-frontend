import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, throwError } from 'rxjs';
import { UserStateService } from 'shared/api';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const dialogService = inject(DialogService);
  const messageService = inject(MessageService);
  const userState = inject(UserStateService);


  return next(req).pipe(
    catchError((error) => {
      if (error.status === 404) {
        router.navigate(['/not-found']);
      } else if (error.status === 401) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Session has expired. Please sign in again',
        });

        router.navigate(['/home']);
        // openSignIn();
      }
      return throwError(() => error);
    })
  );
};
