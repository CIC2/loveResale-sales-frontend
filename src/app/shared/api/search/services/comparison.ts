import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { LoadingService } from 'core/services/loading/loading.service';
import { MessageService } from 'primeng/api';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelDetailsComparison } from '../../../../core/api/search/models';
import { Model } from '../models/model';
const STORAGE_KEYS = {
  MODELS: 'comparisonModels',
  IS_OPENED: 'comparisonIsOpened',
  IS_VISIBLE: 'comparisonIsVisible',
  IS_OPENED_COMPARE: 'comparisonIsOpenedCompare',
} as const;

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private messageService = inject(MessageService);
  private loadingService = inject(LoadingService);
  private baseUrl = `${environment.baseUrl}/inventory/customer/comparison`;
  private _comparisonModels = signal<Model[]>(this.loadFromSessionStorage());
  isOpened = signal(this.loadSignalState(STORAGE_KEYS.IS_OPENED, false));
  isVisible = signal(this.loadSignalState(STORAGE_KEYS.IS_VISIBLE, true));
  isOpenedCompare = signal(
    this.loadSignalState(STORAGE_KEYS.IS_OPENED_COMPARE, false)
  );

  comparisonModels = this._comparisonModels.asReadonly();

  count = computed(() => this._comparisonModels().length);
  shouldOpenPopup = computed(() => this.count() == 1);

  private loadFromSessionStorage(): Model[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    const stored = sessionStorage.getItem(STORAGE_KEYS.MODELS);

    // return empty array if value is null, undefined, or empty
    if (!stored) return [];

    // extra safety: ensure value starts with "[" or "{"
    if (!(stored.trim().startsWith('{') || stored.trim().startsWith('['))) {
      return [];
    }

    return JSON.parse(stored);
  }

  private saveToSessionStorage(models: Model[]): void {
    sessionStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models));
  }

  private loadSignalState(key: string, defaultValue: boolean): boolean {
    if (!isPlatformBrowser(this.platformId)) return defaultValue;
    const stored = sessionStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  }

  private updateSessionStorage(key: string, value: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
  setIsOpened(value: boolean): void {
    this.isOpened.set(value);
    this.updateSessionStorage(STORAGE_KEYS.IS_OPENED, value);
  }

  setIsVisible(value: boolean): void {
    this.isVisible.set(value);
    this.updateSessionStorage(STORAGE_KEYS.IS_VISIBLE, value);
  }

  setIsOpenedCompare(value: boolean): void {
    this.isOpenedCompare.set(value);
    this.updateSessionStorage(STORAGE_KEYS.IS_OPENED_COMPARE, value);
  }

  getModelIds(): string[] {
    return this._comparisonModels().map((model) => model.modelId);
  }
  getUnitIds(): number[] {
    return this._comparisonModels().map((model) => model.id);
  }
  getProjectIds(): any {
    return this._comparisonModels().map((model) => model.projectId);
  }

  compareUnitIds(): Observable<ModelDetailsComparison[]> {
    const modelIds = this.getModelIds();
    const unitIds = this.getUnitIds();
    let req = [
      {
        modelId: modelIds[0],
        projectId: this.getProjectIds()[0],
      },
      {
        modelId: modelIds[1],
        projectId: this.getProjectIds()[1],
      },
    ];
    this.loadingService.show();
    return this.http.post<ModelDetailsComparison[]>(this.baseUrl, req).pipe(
      map((response) => {
        response = response.map((unit, index) => ({
          ...unit,
          id: unitIds[index],
        }));
        return response;
      }),
      finalize(() => this.loadingService.hide())
    );
  }
  addModel(model: any): void {
    this._comparisonModels.update((current) => {
      if (current.length >= 2) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: "You can't compare more than 2 models.",
        });
        return current;
      }
      if (current.some((m) => m.id === model.id)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'This model is already added.',
        });
        return current;
      }

      if (current.some((m) => m.modelId === model.modelId)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: "You can't compare two units with the same model code.",
        });
        return current;
      }

      const updated = [...current, model];
      this.saveToSessionStorage(updated);
      return updated;
    });
  }

  removeModel(modelId: number): void {
    const updated = this._comparisonModels().filter((m) => m.id !== modelId);
    this._comparisonModels.set(updated);
    this.saveToSessionStorage(updated);
  }

  clearAll(): void {
    this._comparisonModels.set([]);
    this.saveToSessionStorage([]);
  }

  isInComparison(modelId: number): boolean {
    return this._comparisonModels().some((m) => m.id === modelId);
  }

  isOneModel(): boolean {
    return this._comparisonModels().length === 1;
  }
}
