import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserStateService } from 'shared/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppConstants, Language } from 'core/constants/app';
import { CookieService } from 'core/injections/cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslocoPipe,
    SvgIconComponent,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  providers: [DialogService],
})
export class Header {
  private translocoService = inject(TranslocoService);
  protected userState = inject(UserStateService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  isMenuOpen = false;

  navItems = [
    { label: 'header.nav.findProperty', route: '/all-units', exact: true },
    { label: 'header.nav.inventory', route: '/inventory' },
    { label: 'header.nav.projects', route: '/projects' },
    { label: 'header.nav.addLead', route: '/add-lead' },


  ];
  openSignIn() {
    import('features/auth/components/sign-in/sign-in').then((c) => {
      this.dialogService.open(c.SignIn, signInDialogConfig);
    });
  }

  get userMenuItems(): MenuItem[] {
    return [
      {
        label: this.translocoService.translate('header.myProfile'),
        icon: 'pi pi-user',
        command: () => this.navigateToProfile(),
      },
      {
        label: this.translocoService.translate('header.myAppointment'),
        icon: 'pi pi-calendar',
        command: () => this.navigateToAppointments(),
      },
      {
        separator: true,
      },
      {
        label: this.translocoService.translate('header.logout'),
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLang() {
    const lang =
      this.translocoService.getActiveLang() === Language.ENGLISH
        ? Language.ARABIC
        : Language.ENGLISH;
    this.cookieService.set(AppConstants.LANG_KEY, lang);
    window.location.reload();
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToAppointments(): void {
    // Navigation logic
  }

  logout(): void {
    // Logout logic
  }
}
export const signInDialogConfig = {
  styleClass: 'authDialog',
  showHeader: false,
  modal: true,
  dismissableMask: true,
  closable: true,
  contentStyle: { overflow: 'hidden' },
};