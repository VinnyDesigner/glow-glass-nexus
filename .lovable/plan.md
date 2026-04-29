## Replace Hero Carousel Images

Swap the 5 default hero slides with the 5 newly uploaded Bahrain images (b1–b5). The new images will appear automatically on the landing page and in the Admin → Hero editor's 5 image slots.

### Steps

1. **Copy uploaded images into the project assets**
   - `user-uploads://b1.jpg` → `src/assets/hero-slide-1.png` (overwrite)
   - `user-uploads://b2.jpg` → `src/assets/hero-slide-2.png` (overwrite)
   - `user-uploads://b3.jpg` → `src/assets/hero-slide-3.png` (overwrite)
   - `user-uploads://b4.jpg` → `src/assets/hero-slide-4.png` (overwrite)
   - `user-uploads://b5.jpg` → `src/assets/hero-slide-5.png` (overwrite)
   
   Keeping the same filenames means no import changes are needed in `HeroSection.tsx` or `HeroEditor.tsx`. Vite will pick up the new content and produce new hashed bundles.

2. **Bump store version to invalidate cached custom images**
   - In `src/stores/contentStore.ts`, increase the persist `version` (4 → 5) and add a migration that clears `hero.heroImages` to `[]`. This ensures existing users with cached overrides fall back to the new defaults instead of seeing stale uploads.

### Result

- Landing page hero carousel auto-cycles through the 5 new Bahrain images (port at sunset, container yard, connected city, King Fahd Causeway, WTC with solar panels).
- Admin → Hero Section shows the same 5 new images in the "Carousel Images" grid as default slots.
- Users can still upload custom replacements per slot; clearing returns to these new defaults.

### Notes

- No changes to layout, styling, or carousel behavior.
- Uploaded files are JPG but saved with `.png` extension to preserve existing imports — browsers and Vite handle the content correctly regardless of extension.