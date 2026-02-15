import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { SocketService, SwiperRegisterService } from 'core/injections';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { catchError, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { UserStateService } from 'shared/api';
import { ValidationError } from 'shared/components';
import { MobileNumberInput } from 'shared/components/mobile-number-input/mobile-number-input';
import { SwiperContainer } from 'swiper/element';
import { Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import {
  ForgetPassword,
  forgetPasswordDialogConfig,
  SignUp,
  signUpDialogConfig,
  VerifyAccount,
  verifyAccountDialogConfig,
} from '..';
import { AuthApi } from '../../../../core/api/auth';

@Component({
  selector: 'app-sign-in',
  imports: [
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ReactiveFormsModule,
    MobileNumberInput,
    ValidationError,
    CheckboxModule,
    ButtonModule,
    TranslocoPipe,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignIn {
  private authApi = inject(AuthApi);
  protected dialogRef = inject(DynamicDialogRef);
  private dialog = inject(DialogService);
  readonly destroyRef = inject(DestroyRef);
  private userState = inject(UserStateService);
  private platformId = inject(PLATFORM_ID);
  protected currentIndex = signal<number>(0);
  protected loading = signal(false);
  private socket = inject(SocketService);
  swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  prevNav = viewChild<ElementRef<SwiperContainer>>('prevNav');
  nextNav = viewChild<ElementRef<SwiperContainer>>('nextNav');
  swiperSer = inject(SwiperRegisterService);

  signInList = [
    {
      img: 'images/auth/sign-in.jpg',
    },
    {
      img: 'images/auth/forget-password.jpg',
    },
    {
      img: 'images/auth/new-password.jpg',
    },
  ];

  signInForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
  });

  swiperConfig: SwiperOptions = {
    modules: [Autoplay],
    grabCursor: true,
    spaceBetween: 10,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  };

  initSwiperSignal = toSignal(
    toObservable(this.swiper).pipe(
      filter((el) =>
        Boolean(el?.nativeElement && isPlatformBrowser(this.platformId))
      ),
      tap((elRef: ElementRef<SwiperContainer> | undefined) => {
        const el = elRef!.nativeElement;

        if (!el.swiper) {
          Object.assign(el, {
            ...this.swiperConfig,
            on: {
              slideChange: (swiper: any) => {
                this.currentIndex.set(swiper.activeIndex || 0);
              },
            },
          });
          el.initialize();
        } else {
          el.swiper.update();
        }
      })
    )
  );

  onSubmit() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const formValue = this.signInForm.value as any;
    const payload = {
      password: formValue.password,
      mobile: formValue.mobileForm.phoneNumber,
      countryCode: formValue.mobileForm.code.dialCode,
    };

    this.loading.set(true);
    this.authApi
      .signIn(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            const dialCode = formValue.mobileForm.code.dialCode;
            const phoneNumber = formValue.mobileForm.phoneNumber;
            this.authApi.sendOtp(dialCode, phoneNumber).subscribe((res) => {
              this.openVerify(
                dialCode,
                phoneNumber,
                res.message.split(':')[1].trim()
              );
            });

            return EMPTY;
          }

          return EMPTY;
        }),
        switchMap(() => this.authApi.getCurrentUser()),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res) => {
        this.userState.setValue = res;
        this.socket.connect(res.token);
        this.dialogRef.close();
      });
  }

  openForgetPassword() {
    this.dialogRef.close();
    this.dialog.open(ForgetPassword, forgetPasswordDialogConfig);
  }
  openVerify(countryCode: number, phoneNumber: string, maskedContact: string) {
    this.dialog.open(VerifyAccount, {
      ...verifyAccountDialogConfig,
      data: {
        countryCode,
        phoneNumber,
        maskedContact,
      },
    });
  }
  openSignUp() {
    this.dialogRef.close();
    this.dialog.open(SignUp, signUpDialogConfig);
  }
}
export const signInDialogConfig = {
  styleClass: 'authDialog',
  showHeader: false,
  modal: true,
  dismissableMask: true,
  closable: true,
  contentStyle: { overflow: 'hidden' },
};
