# Developer guide

This document covers project conventions, how to add features and shared components, i18n, styling, running the app, and testing.

## Conventions

The project follows these rules; keep them in mind when adding or changing code.

- **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<form>`, `<label>`, `<ul>`/`<ol>`/`<li>`, `<figure>`, `<time>`, and correct heading hierarchy. Avoid generic `<div>`/`<span>` where a semantic element exists.
- **Reactive Forms only**: Use `FormBuilder`, `FormGroup`, `FormControl`; no `ngModel` or template-driven forms. Validation logic in TypeScript; display messages via Transloco.
- **Standalone components**: All components are standalone (`standalone: true`) and import their own Angular/PrimeNG modules. No NgModules unless explicitly required.
- **Angular control flow**: Use `@if`, `@for`, `@switch` in templates; avoid `*ngIf`, `*ngFor`, `*ngSwitch`.
- **BEM + SCSS**: Class names follow BEM (block__element--modifier). All styling in SCSS files; no inline styles in HTML.
- **Layout**: Use Flexbox and CSS Grid, padding, margin, and gap. Do not use `position: relative`, `position: absolute`, or `position: fixed` for layout (unless explicitly requested).
- **Design tokens**: Colors and font sizes must be CSS variables from the global variables sheet in `styles/`; use `var(--token-name)`. Use `rem` for font-size and spacing; avoid `px`.
- **i18n**: All user-facing text via Transloco (`TranslocoPipe` or `TranslocoService.translate()`). Support English (en) and Arabic (ar); Arabic is RTL.
- **Icons**: Use the shared `SvgIconComponent` (or project icon component); no inline SVG, PrimeIcons only where appropriate, or icon fonts for primary UI.
- **PrimeNG**: Use PrimeNG v21 components (p-button, p-inputText, p-dropdown, p-table, p-dialog, etc.) as first-choice UI elements.
- **Global styles**: Global SCSS (variables, mixins, typography) in `styles/`; component SCSS only for component-specific styles. PrimeNG theme in [src/app/theme.ts](../src/app/theme.ts).

## Adding a new feature

1. **Create the feature folder** under `src/app/features/<feature-name>/` (e.g. `my-feature`).
2. **Add the page component** (e.g. `my-feature.ts` + `my-feature.html` + `my-feature.scss`) and optional `components/` subfolder for child components.
3. **Create a route file** (e.g. `my-feature.route.ts`) that exports a `Routes` array:
   ```ts
   import { Routes } from '@angular/router';
   export const MY_FEATURE_ROUTES: Routes = [
     { path: '', loadComponent: () => import('./my-feature').then(c => c.MyFeature) },
   ];
   ```
4. **Register the route** in [src/app/layout/main-layout.route.ts](../src/app/layout/main-layout.route.ts) as a child of `CUSTOMER_LAYOUT`:
   ```ts
   {
     path: 'my-feature',
     loadChildren: () => import('features/my-feature/my-feature.route').then(m => m.MY_FEATURE_ROUTES),
   },
   ```
   For a single component without child routes, you can use `loadComponent` instead of `loadChildren` (see existing `home`, `profile`, `payment`).
5. **Add guards or resolvers** if needed: create them in `core/guards/` or `core/api/.../resolver/`, then add `canActivate` or `resolve` to the route.
6. **Add translations** for the feature in `public/i18n/en.json` and `public/i18n/ar.json` under a namespace (e.g. `myFeature.title`).

## Adding a new shared component

1. **Place the component** under `src/app/shared/components/<component-name>/` (e.g. `my-component/` with `my-component.ts`, `my-component.html`, `my-component.scss`).
2. **Use standalone**: `standalone: true`, import required Angular and PrimeNG modules.
3. **Export from barrel**: Add `export * from './my-component/my-component';` to [shared/components/index.ts](../src/app/shared/components/index.ts) if it should be available via `import { MyComponent } from 'shared/components'`.
4. **Follow conventions**: Semantic HTML, BEM, SCSS, design tokens, Transloco for text, shared icon component for icons.

## i18n

- **Translation files**: `public/i18n/en.json` and `public/i18n/ar.json`. Loaded at runtime from `/i18n/{lang}.json` via `TranslocoHttpLoader`.
- **Adding keys**: Use a namespaced structure (e.g. `home.title`, `auth.login.button`, `profile.form.gender.male`). Add the same key in both `en.json` and `ar.json`.
- **RTL**: Arabic uses RTL. Prefer logical CSS properties (e.g. `margin-inline-start` instead of `margin-left`) and avoid hardcoding left/right for layout so RTL works without extra overrides.

## Styling

- **Global tokens**: Define colors, font sizes, and spacing in the global variables file under `src/styles/` (e.g. `_variables.scss`). Use `var(--color-primary)`, `var(--font-size-md)`, etc. in component SCSS.
- **Component SCSS**: Only component-specific styles; no global token definitions in component files.
- **PrimeNG**: Customize via [src/app/theme.ts](../src/app/theme.ts). Do not override PrimeNG global styles in component SCSS.
- **Units**: Prefer `rem` for font-size, spacing, width, height.

## Running the app

- **Prerequisites**: Node.js (^20.19.0, ^22.12.0, or ^24.0.0), npm. See [README](../README.md).
- **Install**: `npm install`
- **Dev server**: `ng serve` (or `ng s`). App at `http://localhost:4200/`.
- **Proxy**: API requests can be proxied via [proxy.config.json](../proxy.config.json) (e.g. `/api` → backend). Configure in `angular.json` under `serve.options.proxyConfig` if needed.
- **SSR**: `npm run serve:ssr` (or `node dist/vso-revamp/server/server.mjs` after build) to run the server-rendered build.

## Testing

- **Runner**: `ng test` runs unit tests (Karma by default).
- **Where to add tests**: Place spec files next to the source (e.g. `my-feature.spec.ts` beside `my-feature.ts`) or as configured in the project. Core services, guards, and resolvers are good candidates for unit tests; components can use Angular testing utilities.
- **Constraints**: Project uses `skipTests: true` in some schematics; add tests manually when required. Ensure tests do not depend on layout (position) or hardcoded strings that should be translated.

## Related documentation

- [Architecture](architecture.md) — Bootstrap, path aliases, styles, i18n setup.
- [Routing](routing.md) — Route structure and lazy loading.
- [Core](core.md) — APIs, guards, interceptors.
- [Shared](shared.md) — Shared components and where to add new ones.
