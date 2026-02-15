import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';

type SidebarItem = {
  key: string;
  labelKey: string;
  icon: string;
};

type SidebarSection = {
  titleKey: string;
  items: SidebarItem[];
};

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [ButtonModule, NgClass, SvgIconComponent, TranslocoPipe],
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSidebarComponent {
  @Input({ required: true }) sections: SidebarSection[] = [];
  @Input({ required: true }) activeKey = '';
}
