import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { LoadingService } from 'core/services/loading/loading.service';
import { finalize, map, Observable } from 'rxjs';
import { ModelDetailsResponse } from '../../search/models';
import { UnitApi } from '../../search/services';

export const ModelResolver: ResolveFn<
  Observable<ModelDetailsResponse>
> = (route: ActivatedRouteSnapshot) => {
  const loadingService = inject(LoadingService);
  const unitService = inject(UnitApi);
  const id = route.paramMap.get('id');
  loadingService.show();
  return unitService
    .getModelById(id!)
    .pipe(map((res) => res.data), finalize(() => loadingService.hide()));
};
