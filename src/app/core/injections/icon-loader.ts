import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { icons } from 'public/icons/icons';

@Injectable({ providedIn: 'root' })
export class IconLoaderService {
  private iconRegistry = inject(SvgIconRegistryService);
  loadIcons(): void {
    for (const icon of icons) {
      this.iconRegistry.loadSvg(icon.url, icon.name);
    }
  }
}
