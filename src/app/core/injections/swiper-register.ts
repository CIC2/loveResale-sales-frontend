import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { register } from 'swiper/element';
@Injectable({
  providedIn: 'root',
})
export class SwiperRegisterService {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(platformId)) register();
  }
}
