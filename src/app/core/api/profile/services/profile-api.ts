import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NominationPayload, ProfilePayload, ProfileResponse, PurchaseReasonRes } from '../models';

@Injectable({ providedIn: 'root' })
export class ProfileApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/customer`;

  getProfile(): Observable<ApiResponse<ProfileResponse>> {
    return this.http.get<ApiResponse<ProfileResponse>>(
      `${this.baseUrl}/profile`
    );
  }

  logout(): Observable<ApiResponse<{}>> {
    return this.http.post<ApiResponse<{}>>(
      `${this.baseUrl}/profile/logout`,
      {}
    );
  }

  updateProfile(
    payload: ProfilePayload
  ): Observable<ApiResponse<ProfileResponse>> {
    return this.http.put<ApiResponse<ProfileResponse>>(
      `${this.baseUrl}/profile`,
      payload
    );
  }
  getProfileImage(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/profile/profilePicture`, {
      responseType: 'blob',
    });
  }
  getNationalIdPicture(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/profile/nationalIdPicture`, {
      responseType: 'blob',
    });
  }

  getPurchaseReasons(): Observable<ApiResponse<PurchaseReasonRes[]>> {
    return this.http.get<ApiResponse<PurchaseReasonRes[]>>(
      `${this.baseUrl}/profile/purchaseReasons`
    );
  }

  purchaseReasons(data: any): Observable<ApiResponse<{}>> {
    return this.http.post<ApiResponse<{}>>(
      `${this.baseUrl}/profile/purchaseReason`,
      data
    );
  }
  validateFullyRegistered(param: any): Observable<{
    valid: boolean
    missingFields: string[]
    customerId: number
  }
  > {
    const params = new HttpParams({ fromObject: param })
    return this.http.get<ApiResponse<{
      valid: boolean
      missingFields: string[]
      customerId: number
    }>>(`${this.baseUrl}/profile/validateFullyRegistered`, { params }).pipe(map((res) => res.data));
  }

  nominate(payload: NominationPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/profile/referral`, payload);
  }
}
