import e from 'express';

export interface LoginPayload {
  mobile: string;
  password: string;
  countryCode: string;
}
export interface ForgetPasswordPayload {
  identifier: string;
  countryCode: string;
}

export interface UserResponse {
  fullName: string;
  arabicFullName: string;
  mobile: string;
  email: string;
  nationality: string;
  address: string;
  isVerified: boolean;
  nationalId: string;
  passportNumber: any;
  token: string;
}

export interface VerifyResetOtpPayload {
  otp: string;
  countryCode: string;
  identifier: string;
}
export interface VerifyOtpPayload {
  countryCode: number;
  mobile: string;
  otp: number | null;
}

export interface RegisterPayload {
  fullName: string | null;
  mobile: string | null;
  password: string | null;
  nationality: string;
  recaptcha: string;
  mail: string;
}
export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}
export interface ConfirmPasswordPayload {
  confirmPassword: string;
  countryCode: string;
  identifier: number;
  newPassword: string;
}
