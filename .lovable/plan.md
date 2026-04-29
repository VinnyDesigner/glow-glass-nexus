# Plan: News sort + Login modal + Toggle + Thumbnails

## 1. News — latest first, max 4 on landing page

**File:** `src/components/NewsSection.tsx`

- Build a `sortedItems` list (newest first by `Date(item.date)`).
- Render only the first 4 sorted items in the grid (`sortedItems.slice(0, 4)`).
- The "View all news" popup already uses the full sorted list — keep as-is.
- Admin can keep adding any number of items; only the 4 most recent appear on the landing page, the rest live in the popup.

## 2. Language switcher — single button showing the OTHER language

**File:** `src/components/Navbar.tsx`

- Replace the two-button `LangToggle` with one pill button:
  - When `language === "en"` → button shows **عربي**, click switches to Arabic.
  - When `language === "ar"` → button shows **EN**, click switches to English.
- Apply to both desktop and mobile menus.

## 3. Demo login modal with blurred background

**New file:** `src/components/LoginModal.tsx`

- Triggered by clicking the navbar button (replaces the existing **Admin** button → relabel to **Login** / **تسجيل الدخول**).
- Uses shadcn `Dialog`. Backdrop renders the **current page screenshot effect** via `backdrop-blur-md` + dark tint over the dialog overlay (one-off allowed exception to the no-blur rule, scoped to login overlay only).
- Modal card is clean, brand-styled (white card, rounded-2xl, soft shadow, primary `#FF3B30` accents, Space Grotesk heading, Inter body) — no glassmorphism on the card itself.
- Two tabs: **Admin** | **User**.
- Fields: Username, Password, Sign in button.
- Hardcoded credentials checked client-side:
  - Admin: `admin` / `admin123`
  - User: `user` / `user123`
- On success:
  - Admin → store `{ role: "admin", name }` in `useAuthStore` (new), navigate to `/admin-crm`.
  - User → store `{ role: "user", name }`, close modal, stay on `/`.
- Failure → inline error message ("Invalid credentials").
- Background image behind the blur is configurable (see step 5).

**New file:** `src/stores/authStore.ts`
- Zustand + persist. Shape: `{ user: { role, name } | null, login, logout }`.

**Route protection:** `src/pages/Admin.tsx`
- If no admin in `useAuthStore`, redirect to `/` and auto-open the login modal (via a `?login=admin` query param the modal reads on mount).

**Navbar additions:**
- When logged in, replace **Login** with the user's name + a small dropdown holding **Logout** (and **Admin Panel** if role is admin).

## 4. Thumbnail refresh — match images to descriptions

**File:** `src/stores/contentStore.ts`

- Curate fresh Unsplash URLs in the `IMG` map and reassign per-card `image` fields where the current image doesn't match the description. Examples:
  - News `n1` "unified geospatial portal" → world-data/dashboard image
  - News `n3` "open spatial data partnership" → handshake/collaboration image
  - Layers `BUILDINGS`, `BUS ROUTE`, `OIL_GAS`, `HEALTHSERVICES`, etc. — verify each maps to a descriptive image
  - Services 8 cards — re-map each to imagery that visually represents the title/description
  - Vision/Users/About — same audit
- Add `OLD_*_IMAGE_URLS` migration list and bump `persist` `version` to 6 in the store so already-cached user state picks up the new defaults (mirrors the existing `OLD_BAHRAIN_MAP_URLS` pattern).
- All URLs use `?w=800&q=80` for performance and respect the existing light, infrastructure-themed style.

## 5. Editable login background image

**File:** `src/stores/contentStore.ts`
- Add new content slice `auth: { loginBackground: string }` with a default Bahrain skyline / abstract geo image.
- `updateAuth(data)` setter.

**New file:** `src/components/admin/editors/LoginEditor.tsx`
- Single image upload field (FileReader → data URL, like other editors).
- Live preview swatch.
- Update button calls `updateAuth`.

**File:** `src/components/admin/AdminLayout.tsx`
- Add a new tab **Login Page** (icon `LogIn` from lucide) that mounts `LoginEditor`.

**Wiring:**
- `LoginModal.tsx` reads `useContentStore().auth.loginBackground` and renders it as a `<img>` covering the dialog overlay (with the blur + dark tint above it).

## 6. i18n keys (added to `src/lib/i18n.ts`)

`auth.login`, `auth.logout`, `auth.signIn`, `auth.username`, `auth.password`, `auth.admin`, `auth.user`, `auth.welcome`, `auth.invalid`, `auth.loginSubtitle`, `nav.login`. EN + AR variants.

## Brand-rule note

Project memory forbids glassmorphism. The login overlay uses backdrop blur **only** on the page-behind-the-modal (per your explicit request). The modal card itself remains clean/flat with no glass effect, preserving the gov-portal aesthetic everywhere else.

## Out of scope

- Real authentication / Supabase. Demo credentials only.
- Password reset, signup, OAuth.
- Persisting "remember me" beyond the existing localStorage Zustand persist.

## Files touched

- `src/components/NewsSection.tsx` (edit)
- `src/components/Navbar.tsx` (edit)
- `src/components/LoginModal.tsx` (new)
- `src/stores/authStore.ts` (new)
- `src/pages/Admin.tsx` (edit — guard)
- `src/stores/contentStore.ts` (edit — image refresh, auth slice, migration)
- `src/components/admin/editors/LoginEditor.tsx` (new)
- `src/components/admin/AdminLayout.tsx` (edit — new tab)
- `src/lib/i18n.ts` (edit — new keys)