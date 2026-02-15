import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from 'core/services/loading/loading.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ToastModule, ProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'h-full block' },
})
export class App {
  protected loadingService = inject(LoadingService);
}
