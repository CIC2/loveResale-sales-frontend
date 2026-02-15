import {
  DOCUMENT,
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Language } from 'core/constants/app';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { UserStateService } from 'shared/api/user-state';
import { APP_LANG_TOKEN } from './app-lang';
import { CookieService } from './cookie-service';
import { TranslocoHttpLoader } from './transloco-loader';
import { SocketService } from './socket-service';
import { isPlatformBrowser } from '@angular/common';
import { AuthApi } from '../api/auth';

const userStateKey = makeStateKey<any>('USER_STATE');

@Injectable({
  providedIn: 'root',
})
export class AppInitializeService {
  private userState = inject(UserStateService);
  private authApi = inject(AuthApi);
  private translocoServ = inject(TranslocoService);
  private document = inject(DOCUMENT);
  private appLang = inject(APP_LANG_TOKEN);
  private cookieService = inject(CookieService);
  private translocoLoader = inject(TranslocoHttpLoader);
  private transferState = inject(TransferState);
  private socket = inject(SocketService);
  private platformId = inject(PLATFORM_ID);

  initialize() {
    return forkJoin([this.loadTranslation(this.appLang), this.currentUser()]);
  }

  currentUser() {
    const userState = this.transferState.get(userStateKey, null);

    if (isPlatformBrowser(this.platformId)) {
      return this.authApi.getCurrentUser().pipe(
        tap((res) => {
          this.socket.connect(res.token);
          this.userState.setValue = res;
        }),
        catchError((err) => {
          this.userState.setValue = null;
          return of(null);
        })
      );
    }
    if (userState) {
      this.userState.setValue = userState;
      return of(userState).pipe(
        tap(() => this.socket.connect(userState.token))
      );
    }

    if (this.cookieService.get('CUSTOMER_AUTH_TOKEN')) {
      return this.authApi.getCurrentUser().pipe(
        tap((res) => {
          this.userState.setValue = res;
          this.transferState.set(userStateKey, res);
        }),
        catchError((err) => {
          this.userState.setValue = null;
          return of(null);
        })
      );
    }
    return of(null);
  }

  loadTranslation(lang: string) {
    return this.translocoLoader.getTranslation(lang).pipe(
      tap((response: any) => {
        this.translocoServ.setTranslation(response, lang);
        this.translocoServ.setActiveLang(lang);
        this.document.documentElement.lang = lang;
        this.document.dir = lang == Language.ENGLISH ? 'ltr' : 'rtl';
      })
    );
  }
}
