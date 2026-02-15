import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelDetailsResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UnitApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/inventory/customer/`;

  getModelById(id: any): Observable<ApiResponse<ModelDetailsResponse>> {
    return this.http.get<ApiResponse<ModelDetailsResponse>>(
      `${this.baseUrl}${id}`
    );
  }
}
