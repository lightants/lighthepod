# Relay Studio

Static marketing site for Relay Studio, a US-facing podcast post-production studio.

**Intended host:** GitHub Pages. Upload this folder as the Pages source (root of a repo, or `/docs`). Relative links, no build step. After you attach a custom domain, add it in the Pages settings; this repo does not invent a live URL.

## Local preview

```bash
cd relay-studio
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Rename the brand

Search the folder for these strings and replace them together:

| What | Where |
| --- | --- |
| `Relay Studio` / `Relay` | Every `.html` file, `README.md`, `og-image.svg`, JSON-LD on `index.html` |
| Tagline `Record today. Ready by morning.` | `index.html`, footers, `README.md` |
| Wordmark | Header `.brand-name` on each page; `favicon.svg` is the on-air ring |

Do not add a phone, Instagram, or inbox until a real one exists. The start form does not send email.

## Where prices live

Keep these three places in lockstep. Do not invent extras.

1. **Source of truth for visitors:** `pricing.html` (packages, retainers, add-ons).
2. **Home teasers:** `index.html` package cards and the retainer one-liner under them.
3. **Intake dropdown:** `start.html` `<select id="package">` plus labels in `app.js` (`packageLabel`).

Exact figures:

- Cut $149 / Show $249 / Stage $399 per episode
- Retainers (4 episodes / month): Cut $529 · Show $899 · Stage $1,449
- Add-ons: extra 30 min raw +$45 · extra speaker/camera +$79 · extra clip +$25 · 48-hour rush +40% · YouTube upload +$29

The one market sentence on `pricing.html` is allowed. Do not add competitor names or extra stats.

## Intake form

`start.html` + `app.js`. Client-side only. Submissions are stored in `localStorage` under `relayStudio.intakeRequests`. Success copy: reply within one business day.

To wire email later: read that key, POST the JSON to a form backend, and keep the in-page success state. Do not put a placeholder inbox on the site.

## Design notes

Warm late-night booth: walnut, brass gold, cream type. Fraunces + Figtree via Google Fonts. Original SVGs in `assets/` and `favicon.svg`. No stock photography.

## Previews

Desktop and mobile captures of home and pricing live in `previews/` when generated.
