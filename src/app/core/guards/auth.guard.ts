import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { UserStateService } from 'shared/api';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userState = inject(UserStateService);
  return toObservable(userState.currentUser).pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/home']);
      }
    }),
    map((isAuthenticated) => Boolean(isAuthenticated))
  );
};
