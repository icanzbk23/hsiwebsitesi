# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HSİ Medya — a static two-page website for a Turkish food media company based in Hatay. No build tools, no framework, no package.json. Raw HTML/CSS/JS served via Vercel (auto-deploys from `git push origin main`).

## Development Workflow

There is no build or lint step. To preview locally, open the HTML files directly in a browser or use any static server:

```bash
# Quick local server (from hsi-medya/)
cd hsi-medya && python3 -m http.server 8080
```

To update Instagram data manually (requires a downloaded Apify dataset file):

```bash
# Place apify_dataset.json in hsi-medya/, then:
node hsi-medya/apify_to_json.js
# Outputs: data/mekanlar.json, downloads thumbnails to img/reels/
```

Automated daily refresh runs via GitHub Actions (`.github/workflows/refresh.yml`) every day at 06:00 UTC. It calls Apify API directly — no local file needed. To trigger manually from the CLI:

```bash
gh workflow run refresh.yml
```

To run the refresh script locally (requires `APIFY_TOKEN` env var):

```bash
APIFY_TOKEN=apify_api_... node hsi-medya/scripts/refresh.js
```

Deploy by pushing to main:

```bash
git push origin main
```

## Architecture

### Pages

- **`hsi-medya/index.html`** — Home page. Hero, services (Hizmetler), mekan preview grid, broadcast channels. All CSS is inline. No external JS.
- **`hsi-medya/mekanlar.html`** — Venues explorer. Loads `js/mekanlar-data.js` and `js/app.js`. Tab UI (Mekanlar / Yakında), search, category filters, card grid, popup modal.

### Data Flow

1. **`js/mekanlar-data.js`** — Single source of truth for venue data. Exports `MEKANLAR`, `AKTIF_MEKANLAR`, `YAKINDA_MEKANLAR` arrays. Each venue has: `id`, `cat`, `name`, `reels[]`, `infos[]`, `hsi` (partnership text). Edited manually when adding/updating venues.

2. **`js/app.js`** — Renders mekanlar.html UI. On load, calls `loadThumbnails()` which fetches `data/mekanlar.json` and patches **thumbnail, caption, likes, views** (per reel) and **followers** (per mekan) into the in-memory data. Then re-renders cards. Hash routing (`#mekan-id`) opens/closes popup via `history.pushState`.

3. **`data/mekanlar.json`** — Written by `apify_to_json.js` (manual) or `scripts/refresh.js` (automated). Structure:
   - `reels[shortcode]` → `{ thumb, views, likes, caption, mekan }`
   - `profiles[mekanId]` → `{ followers, followersRaw }`
   - `last_updated` — ISO date string of last refresh

4. **`scripts/refresh.js`** — Automated refresh. Calls Apify API via two actor runs: `apify~instagram-api-scraper` for 36 reel URLs (`resultsType:"posts"`) and `apify~instagram-profile-scraper` for 12 profile usernames. Updates `data/mekanlar.json`, downloads new thumbnails. Pure Node.js — no npm dependencies.

### CSS Architecture

All CSS lives in `<style>` tags inside each HTML file. Key CSS variables (defined in `:root`):

- `--gold: #C9A84C`, `--gold-light: #E8C96A` — primary accent
- `--font-display: 'Cormorant Garamond', serif` — headings
- `--font-body: 'DM Sans', sans-serif` — body text

Brand-specific card glows in `mekanlar.html` use `[data-id="mekan-id"]` attribute selectors. The `data-id` is set dynamically in `renderCards()` in app.js. Desktop hover glows use `:hover`, mobile always-on glows use `@media (hover: none)`.

### Images

- `img/profiles/` — Venue logos (referenced in mekanlar-data.js as `logo` field)
- `img/reels/` — Instagram reel thumbnails (downloaded by apify_to_json.js, gitignored until committed)
- Root-level images (`eserbilenyt.jpg`, `hataymekanları.jpg`, etc.) — untracked, used for social/content purposes

## Key Conventions

- **Adding a new mekan**: Add entry to `MEKANLAR` array in `mekanlar-data.js`, add logo to `img/profiles/`, add brand glow CSS for its `data-id` in `mekanlar.html` (both `:hover` and `@media (hover:none)` blocks). Update `SC_MAP`, `PROFILE_URLS`, and `PROFILE_MAP` in `scripts/refresh.js`.
- **`coverPos`** — optional field on a mekan object (e.g. `coverPos:'center 20%'`). Sets `object-position` on the card cover image. Use to keep a person's face visible when the thumbnail crops.
- **Activating a yakında mekan**: Change `status:'yakinda'` → `status:'aktif'` in `mekanlar-data.js`. Fill in `reels[]`, `infos[]`, `about`, `hours`, `followers`. Remove its card from the Yakında grid in `index.html` if hardcoded there.
- **Updating reel data**: For manual one-off updates run `apify_to_json.js` with a downloaded dataset. For automated daily updates the `scripts/refresh.js` workflow handles everything.
- **GA4**: Both HTML files contain a `GA_MEASUREMENT_ID` placeholder. Replace with actual ID when ready to activate analytics.
- **Fonts**: Loaded from Google Fonts in `<head>`. Max weight for Cormorant Garamond is 700 (900 is not available).
