## Goal

Keep the Admin CRM panel layout fixed (sidebar on the left, LTR direction) even when the user has selected Arabic. Only the public/landing routes should switch to RTL when Arabic is active.

## Problem

`src/components/LanguageProvider.tsx` currently sets `document.documentElement.dir = "rtl"` whenever `language === "ar"`. This flips the entire app — including `/admin-crm` — so the sidebar jumps to the right and all editor controls mirror.

## Changes

### 1. `src/components/LanguageProvider.tsx`
- Read the current pathname (via `useLocation` from `react-router-dom`).
- If the path starts with `/admin-crm`, force `dir="ltr"` and `lang="en"` on `<html>` regardless of the selected language.
- Otherwise, keep existing behavior (`dir="rtl"` + `lang="ar"` when Arabic, else LTR/EN).
- Re-run the effect when either `language` or `pathname` changes, so navigating into/out of admin updates direction correctly.

### 2. `src/components/admin/AdminLayout.tsx` (defensive)
- Add `dir="ltr"` on the root admin container so even if global `dir` were ever RTL, the admin tree renders LTR. This guarantees the sidebar stays on the left.

### 3. No content changes
- Bilingual fields (`BilingualField`, `SectionStyleControls`) already render EN and AR side-by-side and are direction-agnostic. The Arabic textarea will continue to display Arabic text correctly inside an LTR admin shell (the textarea itself can still render RTL text naturally; we're only locking the page chrome).
- Public routes (`/`, `/map`, `/search`) are unaffected and will still switch to RTL in Arabic.

## Out of scope
- No changes to translations, store, or editor logic.
- No change to the language toggle behavior itself — users can still switch language; the admin UI just won't mirror.
