# Prashnify Frontend — Step 0 & Phase 1

This package contains only **Step 0 (Shared Parts)** and **Phase 1 (Start & Sign-up)** extracted from the full Prashnify frontend, with all styling, theme tokens, layouts, and shared components preserved verbatim.

## Included Scope

### Step 0 — Shared Parts
- **Design System & Styling** (`src/styles/variables.css`, `src/styles/global.css`, `src/styles/components.css`): Inter font, `#6C47FF` primary purple, `#0D0B1A` dark background, `#1E1A38` dark cards, light/dark CSS variables, rounded buttons/cards, responsive grids, sidebar, and mobile bottom nav.
- **Theme Switcher** (`src/context/ThemeContext.jsx`): Dark default with Light/Dark/Auto support persisted in `localStorage`.
- **Shared Layouts**:
  - `src/layouts/PublicLayout.jsx`: Public navbar, theme toggle, and footer.
  - `src/layouts/StudentLayout.jsx`: Logged-in left sidebar (Main, Progress, Community, Join Prashnify, Account) + mobile bottom bar (Home, Create, PYQs, Mentors, Menu) + mobile slide-over drawer.
- **Reusable Common Components** (`src/components/common/`): `EmptyState.jsx`, `Modal.jsx`, `StatCard.jsx`.

### Phase 1 — Start & Sign-up (Public Pages 1–6)
1. **Landing Page** (`/`) — `src/pages/public/LandingPage.jsx`
2. **Login / Sign up** (`/login`) — `src/pages/public/LoginPage.jsx`
3. **Onboarding (5 Questions)** (`/onboarding`) — `src/pages/public/OnboardingPage.jsx`
4. **Pricing (1, 6, 12 Months)** (`/pricing`) — `src/pages/public/PricingPage.jsx`
5. **Checkout (UPI / Card / Netbanking + Coupons)** (`/checkout`) — `src/pages/public/CheckoutPage.jsx`
6. **Choose Exam** (`/choose-exam`) — `src/pages/public/ChooseExamPage.jsx`

> Note: Navigating to `/dashboard` (or sidebar links) renders a lightweight placeholder inside `StudentLayout` so you can preview and test the Step 0 sidebar, topbar, theme switcher, and mobile bottom navigation immediately.

## Quick Start

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```
