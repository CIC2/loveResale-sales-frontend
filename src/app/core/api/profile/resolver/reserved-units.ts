import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservedUnits } from '../models/reserved-units';

@Injectable({ providedIn: 'root' })
export class ReservedUnitsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/offer/customer`;
  getOffers(): Observable<ApiResponse<ReservedUnits>> {
    return this.http.get<ApiResponse<ReservedUnits>>(this.baseUrl);
  }
}
