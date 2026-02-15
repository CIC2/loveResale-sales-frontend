import { cookiesSSRInterceptor } from './cookies-ssr.interceptor';
import { httpErrorInterceptor } from './http-error.interceptor';
import { responseMessageInterceptor } from './response-message.interceptor';

export const interceptors = [httpErrorInterceptor, cookiesSSRInterceptor, responseMessageInterceptor];
