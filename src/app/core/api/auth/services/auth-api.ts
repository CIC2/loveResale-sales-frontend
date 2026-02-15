import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import {
  ConfirmPasswordPayload,
  ForgetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  UserResponse,
  VerifyOtpPayload,
  VerifyResetOtpPayload,
} from 'core/api/auth/models/auth.interface';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClient);
  private baseUrl = ` ${environment.baseUrl}/customer`;

  signUp(payload: RegisterPayload): Observable<ApiResponse<{}>> {
    return this.http.post<ApiResponse<{}>>(
      `${this.baseUrl}/auth/register`,
      payload
    );
  }

  signIn(data: LoginPayload): Observable<ApiResponse<UserResponse>> {
    return this.http.post<ApiResponse<UserResponse>>(
      `${this.baseUrl}/auth/login`,
      data
    );
  }
  sendOtp(countryCode: number, mobile: string): Observable<ApiResponse<{}>> {
    return this.http.post<ApiResponse<{}>>(`${this.baseUrl}/auth/sendOtp`, {
      countryCode: countryCode,
      mobile: mobile,
    });
  }

  forgetPassword(
    data: ForgetPasswordPayload
  ): Observable<ApiResponse<ForgetPasswordPayload>> {
    return this.http.post<ApiResponse<ForgetPasswordPayload>>(
      `${this.baseUrl}/profile/resetPassword`,
      data
    );
  }
  verifyResetOtp(
    data: VerifyResetOtpPayload
  ): Observable<ApiResponse<VerifyResetOtpPayload>> {
    return this.http.post<ApiResponse<VerifyResetOtpPayload>>(
      `${this.baseUrl}/profile/verifyResetOtp`,
      data
    );
  }
  verifyOtp(data: VerifyOtpPayload): Observable<ApiResponse<VerifyOtpPayload>> {
    return this.http.post<ApiResponse<VerifyOtpPayload>>(
      `${this.baseUrl}/auth/verifyOtp`,
      data
    );
  }

  confirmPassword(
    data: ConfirmPasswordPayload
  ): Observable<ApiResponse<ConfirmPasswordPayload>> {
    return this.http.post<ApiResponse<ConfirmPasswordPayload>>(
      `${this.baseUrl}/profile/confirmPassword`,
      data
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http
      .get<ApiResponse<UserResponse>>(`${this.baseUrl}/profile`)
      .pipe(map((res) => res.data));
  }
}
