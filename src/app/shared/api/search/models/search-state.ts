import { Model } from './model';
export interface SearchState {
  models: Model[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
  loading: boolean;
  error?: string | null;
}

export interface SearchFiltersParams {
  page?: number;
  locationId?: number;
  projectIds?: number | number[];
  usageTypeIds?: number | number[];
  areaFrom?: number;
  areaTo?: number;
  modelCode?: string;
  bathrooms?: number;
  bedrooms?: number;
  floors?: number | number[];
  deliveryDateFrom?: number | string;
  deliveryDateTo?: number | string;
}
