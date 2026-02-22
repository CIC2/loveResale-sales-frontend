# Backend API Specification (UI-Driven)

This document specifies all APIs required by the **loveResale Sales Frontend** based on the UI (HTML templates and design) only. The backend must implement these endpoints and contracts for the application to function.

---

## 1. Overview

| Item | Value |
|------|--------|
| **Base URL** | `{API_BASE_URL}` (e.g. `https://api.example.com/v1`) |
| **Auth** | Bearer token in header: `Authorization: Bearer <token>` for protected endpoints. Token is returned from Sign In, Sign Up, or Verify OTP. |
| **Content-Type** | `application/json` for request/response bodies. |
| **Language** | Optional header e.g. `Accept-Language: en` or `ar` for localized responses where applicable. |

---

## 2. Conventions

### 2.1 Pagination

For list endpoints that support pagination:

- **Query parameters:** `page` (number, 1-based), `pageSize` (number).
- **Response:** `{ data: T[], totalRecords: number }` where `data` is the page items and `totalRecords` is the total count across all pages.

### 2.2 Phone Number Format

Phone numbers are sent in two parts:

- `countryCode`: string (e.g. `"+20"` for Egypt).
- `mobile`: string (national number without country code), or `identifier` when the full number is sent as one value.

Use consistently across Auth and Contact APIs.

### 2.3 i18n (Internationalization)

- The UI supports **English (en)** and **Arabic (ar)**.
- Reference data (e.g. nationalities) should expose `name_en` and `name_ar` (or equivalent) when labels are localized.
- Where the frontend uses translation keys (e.g. `allUnits.keywords.villa`), the API may return either the key or the localized string; if keys are returned, they must match the frontend i18n keys.

---

## 3. Authentication APIs

Base path: `/auth` (or as per your convention).

### 3.1 Sign In

**`POST /auth/login`**

Login with phone and password.

**Request body:**

```json
{
  "mobile": "string",
  "countryCode": "string",
  "password": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| mobile | string | Yes | National phone number without country code. |
| countryCode | string | Yes | E.g. "+20". |
| password | string | Yes | User password. |

**Response:** `200 OK`

```json
{
  "token": "string",
  "user": {
    "fullName": "string",
    "arabicFullName": "string",
    "email": "string",
    "mobile": "string",
    "nationality": "string",
    "address": "string",
    "isVerified": "boolean",
    "nationalId": "string"
  }
}
```

---

### 3.2 Sign Up

**`POST /auth/register`**

Register a new user (personal info + account credentials combined or in one step).

**Request body:**

```json
{
  "fullName": "string",
  "email": "string",
  "mobile": "string",
  "countryCode": "string",
  "address": "string | null",
  "nationality": "string",
  "password": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullName | string | Yes | Full name. |
| email | string | Yes | Email address. |
| mobile | string | Yes | National phone number. |
| countryCode | string | Yes | E.g. "+20". |
| address | string | No | Optional address. |
| nationality | string | Yes | Nationality code (from nationalities reference). |
| password | string | Yes | Password. |

**Response:** `201 Created` — Same user + token shape as Sign In, or `{ success: true }` if verification step follows.

---

### 3.3 Forget Password (Request OTP)

**`POST /auth/forget-password`**

Request OTP to reset password.

**Request body:**

```json
{
  "identifier": "string",
  "countryCode": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| identifier | string | Yes | Phone number (full or national). |
| countryCode | string | Yes | E.g. "+20". |

**Response:** `200 OK` — e.g. `{ success: true, message?: string }`.

---

### 3.4 Verify OTP (Reset Flow)

**`POST /auth/verify-reset-otp`**

Validate OTP after forget-password; returns token for the next step (set new password).

**Request body:**

```json
{
  "otp": "string",
  "identifier": "string",
  "countryCode": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| otp | string | Yes | 6-digit OTP. |
| identifier | string | Yes | Phone number. |
| countryCode | string | Yes | E.g. "+20". |

**Response:** `200 OK` — e.g. `{ token: "string" }` (reset token to be sent when setting new password).

---

### 3.5 Set New Password

**`POST /auth/reset-password`**

Set new password after OTP verification (reset flow). Send reset token in `Authorization` header.

**Request body:**

```json
{
  "newPassword": "string",
  "confirmPassword": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| newPassword | string | Yes | New password. |
| confirmPassword | string | Yes | Must match newPassword. |

**Response:** `200 OK` — e.g. `{ success: true }`.

---

### 3.6 Verify Account (e.g. Sign-up OTP)

**`POST /auth/verify-account`**

Verify mobile with OTP (e.g. after sign-up).

**Request body:**

```json
{
  "mobile": "string",
  "countryCode": "string",
  "otp": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| mobile | string | Yes | National phone number. |
| countryCode | string | Yes | E.g. "+20". |
| otp | string | Yes | 6-digit OTP. |

**Response:** `200 OK` — e.g. `{ token: "string", user: { ... } }`.

---

## 4. Current User

**`GET /auth/me`** or **`GET /users/me`**

Returns the currently authenticated user. Used by the header to show "My Account" vs "Login". Returns 401 if not authenticated.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "fullName": "string",
  "arabicFullName": "string",
  "email": "string",
  "mobile": "string",
  "nationality": "string",
  "address": "string",
  "isVerified": "boolean"
}
```

---

## 5. Reference / Lookup APIs

All return JSON arrays. Base path: `/reference` or per-resource (e.g. `/nationalities`).

### 5.1 Nationalities

**`GET /nationalities`** (or `/reference/nationalities`)

**Response:** `200 OK`

```json
[
  {
    "code": "string",
    "name_en": "string",
    "name_ar": "string"
  }
]
```

Used in: Sign-up, Profile. Frontend uses `code` as value and `name_en`/`name_ar` for label by active language.

---

### 5.2 Projects (Options)

**`GET /projects/options`** or **`GET /projects?options=true`**

**Response:** `200 OK`

```json
[
  {
    "id": "number",
    "value": "number | string",
    "name": "string",
    "nameAr": "string | null",
    "code": "string",
    "label": "string"
  }
]
```

Either `{ value, label }` for dropdowns or `{ id, name, nameAr, code }`; frontend can map to label. Used in: Home featured filters, All-units, Inventory, Add-lead.

---

### 5.3 Unit / Property Types

**`GET /reference/unit-types`** (or `/property-types`)

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.4 Locations

**`GET /reference/locations`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.5 Delivery Options

**`GET /reference/delivery-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.6 Model Options

**`GET /reference/models`** (or query by project)

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.7 Payment Options

**`GET /reference/payment-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

Used in: Model details reserve form.

---

### 5.8 Finishing Options

**`GET /reference/finishing-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.9 Maintenance Options

**`GET /reference/maintenance-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.10 Sort Options

**`GET /reference/sort-options`** or static on frontend.

**Response:** `200 OK`

```json
[
  { "value": "string", "label": "string" }
]
```

e.g. "Price (low to high)", "Newest first".

---

### 5.11 View Options

**`GET /reference/view-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.12 Installment Period Options

**`GET /reference/installment-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

---

### 5.13 Bedroom / Bathroom Options

**`GET /reference/bedroom-options`**, **`GET /reference/bathroom-options`** or static.

**Response:** `200 OK`

```json
[
  { "value": "number | string", "label": "string" }
]
```

e.g. 1, 2, 3, 4, 5+.

---

### 5.14 Gender Options

**`GET /reference/gender-options`** or static.

**Response:** `200 OK`

```json
[
  { "value": "string", "label": "string" }
]
```

Used in: Add-lead, Profile.

---

### 5.15 Interest Options

**`GET /reference/interest-options`**

**Response:** `200 OK`

```json
[
  { "value": "string | number", "label": "string" }
]
```

Used in: Add-lead form.

---

### 5.16 Status Options (Inventory)

**`GET /reference/inventory-status-options`** or static.

**Response:** `200 OK`

```json
[
  { "value": "string", "label": "string" }
]
```

Used in: Sales card status dropdown.

---

## 6. Home & Listing APIs

### 6.1 Featured Properties

**`GET /home/featured-properties`**

**Query parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| type | string | No | Unit type filter. |
| project | string \| number | No | Project id/code. |
| bedrooms | number \| string | No | Bedroom count. |
| bathrooms | number \| string | No | Bathroom count. |
| price | string | No | Price range key. |

**Response:** `200 OK`

```json
[
  {
    "id": "number | string",
    "image": "string",
    "title": "string",
    "location": "string",
    "price": "number",
    "beds": "number",
    "baths": "number",
    "area": "number",
    "status": "string",
    "isFavorite": "boolean"
  }
]
```

---

### 6.2 Home Projects List

**`GET /home/projects`**

**Response:** `200 OK`

```json
[
  {
    "id": "number | string",
    "image": "string",
    "title": "string",
    "bedrooms": "number",
    "bathrooms": "number",
    "area": "number",
    "status": "string",
    "price": "number"
  }
]
```

---

## 7. Projects APIs

### 7.1 Projects List (Projects Page)

**`GET /projects`**

**Response:** `200 OK`

```json
[
  {
    "id": "number",
    "name": "string",
    "subtitle": "string",
    "description": "string",
    "shortDescription": "string",
    "location": "string",
    "imageUrl": "string"
  }
]
```

---

### 7.2 Project by ID (Details Page)

**`GET /projects/:id`**

**Path parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string \| number | Yes | Project ID. |

**Response:** `200 OK`

```json
{
  "id": "number",
  "name": "string",
  "imageUrl": "string",
  "overview": {
    "description": "string"
  },
  "features": [
    { "icon": "string", "label": "string" }
  ],
  "modelTypes": [
    { "id": "number | string", "name": "string", "imageUrl": "string" }
  ],
  "gallery": {
    "images": ["string"]
  },
  "aboutSidebar": [
    { "title": "string", "value": "string", "icon": "string" }
  ],
  "contactImage": "string"
}
```

`label` in features may be a translation key. `aboutSidebar` values may be keys or localized strings.

---

### 7.3 Project Contact Form

**`POST /projects/:id/contact`**

**Path parameters:** `id` — Project ID.

**Request body:**

```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullName | string | Yes | Sender name. |
| email | string | Yes | Email. |
| phone | string | Yes | Phone (can be full number). |
| subject | string | Yes | Subject. |
| message | string | Yes | Message body. |

**Response:** `201 Created` or `200 OK` — e.g. `{ success: true }`.

---

## 8. Units / All-Units APIs

### 8.1 Units List (Search + Filters + Pagination)

**`GET /units`**

**Query parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| searchQuery | string | No | Free-text search. |
| selectedType | string \| number | No | Unit type. |
| selectedProject | string \| number | No | Project. |
| selectedLocation | string \| number | No | Location. |
| selectedDelivery | string \| number | No | Delivery option. |
| selectedModel | string \| number | No | Model. |
| sortBy | string | No | Sort option value. |
| areaRange | number[] | No | [min, max] area (m²). |
| totalAmountRange | number[] | No | [min, max] total price. |
| depositAmountRange | number[] | No | [min, max] deposit. |
| selectedInstallment | string \| number | No | Installment period. |
| bedrooms | number \| string | No | Bedroom count. |
| bathrooms | number \| string | No | Bathroom count. |
| selectedView | string \| number | No | View type. |
| hasGarden | boolean | No | Has garden. |
| selectedFinishing | string \| number | No | Finishing type. |
| page | number | No | Page (1-based). Default 1. |
| pageSize | number | No | Page size. Default e.g. 12. |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "number | string",
      "imageUrl": "string",
      "title": "string",
      "location": "string",
      "bedrooms": "number",
      "bathrooms": "number",
      "area": "number",
      "view": "string",
      "garage": "boolean",
      "readyToMove": "boolean",
      "totalPrice": "number",
      "paidAmount": "number",
      "offerAmount": "number",
      "isFavorite": "boolean"
    }
  ],
  "totalRecords": "number"
}
```

---

### 8.2 Popular Keywords (All-Units)

**`GET /units/popular-keywords`**

**Response:** `200 OK`

```json
["villa", "apartment", "penthouse"]
```

Frontend uses these as i18n keys (e.g. `allUnits.keywords.villa`).

---

## 9. Model / Unit Details APIs

Route in app: `model/:id`.

### 9.1 Model/Unit by ID

**`GET /units/:id`** or **`GET /models/:id`**

**Path parameters:** `id` — Unit or model ID.

**Response:** `200 OK`

```json
{
  "id": "number | string",
  "unitTitle": "string",
  "unitAddress": "string",
  "breadcrumbs": [
    { "label": "string" }
  ],
  "propertyAttributes": [
    { "icon": "string", "value": "string | null", "label": "string" }
  ],
  "gallery": {
    "mainImage": "string",
    "thumbnailImages": ["string"],
    "images": ["string"]
  },
  "paymentPlan": {
    "totalPrice": "number",
    "downPayment": "number",
    "currency": "string"
  },
  "overview": {
    "description": "string"
  },
  "unitFeatures": [
    { "icon": "string", "label": "string" }
  ],
  "projectFeatures": [
    { "icon": "string", "label": "string" }
  ],
  "mapData": {}
}
```

`label` fields may be translation keys.

---

### 9.2 Similar Units

**`GET /units/:id/similar`** or **`GET /units/similar?unitId=:id&limit=6`**

**Query/path:** unit or model `id`; optional `limit` (default e.g. 6).

**Response:** `200 OK`

```json
[
  {
    "id": "number | string",
    "imageUrl": "string",
    "title": "string",
    "bedrooms": "number",
    "bathrooms": "number",
    "area": "number",
    "readyToMove": "boolean",
    "price": "number"
  }
]
```

---

### 9.3 Customer Count (Contact Salesman)

**`GET /units/:id/customer-count`**

**Response:** `200 OK`

```json
{ "count": "number" }
```

Or plain number.

---

### 9.4 Reserve Unit

**`POST /units/:id/reserve`**

**Request body:**

```json
{
  "payment": "string | number",
  "finishing": "string | number",
  "maintenance": "string | number",
  "roiDiscount": "string | null"
}
```

**Response:** `200 OK` — Can return computed values for UI (reservation amount, delivery period, total price) and/or confirmation:

```json
{
  "reservationAmount": "number",
  "deliveryPeriod": "string",
  "totalPrice": "number",
  "success": "boolean",
  "reservationId": "string | number"
}
```

---

### 9.5 View Installment Plan

**`GET /units/:id/installment-plan`**

**Response:** `200 OK` — PDF URL or binary (e.g. `Content-Disposition: attachment`), or link object:

```json
{ "url": "string" }
```

---

### 9.6 Toggle Favorite

**`POST /units/:id/favorite`** (add) and **`DELETE /units/:id/favorite`** (remove), or single **`POST /units/:id/favorite/toggle`**.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK` — e.g. `{ success: true, isFavorite: "boolean" }`. List endpoints must return `isFavorite` per unit for the current user.

---

## 10. Add Lead API

### 10.1 Create Lead

**`POST /leads`**

**Request body:**

```json
{
  "name": "string",
  "mobileNumber": "string",
  "gender": "string",
  "project": "string | number",
  "email": "string",
  "interest": "string | number",
  "budget": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Customer name. |
| mobileNumber | string | Yes | Phone. |
| gender | string | Yes | Value from gender options. |
| project | string \| number | Yes | Value from project options. |
| email | string | Yes | Email. |
| interest | string \| number | Yes | Value from interest options. |
| budget | string | No | Budget text or amount. |

**Response:** `201 Created` — e.g. `{ success: true, id: "string | number" }`.

---

## 11. Inventory APIs (Sales/Admin)

**Headers:** `Authorization: Bearer <token>` (admin/sales role).

### 11.1 Inventory Units List

**`GET /inventory/units`**

**Query parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| searchQuery | string | No | Search. |
| selectedType | string \| number | No | Type filter. |
| selectedProject | string \| number | No | Project filter. |
| page | number | No | Page. |
| pageSize | number | No | Page size. |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "projectName": "string",
      "unitNumber": "string",
      "groupNumber": "string",
      "buildingNumber": "string",
      "status": "string",
      "createdDate": "string",
      "salesPerson": {
        "name": "string",
        "avatar": "string"
      }
    }
  ],
  "totalRecords": "number"
}
```

`createdDate` can be ISO 8601 or display-ready string.

---

### 11.2 Update Unit Status

**`PATCH /inventory/units/:id`** or **`PUT /inventory/units/:id/status`**

**Request body:**

```json
{
  "status": "string"
}
```

**Response:** `200 OK` — e.g. `{ success: true }`.

---

### 11.3 Popular Keywords (Inventory)

**`GET /inventory/popular-keywords`**

**Response:** `200 OK`

```json
["keyword1", "keyword2"]
```

Frontend uses as i18n keys (e.g. `inventory.keywords.keyword1`).

---

## 12. Payment APIs

**Headers:** `Authorization: Bearer <token>`.

### 12.1 Reserved Units / Payment Context

**`GET /payments/reserved`** or **`GET /profile/reserved-units`**

Returns list of reserved units with payment summary and unit preview for the payment page.

**Response:** `200 OK`

```json
{
  "summary": {
    "unitPrice": "number",
    "amountPaid": "number",
    "remainingTime": "number",
    "paymentDate": "string",
    "paymentAmount": "number",
    "currency": "string"
  },
  "unit": {
    "imageUrl": "string",
    "title": "string",
    "location": "string",
    "type": "string",
    "floor": "string",
    "bed": "string",
    "bedrooms": "number",
    "bathrooms": "number",
    "finishing": "string",
    "delivery": "string",
    "area": "number",
    "group": "string",
    "unitNumber": "string",
    "garage": "string"
  }
}
```

If multiple reserved units, can be array with `unitId`/`reservationId` to select one for payment.

---

### 12.2 Payment History

**`GET /payments/history`** or **`GET /profile/payment-history`**

**Query:** Optional `unitId` or `reservationId`.

**Response:** `200 OK`

```json
[
  {
    "id": "string | number",
    "amount": "number",
    "currency": "string",
    "date": "string",
    "method": "string",
    "status": "string"
  }
]
```

---

### 12.3 Submit Payment

**`POST /payments`**

**Request body:**

```json
{
  "method": "card | bank",
  "amount": "number",
  "reservationId": "string | number",
  "unitId": "string | number"
}
```

**Response:** `200 OK` or `201 Created` — e.g. `{ success: true, redirectUrl?: "string" }` for payment gateway.

---

## 13. Profile APIs

**Headers:** `Authorization: Bearer <token>`.

### 13.1 Get Profile

**`GET /profile`** or **`GET /users/me`**

**Response:** `200 OK`

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "phoneNumberOptional": "string | null",
  "email": "string",
  "birthDate": "string | null",
  "nationality": "string",
  "gender": "string"
}
```

---

### 13.2 Update Profile

**`PUT /profile`** or **`PATCH /profile`**

**Request body:** Same shape as Get Profile; all fields optional for PATCH.

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "phoneNumberOptional": "string | null",
  "email": "string",
  "birthDate": "string | null",
  "nationality": "string",
  "gender": "string"
}
```

**Response:** `200 OK` — Updated profile or `{ success: true }`.

---

## 14. Contact (Footer) API

### 14.1 Contact Form

**`POST /contact`**

**Request body:**

```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "message": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Sender name. |
| phone | string | Yes | Phone number. |
| email | string | Yes | Email. |
| message | string | Yes | Message. |

**Response:** `200 OK` or `201 Created` — e.g. `{ success: true }`.

---

## 15. Error Responses

Use consistent error format, e.g.:

**`4xx / 5xx`**

```json
{
  "statusCode": "number",
  "message": "string",
  "error": "string",
  "details": []
}
```

For validation: `details` can list field-level errors.

---

## 16. Summary Table

| Domain | Endpoints |
|--------|-----------|
| Auth | POST login, register, forget-password, verify-reset-otp, reset-password, verify-account; GET me |
| Reference | GET nationalities, projects/options, unit-types, locations, delivery-options, models, payment-options, finishing-options, maintenance-options, sort-options, view-options, installment-options, bedroom/bathroom options, gender-options, interest-options, inventory-status-options |
| Home | GET featured-properties, home/projects |
| Projects | GET projects, projects/:id; POST projects/:id/contact |
| Units | GET units (list + filters + pagination), units/popular-keywords, units/:id, units/:id/similar, units/:id/customer-count, units/:id/installment-plan; POST units/:id/reserve, units/:id/favorite; DELETE units/:id/favorite |
| Leads | POST leads |
| Inventory | GET inventory/units, inventory/popular-keywords; PATCH inventory/units/:id |
| Payment | GET payments/reserved, payments/history; POST payments |
| Profile | GET profile; PUT/PATCH profile |
| Contact | POST contact |

---

*End of Backend API Specification.*
