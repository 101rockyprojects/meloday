# Meloday Agent Documentation

## Project Overview
Meloday is a daily song dedication web app that delivers a different YouTube song each day of the year. Built with Svelte 5 and Vite.

## Tech Stack
- **Framework**: Svelte 5
- **Build Tool**: Vite 5.4.10
- **Styling**: Tailwind CSS 3.4.15 + custom CSS
- **YouTube Integration**: @justinribeiro/lite-youtube 1.8.2
- **Package Manager**: npm

## Directory Structure
```
src/
├── components/     # Svelte components
│   ├── Main.svelte
│   ├── VideoPlayer.svelte
│   ├── Video.svelte
│   ├── Quote.svelte
│   ├── TodayDate.svelte
│   ├── TypedAnimatedTitle.svelte
│   ├── Confetti.svelte
│   ├── Toast.svelte
│   ├── QuickGuide.svelte
│   └── Oops.svelte
├── data/           # Static data
│   ├── variables.js    # Environment variables (playlistId, apiKey, specialDates)
│   ├── quotes.js        # Daily quotes array
│   └── specialQuotes.js # Special occasion quotes
├── functions/      # Utility functions
│   ├── api.js          # YouTube API calls
│   ├── dates.js        # Date utilities
│   ├── format.js       # String formatting
│   └── routes.js       # URL route parsing
├── stores/         # Svelte stores
│   ├── todayNumber.js
│   └── isSpecialDateToday.js
├── App.svelte
├── main.js
└── app.css
```

## Key Dependencies
- `@sveltejs/vite-plugin-svelte` - Svelte Vite integration
- `@tailwindcss/forms` - Tailwind form styling
- `gh-pages` - GitHub Pages deployment

## Environment Variables (.env)
```env
VITE_YT_API_KEY=YOUR_API_KEY_HERE
VITE_YT_PLAYLIST_ID=YOUR_PLAYLIST_ID_HERE
VITE_SPECIAL_DATE_1=DD-MM  # Special dates format
```

## Environment Variables Access
Import from `src/data/variables.js`:
```js
import { playlistId, apiKey, specialDates } from '@App/data/variables.js';
```

## Aliases
- `@App` → `./src/` (configured in vite.config.js)

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

## YouTube API Functions (`src/lib/functions/api.js`)
- `getTodayVideo(playlistId, apiKey)` - Fetches song based on day number
- `getVideoById(videoId, apiKey)` - Fetches specific video

## Date Functions (`src/lib/functions/dates.js`)
- `parseDate(dateString)` - Parses DD-MM format
- `isLeapYear()` - Checks leap year
- `getDayNumber(date)` - Gets day of year (1-365/366)
- `isSpecialDate(date, specialDates)` - Checks if special date

## Stores
- `todayNumber` - Current day number (writable store)
- `isSpecialDateToday` - Boolean for special occasion (writable store)

## URL Parameters
- `?v=videoId` or `?song=videoId` - Play specific video
- `?day=DD-MM` - View song for specific date
- `/watch?v=videoId` - YouTube-style path
- `/watch/videoId` - Segment path
- `/videoId` - Direct video ID path
- `/special` - Special date boolean (confetti animation)

## Route Parser (`src/lib/functions/routes.js`)
- `parseRoute()` - Parses `window.location` and returns `{ videoId, day }`

**Supported URL Patterns:**
| Pattern | Example |
|---------|---------|
| Query param | `/?v=videoId` |
| Song param | `/?song=videoId` |
| Watch query | `/watch?v=videoId` |
| Watch segment | `/watch/videoId` |
| Short path | `/videoId` |
| Day param | `/?day=DD-MM` |
| Special date param | `/?special` |

## Toast Component (`src/lib/components/Toast.svelte`)
Error notification toast with dark background, white text, red left border.

**Props:**
- `message` (string) - Notification text
- `visible` (boolean) - Show/hide state
- `duration` (number) - Auto-hide delay in ms (default: 5000)

**Methods:**
- `show()` - Display toast and start timer
- `hide()` - Hide toast manually

**Usage:**
```svelte
<script>
  let toast;
</script>
<Toast bind:this={toast} message="Error message" />
<button on:click={() => toast.show()}>Show</button>
```

## QuickGuide Component (`src/lib/components/QuickGuide.svelte`)
Help panel for converting YouTube links to Meloday URLs.

**Features:**
- Input field to paste YouTube links
- Converts to Meloday URL format dynamically
- Copy button for converted URL
- List of supported URL patterns with copy buttons
- All examples in Spanish

**Location:** Fixed bottom-right corner of viewport

## Custom Colors (Tailwind)
- amoure, fashion-doll, gummy, miracle, blue-berry, coral, ceil-gray, gray, white

## Custom Fonts
- `font-readex` - Readex Pro
- `font-shadows` - Shadows Into Light (cursive)

## Build Base Path
Base path is `/meloday/` for GitHub Pages deployment

## Deployment
Builds to `dist/` folder and deploys to GitHub Pages via `gh-pages` package.