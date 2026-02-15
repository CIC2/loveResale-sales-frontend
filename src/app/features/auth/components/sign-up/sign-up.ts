import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwiperRegisterService } from 'core/injections';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, tap } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { SignIn, signInDialogConfig } from '../sign-in/sign-in';
import { AccountCredentialsForm, PersonalInfoForm } from './components';
import { ActiveForm } from '../../../../core/api/auth/models';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    Button,
    PersonalInfoForm,
    AccountCredentialsForm,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignUp {
  signUpForm = new FormGroup({});
  protected dialogRef = inject(DynamicDialogRef);
  private swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  private platformId = inject(PLATFORM_ID);
  private swiperSer = inject(SwiperRegisterService);
  private dialog = inject(DialogService);
  protected ActiveForm = ActiveForm;
  protected activeFormIndex = signal<
    (typeof ActiveForm)[keyof typeof ActiveForm]
  >(ActiveForm.PERSONAL_FORM);
  signUpList = [
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

  currentIndex = signal(0);
  swiperConfig: SwiperOptions = {
    modules: [Autoplay],
    spaceBetween: 10,
    pagination: { clickable: true },
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
  goToSecundForm() {
    this.activeFormIndex.set(ActiveForm.ACCOUNT_CREDENTIALS);
  }
  openSignIn() {
    this.dialogRef.close();
    this.dialog.open(SignIn, signInDialogConfig);
  }
}
export const signUpDialogConfig = {
  styleClass: 'authDialog',
  showHeader: false,
  modal: true,
  closable: true,
  dismissableMask: true,
  contentStyle: { overflow: 'hidden' },
};
