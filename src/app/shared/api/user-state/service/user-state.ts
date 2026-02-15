import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  linkedSignal,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProfileApi } from 'core/api/profile';
import { catchError, EMPTY, filter, map, switchMap } from 'rxjs';
import { CurrentUserResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private profileApi = inject(ProfileApi);
  private platformId = inject(PLATFORM_ID);
  private readonly userObject = signal<CurrentUserResponse>(null as any);
  currentUser = this.userObject.asReadonly();
  private userProfileImage = toSignal(
    toObservable(this.currentUser).pipe(
      filter(
        (val) =>
          val &&
          Object.keys(val).length > 0 &&
          isPlatformBrowser(this.platformId)
      ),
      switchMap(() =>
        this.profileApi.getProfileImage().pipe(
          map((blob) => URL.createObjectURL(blob)),
          catchError(() => EMPTY)
        )
      )
    )
  );
  displayProfileImage = linkedSignal(() => this.userProfileImage());
  set setValue(value: any) {
    this.userObject.set(value);
  }
}
