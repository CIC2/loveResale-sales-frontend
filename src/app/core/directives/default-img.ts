import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[defaultImg]',
  standalone: true // Add this if using standalone components
})
export class DefaultImg {
  defaultImg = input<string>('/images/challet-image.png'); // Match selector name and provide default
  
  private readonly el = inject(ElementRef);

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.defaultImg();
  }
}