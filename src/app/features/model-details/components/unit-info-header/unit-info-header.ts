import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ModelDetailsResponse } from 'core/api/search/models';

interface PropertyAttribute {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-unit-info-header',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent],
  templateUrl: './unit-info-header.html',
  styleUrl: './unit-info-header.scss',
})
export class UnitInfoHeader {
  unitData = input<ModelDetailsResponse | null>(null);

  get breadcrumbs(): { label: string; route?: string }[] {
    const data = this.unitData();
    return [
      { label: 'modelDetails.breadcrumbs.newCairo' },
      { label: 'modelDetails.breadcrumbs.madinaty' },
      { label: 'modelDetails.breadcrumbs.standalone' },
    ];
  }

  get unitTitle(): string {
    const data = this.unitData();
    return data?.usageType || 'Standalone Villa';
  }

  get unitAddress(): string {
    const data = this.unitData();
    return data?.locationName 
      ? `${data.locationName}, Building number 01 - Floor ${data.floor || '02'} - Flat 21`
      : 'Full Address Here, Building number 01 - Floor 02 - Flat 21';
  }

  get propertyAttributes(): PropertyAttribute[] {
    const data = this.unitData();
    
    return [
      {
        icon: 'building-type',
        value: data?.usageType || 'Standalone',
        label: '',
      },
      {
        icon: 'bed',
        value: `${data?.bedrooms || '3'} `,
        label: '',
      },
      {
        icon: 'bath',
        value: `${data?.bathrooms || '3'} `,
        label: '',
      },
      {
        icon: 'size',
        value: `${data?.unitSize || 124} `,
        label: '',
      },
      {
        icon: 'house-key',
        value: '',
        label: '',
      },
    ];
  }
}
