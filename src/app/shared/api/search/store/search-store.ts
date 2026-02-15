import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { SearchFiltersParams, SearchState } from '../models';
import { SearchService } from '../services/search';
import { PaginatorState } from 'primeng/paginator';

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState<SearchState & { currentFilters: null | SearchFiltersParams }>({
    models: [],
    currentPage: 0,
    totalElements: 0,
    totalPages: 0,
    loading: false,
    error: null,
    currentFilters: null,
  }),
  withMethods((store, searchService = inject(SearchService)) => ({
    searchModels: rxMethod<SearchFiltersParams>(
      pipe(
        filter((filters: SearchFiltersParams) => !!filters.locationId),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        tap((filters) => {
          patchState(store, {
            loading: true,
            error: null,
            currentFilters: filters,
          });
        }),
        debounceTime(500),
        switchMap((filters) =>
          searchService.searchCustomers(filters).pipe(
            tapResponse({
              next: (res) => {
                patchState(store, {
                  models: res.data.models,
                  currentPage: filters.page ?? 0,
                  totalElements: res.data.totalElements,
                  totalPages: res.data.totalPages,
                  loading: false,
                  error: null,
                });
              },
              error: (err: any) =>
                patchState(store, {
                  loading: false,
                  error: err.message || 'Error loading models',
                }),
            })
          )
        )
      )
    ),
    changePage(event: PaginatorState) {
      const pageNumber = event.page;
      const currentFilters = store.currentFilters();
      if (currentFilters) {
        this.searchModels({ ...currentFilters, page: pageNumber });
      } else {
        this.searchModels({ page: pageNumber });
      }
    },
  }))
);
