import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Appointment,
  CreateAppointment,
  FeedbackPayload,
  FeedBackResponse,
} from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/appointment/customer`;

  /** Fetch all user appointments */
  getAppointments(): Observable<ApiResponse<Appointment[]>> {
    return this.http.get<ApiResponse<Appointment[]>>(this.baseUrl);
  }

  /** Delete a customer appointment by ID */
  deleteAppointment(appointmentId?: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      `${this.baseUrl}/${appointmentId}`
    );
  }

  rescheduleAppointment(
    appointmentId?: number,
    schedule?: any,
    language?: string
  ): Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(`${this.baseUrl}`, {
      appointmentId,
      schedule,
      language,
    });
  }

  createAppointment(
    request: CreateAppointment
  ): Observable<ApiResponse<CreateAppointment>> {
    return this.http.post<ApiResponse<CreateAppointment>>(
      `${this.baseUrl}/appointment`,
      request
    );
  }
  rateAppointment(
    payload: FeedbackPayload
  ): Observable<ApiResponse<FeedBackResponse>> {
    return this.http.put<ApiResponse<FeedBackResponse>>(
      `${this.baseUrl}/rating`,
      payload
    );
  }
}
