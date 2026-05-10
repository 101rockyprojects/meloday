# Meloday Design Documentation

## Visual Identity

### Color Palette (Tailwind Custom Colors)
| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Amoure | #EC1A1A | `text-amoure` `bg-amoure` | Primary accent, errors, confetti |
| Fashion Doll | #C3258D | `text-fashion-doll` `bg-fashion-doll` | Gradient accent |
| Gummy | #9917FF | `text-gummy` `bg-gummy` | Gradient accent, confetti |
| Miracle | #7350FC | `text-miracle` `bg-miracle` | Gradient accent |
| Blue Berry | #4C86F9 | `text-blue-berry` `bg-blue-berry` | Secondary accent, confetti |
| Coral | #EF767A | `text-coral` `bg-coral` | Small confetti pieces |
| Ceil Gray | #29292c | `bg-ceil-gray` | Card backgrounds |
| Gray | #1A1A1C | `bg-gray` | Dark backgrounds, toast |
| White | #F2EBE3 | `text-white` | Text, light accents |

### Typography
**Font Sizes (Tailwind custom):**
- `text-sm` → 0.8rem
- `text-base` → 1rem
- `text-xl` → 1.25rem
- `text-2xl` → 1.5rem
- `text-3xl` → 2rem
- `text-4xl` → 2.5rem
- `text-5xl` → 3rem

**Font Families (Tailwind custom):**
- `font-readex` → Readex Pro (primary, sans-serif)
  - Used for: body text, headers, labels
- `font-shadows` → Shadows Into Light (cursive)
  - Used for: quotes, romantic text
- `font-mono` → monospace
  - Used for: URLs, code examples in QuickGuide

### Responsive Breakpoints
Always use Tailwind responsive prefixes:
- `sm:` → 640px+
- `md:` → 768px+
- `lg:` → 1024px+

### Custom Animations (Tailwind)
- `animate-rain` → Falling confetti effect (3s infinite linear)

## Layout Structure

### Main Page (`Main.svelte`)
```
┌─────────────────────────────────────┐
│  TypedAnimatedTitle (absolute top)  │
│  TodayDate + day count              │
├─────────────────────────────────────┤
│                                     │
│         VideoPlayer (main)          │
│         (min-h-[60dvh])             │
│                                     │
├─────────────────────────────────────┤
│  QuickGuide (fixed, bottom-right)   │
│  Toast (fixed, bottom-center)       │
├─────────────────────────────────────┤
│  Footer (github link)               │
└─────────────────────────────────────┘
```

### VideoPlayer Card
- Width: `w-[85dvw]` (mobile) → `w-auto` (lg+)
- Min-height: `min-h-[60dvh]` → `min-h-[70dvh]` (lg+)
- Padding: `p-6` (mobile) → `lg:p-8` (lg+)
- Gradient border via `.card` class
- Hover: purple glow (`box-shadow: 0px 0px 30px 1px rgba(204, 46, 244, 0.3)`)

## Component Specifications

### Toast (`Toast.svelte`)
**Purpose:** Error notifications for video not found

**Position:** Fixed bottom-center
- `bottom-6` (mobile) → `bottom-6` (sm+)
- `left-1/2 -translate-x-1/2`

**Styling:**
- Background: `bg-gray` (#1A1A1C)
- Text: `text-white`
- Border-left: `border-l-4 border-amoure` (#EC1A1A)
- Border-radius: `rounded` (mobile) → `sm:rounded-lg` (sm+)
- Padding: `px-4 py-3` (mobile) → `sm:px-6 sm:py-4` (sm+)
- Max-width: `max-w-[90dvw]` (mobile) → `sm:max-w-md` (sm+)

**Elements:**
- Message text: `text-sm sm:text-base font-readex`
- Close button: X icon with hover state

**Props:**
- `message` (string, default: "Lo siento, no encontramos tu canción :(")
- `visible` (boolean)
- `duration` (number, default: 5000ms)

### QuickGuide (`QuickGuide.svelte`)
**Purpose:** Help users understand URL patterns

**Position:** Section below VideoPlayer (centered)
- `w-full max-w-lg mx-auto`
- Padding: `px-4 py-6 sm:py-8`
- Background: `bg-gray` (darker section)
- Border: `border border-white/5`
- Border-radius: `rounded-xl`
- Margin: `mt-4 sm:mt-6 mb-4`

**Header:**
- Title: `text-sm sm:text-base font-readex font-bold`
- Color: `text-white/70`
- Alignment: `text-center`

**URL Converter Input:**
- Background: `bg-ceil-gray`
- Font: `font-mono`
- Border: `border border-white/10`
- Focus: `focus:border-amoure focus:outline-none`
- Placeholder: `placeholder-white/30`

**Example Items:**
- Container: `bg-ceil-gray/30 p-2 sm:p-3 rounded-lg`
- Type label: `text-xs text-amoure font-readex font-bold`
- Description: `text-xs text-white/40 font-readex`
- URL: `text-xs sm:text-sm text-blue-berry font-mono`

### Confetti (`Confetti.svelte`)
**Purpose:** Celebrate special dates

**Position:** Absolute full-screen overlay
- `absolute h-screen inset-0`

**Elements:** 20 confetti pieces
- Colors: odd=amoure, even=blue-berry, 3n=coral, 4n=gummy, 5n=white
- Animation: `animate-rain` (falling effect)

### Video (`Video.svelte`)
**Layout:** Two-column on lg+, stacked on mobile
- `flex-col lg:flex-row`
- Video: `w-full lg:w-[65%]`
- Info: `w-full lg:w-[35%]`

**Elements:**
- Title: `text-lg md:text-2xl lg:text-3xl`
- Quote: `text-lg md:text-xl lg:text-[1.4rem]`
- YouTube button with icon

### Quote (`Quote.svelte`)
**Styling:**
- Font: `font-shadows` (Shadows Into Light)
- Size: `text-lg md:text-xl lg:text-[1.4rem]`
- Opacity: `opacity-70`
- Letter-spacing: `tracking-wide`

### TodayDate (`TodayDate.svelte`)
**Styling:**
- Font: `font-readex font-light` (readex-thin class)
- Date format: Spanish locale, long format
- Color: `text-ceilGray` with `opacity-30`
- Size: `text-base md:text-md lg:text-lg`

### TypedAnimatedTitle (`TypedAnimatedTitle.svelte`)
**Responsive sizes:**
- Base: `text-[2.5rem]`
- sm: `text-[3.25rem]`
- md: `text-[3.5rem]`
- lg: `text-[3.75rem]`
- xl: `text-[3.85rem]`

**Gradient text:**
- `from-amoure via-gummy to-blue-berry`
- `text-transparent bg-clip-text`

## CSS Utilities

### Custom Classes (`app.css`)
```css
.readex-thin { @apply font-readex font-light; letter-spacing: 0.05em; }
.readex-bold { @apply font-readex font-bold; letter-spacing: 0.05em; }
.shadows { @apply font-shadows font-light; letter-spacing: 0.05em; }
```

### Card Gradient
```css
.card {
  background-image: linear-gradient(150deg, #EC1A1A 0%, #4C86F9 100%);
}
```

## Interactive States

### Button Hover
- Background color transitions
- `hover:bg-*` classes

### Card Hover
- Purple glow: `box-shadow: 0px 0px 30px 1px rgba(204, 46, 244, 0.3)`
- Inner content: `transform: scale(0.98)`

### Links
- Footer: 50% opacity → full on hover

### Copy Button Feedback
- Check icon (green) for 2 seconds after copy
- X icon default

## Component Hierarchy
```
App.svelte
└── Main.svelte
    ├── TypedAnimatedTitle.svelte
    ├── TodayDate.svelte
    ├── VideoPlayer.svelte
    │   ├── Confetti.svelte (conditional)
    │   └── Video.svelte
    │       └── Quote.svelte
    ├── QuickGuide.svelte
    │   └── Toast.svelte
    └── Footer (GitHub link)
```

## Error Handling
- Video not found: Toast notification (bottom-center)
- API error: Toast notification + fallback to today's video
- Invalid URL: Toast notification + no video loaded

## Accessibility
- Toast has `role="alert"` and `aria-live="polite"`
- Copy buttons have `aria-label="Copiar"`
- Close button has `aria-label="Cerrar"`