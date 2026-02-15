import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { ProfileSidebarComponent } from '../../components/profile-sidebar/profile-sidebar.component';

type SidebarItem = {
  key: string;
  labelKey: string;
  icon: string;
};

type SidebarSection = {
  titleKey: string;
  items: SidebarItem[];
};

type OptionItem = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ProfileSidebarComponent,
    ProfileFormComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    TranslocoPipe,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  private fb = inject(FormBuilder);
  private translocoService = inject(TranslocoService);
  private destroyRef = inject(DestroyRef);

  activeItemKey = 'personal-info';

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    phoneNumberOptional: [''],
    email: [''],
    birthDate: [null],
    nationality: [''],
    gender: [''],
  });

  heroBreadcrumbHome = signal<MenuItem>({ label: '' });
  heroBreadcrumbItems = signal<MenuItem[]>([]);

  formBreadcrumbItems = signal<MenuItem[]>([]);
  sidebarSections = signal<SidebarSection[]>([]);
  genderOptions = signal<OptionItem[]>([]);
  nationalityOptions = signal<OptionItem[]>([]);

  constructor() {
    this.updateTranslatedContent();
    this.translocoService.langChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateTranslatedContent());
  }

  private updateTranslatedContent(): void {
    this.heroBreadcrumbHome.set({
      label: this.translocoService.translate('common.home'),
      routerLink: '/',
    });

    this.heroBreadcrumbItems.set([
      {
        label: this.translocoService.translate(
          'profile.account.breadcrumbs.account'
        ),
      },
    ]);

    this.formBreadcrumbItems.set([
      {
        label: this.translocoService.translate(
          'profile.account.breadcrumbs.account'
        ),
      },
      {
        label: this.translocoService.translate(
          'profile.account.breadcrumbs.profile'
        ),
      },
      {
        label: this.translocoService.translate(
          'profile.account.breadcrumbs.personalInfo'
        ),
      },
    ]);

    this.sidebarSections.set([
      {
        titleKey: 'profile.menu.profile',
        items: [
          {
            key: 'personal-info',
            labelKey: 'profile.menu.personalInfo',
            icon: 'user',
          },
          {
            key: 'seller-profile',
            labelKey: 'profile.menu.sellerProfile',
            icon: 'member-list',
          },
          {
            key: 'appointments',
            labelKey: 'profile.menu.appointments',
            icon: 'calendar',
          },
        ],
      },
      {
        titleKey: 'profile.menu.units',
        items: [
          {
            key: 'my-units',
            labelKey: 'profile.menu.myUnits',
            icon: 'house-chimney',
          },
          {
            key: 'reserved-units',
            labelKey: 'profile.menu.reservedUnits',
            icon: 'reservation',
          },
        ],
      },
      {
        titleKey: 'profile.menu.settings',
        items: [
          {
            key: 'notifications',
            labelKey: 'profile.menu.notifications',
            icon: 'notification',
          },
          {
            key: 'security',
            labelKey: 'profile.menu.security',
            icon: 'cards',
          },
        ],
      },
    ]);

    this.genderOptions.set([
      {
        label: this.translocoService.translate('profile.form.gender.male'),
        value: 'male',
      },
      {
        label: this.translocoService.translate('profile.form.gender.female'),
        value: 'female',
      },
    ]);

    this.nationalityOptions.set([
      {
        label: this.translocoService.translate(
          'profile.form.nationalities.egyptian'
        ),
        value: 'egyptian',
      },
      {
        label: this.translocoService.translate(
          'profile.form.nationalities.other'
        ),
        value: 'other',
      },
    ]);
  }
}
