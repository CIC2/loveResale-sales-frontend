# Core reference

This document lists core APIs, guards, interceptors, injections, constants, validators, and directives. Request/response shapes are specified in [Backend API spec](backend-api-spec.md).

## API modules

All API modules live under `core/api/`. Each area exposes services and models used by features.

| Area | Purpose | Main service / API | Key models |
|------|---------|--------------------|------------|
| **auth** | Login, sign up, OTP, password reset, current user | `AuthApi` ([core/api/auth/services/auth-api.ts](../src/app/core/api/auth/services/auth-api.ts)) | `LoginPayload`, `UserResponse`, `VerifyOtpPayload`, `RegisterPayload`, etc. ([auth.interface.ts](../src/app/core/api/auth/models/auth.interface.ts)) |
| **search** | Units list, model by ID, comparison | `UnitApi` ([core/api/search/services/unit.ts](../src/app/core/api/search/services/unit.ts)) | `ModelDetailsResponse`, `ModelDetailsComparison`, `ComparisonProperty`, `ComparisonRow` ([search/models](../src/app/core/api/search/models)) |
| **model-details** | Resolver for unit detail page | `ModelResolver` ([core/api/model-details/resolver/model-resolver.ts](../src/app/core/api/model-details/resolver/model-resolver.ts)) | Uses `ModelDetailsResponse` from search |
| **profile** | User profile, reserved units, appointments | `ProfileApi` ([core/api/profile/services/profile-api.ts](../src/app/core/api/profile/services/profile-api.ts)), `ReservedUnitsService` (resolver) | `UserProfile`, `ProfileResponse`, `ReservedUnits`, `AppointmentInfo`, etc. ([profile/models](../src/app/core/api/profile/models)) |
| **project-details** | Single project data | — (project-details API used by feature) | `FeatureItem`, `FacilitiesSwipe` ([project-details/models](../src/app/core/api/project-details/models)) |
| **layout** | Projects list for header/nav | `ProjectsApi` ([core/api/layout/services/projects-api.ts](../src/app/core/api/layout/services/projects-api.ts)) | `Project` ([project.interface.ts](../src/app/core/api/layout/models/project.interface.ts)) |
| **offers** | Offers list | `OffersApi` ([core/api/offers/services/offers-api.ts](../src/app/core/api/offers/services/offers-api.ts)) | `OfferResponse` ([offer-model.ts](../src/app/core/api/offers/model/offer-model.ts)) |
| **appointment** | Create/list appointments, feedback | `AppointmentApi` ([core/api/appointment/services/appointment-api.ts](../src/app/core/api/appointment/services/appointment-api.ts)) | `Appointment`, `CreateAppointment`, `FeedbackPayload` ([appointment.ts](../src/app/core/api/appointment/models/appointment.ts)) |

General API response shape: [core/models/general-api.ts](../src/app/core/models/general-api.ts) (`ApiResponse<T>`).

## Guards

| Guard | File | Behavior |
|-------|------|----------|
| **authGuard** | [core/guards/auth.guard.ts](../src/app/core/guards/auth.guard.ts) | Uses `UserStateService.currentUser`; redirects to `/home` if not authenticated, otherwise allows activation. |
| **comparisonGuard** | [core/guards/comparison.guard.ts](../src/app/core/guards/comparison.guard.ts) | Ensures `ComparisonService` comparison state is set (e.g. `setIsOpenedCompare(true)`) before activation; always returns `true`. |

Exported from [core/guards/index.ts](../src/app/core/guards/index.ts) (authGuard only; comparisonGuard imported directly where needed).

## Interceptors

Registered in [core/interceptors/index.ts](../src/app/core/interceptors/index.ts) in this order:

1. **httpErrorInterceptor** ([http-error.interceptor.ts](../src/app/core/interceptors/http-error.interceptor.ts)) — Catches HTTP errors: 404 → navigate to `/not-found`; 401 → show “Session expired” message and navigate to `/home`. Re-throws error.
2. **cookiesSSRInterceptor** ([cookies-ssr.interceptor.ts](../src/app/core/interceptors/cookies-ssr.interceptor.ts)) — On the server, forwards the incoming request’s `Cookie` header to outgoing HTTP requests so backend auth works with SSR.
3. **responseMessageInterceptor** ([response-message.interceptor.ts](../src/app/core/interceptors/response-message.interceptor.ts)) — Shows PrimeNG toast on HTTP errors (except for ignored URLs like `/i18n/`, assets, etc.). On browser, shows “No Internet Connection” when offline and throws.

## Injections / app-wide services

| Service / provider | File | Purpose |
|--------------------|------|---------|
| **TranslocoHttpLoader** | [core/injections/transloco-loader.ts](../src/app/core/injections/transloco-loader.ts) | Loads translation JSON from `/i18n/{lang}.json`. |
| **IconLoaderService** | [core/injections/icon-loader.ts](../src/app/core/injections/icon-loader.ts) | Loads SVG icons used by the shared icon component. |
| **AppInitializeService** | [core/injections/app-initialize.ts](../src/app/core/injections/app-initialize.ts) | Runs on app init: loads translation for active lang, fetches current user and stores in `UserStateService`, connects Socket, handles transfer state for SSR. |
| **SocketService** | [core/injections/socket-service.ts](../src/app/core/injections/socket-service.ts) | Manages Socket.io connection (e.g. for real-time updates). |
| **ZoomService** | [core/services/loading/zoom.service.ts](../src/app/core/services/loading/zoom.service.ts) | Zoom Meeting SDK integration. |
| **CookieService** | [core/injections/cookie-service.ts](../src/app/core/injections/cookie-service.ts) | Cookie read/write (e.g. for auth or preferences). |
| **LoadingService** | [core/services/loading/loading.service.ts](../src/app/core/services/loading/loading.service.ts) | Global loading state (show/hide). |
| **provideAppLang** | [core/injections/app-lang.ts](../src/app/core/injections/app-lang.ts) | Provides `APP_LANG_TOKEN` for the initial/active app language. |
| **SwiperRegisterService** | [core/injections/swiper-register.ts](../src/app/core/injections/swiper-register.ts) | Registers Swiper modules for carousels. |

## Constants

| Constant | File | Use |
|----------|------|-----|
| **Language** | [core/constants/app/language.constants.ts](../src/app/core/constants/app/language.constants.ts) | `Language.ENGLISH`, `Language.ARABIC` for lang codes. |
| **AvailableLangs** | Same | Array of supported langs for Transloco. |
| **SocketEvent**, **SocketEventListner**, **QueuePosition**, **CallConnected** | [core/constants/app/socket.constants.ts](../src/app/core/constants/app/socket.constants.ts) | Socket event names and payload types. |
| **AppConstants** | [core/constants/app/app.constants.ts](../src/app/core/constants/app/app.constants.ts) | App-wide constants. |
| **Nationalities** | [core/constants/nationality.constant.ts](../src/app/core/constants/nationality.constant.ts) | List of nationalities (e.g. for profile forms). |

Exported from [core/constants/app/index.ts](../src/app/core/constants/app/index.ts).

## Validators

| Validator | File | Purpose |
|-----------|------|---------|
| **ConfirmPasswordValidator** | [core/validators/confirm-password.validators.ts](../src/app/core/validators/confirm-password.validators.ts) | Validates that a “confirm password” control matches the password control (reactive forms). |

Exported from [core/validators/index.ts](../src/app/core/validators/index.ts).

## Directives

| Directive | File | Purpose |
|-----------|------|---------|
| **DefaultImg** | [core/directives/default-img.ts](../src/app/core/directives/default-img.ts) | Image fallback when the primary image fails to load. |

## Related documentation

- [Routing](routing.md) — Where guards and resolvers are used.
- [Backend API spec](backend-api-spec.md) — API contracts.
- [Features](features.md) — Which features use which core APIs.
