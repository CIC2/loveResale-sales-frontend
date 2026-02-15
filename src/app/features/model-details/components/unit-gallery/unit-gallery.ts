import { Component, input, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ImageFallbackDirective } from 'shared/directives';

@Component({
  selector: 'app-unit-gallery',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent, ImageFallbackDirective],
  templateUrl: './unit-gallery.html',
  styleUrl: './unit-gallery.scss',
})
export class UnitGallery {
  images = input<string[]>(['/images/unit-details.png']);
  
  selectedIndex = signal(0);
  showAllPhotos = signal(false);

  get mainImage(): string {
    const imgs = this.images();
    return imgs.length > 0 ? imgs[this.selectedIndex()] : '/images/placeholder-Image.svg';
  }

  get thumbnailImages(): string[] {
    return this.images().slice(0, 4);
  }

  get totalPhotos(): number {
    return this.images().length;
  }

  selectImage(index: number): void {
    this.selectedIndex.set(index);
  }

  onShowAllPhotos(): void {
    this.showAllPhotos.set(true);
  }

  onShareClick(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Unit Details',
        url: window.location.href,
      });
    }
  }
}
