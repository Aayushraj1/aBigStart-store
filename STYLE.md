# STYLE.md

Style guide for **Say What**: a store for all kinds of unique, quirky home decor,
the objects that make people say "say what?" (a traffic cone lamp, a giant Rubik's
Cube table, a 5 ft pen with a bulb inside, and many more).

**Audience:** Gen Z and Gen Alpha.
**Direction:** Wrongroom's bold, shop-first energy, with Areaware's calm grid and
spacing. The products are loud; the layout around them stays clean.

## 0. Brand

| | |
|---|---|
| Name | **Say What** (written "Say What?" in the logo and headlines) |
| Domain | saywhat.in (fallbacks: saywhat.co.in, saywhathome.com) |
| Handle | @saywhat.in on every platform; @saywhathome if taken |
| Tagline | "Decor that makes people say what." |
| Idea | Every product should earn a "say what?" reaction. If it doesn't, it doesn't belong in the store. |

Logo: "SAY WHAT?" in Unbounded 900, uppercase. The question mark can tilt or
change color per section; it's the one element allowed to play.

---

## 1. Personality

| We are | We are not |
|---|---|
| Bold, playful, a little cheeky | Childish or cluttered |
| Confident ("yes, it's a 5 ft pen") | Apologetic or over-explained |
| Clean layouts, loud products | Loud layouts that compete with products |
| Shop-first and fast | A gallery you can't buy from |

**One-line rule:** calm page, loud object.

---

## 2. Color

Neutral base (white and near-black) so each product's color does the talking.
Accents are used one at a time: one backdrop color per section, never a rainbow
on a single screen.

### Core

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Page background |
| `--ink` | `#0A0A0A` | Text, borders, primary buttons |
| `--ink-soft` | `#424242` | Secondary text |
| `--surface` | `#F2F2F2` | Cards, input backgrounds |
| `--line` | `#E6E6E6` | Dividers on light surfaces |

### Accents (product and section backdrops)

| Token | Hex | Name | Pair with |
|---|---|---|---|
| `--cone` | `#E64E2E` | Cone Orange (brand accent) | Traffic cone lamp, sale tags |
| `--mustard` | `#F8A512` | Mustard | Pen lamp, highlights |
| `--cobalt` | `#0A5AC9` | Cobalt | Links, button hover |
| `--lime` | `#D2F37F` | Lime | "New drop" sections |
| `--sky` | `#63A4FF` | Sky | Rubik's table, info blocks |
| `--lilac` | `#CEAFFF` | Lilac | Soft backdrops |
| `--bubblegum` | `#FF419D` | Bubblegum | Badges, stickers (small doses) |

### Rules
- Text on any accent is `--ink`, except on `--cobalt` and `--cone`, where it is `--paper`.
- Buttons are always `--ink` at rest. Accent color appears on hover only.
- Full-bleed product sections may use an accent backdrop; product cards stay on `--surface`.
- Name colors with personality when they're product variants (e.g. "Cone Orange",
  "Highlighter Yellow"), never just "Orange".

---

## 3. Typography

Two fonts, both free on Google Fonts.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display (headlines, product names) | **Unbounded** | 700–900 | Wide, extended, chunky |
| Body and UI | **Poppins** | 400, 500, 600 | Geometric, friendly |

```html
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
```

### Scale

| Token | Size | Font | Style |
|---|---|---|---|
| `--text-hero` | `clamp(3rem, 8vw, 7rem)` | Unbounded 900 | Uppercase, `letter-spacing: -0.04em`, `line-height: 0.95` |
| `--text-h1` | `clamp(2.25rem, 5vw, 4rem)` | Unbounded 900 | Uppercase, `-0.04em`, `line-height: 1` |
| `--text-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | Unbounded 700 | `-0.03em`, `line-height: 1.05` |
| `--text-h3` | `1.375rem` | Unbounded 700 | `-0.02em` |
| `--text-body` | `1.125rem` (18px) | Poppins 400 | `line-height: 1.5` |
| `--text-small` | `0.9375rem` (15px) | Poppins 400 | |
| `--text-label` | `0.75rem` (12px) | Poppins 600 | Uppercase, `letter-spacing: 0.2em` |

### Rules
- Headlines are short (2–6 words) and break across lines on purpose.
- Labels above headlines ("MEET THE LINEUP") use `--text-label`.
- Never use more than one display headline per screen.
- Body text max width: `60ch`.

---

## 4. Layout and spacing

### Spacing scale (base 8px)

| Token | Value |
|---|---|
| `--space-1` | `0.5rem` (8px) |
| `--space-2` | `1rem` (16px) |
| `--space-3` | `1.5rem` (24px) |
| `--space-4` | `3rem` (48px) |
| `--space-5` | `6rem` (96px) |
| `--space-6` | `9rem` (144px) |

### Grid
- 12 columns, max content width `1320px`, side gutter `16px` on phones, `32px` on desktop.
- Section padding: `--space-5` top and bottom on desktop, `--space-4` on phones.
- Product grid: 4 columns desktop, 2 tablet, 1–2 phone (2 if cards stay readable).
- Keep generous whitespace between sections. Statement products need room.

### Breakpoints

| Name | Min width |
|---|---|
| `sm` | `480px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1320px` |

Design phone-first. No horizontal scroll at any width.

---

## 5. Shape, borders, shadows

| Token | Value | Use |
|---|---|---|
| `--radius-pill` | `9999px` | Buttons, badges, swatches |
| `--radius-card` | `16px` | Product cards, panels |
| `--radius-sm` | `6px` | Inputs, small chips |
| `--border` | `2px solid var(--ink)` | Buttons, focused inputs, sticker badges |
| `--shadow-soft` | `0 10px 25px rgba(0,0,0,0.08)` | Dropdowns, cart drawer |
| `--shadow-pop` | `6px 6px 0 var(--ink)` | Card and button hover (the playful touch) |

The hard offset shadow (`--shadow-pop`) is our signature. Use it on hover and
for sticker-style badges only, not on everything.

---

## 6. Components

### Buttons

| Variant | Rest | Hover |
|---|---|---|
| Primary | `--ink` bg, `--paper` text, pill, uppercase label text | `--cobalt` bg, lift `translate(-3px,-3px)` + `--shadow-pop` |
| Secondary | Transparent, `--border`, `--ink` text | `--lime` bg |
| Text link | `--ink`, underline offset `4px` | `--cobalt` |

- Height: `48px` (min tap target `44px`). Padding: `0 28px`.
- Label: Poppins 600, `0.875rem`, uppercase, `letter-spacing: 0.08em`.
- Wording is short and specific: "Add to cart", "Get notified", "Shop the drop".
  Avoid generic "Make it yours" on every card.

### Product card
- `--surface` background, `--radius-card`, image area `4:5` ratio.
- Product photo on a solid accent backdrop inside the image area.
- Below the image: name (Unbounded 700), one-line personality blurb (Poppins),
  a "say what" fact tag in `--text-label` (the one surprising detail: "5 FT TALL",
  "IT'S A LAMP", "SEATS 4"), price, and color swatches.
- **Swatches on the card.** Clicking one swaps the photo instantly, with no page reload.
- Hover: card lifts with `--shadow-pop` and a `2px` ink border.

### Badges ("stickers")
- Pill, `--border`, Poppins 600 uppercase `0.6875rem`.
- Slight rotation (`-4deg` to `4deg`) so they feel stuck on.
- Variants: `NEW DROP` (`--lime`), `SALE` (`--cone`, white text),
  `SOLD OUT` (`--ink`, white text), `ONLY 3 LEFT` (`--mustard`),
  `SAY WHAT?!` (`--bubblegum`, for the strangest items).
- Sold out always comes with a "Get notified" button, never a dead end.

### Header
- Sticky, `--paper` background, `0 10px 8px rgba(0,0,0,0.04)` shadow after scroll.
- Left: logo. Center or right: Shop, Drops, About. Right: search icon, cart icon with count.
- Phones: logo + cart + menu icon; menu opens full-screen on an accent backdrop.

### Announcement bar
- Thin bar above the header, `--ink` background, `--paper` text, `--text-label` style.
- One message at a time: "Free delivery this week ● New drop Friday".

### Product page
- Left: large gallery (photos + one short looping video or 360° spin). Right: details.
- Order: name, blurb, price, swatches, quantity, Add to cart, then
  dimensions, materials, delivery.
- Always show the **surprise**: a scale shot next to a person when size is the
  twist, a before/after or "it opens!" shot when the function is the twist.

### Footer
- `--ink` background, `--paper` text, a giant "SAY WHAT?" wordmark across the bottom.
- Newsletter signup with a cheeky line ("Get drops before your friends do").

---

## 7. Imagery and motion

### Photography
- Hero shots: product centered on a single solid accent backdrop, soft studio light.
- Lifestyle shots: real rooms, natural light, a person when size is part of the surprise.
- Short loops (3–6 s, muted, autoplay) on product pages and drop sections.
- No busy props. The object is the only character in frame.

### Motion
- Scroll reveal: fade + `translateY(24px)` → `0`, `400ms`, `ease-out`.
- Hover lift: `150ms`, `ease-out`.
- Headlines may slide in word by word on the hero only.
- Respect `prefers-reduced-motion`: turn off reveals and loops, keep instant states.

---

## 8. Voice and copy

Short, confident, a bit of a wink. Talk like a friend who has very good taste and
no chill.

| Do | Don't |
|---|---|
| "Yes, it's a 5 ft pen. Yes, it lights up." | "This innovative lighting solution..." |
| "Boring corners are optional." | "Elevate your living space." |
| "Only 3 left. Just saying." | "Limited stock available." |
| "Get notified" | "Click here to subscribe to updates" |
| "Say what? It's a table." | "Multi-functional furniture piece" |

- Every product gets a name and one-line personality.
- Use the brand phrase as a copy hook, not on every line: "Say what?",
  "You heard us.", "Yes, really."
- Headlines: 2–6 words. Body: 1–2 short sentences.
- Emojis: rare, and never in headlines.

---

## 9. Accessibility

- Text contrast at least 4.5:1 (check light text on `--cone` and `--cobalt`).
- Visible focus ring on everything clickable: `3px solid var(--cobalt)`, offset `3px`.
- All product images need alt text that describes the object and what makes it unusual.
- Tap targets at least `44px`.
- Never use color alone to show state (sold out, selected swatch): add text or an icon.

---

## 10. CSS tokens (copy-paste)

```css
:root {
  /* Color */
  --paper: #FFFFFF;
  --ink: #0A0A0A;
  --ink-soft: #424242;
  --surface: #F2F2F2;
  --line: #E6E6E6;
  --cone: #E64E2E;
  --mustard: #F8A512;
  --cobalt: #0A5AC9;
  --lime: #D2F37F;
  --sky: #63A4FF;
  --lilac: #CEAFFF;
  --bubblegum: #FF419D;

  /* Type */
  --font-display: "Unbounded", "Arial Black", sans-serif;
  --font-body: "Poppins", system-ui, sans-serif;
  --text-hero: clamp(3rem, 8vw, 7rem);
  --text-h1: clamp(2.25rem, 5vw, 4rem);
  --text-h2: clamp(1.75rem, 3.5vw, 2.75rem);
  --text-h3: 1.375rem;
  --text-body: 1.125rem;
  --text-small: 0.9375rem;
  --text-label: 0.75rem;

  /* Space */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 3rem;
  --space-5: 6rem;
  --space-6: 9rem;
  --max-width: 1320px;

  /* Shape */
  --radius-pill: 9999px;
  --radius-card: 16px;
  --radius-sm: 6px;
  --border: 2px solid var(--ink);
  --shadow-soft: 0 10px 25px rgba(0, 0, 0, 0.08);
  --shadow-pop: 6px 6px 0 var(--ink);

  /* Motion */
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --dur-fast: 150ms;
  --dur-base: 400ms;
}
```

---

## 11. Prompt for AI site builders

Paste this into v0, Lovable, Bolt, or Claude Code along with this file:

> Build a responsive, phone-first storefront for Say What, a home decor brand for
> Gen Z selling all kinds of unique, quirky objects that make people say "say what?"
> (for example a traffic cone floor lamp, a giant Rubik's Cube table, and a 5 ft pen
> with a light bulb inside). Follow STYLE.md exactly: white and near-black base, one
> accent backdrop per section, Unbounded uppercase headlines with tight tracking,
> Poppins body, pill buttons in ink that turn cobalt on hover with a hard 6px offset
> shadow, product cards with color swatches that swap the photo without reloading,
> sticker-style tilted badges, a "say what" fact tag on every product ("5 FT TALL",
> "IT'S A LAMP"), and short witty copy. Sections: announcement bar, sticky header
> with a "SAY WHAT?" logo, hero, "Meet the lineup" product grid, shop by category,
> "Say what?" section explaining the idea, how it works in 4 steps, Instagram grid,
> newsletter, footer with a giant "SAY WHAT?" wordmark. Respect prefers-reduced-motion.

---

## 12. Where this comes from

Measured from each site's homepage CSS (November 2026):

| | Areaware (areaware.com) | Wrongroom (wrongroom.in) |
|---|---|---|
| Display font | Custom extended bold ("AreaExt"), weight 900, `-0.05em` tracking, line-height 1 | Poppins 700, uppercase, `-1.5px` tracking |
| Body font | System UI, 18px base | Poppins 400 |
| Base | White, near-black text `rgb(2,2,2)` | White, `#181818` text |
| Accents | Blue `#0A5AC9`, lime `#D2F37F`, sky `#63A4FF`, burgundy `#811D21` | Red `#970B05`, orange-red `#E64E2E`, amber `#F8A512`, blue `#1F4E8C` |
| Buttons | Pill (`9999px`), uppercase, ink → blue on hover | Pill (`50px`/`99px`) |
| Signature | 12-column grid, 1px gutters, `3rem` spacing | Hard offset shadow, witty copy ("Five tables. Zero beige.") |

What we took: Wrongroom's color energy, uppercase type, pill buttons, offset shadow,
and voice. Areaware's extended display type, ink-to-blue button hover, lime and sky
backdrops, and generous spacing. Unbounded stands in for Areaware's custom extended
font because it's free and similar in feel.
