# Routing and navigation

This document describes the route map, lazy loading strategy, guards, and resolvers used in the loveResale Sales Frontend.

## Route map

Root is defined in [src/app/app.routes.ts](../src/app/app.routes.ts): a single path `''` with `MainLayout` and its children from [src/app/layout/main-layout.route.ts](../src/app/layout/main-layout.route.ts) (`CUSTOMER_LAYOUT`).

| Path | Target | Lazy type |
|------|--------|-----------|
| `''` | Redirect to `home` | — |
| `home` | Home page | `loadComponent` → `features/home/home` |
| `all-units` | All units listing | `loadChildren` → `features/all-units/all-units.route` |
| `model/:id` | Unit/model detail | `loadComponent` → `features/model-details/model-details` + `ModelResolver` |
| `profile` | User profile | `loadComponent` → `features/profile/profile` |
| `projects` | Projects list | `loadChildren` → `features/projects/projects.route` |
| `project-details/:id` | Single project | `loadChildren` → `features/project-details/project-details.route` |
| `payment` | Payment | `loadComponent` → `features/payment/payment` |
| `inventory` | Inventory | `loadChildren` → `features/inventory/inventory.route` |
| `add-lead` | Add lead | `loadChildren` → `features/add-lead/add-lead.route` |
| `404` | Not found page | `loadComponent` → `shared/components` (NotFoundComponent) |
| `**` | Redirect to `404` | — |

All routes are children of `MainLayout`; the layout’s header, footer, and `<router-outlet>` wrap every page.

## Lazy loading

- **loadComponent**: Used for single top-level components: `home`, `model/:id`, `profile`, `payment`, and the shared `404` component. The route file imports the component directly (e.g. `import('features/home/home').then(c => c.Home)`).
- **loadChildren**: Used for features that export a `Routes` array from a route file:
  - `all-units` → [features/all-units/all-units.route.ts](../src/app/features/all-units/all-units.route.ts) (`ALL_UNITS_ROUTES`) — single empty path → `AllUnitsPage`.
  - `projects` → [features/projects/projects.route.ts](../src/app/features/projects/projects.route.ts) (`PROJECTS_ROUTES`).
  - `project-details/:id` → [features/project-details/project-details.route.ts](../src/app/features/project-details/project-details.route.ts) (`PROJECT_DETAILS`).
  - `inventory` → [features/inventory/inventory.route.ts](../src/app/features/inventory/inventory.route.ts) (`INVENTORY_ROUTES`).
  - `add-lead` → [features/add-lead/add-lead.route.ts](../src/app/features/add-lead/add-lead.route.ts) (`ADD_LEAD_ROUTES`).

Router is configured with `withComponentInputBinding()`, so route params and resolved data can be bound as component inputs where applicable.

## Guards

Guards live in `core/guards/`. They are functional guards (`CanActivateFn`).

### authGuard

- **File**: [core/guards/auth.guard.ts](../src/app/core/guards/auth.guard.ts)
- **Behavior**: Uses `UserStateService.currentUser` (signal). If the user is not authenticated, navigates to `/home` and returns `false`; otherwise returns `true`.
- **Usage**: Imported in `main-layout.route.ts`; can be added to protected routes (e.g. `profile`, `payment`) with `canActivate: [authGuard]` when those pages should require login.

### comparisonGuard

- **File**: [core/guards/comparison.guard.ts](../src/app/core/guards/comparison.guard.ts)
- **Behavior**: Uses `ComparisonService` to ensure comparison state is set (e.g. `setIsOpenedCompare(true)`) before allowing activation. Always returns `true` after updating state.
- **Usage**: Can be used on routes that need the comparison UI state (e.g. a comparison page) to be opened correctly.

## Resolvers

### ModelResolver

- **File**: [core/api/model-details/resolver/model-resolver.ts](../src/app/core/api/model-details/resolver/model-resolver.ts)
- **Route**: `model/:id`
- **Behavior**: Reads `id` from the route, calls `UnitApi.getModelById(id)`, shows loading via `LoadingService`, and returns the model data (`ModelDetailsResponse`). The result is stored in route data under the key `model`.
- **Consumer**: [ModelDetails](../src/app/features/model-details/model-details.ts) reads it in `ngOnInit()` via `this.route.snapshot.data['model']` and sets `unitData` and gallery images so the unit detail page renders without an extra request.

### ComparisonResolver

- **File**: [core/api/search/resolver/comparison-resolver.ts](../src/app/core/api/search/resolver/comparison-resolver.ts)
- **Behavior**: Resolves comparison-related data for the comparison feature.
- **Usage**: Not currently used in any route; available for a comparison route if one is added.

## Related documentation

- [Architecture](architecture.md) — App structure and bootstrap.
- [Core](core.md) — Guard and resolver implementations.
- [Features](features.md) — Per-feature routes and components.
