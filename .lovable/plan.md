## Goals

1. Navbar: add a centered search box + an EN/AR language toggle after the Admin button.
2. Landing page: add a News section above About BSDI, and a Map View section (with CTA) above Layers.
3. Admin: add a font-family selector (placed above the existing font-size slider) for hero text styling.
4. Maintain existing brand styling: light bg `#e8ecf0`, primary `#FF3B30`, Space Grotesk headings, Inter body, `.clean-card` aesthetic — no glassmorphism.

---

## 1. Navbar updates (`src/components/Navbar.tsx`)

Layout becomes 3 zones inside the existing container:

```text
[ iGA logo ]   [   Search input (centered)   ]   [ nav links | Admin | EN/AR ]
```

- Search: rounded pill input with a `Search` lucide icon, max-width ~420px, hidden on mobile (shown inside mobile menu). Cosmetic only — submit handler is a no-op stub (`onSubmit` prevents default; can be wired up later).
- Language toggle: a small two-segment pill `EN | عربي` placed right after the Admin button. Stores selection in a new lightweight Zustand store `useUiStore` (`language: 'en' | 'ar'`, `setLanguage`). No translation work is included — toggle only switches state and the toggle's own active segment styling. Document in chat that full RTL/translation is out of scope.
- Mobile menu: include search field at top and EN/AR toggle below the Admin button.

Brand: white bg, primary red active state on toggle, subtle border, `rounded-xl`.

## 2. News section (new `src/components/NewsSection.tsx`)

Placed in `src/pages/Index.tsx` between `AboutSection` and… actually above `AboutSection` per request. New order inside the wrapper:
`News → About → MapView → Layers → Services → Vision → WhoCanUse → DataServices`.

Section structure:
- Heading "Latest News" + short description.
- 3-column grid (responsive: 1 / 2 / 3) of `.clean-card` items, each with image, date chip, title, 2-line excerpt, and "Read more →" using `view-details-link` style.
- Content sourced from a new `news` slice in `contentStore.ts` (`NewsItem { id, title, excerpt, date, image, link }`) with 3 default Bahrain-themed entries using existing Unsplash light imagery already in the store style.
- Add matching admin editor `NewsEditor.tsx` and register a "News" tab (icon `Newspaper`) in `AdminLayout.tsx`. Editor reuses the existing `CardEditorModal` pattern (add/edit/remove items, image upload via FileReader).

## 3. Map View section (new `src/components/MapViewSection.tsx`)

Placed above `LayersSection`.

Layout: two-column (stacked on mobile)
- Left: heading "Explore Bahrain on the Map", short description, and a primary CTA button "Open Map View" using existing `Button` (variant default → primary red). Clicking navigates via `react-router-dom` `useNavigate('/map')`.
- Right: a static map preview image (light Bahrain map from existing default imagery) with subtle `clean-card` framing.

Routing: register a new route `/map` in `src/App.tsx` pointing to a new page `src/pages/MapView.tsx`. The page renders `Navbar`, a hero strip "Map View" with a back link to `/`, a placeholder `clean-card` containing a large light-themed Bahrain map image, and `Footer`. No real map library is added — placeholder only, can be upgraded later.

Add a `mapView` slice to `contentStore.ts` (`heading`, `description`, `ctaLabel`, `ctaHref`, `previewImage`) and a `MapViewEditor` admin tab so content is editable.

## 4. Admin: font-family selector (`HeroEditor.tsx` + `contentStore.ts`)

- Extend `HeroTextStyle` with `fontFamily?: string`.
- In `TextStyleControls`, add a `Select` (existing `@/components/ui/select`) ABOVE the Font Size slider with options:
  - Inter (default body)
  - Space Grotesk (default heading)
  - Montserrat
  - Poppins
  - Roboto
  - Playfair Display
  - Merriweather
- Load the additional families by appending them to the existing Google Fonts `@import` in `src/index.css`.
- Apply the chosen `fontFamily` inline in `HeroSection.tsx` for `title1`, `title2`, and `subtitle` spans (override `hero-display-font` when present).
- Default values for new style fields wired in `defaultHero` and `HeroEditor` reset logic.

## 5. Index page reordering (`src/pages/Index.tsx`)

Final order inside the `<div className="relative z-10">` wrapper:
1. NewsSection
2. AboutSection
3. MapViewSection
4. LayersSection
5. ServicesSection
6. VisionSection
7. WhoCanUseSection
8. DataServicesSection

## Files touched

- Edit: `src/components/Navbar.tsx`, `src/pages/Index.tsx`, `src/App.tsx`, `src/stores/contentStore.ts`, `src/components/admin/AdminLayout.tsx`, `src/components/admin/editors/HeroEditor.tsx`, `src/components/HeroSection.tsx`, `src/index.css`
- Create: `src/components/NewsSection.tsx`, `src/components/MapViewSection.tsx`, `src/pages/MapView.tsx`, `src/components/admin/editors/NewsEditor.tsx`, `src/components/admin/editors/MapViewEditor.tsx`, `src/stores/uiStore.ts`

## Out of scope (will note to user)

- Functional search backend / search results page.
- Full Arabic translations and RTL layout flip — toggle only stores state for now.
- Real interactive map (Mapbox/Leaflet) — `/map` page renders a styled placeholder image.
