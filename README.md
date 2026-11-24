# Prashnify Frontend — Phases 0 to 3

**Phase 0 (shared theme, layouts, components, styles)** and **Phases 1–3 (Pages 1–19)** from `Prashnify_Page_Build_Order.pdf`, preserving all original styling and theme variables unchanged.

## Included Scope

- **Phase 0 (Shared)**: Dark/Light theme (`ThemeContext`), `PublicLayout`, `StudentLayout` (left sidebar + mobile bottom bar & drawer), `variables.css`, `global.css`, `components.css`, common UI components (`StatCard`, `Modal`, `EmptyState`), and mock data.
- **Phase 1 — Start & Sign-up (Pages 1–6)**: Landing (`/`), Login / Sign up (`/login`), Onboarding (`/onboarding`), Pricing (`/pricing`), Checkout (`/checkout`), Choose Exam (`/choose-exam`).
- **Phase 2 — Practice (Pages 7–17)**: Dashboard (`/dashboard`), Create Test (`/create-test`), Subtopics (`/subtopics`), Exam Screen (`/exam`), Test History (`/test-history`), Weak Topics (`/weak-topics`), PYQs (`/pyqs`), Saved Questions (`/saved-questions`), Performance (`/performance`), Recommendations (`/recommendations`), Leaderboard (`/leaderboard`).
- **Phase 3 — Test Series (Pages 18–19)**: Test Series (`/test-series`), Series Result (`/series-result`).

## Run Locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```