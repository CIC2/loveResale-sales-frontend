import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiResponse } from 'core/models';
import { Observable } from 'rxjs';
import { ComparisonService } from 'shared/api/search/services/comparison';
import { ModelDetailsComparison } from '../models/model-details-res';

export const ComparisonResolver: ResolveFn<
  Observable<ModelDetailsComparison[]>
> = () => {
  const comparisonService = inject(ComparisonService);
  return comparisonService.compareUnitIds();
};
