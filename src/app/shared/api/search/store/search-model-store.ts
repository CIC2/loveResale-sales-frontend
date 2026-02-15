import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, filter, pipe, switchMap, tap } from 'rxjs';
import { SearchModelFilters, SearchModelResponse } from '../models';
import { SearchService } from '../services/search';

export interface SearchStateInitial extends SearchModelResponse {
  isLoading: boolean;
  isInitialized: boolean;
  filters: SearchModelFilters;
}


export const SearchModelStore = signalStore(
  { providedIn: 'root' },
  withState<SearchStateInitial>({
    locations: [],
    projects: [],
    unitTypes: [],
    areaRanges: [],
    unitModels: [],
    bedrooms: [],
    bathrooms: [],
    floors: [],
    deliveries: [],
    isLoading: false,
    isInitialized: false,
    filters: {},
  }),

  withComputed((store) => ({
    areaRangesDisplay: computed(() => {
      const ranges = store.areaRanges();
      const filters = store.filters();

      if (ranges.length >= 2) {
        return {
          min: ranges[0],
          max: ranges[1],
          value: [filters.areaFrom ?? ranges[0], filters.areaTo ?? ranges[1]],
        };
      }

      return { min: 0, max: 0, value: [0, 0] };
    }),

    isAreaSliderDisabled: computed(() => {
      const ranges = store.areaRanges();
      const filters = store.filters();
      const hasProjects = filters.projectIds && filters.projectIds.length > 0;

      return !hasProjects || ranges[0] === ranges[1] || store.isLoading();
    }),

    locationsDisplay: computed(() => store.locations()),
    projectsDisplay: computed(() => store.projects()),
    unitTypesDisplay: computed(() => store.unitTypes() ?? []),
    unitModelsDisplay: computed(() => store.unitModels() ?? []),
    bedroomsDisplay: computed(() => store.bedrooms() ?? []),
    bathroomsDisplay: computed(() => store.bathrooms() ?? []),
    floorsDisplay: computed(() => store.floors() ?? []),
    deliveriesDisplay: computed(() => store.deliveries() ?? []),
    selectedLocationId: computed(() => store.filters().locationId ?? null),
    selectedProjectIds: computed(() => store.filters().projectIds ?? []),
    selectedUnitTypeIds: computed(() => store.filters().unitTypeIds ?? null),
    selectedAreaFrom: computed(() => store.filters().areaFrom ?? null),
    selectedAreaTo: computed(() => store.filters().areaTo ?? null),
    selectedProjectsMasterPlan: computed(() => {
      const selectedIds = store.filters().projectIds || [];
      const projects = store.projects() || [];
      return projects.filter((p) => selectedIds.includes(p.id));
    }),
  })),

  withMethods((store, searchService = inject(SearchService)) => ({

    loadInitialData: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          searchService.getSearchModel({}).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  locations: response.data.locations,
                  projects: response.data.projects,
                  unitTypes: response.data.unitTypes,
                  areaRanges: response.data.areaRanges,
                  unitModels: response.data.unitModels,
                  bedrooms: response.data.bedrooms,
                  bathrooms: response.data.bathrooms,
                  floors: response.data.floors,
                  deliveries: response.data.deliveries,
                  isLoading: false,
                  isInitialized: true,
                });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          )
        )
      )
    ),

    updateFilters: rxMethod<Partial<SearchModelFilters>>(
      pipe(
        filter(() => store.isInitialized()),
        tap((newFilters) => {
          const currentFilters = store.filters();
          let updatedFilters = { ...currentFilters, ...newFilters };
          if (
            (newFilters.projectIds !== undefined &&
              JSON.stringify(newFilters.projectIds) !==
              JSON.stringify(currentFilters.projectIds)) ||
            (newFilters.unitTypeIds !== undefined &&
              JSON.stringify(newFilters.unitTypeIds) !==
              JSON.stringify(currentFilters.unitTypeIds))
          ) {
            updatedFilters = {
              ...updatedFilters,
              areaFrom: null,
              areaTo: null,
            };
          }

          patchState(store, {
            isLoading: true,
            filters: updatedFilters,
          });
        }),
        debounceTime(500),
        switchMap(() => {
          const filters = store.filters();
          return searchService.getSearchModel(filters).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  locations: response.data.locations || store.locations(),
                  projects: response.data.projects,
                  unitTypes: response.data.unitTypes,
                  areaRanges: response.data.areaRanges,
                  unitModels: response.data.unitModels,
                  bedrooms: response.data.bedrooms,
                  bathrooms: response.data.bathrooms,
                  floors: response.data.floors,
                  deliveries: response.data.deliveries,
                  isLoading: false,
                });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          );
        })
      )
    ),

    setAreaRange(areaFrom: number, areaTo: number) {
      this.updateFilters({ areaFrom, areaTo });
    },
  })),


  withHooks({
    onInit(store) {
      store.loadInitialData();
    },
  })
);
