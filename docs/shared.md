# Shared reference

This document lists shared components, pipes, directives, and shared API/state. These are reusable across features and layout.

## Shared components

Components live under `shared/components/`. Many are exported from [shared/components/index.ts](../src/app/shared/components/index.ts).

| Component | Path | Purpose |
|-----------|------|---------|
| **NotFoundComponent** | [shared/components/not-found/app-not-found.ts](../src/app/shared/components/not-found/app-not-found.ts) | 404 page: icon and “Page Not Found” message. Used by route `404`. |
| **EmptyStateComponent** | [shared/components/empty-state/empty-state.component.ts](../src/app/shared/components/empty-state/empty-state.component.ts) | Empty state placeholder (e.g. no results). |
| **ValidationError** | [shared/components/error/validation-error.ts](../src/app/shared/components/error/validation-error.ts) | Displays validation errors using ValidationPipe. |
| **MobileAppPromo** | [shared/components/mobile-app-promo/mobile-app-promo.ts](../src/app/shared/components/mobile-app-promo/mobile-app-promo.ts) | Promotional block for mobile app. |
| **MobileNumberInput** | [shared/components/mobile-number-input/mobile-number-input.ts](../src/app/shared/components/mobile-number-input/mobile-number-input.ts) | Country code + national number input (e.g. auth, contact forms). Uses google-libphonenumber; data from [mobile-number-data.ts](../src/app/shared/components/mobile-number-input/mobile-number-data.ts). |
| **ModelInfoCard** | [shared/components/model-info-card/model-info-card.ts](../src/app/shared/components/model-info-card/model-info-card.ts) | Card showing unit/model summary (used in comparison, listings). |
| **SharedInputRange** | [shared/components/shared-input-range/shared-input-range.ts](../src/app/shared/components/shared-input-range/shared-input-range.ts) | Min/max range input (e.g. price, area filters). |
| **TermsDialog** | [shared/components/terms-dialog/terms-dialog.ts](../src/app/shared/components/terms-dialog/terms-dialog.ts) | Dialog showing terms (EN/AR content). Used in sign-up flow. |

Import from `shared/components` when the component is in the barrel (e.g. `NotFoundComponent`); otherwise import from the component file directly.

## Pipes

| Pipe | Path | Purpose |
|------|------|---------|
| **CountdownPipe** | [shared/pipe/countdown.ts](../src/app/shared/pipe/countdown.ts) | Countdown display (e.g. time remaining). |
| **ValidationPipe** | [shared/components/error/pipe/validation.pipe.ts](../src/app/shared/components/error/pipe/validation.pipe.ts) | Maps form validation errors to user-facing messages (used by ValidationError component). |

## Directives

| Directive | Path | Purpose |
|-----------|------|---------|
| **ImageFallbackDirective** (or equivalent) | [shared/directives/image-fallback.directive.ts](../src/app/shared/directives/image-fallback.directive.ts) | Fallback when image fails to load. |

Exported from [shared/directives/index.ts](../src/app/shared/directives/index.ts).

## Shared API / state

Shared API and state live under `shared/api/`. They are used by features and core (e.g. guards, layout).

### User state

- **Path**: [shared/api/user-state](../src/app/shared/api/user-state)
- **Main service**: `UserStateService` ([service/user-state.ts](../src/app/shared/api/user-state/service/user-state.ts)) — holds current user state (signal); used by `authGuard`, header, app initializer, interceptors.
- **Models**: e.g. current user model in [user-state/models](../src/app/shared/api/user-state/models).
- **Usage**: Import `UserStateService` from `shared/api` (or `shared/api/user-state`). Core auth flow and layout depend on it.

### Search

- **Path**: [shared/api/search](../src/app/shared/api/search)
- **Services**: `SearchService` ([services/search.ts](../src/app/shared/api/search/services/search.ts)) — search API calls; `ComparisonService` ([services/comparison.ts](../src/app/shared/api/search/services/comparison.ts)) — comparison state and API.
- **Stores**: `SearchStore` ([store/search-store.ts](../src/app/shared/api/search/store/search-store.ts)); search model store for unit/project filters and results.
- **Models**: e.g. [search/models](../src/app/shared/api/search/models) — `Model`, search state types.
- **Usage**: Import from `shared/api/search/services/search`, `shared/api/search/store/search-store`, `shared/api/search/services/comparison`. Used by all-units, layout (comparison), and core `comparisonGuard` / `ComparisonResolver`.

**Relationship to core**: Core `UnitApi` and search resolvers handle raw API and route data; shared search services and stores manage client-side search/filter state and comparison UI state. Use core for fetching model/unit data and shared for search UI state and comparison.

## Related documentation

- [Features](features.md) — Which features use which shared components.
- [Core](core.md) — Core APIs vs shared API usage (e.g. auth vs user state).
- [Developer guide](developer-guide.md) — How to add a new shared component.
