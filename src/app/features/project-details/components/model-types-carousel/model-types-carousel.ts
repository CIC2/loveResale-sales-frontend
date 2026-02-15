import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

interface ModelType {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-model-types-carousel',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './model-types-carousel.html',
  styleUrl: './model-types-carousel.scss',
})
export class ModelTypesCarousel {
  modelTypes = input.required<ModelType[]>();
  
  modelTypeClick = output<ModelType>();
  prevClick = output<void>();
  nextClick = output<void>();

  onModelTypeClick(modelType: ModelType): void {
    this.modelTypeClick.emit(modelType);
  }

  onPrev(): void {
    this.prevClick.emit();
  }

  onNext(): void {
    this.nextClick.emit();
  }
}
