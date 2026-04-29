## Goal

Update the site header to show 8 section nav links that smooth-scroll to their sections, and convert the search bar into a circular icon button that expands into an input on click.

## Changes

### 1. Navbar links (`src/components/Navbar.tsx`)

Replace the current 4-link `navLinks` array with 8 links that anchor to existing section IDs:


| Label (EN)    | Label (AR)         | Anchor                                         |
| ------------- | ------------------ | ---------------------------------------------- |
| News          | الأخبار            | `#news`                                        |
| About         | حول                | `#about`                                       |
| Map           | الخريطة            | `#map-view`                                    |
| Layers        | الطبقات            | `#layers`                                      |
| BSDI Provides | خدمات BSDI         | `#contact` *(cdurrent DataServicesSection id)* |
| Vision        | الرؤية             | `#vision`                                      |
| Who can use   | من يمكنه الاستخدام | `#who-can-use`                                 |
| Contact       | اتصل بنا           | `#footer` *(new id added to Footer)*           |


- Add new i18n keys in `src/lib/i18n.ts`: `nav.news`, `nav.map`, `nav.layers`, `nav.bsdiProvides`, `nav.vision` (existing `nav.about`, `nav.whoCanUse`, `nav.contact` reused).
- Use smooth scrolling via `onClick` handler calling `element.scrollIntoView({ behavior: "smooth", block: "start" })` with offset for the fixed navbar height (≈80px) using `window.scrollTo`.
- Add `id="footer"` to the `<footer>` element in `src/components/Footer.tsx` so the Contact link lands there.
- Reduce link font size slightly (`text-xs md:text-sm`) and tighten gap (`gap-4 lg:gap-5`) so 8 links + admin button + lang toggle fit on desktop.
- Hide nav links between `md` and `lg` if space is tight; show full set at `lg:flex`. Below `lg`, links collapse into the existing mobile menu.

### 2. Collapsible circular search

Replace the always-visible centered search form with a circular icon button placed in the right cluster (before Admin button).

Behavior:

- Default: 40×40 circular button with `Search` icon, border, hover state.
- On click: button expands horizontally into an input (width animates from `40px` → `260px`), icon stays on the left inside the input, focus moves to the input automatically.
- On blur with empty query, or on Escape, or on outside click: collapses back to circle.
- Submitting (Enter) or clicking a result preserves existing navigation logic and closes the dropdown + collapses.

Implementation:

- New state `searchOpen` (boolean). Use a `ref` on the input to call `.focus()` after expand.
- Animate using Tailwind `transition-[width] duration-300 ease-out` and conditional `w-10` vs `w-64` classes; keep `rounded-full`.
- Reuse the existing dropdown markup (preview hits + "See all results"); position it `absolute top-full right-0 mt-2 w-80`.
- Mobile menu keeps its current full-width search input unchanged.

### 3. Layout

Final desktop navbar order (LTR):
`[Logo] ............ [News] [About] [Map] [Layers] [BSDI Provides] [Vision] [Who can use] [Contact] [🔍] [Admin] [EN|AR]`

In RTL (Arabic), flex direction naturally mirrors via `dir="rtl"` on `<html>` (already handled by LanguageProvider).

## Files touched

- `src/components/Navbar.tsx` — restructure links, add collapsible search, update smooth-scroll handler.
- `src/lib/i18n.ts` — add 5 new nav translation keys (EN + AR).
- `src/components/Footer.tsx` — add `id="footer"` for Contact anchor.

## Out of scope

No changes to section content, styling system, admin panel, or stores.