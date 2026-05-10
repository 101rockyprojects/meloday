# Meloday Technical Specification

## Overview

Meloday is a daily song dedication web app that delivers a different YouTube song each day of the year.

## Architecture

### Stack

- **Framework**: SvelteKit 2.x (runs on Vite)
- **Deployment**: Cloudflare Pages
- **Adapter**: `@sveltejs/adapter-cloudflare`
- **Styling**: Tailwind CSS 3.x + custom CSS
- **YouTube Integration**: @justinribeiro/lite-youtube

### Directory Structure

```text
src/
├── lib/                    # Library code (NOT src/ root)
│   ├── components/         # Svelte components
│   │   ├── Confetti.svelte
│   │   ├── Main.svelte
│   │   ├── Quote.svelte
│   │   ├── QuickGuide.svelte
│   │   ├── TodayDate.svelte
│   │   ├── Toast.svelte
│   │   ├── TypedAnimatedTitle.svelte
│   │   ├── Video.svelte
│   │   └── VideoPlayer.svelte
│   ├── data/              # Static data
│   │   ├── quotes.js
│   │   ├── specialQuotes.js
│   │   └── variables.js
│   ├── functions/         # Utility functions
│   │   ├── api.js
│   │   ├── dates.js
│   │   ├── format.js
│   │   └── routes.js
│   └── stores/            # Svelte stores
│       ├── isSpecialDateToday.js
│       └── todayNumber.js
├── routes/                # SvelteKit routes
│   ├── +page.svelte       # Main page (also handles query params)
│   ├── [id]/+page.svelte  # /:id (video id)
│   ├── watch/[id]/+page.svelte # /watch/:id (video id)
│   └── api/v1/           # API routes
│       └── +server.js    # GET /api/v1?day=DD-MM
├── app.html              # HTML template
└── app.css               # Global styles
```

## Important Rules

### 1. Import Alias

Use `@App` for imports in SvelteKit:

```javascript
// CORRECT
import { getDayNumber } from '@App/lib/functions/dates.js';
import Main from '@App/lib/components/Main.svelte';

// INCORRECT (will duplicate code)
import { getDayNumber } from '@App/lib/functions/dates.js';
```

For images sources use `./images` to access resources from `publi/images/`.

### 1.1 Base Path (`/meloday`)

This app is configured to run under the `/meloday` base path (GitHub Pages-style hosting). That means:

- App URLs are served under `/meloday/...` (e.g. `/meloday/watch/dQw4w9WgXcQ`)
- API URLs are served under `/meloday/api/...` (e.g. `/meloday/api/v1`)

### 2. Environment Variables

For SvelteKit, use `@App/lib/data/variables.js` for client-side variables:

```javascript
import { playlistId, apiKey, specialDates } from '@App/lib/data/variables.js';
```

For server-side variables (API routes), use `import.meta.env`:

```javascript
export const playlistId = import.meta.env.VITE_YT_PLAYLIST_ID;
```

### 3. NO Duplicate Files

- All components go in `src/lib/components/`
- All utilities go in `src/lib/functions/`
- All data go in `src/lib/data/`
- NO files should exist in `src/components/`, `src/functions/`, etc.

### 4. Toast Component Pattern

The Toast must be properly initialized with `bind:this` and use `tick()` for visibility:

```svelte
<script>
    import Toast from '@App/lib/components/Toast.svelte';
    import { tick } from 'svelte';

    let toast;

    async function showError() {
        try {
            // error case
            await tick();
            toast?.show();
        } catch (e) {
            await tick();
            toast?.show();
        }
    }
</script>

<Toast bind:this={toast} message="Error message" />
```

## Deployment

### Cloudflare Pages

1. Connect repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `build`
4. Environment variables:
   - `VITE_YT_API_KEY`
   - `VITE_YT_PLAYLIST_ID`
   - `VITE_SPECIAL_DATES` (comma-separated, DD-MM format)

### API Endpoint

`GET /api/v1?day=DD-MM` (served as `/meloday/api/v1?day=DD-MM` when `kit.paths.base = '/meloday'`)

Returns:

```json
{
  "name": "Song Title",
  "videoId": "dQw4w9WgXcQ",
  "embed": "<lite-youtube videoid=\"x_ECOgMJsSs\" class=\"meloday-video\"></lite-youtube>",
  "defaultLink": "/?v=dQw4w9WgXcQ",
  "links": {
    "query": "/?v=dQw4w9WgXcQ",
    "watchQuery": "/watch?v=dQw4w9WgXcQ",
    "watchSegment": "/watch/dQw4w9WgXcQ",
    "short": "/dQw4w9WgXcQ",
    "byDay": "/?day=09-05"
  },
  "date": {
    "raw": "09-05",
    "parsed": "9 de mayo de 2026",
    "dayOfYear": 129,
    "isLeapYear": false
  },
  "quote": "Hay tantas canciones que me recuerdan a ti",
  "isSpecialDate": false
}
```

## QuickGuide

The app includes a built-in **QuickGuide** panel (bottom-right) that helps users paste YouTube links and generates Meloday URLs. It includes copy buttons and examples of the supported patterns, including:

- `/?v=VIDEO_ID` and `/?song=VIDEO_ID`
- `/watch/VIDEO_ID`
- `/VIDEO_ID`
- `/?day=DD-MM`

## Color Palette

| Name | Hex | Tailwind Class |
|------|-----|----------------|
| Amoure | #EC1A1A | text-amoure |
| Blue Berry | #4C86F9 | text-blue-berry |
| Ceil Gray | #29292c | bg-ceil-gray |
| Gray | #1A1A1C | bg-gray |
| White | #F2EBE3 | text-white |

## Responsive Breakpoints

Always use Tailwind prefixes:

- `sm:` → 640px+
- `md:` → 768px+
- `lg:` → 1024px+

## Common Issues & Solutions

### Toast Not Showing

- Use `await tick()` before calling `toast?.show()`
- Ensure `bind:this={toast}` is properly set

### Duplicate Code

- Only one copy of each component/function should exist
- Use `src/lib/` as the single source of truth, but access to any file inside using `@App/lib/`
- Delete any files in `src/components/`, `src/functions/`, `src/data/`, `src/stores/`

### Environment Variables Not Loading

- Check file `src/lib/data/variables.js`
- Ask the user to verify `.env` files. YOU MUST AVOID READING ANY `.env` file without authorization, the only exception is `.env.example`.
