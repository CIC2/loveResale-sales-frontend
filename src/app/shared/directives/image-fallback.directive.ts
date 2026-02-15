import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: '[appImageFallback]',
    standalone: true,
    host: {
        '(error)': 'onError()',
    },
})
export class ImageFallbackDirective {
    private el = inject<ElementRef<HTMLImageElement>>(ElementRef);
    onError() {
        this.el.nativeElement.src = '/images/placeholder-Image.svg';
    }
}
