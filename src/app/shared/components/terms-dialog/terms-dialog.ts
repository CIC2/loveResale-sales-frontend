import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TERMS_AR } from './terms-content/terms_AR';
import { TERMS_EN } from './terms-content/terms_EN';
@Component({
  selector: 'app-terms-dialog',
  imports: [ButtonModule, TranslocoModule],
  templateUrl: './terms-dialog.html',
  styleUrls: ['./terms-dialog.scss'],
})
export class TermsDialog {
  private translocoService = inject(TranslocoService);
  protected lang = this.translocoService.getActiveLang();
  private ref = inject(DynamicDialogRef);

  termsEN = TERMS_EN;
  termsAR = TERMS_AR;


  close() {
    this.ref.close();
  }
}
