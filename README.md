# Nexa Manufacturing Unit India: Landing Page

A single-page React landing page for Nexa Manufacturing Unit India, with a registration-interest form. It follows the supplied desktop (1440px) and mobile (390px) designs and the copy in `CONTENT_AND_DESIGN.md`.

> **The form does not store anything.** The supplied API only checks the submission and sends back an acknowledgement. It does not save the details, create an account or send email.

## Tech stack

| Concern    | Choice                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Framework  | React 18: functional components and hooks only                            |
| Build tool | Vite 5                                                                    |
| Styling    | CSS Modules (one per component) plus design tokens in `src/styles/global.css` |
| Layout     | CSS Grid and Flexbox, mobile-first `min-width` media queries, no inline styles |
| Linting    | ESLint 8 with `eslint-config-airbnb` and `airbnb/hooks`                   |
| API        | The supplied `server.mjs` (local) and `api/register.js` (Vercel serverless) |

## Setup

Requirements: Node.js 20 or newer, and npm.

```bash
npm install
npm run dev          # http://localhost:5173 (the API is served at /api/register)
npm run lint         # check against the Airbnb style guide
npm run test:api     # run the supplied API tests (node --test)
npm run build        # production build into dist/
npm run preview      # serve dist/ at http://localhost:4173 (the API is served here too)
```

### API configuration

The browser code calls `import.meta.env.VITE_REGISTRATION_API`. If that variable isn't set, it calls `/api/register` instead.

- **Simplest option:** do nothing. A small Vite plugin in `vite.config.js` serves the supplied API handler at `/api/register` on both the dev server and the preview server.
- **Standalone API, as the starter intended:**
  ```bash
  cp .env.example .env.local   # VITE_REGISTRATION_API=http://localhost:4174/api/register
  npm run api                  # starts server.mjs on port 4174
  npm run dev                  # must run on port 5173: the API's CORS rules only allow that origin
  ```
- **Vercel:** `api/register.js` is deployed as a serverless function at `/api/register`, so no environment variable is needed.
- **Netlify or any other static host:** there is no API, so the form shows an error message. Deploy an equivalent function, or set `VITE_REGISTRATION_API` to an API you host somewhere.

## Component structure

```
src/
├── main.jsx                    # entry point: StrictMode and global CSS
├── App.jsx                     # skip link, Header, <main>, Footer
├── apiClient.js                # submitInterest(): POSTs JSON, handles error responses
├── hooks/useForm.js            # values and touched state; errors calculated from values
├── styles/global.css           # palette, spacing and type tokens, reset, focus ring
└── components/
    ├── Header/                 # logo, primary <nav>, mobile menu (useState, aria-expanded, Esc closes)
    ├── Hero/                   # <h1>, intro text, CTA, hero image in a <figure>, support line
    ├── CapabilityCards/        # three <article> cards with decorative icons (alt="")
    ├── ProcessSteps/           # numbered <ol> of three steps
    ├── RegistrationForm/
    │   ├── RegistrationForm.jsx  # controlled form, submit flow, status messages
    │   ├── FormField.jsx         # visible label, control and linked error message
    │   └── validate.js           # rules matching server.mjs
    └── Footer/
```

Other files:
- `server.mjs`, `api/register.js` and `tests/api.test.mjs` come from the starter pack.
- `public/assets/` holds the supplied brand SVGs.
- `docs/` holds the completed acceptance test log and screenshots. The client's confidential design references are kept locally and are not committed.

### Form behaviour

- **Fields:** full name (trimmed, 2 to 80 characters), email (valid format, 254 characters at most), area of interest (one of the three supplied options) and consent (unticked by default).
- **Errors:** each field shows its error after the user leaves it, and every error appears when the user submits. On a failed submit, focus moves to the first invalid field. Errors are linked to their fields with `aria-invalid` and `aria-describedby`.
- **Sending:** while a request is in progress, the button is disabled and reads "Sending…".
- **Result:** success and failure messages appear in a `role="status"` / `aria-live="polite"` region. If the request fails, everything the user typed stays in place so they can try again.
- **Privacy:** form data never goes into the URL, localStorage, analytics or the console.

### Breakpoints

| Width   | Layout changes                                                                       |
| ------- | ------------------------------------------------------------------------------------ |
| < 768   | Menu button, everything in one column, image below the hero text                     |
| ≥ 768   | Links shown in the header, two-column hero, 3 cards side by side, 3 steps side by side, 2-column form |
| ≥ 1200  | Header 102px tall (80px below this width), more section spacing                      |

Checked at 320, 390, 768, 1200 and 1440px with no horizontal scrolling.

## Changes to supplied files

- `nexa_logo.svg` and `manufacturing_hero.svg` asked only for the `DejaVu Sans` font. Most Windows and Mac machines don't have it, so the logo text showed in a serif font. I added `Segoe UI, Arial, sans-serif` as fallbacks. Nothing else in the artwork changed.
- In `server.mjs`, the check for "was this file run directly" now uses `pathToFileURL`. Without that, `node server.mjs` didn't start the server on Windows.

## Known limitations

- The form doesn't store anything: the API only checks the submission and acknowledges it, by design.
- On a static host without a serverless function, sending an enquiry shows an error. See "API configuration" above.
- I placed "Why Nexa" and "Capabilities" in that order. Both link to `#capabilities`, as the spec says.
- The client's amber (#C17A42) with white text has a 3.42:1 contrast ratio. Button text is 19px bold so it meets the WCAG "large text" level (3:1) without changing the brand colour.

## Test results

- Lighthouse 12.8.2 on the local production build scored 100 for Performance, Accessibility, Best Practices and SEO, on both mobile and desktop.
- Google Chrome 158 and Firefox 155 each passed all 19 automated interactive checks.
- Details and screenshots are in `docs/Completed_Acceptance_Test_Log.csv` and `docs/screenshots/`.
