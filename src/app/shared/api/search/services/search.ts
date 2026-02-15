// src/app/services/search.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import { removeEmptyKeys } from 'core/utility';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  SearchFiltersParams,
  SearchModelFilters,
  SearchModelResponse,
  SearchState,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private baseUrl = ` ${environment.baseUrl}/inventory/customer`;
  searchCustomers(
    filters: SearchFiltersParams
  ): Observable<ApiResponse<SearchState>> {
    let params = removeEmptyKeys(filters);
    return this.http.get<ApiResponse<SearchState>>(`${this.baseUrl}`, {
      params,
    });
  }
  getSearchModel(
    filters: Partial<SearchModelFilters>
  ): Observable<ApiResponse<SearchModelResponse>> {
    const params = new HttpParams({ fromObject: removeEmptyKeys(filters) });

    return this.http.get<ApiResponse<SearchModelResponse>>(
      `${this.baseUrl}/filter`,
      {
        params,
      }
    );
  }
}
