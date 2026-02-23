# Features catalog

This document lists each feature area: purpose, routes, main container, key child components, and dependencies. Use it to find where to implement or extend behavior.

## Home

- **Purpose**: Landing page with hero, process steps, featured properties, promotional banner, and projects listing.
- **Route(s)**: `home`
- **Main container**: [Home](../src/app/features/home/home.ts) (`features/home/home.ts`)
- **Key child components**: HeroSection, ProcessSteps, FeaturedProperties, PromotionalBanner, ProjectsListing (from [features/home/components](../src/app/features/home/components))
- **Dependencies**: Layout ProjectsApi (or shared API) for projects listing; Transloco for copy. No guards.

---

## All units

- **Purpose**: Browse and filter all units with search header, filters sidebar, and units grid.
- **Route(s)**: `all-units`
- **Main container**: [AllUnitsPage](../src/app/features/all-units/all-units-page.ts) (`features/all-units/all-units-page.ts`)
- **Key child components**: SearchHeader, FiltersSidebar, UnitsGrid, UnitCard (from [features/all-units/components](../src/app/features/all-units/components))
- **Dependencies**: Shared `SearchService`, `SearchStore` ([shared/api/search](../src/app/shared/api)); core `UnitApi` for data if used. No resolvers; optional comparisonGuard for a comparison route.

---

## Model details (unit detail)

- **Purpose**: Single unit/model detail with gallery, info header, payment plan, overview, features, map, contact salesman, similar units.
- **Route(s)**: `model/:id`
- **Main container**: [ModelDetails](../src/app/features/model-details/model-details.ts) (`features/model-details/model-details.ts`)
- **Key child components**: UnitGallery, UnitInfoHeader, PaymentPlan, UnitOverview, UnitFeatures, ProjectFeatures, UnitMap, ContactSalesman, SimilarUnits (from [features/model-details/components](../src/app/features/model-details/components))
- **Dependencies**: Core `ModelResolver` (provides `model` in route data); `UnitApi` / search models (`ModelDetailsResponse`). Component reads `route.snapshot.data['model']`.

---

## Projects

- **Purpose**: List of projects with hero section.
- **Route(s)**: `projects`
- **Main container**: [Projects](../src/app/features/projects/projects.ts) (`features/projects/projects.ts`)
- **Key child components**: ProjectsHero (from [features/projects/components](../src/app/features/projects/components))
- **Dependencies**: Core `ProjectsApi` (layout) for projects list; Transloco.

---

## Project details

- **Purpose**: Single project page with hero, overview, features, gallery, map, model types carousel, contact form, sidebar.
- **Route(s)**: `project-details/:id`
- **Main container**: [ProjectDetails](../src/app/features/project-details/project-details.ts) (`features/project-details/project-details.ts`)
- **Key child components**: ProjectHero, ProjectOverview, ProjectFeatures, ModelTypesCarousel, ProjectMap, ProjectGallery, ProjectContactForm, AboutProjectSidebar (from [features/project-details/components](../src/app/features/project-details/components))
- **Dependencies**: Core project-details API (models: FeatureItem, FacilitiesSwipe); Transloco.

---

## Profile

- **Purpose**: User profile dashboard: sidebar navigation and profile form (personal info, activity).
- **Route(s)**: `profile`
- **Main container**: [Profile](../src/app/features/profile/profile.ts) (`features/profile/profile.ts`)
- **Key child components**: ProfilePageComponent, ProfileSidebarComponent, ProfileFormComponent (from [features/profile](../src/app/features/profile))
- **Dependencies**: Core `ProfileApi`, profile models; optional `authGuard` if route is protected; shared components as needed.

---

## Payment

- **Purpose**: Payment flow: methods, summary, preview.
- **Route(s)**: `payment`
- **Main container**: [Payment](../src/app/features/payment/payment.ts) (`features/payment/payment.ts`)
- **Key child components**: PaymentSummary, PaymentMethods, PaymentPreview (from [features/payment/components](../src/app/features/payment/components))
- **Dependencies**: Core offers/payment APIs as needed; optional `authGuard`; Transloco.

---

## Inventory

- **Purpose**: Inventory table with search header, filters, and sales card for sales users.
- **Route(s)**: `inventory`
- **Main container**: [Inventory](../src/app/features/inventory/inventory.ts) (`features/inventory/inventory.ts`)
- **Key child components**: InventorySearchHeader, InventoryTable, SalesCard (from [features/inventory/components](../src/app/features/inventory/components))
- **Dependencies**: FormBuilder, PrimeNG Table/Select/InputText; backend inventory APIs (see [backend-api-spec](backend-api-spec.md)); Transloco.

---

## Add lead

- **Purpose**: Form to add a new lead (e.g. customer inquiry).
- **Route(s)**: `add-lead`
- **Main container**: [AddLead](../src/app/features/add-lead/add-lead.ts) (`features/add-lead/add-lead.ts`)
- **Key child components**: AddLeadForm (from [features/add-lead/components](../src/app/features/add-lead/components))
- **Dependencies**: Reactive forms; shared components (e.g. MobileNumberInput, validation); Transloco; backend lead API.

---

## Auth (reusable flow)

- **Purpose**: Sign in, sign up, verify account, forget password, new password. Used as dialogs or standalone views; not a top-level layout route.
- **Route(s)**: No route in `CUSTOMER_LAYOUT`; header links to `/auth/login` and opens sign-in via dynamic import (e.g. [header.ts](../src/app/layout/components/header/header.ts)).
- **Main components**: SignIn, SignUp, VerifyAccount, ForgetPassword, NewPassword; sub-forms: PersonalInfoForm, AccountCredentialsForm (from [features/auth/components](../src/app/features/auth/components))
- **Dependencies**: Core `AuthApi`, auth models (`LoginPayload`, `RegisterPayload`, `VerifyOtpPayload`, etc.); shared components (e.g. MobileNumberInput, TermsDialog); Transloco.

---

## Related documentation

- [Routing](routing.md) — How each feature is mounted (loadComponent vs loadChildren).
- [Core](core.md) — API services and guards used by features.
- [Shared](shared.md) — Shared components and pipes used across features.
