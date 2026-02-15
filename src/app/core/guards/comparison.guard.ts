import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ComparisonService } from '../../shared/api/search/services/comparison'; // adjust path

export const comparisonGuard: CanActivateFn = (route, state) => {
  const comparison = inject(ComparisonService);

  if (!comparison.isOpenedCompare() || comparison.isOpened()) {
    comparison.setIsOpened(false);
    comparison.setIsOpenedCompare(true);
  }

  return true;
};
