# Security Bundle Builder

A React + Tailwind + Zustand frontend with NestJS backend for a multi-step security system bundle builder prototype.

## Overview

This is a take-home frontend prototype featuring:
- **Two-column layout**: builder on the left, live review panel on the right
- **4-step accordion**: Cameras, Plan, Sensors, Accessories
- **Per-variant quantity tracking**: Each color/variant of a product is tracked independently
- **Live review panel**: Updates in real-time as selections change
- **localStorage persistence**: Configuration is saved automatically and restored on page reload
- **Basic CRUD API**: Optional NestJS backend serves products and persists saved systems

## Running the app
https://github.com/Yousef-Abdelrhem/Frontend-Take-Home-Bundle-Builder-/issues/2#issue-4863045697
### Option 1: Frontend + Backend (One Command) ⚡

```bash
npm install && npm run install:all
npm run dev
```

Both servers start together with labeled output. Backend runs on `http://localhost:3000`, frontend on `http://localhost:5173`.

### Option 2: Frontend Only (No Backend)

```bash
cd client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` and use the local fallback product catalog.

### Option 3: Frontend + Backend (Separate Terminals)

**Terminal 1 — Start the backend:**

```bash
cd server
npm install
npm run start:dev
```

The backend runs on `http://localhost:3000`.

**Terminal 2 — Start the frontend:**

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and fetches products from the backend API.

## Architecture

### Frontend (`client/`)

- **Vite + React 19 + TypeScript** for the UI
- **Tailwind CSS v4** for styling
- **Zustand + persist middleware** for state management and localStorage auto-sync
- **Component hierarchy**:
  - `App` — Entry point, initializes state and seeds quantities from catalog
  - `Builder` — Accordion orchestrator
  - `Step` — Individual step with products grid and Next button
  - `ProductCard` — Product display with variants, stepper, pricing
  - `VariantSelector` — Color/variant chip selector
  - `QuantityStepper` — Reusable +/- quantity control (used in cards and review panel)
  - `ReviewPanel` — Live summary with category-grouped line items, totals, checkout

### Backend (`server/`)

- **NestJS** framework with two modules:
  - `ProductsModule` — `GET /api/products`, `POST /api/products/:id`, `PUT`, `DELETE` (in-memory store backed by `products.json`)
  - `SystemModule` — `POST /api/system`, `GET /api/system/:clientId` (in-memory store for saving/restoring user configurations)
- **CORS enabled** for frontend cross-origin requests
- **No database** — Uses JSON file + in-memory storage for simplicity

## Key Design Decisions

1. **Quantity Tracking**: State keys are `${productId}:${variantId || 'default'}`, allowing each variant to have its own quantity while sharing the product card UI.

2. **"N selected" Counter**: Counts distinct *products* with qty > 0, not the sum of quantities. So 2×Red + 1×Blue camera = "2 selected" (two distinct product lines).

3. **All Review Panel Lines Have Steppers**: The task specifies each review line has a quantity stepper; pre-populated items (Sensor Hub, Plan) start with a `seededQty` but remain fully editable.

4. **Computed Badge & Financing**: The "Save X%" badge and "As low as $X/mo" financing line are computed from price data, not hardcoded.

5. **Plan Step Uses Quantity Stepper**: Like all other steps. While multi-quantity plans are unrealistic, the UI is consistent, and the backend supports it.

6. **Dual Persistence**:
   - **Zustand + localStorage** automatically syncs state on every change → works offline
   - **"Save my system for later"** button also calls the backend API (clientId-keyed) for cross-device/browser restoration

## Known Limitations / Not Implemented

- **Steps 2-4 (Plan, Sensors, Accessories) UI**: Only Step 1 (Cameras) is visible in the Figma screenshots. These steps use placeholder/generic card layouts matching Step 1's pattern. Once you provide Figma exports for those steps, update the component JSX to match the real design.
  
- **Checkout Flow**: Clicking "Checkout" shows a prototype confirmation. A real implementation would route to a payment system.

- **Product Images**: Using placeholder images. Replace with real product photos.

- **No Authentication**: The system is anonymous (clientId is a UUID stored in localStorage). No user login.

- **No Database Persistence**: Backend saves are in-memory only. Page reload clears saved systems. For production, add a real database (PostgreSQL, MongoDB, etc.).

- **No Tests**: Optionally add Jest unit tests for the variant-quantity logic and the CRUD services if time allows.

## Design Fidelity

- **Desktop**: Estimated from 3 Figma screenshots (Frame 1736, 1735, mobile). Spacing, colors, typography, and element states closely match the design.
- **Mobile**: Responsive layout using Tailwind breakpoints. Two-column grid stacks to single column below `lg` breakpoint.
- **Screenshots Used**:
  - Frame 1736: Step 1 expanded with multiple camera cards
  - Frame 1735: Alternative desktop view
  - iPhone 13/14 frame: Mobile single-column stacked view

## Development Notes

- **Tailwind v4**: Uses CSS-first config via `@import "tailwindcss"` in `src/index.css`. No JavaScript config file.
- **Type Imports**: All type imports use `import type {}` to comply with TypeScript's `verbatimModuleSyntax`.
- **API Fallback**: If the backend is down, the frontend automatically falls back to the local catalog from `client/src/data/catalog.ts`.

## File Structure

```
repo/
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── components/              # React component hierarchy
│   │   │   ├── Builder.tsx
│   │   │   ├── Step.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── VariantSelector.tsx
│   │   │   ├── QuantityStepper.tsx
│   │   │   └── ReviewPanel.tsx
│   │   ├── store/useBundleStore.ts  # Zustand store with persist middleware
│   │   ├── api/client.ts            # API fetch wrapper
│   │   ├── data/catalog.ts          # Fallback product catalog (local JSON)
│   │   ├── App.tsx                  # Entry point
│   │   ├── index.css                # Tailwind CSS v4 global styles
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.local
│
├── server/                          # NestJS backend
│   ├── src/
│   │   ├── products/                # Products module
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── data/products.json   # Product catalog
│   │   ├── system/                  # System module (save/restore configurations)
│   │   │   ├── system.module.ts
│   │   │   ├── system.controller.ts
│   │   │   └── system.service.ts
│   │   ├── app.module.ts
│   │   ├── main.ts                  # Enable CORS
│   │   └── app.controller.ts
│   ├── package.json
│   └── tsconfig.json
│
└── README.md (this file)
```

## Building for Production

**Frontend:**
```bash
cd client && npm run build
# Output: dist/
```

**Backend:**
```bash
cd server && npm run build
```

Then deploy both separately or use a monorepo tool (pnpm workspaces, Nx, Turborepo) to streamline CI/CD.

## Testing

The app is fully functional end-to-end:
1. Run both servers (or frontend-only with fallback catalog)
2. Click through the accordion steps
3. Add quantities on multiple products
4. Switch variant colors and verify quantity isolation (stepper shows active variant's qty, others preserved)
5. Change quantities from the review panel and see the builder update
6. Watch total/savings recalculate live
7. Click "Save my system for later" and reload the page to verify persistence
8. Exercise CRUD endpoints directly (curl/Postman) to test the API independently

## Future Enhancements

- Add real database (Prisma + PostgreSQL)
- Implement user authentication (JWT / OAuth)
- Add payment gateway integration (Stripe, PayPal)
- Persist saved systems server-side for authenticated users
- Add image upload for products
- Expand Step 2-4 UI to match final Figma designs
- Add unit and integration tests
- Add analytics / event tracking

---

Built as a frontend take-home prototype. Focus: production-quality UI, state management, data-driven rendering, and a clean bonus backend.
# Frontend-Take-Home-Bundle-Builder-
