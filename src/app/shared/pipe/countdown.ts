import { Pipe, PipeTransform, signal, effect } from '@angular/core';

@Pipe({
  name: 'countdown',
  standalone: true,
})
export class CountdownPipe implements PipeTransform {
  transform(
    totalSeconds: number | null | undefined,
    format: string = 'hh:mm:ss'
  ): string {
    const secondsValue =
      totalSeconds == null || totalSeconds < 0 ? 0 : totalSeconds;

    const hours = this.pad(Math.floor(secondsValue / 3600));
    const minutes = this.pad(Math.floor((secondsValue % 3600) / 60));
    const seconds = this.pad(Math.floor(secondsValue % 60));

    return format
      .replace(/hh/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
