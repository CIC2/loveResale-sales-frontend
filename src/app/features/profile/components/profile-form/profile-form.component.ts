import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

type OptionItem = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,

    Select,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) breadcrumbItems: MenuItem[] = [];
  @Input({ required: true }) genderOptions: OptionItem[] = [];
  @Input({ required: true }) nationalityOptions: OptionItem[] = [];
}
