import { DecimalPipe } from '@angular/common';
import { Component, inject, input, output, signal, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select, SelectModule } from 'primeng/select';
import { SliderModule, SliderSlideEndEvent } from 'primeng/slider';
import { distinctUntilChanged, filter, tap } from 'rxjs';

@Component({
  selector: 'shared-input-range',
  imports: [
    SelectModule,
    ButtonModule,
    SliderModule,
    ReactiveFormsModule,
    InputNumberModule,
    DecimalPipe,
    ButtonModule,
  ],
  templateUrl: './shared-input-range.html',
  styleUrl: './shared-input-range.scss',
})
export class SharedInputRange {
  private readonly fb = inject(FormBuilder);

  ranges = input<{ min: number; max: number }>({ min: 0, max: 0 });
  select = viewChild<Select>('select');
  isHaveValue = input<{ min: number; max: number }>();
  isDisable = input<boolean>(false);
  isLoading = input<boolean>(false);
  refetchValues = input<boolean>(false);
  valuesEmitter = output<number[]>();

  // Form controls for inputs
  rangeForm = this.fb.group({
    minInput: [0],
    maxInput: [0],
    sliderRange: [[0, 0] as number[]],
    selectedValue: [{ name: '' }],
  });

  sliderValues = signal([this.ranges().min, this.ranges().max]);
  minValue = signal(this.ranges().min);
  maxValue = signal(this.ranges().max);

  subscribeToRanges = toSignal(
    toObservable(this.ranges).pipe(
      distinctUntilChanged((prev, curr) => {
        return curr.min === prev.min && curr.max === prev.max;
      }),
      filter((ranges) => !!ranges),
      tap((ranges: any) => {
        const min = this.isHaveValue()?.min ?? ranges.min;
        const max = this.isHaveValue()?.max ?? ranges.max;
        this.minValue.set(min);
        this.maxValue.set(max);
        this.sliderValues.set([min, max]);
        this.rangeForm.patchValue({
          minInput: min,
          maxInput: max,
          sliderRange: [min, max],
        });
      })
    )
  );

  resetValues = toSignal(
    toObservable(this.refetchValues).pipe(
      distinctUntilChanged((prev, curr) => prev === curr),
      tap(() => {
        const min = this.isHaveValue()?.min ?? this.ranges().min;
        const max = this.isHaveValue()?.max ?? this.ranges().max;
        this.minValue.set(min);
        this.maxValue.set(max);
        this.sliderValues.set([min, max]);
        this.rangeForm.patchValue({
          minInput: min,
          maxInput: max,
          sliderRange: [min, max],
        });
      })
    )
  );

  onSliderChange(event: SliderSlideEndEvent) {
    const values = event.values as number[];

    if (!values || values.length !== 2) return;

    let [newMin, newMax] = values;

    if (newMin > newMax) {
      newMin = newMax;
    }

    if (newMax < newMin) {
      newMax = newMin;
    }
    newMin = Math.max(this.ranges().min, Math.min(newMin, this.ranges().max));
    newMax = Math.max(this.ranges().min, Math.min(newMax, this.ranges().max));

    this.sliderValues.set([newMin, newMax]);
    this.minValue.set(newMin);
    this.maxValue.set(newMax);
    this.rangeForm.patchValue({
      minInput: newMin,
      maxInput: newMax,
    });
  }

  onMinInputChange(value: number | null) {
    if (value === null || value === undefined) return;

    if (value > this.ranges().max || value < this.ranges().min) return;

    if (value > this.maxValue()) {
      this.minValue.set(this.maxValue());
      this.sliderValues.set([this.maxValue(), this.sliderValues()[1]]);
    } else {
      this.minValue.set(value);
      this.sliderValues.set([value, this.sliderValues()[1]]);
    }
  }

  onMaxInputChange(value: number | null) {
    if (value === null || value === undefined) return;

    if (value > this.ranges().max || value < this.ranges().min) return;

    if (value < this.minValue()) {
      this.maxValue.set(this.minValue());
      this.sliderValues.set([this.sliderValues()[0], this.minValue()]);
    } else {
      this.maxValue.set(value);
      this.sliderValues.set([this.sliderValues()[0], value]);
    }
  }

  submit() {
    if (this.isLoading()) return;
    this.select()?.hide();
    this.valuesEmitter.emit(this.sliderValues());
  }
}
