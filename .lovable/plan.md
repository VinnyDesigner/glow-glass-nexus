## Goals

1. Wire search to a live dropdown + dedicated `/search` results page.
2. Full Arabic translation with RTL layout flip on the public site.
3. Restructure Map View section: heading on top center (matching other sections), CTA + map below, shorter heading.
4. Expand Admin font-family options.
5. Replace all imagery sitewide with light-theme, data-infrastructure visuals (energy, factory, solar, road, utilities, telecom, water, etc.).
6. **Admin split-pane editor (NEW)**: every editor renders **two side-by-side columns** — left = English, right = Arabic — sharing the same field structure, preview, image picker, and styling controls. A single **English-labeled "Update"** button at the bottom saves both languages together.

---

## 1. Search — dropdown + results page

**`src/lib/searchIndex.ts` (new)**: pure function that flattens `layers.cards`, `services.cards`, `users.cards`, `news.items`, `vision.cards` into `{id, type, title, description, image, link, section}` records (using current language fields).

**`src/components/Navbar.tsx`**:
- Live filter as user types; dropdown panel below input (white card, max ~5 hits) shows icon + title + section chip; click navigates to item link or `/#section`.
- Footer row: "See all results for '...'" → `navigate('/search?q=...')`.
- Submit (Enter) → `/search?q=...`.
- Closes on outside click / Esc.

**`src/pages/Search.tsx` (new)**: Navbar + Footer wrapper. Reads `q` via `useSearchParams`. Shows total count, grouped sections (Layers, Services, News, Users, Vision), each rendering `clean-card` matches. Empty state.

**`src/App.tsx`**: register `/search` route.

## 2. Arabic translation + RTL flip (public site)

**`src/lib/i18n.ts` (new)**: dictionary `{ en, ar }` keyed by string id (`nav.about`, `nav.admin`, `search.placeholder`, `search.seeAll`, `mapView.cta`, `news.readMore`, `footer.*`, etc.). Export `useT()` hook reading `useUiStore().language`.

**CMS-driven content**: extend each `contentStore.ts` content slice with optional `*_ar` siblings for translatable strings (`heading_ar`, `description_ar`, card `title_ar`, `description_ar`, `excerpt_ar`, `tags_ar`, etc.). Provide Arabic defaults for all built-in content. Components read `lang === 'ar' ? field_ar || field : field`.

Slices to extend with Arabic defaults: `hero`, `about`, `vision`, `services`, `users`, `dataServices`, `layers`, `news`, `mapView`, `footer`.

**RTL flip**:
- A `LanguageProvider` mounted in `App.tsx` sets `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'` and `lang` attribute via `useEffect`.
- Tailwind logical utilities where possible; for known directional spots (hero alignment, navbar order, marquee direction) add conditional `flex-row-reverse` / `text-right` based on `useUiStore`.
- `DataServicesSection` marquee reverses direction in RTL.

## 3. Map View section restructure

**`src/components/MapViewSection.tsx`**:
- Replace 2-column layout with vertical, centered structure matching `NewsSection` / `LayersSection`:
  - Centered heading + description block (`text-center max-w-3xl mx-auto mb-12`).
  - Below: full-width `clean-card` containing the map preview image (aspect ~21/9).
  - CTA button centered below the image.
- Shorten default heading to `"Bahrain Map View"`.
- Migration in `merge()`: if persisted heading equals the old long string, replace with new short one.

## 4. More font families in Admin

`HeroEditor.tsx` `FONT_OPTIONS` add: Outfit, Plus Jakarta Sans, DM Sans, Manrope, Work Sans, IBM Plex Sans, Raleway, Lora, Source Serif 4, Cairo (Arabic), Tajawal (Arabic). Append all to the Google Fonts `@import` in `src/index.css`.

## 5. Sitewide imagery refresh — light theme, infrastructure-only

Replace every Unsplash URL in `defaultLayers`, `defaultServices`, `defaultUsers`, `defaultVision`, `defaultNews`, `defaultMapView`, and any hero defaults that fail the brief.

Topic palette (daylight only, no neon, no dark interiors): power transmission lines/substations, solar farms, wind turbines, factories/industrial plants, oil & gas terminals, road & highway aerials, bridges, water treatment, telecom towers, daylight data centers, smart-city sensors, blueprints/CAD overlays, GIS dashboards.

Each card gets a topical match (e.g. `OIL_GAS` → pipeline, `ELECTRICITYANDWATER` → power lines + reservoir, `TELECOM` → telecom tower, `ROAD_*` / `STREETCENTERLINES` / `PAVEMENTS` → highway aerial, `DTM`/`TOPOGRAPHIC` → terrain, `BUILDINGS`/`CADASTRAL` → blueprint, `VEGETATION`/`BOTANICAL_ATLAS` → green farm aerial, `HEALTHSERVICES` → bright modern hospital exterior, `BUS ROUTE` → daytime transit, `CAA` → daylight runway aerial, etc.).

Persisted-state migration: if a persisted card's `image` matches a known old URL we are replacing, swap to new URL; otherwise leave admin-customized images alone.

## 6. Admin: side-by-side English + Arabic editor

**Goal**: every admin editor surfaces English fields on the left and identical Arabic fields on the right, mirroring inputs, previews, image pickers, and styling controls. Single **English** "Update" button saves both.

### Shared building blocks (new)
- `src/components/admin/BilingualField.tsx`: renders two inputs/textareas side-by-side with EN / AR labels; signature: `<BilingualField label en={...} ar={...} onChangeEn onChangeAr type="input|textarea" rows />`.
- `src/components/admin/BilingualSection.tsx`: layout shell `<div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div>EN…</div><div dir="rtl">AR…</div></div>` with sticky language headers ("English" / "العربية") at the top of each column.
- All Arabic textareas/inputs get `dir="rtl"` and `font-['Tajawal']` for native feel.

### Editors to update (all under `src/components/admin/editors/`)

For every editor, mirror existing fields into a paired `*_ar` field on the same record (already added to `contentStore.ts` in section 2). Image pickers, sliders, color pickers, and font selectors remain **single** (not duplicated) — they are shared visual properties. Only **text** is duplicated.

- **HeroEditor.tsx**: 
  - Hero Text card → bilingual title1 / title2 / subtitle.
  - Live Preview card → split into two stacked previews (EN on top, AR below with `dir="rtl"`) using the same image, overlay, and styling.
  - Carousel Images and Text Styling cards remain single.
- **AboutEditor.tsx**: bilingual heading, description1, description2, stat labels. Stats `target`/`suffix` stay single (numbers).
- **VisionEditor.tsx**: bilingual heading, description, and per-card title/description. Image and link single.
- **ServicesEditor.tsx**: bilingual heading, description, per-card title/description, tags (each tag duplicated).
- **WhoCanUseSection editor (`UsersEditor.tsx`)**: bilingual heading, description, per-card title/description.
- **DataServicesEditor.tsx**: bilingual heading, description; entity name bilingual (logo and link single).
- **FooterEditor.tsx**: bilingual link labels (hrefs single).
- **LayersEditor.tsx**: bilingual heading, description, per-card title/description.
- **NewsEditor.tsx**: bilingual heading, description, per-item title/excerpt; date and link single.
- **MapViewEditor.tsx**: bilingual heading, description, ctaLabel; ctaHref and previewImage single.

### Single Update button
At the bottom of each editor, keep one **English-labeled** primary button (`Update <Section> Section`). Its handler calls the existing `updateX(draft)` once — `draft` already contains both EN and AR fields, so a single store write persists both. Reset button stays as-is and resets both languages.

### Visual rules
- Light theme preserved; no glassmorphism.
- Arabic column inherits same `clean-card` styling, just `dir="rtl"` and right-aligned text.
- Mobile: columns stack (EN on top, AR below) under `lg` breakpoint.

---

## Files

**Create**: 
- `src/lib/i18n.ts`, `src/lib/searchIndex.ts`
- `src/pages/Search.tsx`
- `src/components/SearchDropdown.tsx`
- `src/components/admin/BilingualField.tsx`, `src/components/admin/BilingualSection.tsx`

**Edit**: 
- `src/App.tsx`, `src/main.tsx`
- `src/components/Navbar.tsx`, `src/components/MapViewSection.tsx`, `src/pages/MapView.tsx`
- `src/components/HeroSection.tsx`, `src/components/AboutSection.tsx`, `src/components/VisionSection.tsx`, `src/components/ServicesSection.tsx`, `src/components/WhoCanUseSection.tsx`, `src/components/DataServicesSection.tsx`, `src/components/LayersSection.tsx`, `src/components/NewsSection.tsx`, `src/components/Footer.tsx`
- `src/stores/contentStore.ts` (add `*_ar` fields + Arabic defaults + migration)
- All admin editors (bilingual layout)
- `src/index.css` (extra fonts incl. Cairo, Tajawal)

## Out of scope

- Real interactive map (still placeholder image on `/map`).
- Auto-translation: admin must enter Arabic copy manually for new items (defaults seeded for existing built-in content).
- RBAC / auth changes.
