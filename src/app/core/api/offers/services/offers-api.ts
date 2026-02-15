import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfferResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class OffersApi {
  private http = inject(HttpClient)
  private baseUrl = `${environment.baseUrl}/customer`;
  getOffers(): Observable<OfferResponse> {
    return this.http.get<OfferResponse>(`${this.baseUrl}/offer`);
  }
}
