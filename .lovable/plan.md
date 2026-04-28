## Scope

Three focused improvements: News section enhancements, Map preview image swap, and bilingual styling controls in the Hero admin editor.

---

## 1. News Section — 4 cards + enhanced styling

**`src/stores/contentStore.ts` (`defaultNews.items`)**
- Add a 4th seed news item (e.g., "Open Data Catalogue expansion") using a light, infrastructure image (`IMG.solar` or `IMG.telecomTower`).
- Bump persist `version` to 4 and extend the `merge` migrator so existing users with only 3 news items receive the new 4th item (append if no custom item with that id exists).

**`src/components/NewsSection.tsx`**
- Change grid from `lg:grid-cols-3` → `lg:grid-cols-4` (keep `md:grid-cols-2` for tablet).
- Keep `clean-card` (already 20px radius globally) — make news cards stand out by adding `rounded-3xl` (24px) on the `<article>` and `rounded-2xl` on the inner `card-image`, overriding the base `.clean-card` radius for this section only.
- Slightly tighten card padding for 4-col layout (`p-5` → `p-4`) and add `text-base` → `text-[15px]` headings so titles fit comfortably.
- Preserve hover lift, image zoom, RTL, localized date, link wrapping.

---

## 2. Map View — Bahrain-focused light image

**`src/stores/contentStore.ts`**
- Replace `IMG.bahrainMap` URL with a Bahrain-specific, light-theme map/satellite image. Candidate: a light cartographic render of Bahrain (e.g., a Mapbox/OpenStreetMap-style light tile screenshot hosted on Unsplash/Wikimedia). Proposed: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Bahrain_location_map.svg/1024px-Bahrain_location_map.svg.png` (light cartographic outline of Bahrain) — guaranteed Bahrain-focused, light background.
- Add a one-time migration in `merge`: if `persisted.mapView.previewImage` equals the old Unsplash URL, replace with the new image so existing users see the update.

---

## 3. Hero Admin — Bilingual styling (EN + AR side-by-side)

**`src/stores/contentStore.ts` (`HeroContent`)**
- Add optional fields: `title1StyleAr`, `title2StyleAr`, `subtitleStyleAr` (typed `HeroTextStyle`).

**`src/components/admin/editors/HeroEditor.tsx`**
- Replace the local `TextStyleControls` block with the shared `SectionStyleControls` component (already supports EN/AR side-by-side, identical font list incl. Cairo/Tajawal).
- Render three `SectionStyleControls` rows: Title Line 1, Title Line 2, Subtitle — each with `styleEn` / `styleAr` / `onChangeEn` / `onChangeAr` wired to the new `*StyleAr` draft fields.
- Keep the single English "Update Hero Section" button.
- Live Preview: keep current EN-only preview (matches other editors which preview in active language only). No changes needed to preview block.

**`src/components/HeroSection.tsx`**
- When active language is Arabic, apply `title1StyleAr` / `title2StyleAr` / `subtitleStyleAr` (fall back to EN style if AR style absent). Use the same pattern as `useSectionStyles` — small inline resolver since Hero styles aren't part of `SectionStyles` interface.

---

## Technical notes

- Persist version bump (3→4) with conservative `merge`: only inject the 4th news item / new map image when the user hasn't customized those specific fields.
- `clean-card` base radius is 20px globally; news will override to 24px (`rounded-3xl`) without affecting other sections.
- All new content includes `*_ar` translations and uses light, infrastructure-themed imagery per project rules.
- No new dependencies, no schema changes outside the Zustand store.
