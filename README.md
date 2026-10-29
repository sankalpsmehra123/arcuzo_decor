# Arcuzo Decor – AlupPure Website

A production-quality single-page lead-generation website for **Arcuzo Decor Pvt. Ltd.**, makers of the **AlupPure** range of intelligent German aluminium windows, doors and façade systems.

---

## Project Structure

```
arcuzo_decor/
├── index.html            ← Single-page website (all sections)
├── css/
│   └── style.css         ← Full responsive stylesheet
├── js/
│   └── main.js           ← Vanilla JS (no dependencies)
├── assets/
│   ├── images/           ← Product, project, and hero images (JPEG)
│   └── video/
│       └── hero-reel.mp4 ← Brand video used as hero background
├── .gitignore
└── README.md             ← This file
```

---

## Local Preview

### Option 1 – Python HTTP server (built into macOS / Linux)

```bash
cd /Volumes/PROJECTS/freelance/arcuzo_decor
python3 -m http.server 8000
```

Then open: [http://localhost:8000](http://localhost:8000)

### Option 2 – VS Code Live Server extension

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

### Option 3 – Any static file server

```bash
# npx (Node.js required)
npx serve .

# Or with PHP (if installed)
php -S localhost:8000
```

---

## Deployment to a Static Host

The site is pure HTML/CSS/JS with no build step required — just upload the project root.

### Netlify (recommended – free tier)

1. Drag the `arcuzo_decor/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Or connect your GitHub repository and configure:
   - **Publish directory:** `.` (project root)
   - **Build command:** *(leave blank)*

### Vercel

```bash
npm install -g vercel
vercel --prod
```

Select the project root when prompted. No framework preset needed.

### GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Source**.
3. Choose **Deploy from a branch**, select `main` / `master`, root `/`.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

---

## Connecting a Form Backend

The enquiry form currently displays a notice that form submissions are not yet enabled. When you are ready to accept submissions, follow one of these approaches:

### Option A – Netlify Forms (easiest)

1. Add `data-netlify="true"` and `name="enquiry"` to the `<form>` tag in `index.html`:

   ```html
   <form id="enquiry-form" data-netlify="true" name="enquiry" ...>
   ```

2. Add a hidden field inside the form:

   ```html
   <input type="hidden" name="form-name" value="enquiry" />
   ```

3. Remove the "TODO" block in `js/main.js` and delete the `formNotice.hidden = false;` line. Netlify handles submission natively.

4. Redeploy to Netlify — submissions will appear in your Netlify dashboard and can be forwarded to an email address.

### Option B – Formspree

1. Create a free account at [formspree.io](https://formspree.io) and create a new form.
2. Add your endpoint to the `<form>` tag:

   ```html
   <form id="enquiry-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```

3. In `js/main.js`, replace the TODO block with a `fetch()` POST call or simply allow the native form submit (remove `e.preventDefault()`).

### Option C – Custom backend / API

In `js/main.js`, locate the comment:

```js
// ── TODO: Replace this block with your backend endpoint ──────────────────
```

Replace the block that follows with a `fetch()` call:

```js
const formData = new FormData(enquiryForm);

fetch('https://your-api-endpoint.com/enquiry', {
  method: 'POST',
  body: formData,
})
.then((res) => {
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
})
.then(() => {
  // Show a success message, optionally reset the form
  enquiryForm.reset();
  formNotice.innerHTML = '<p>✔ Thank you! We'll be in touch shortly.</p>';
  formNotice.hidden = false;
})
.catch(() => {
  formNotice.innerHTML = '<p>Something went wrong. Please call us directly.</p>';
  formNotice.hidden = false;
});
```

---

## Asset Sources

All images and video were supplied by the client from their AlupPure product brochure (shared via WhatsApp).

| File | Description |
|------|-------------|
| `assets/images/hero-house.jpeg` | Night-lit luxury house (hero background) |
| `assets/images/quality-habit.jpeg` | Glass curtain wall building / about section |
| `assets/images/about-brochure.jpeg` | AlupPure brochure about page |
| `assets/images/projects-1.jpeg` | Residential project – Janpath, Ludhiana |
| `assets/images/features.jpeg` | Salient features brochure page |
| `assets/images/opulenz-house.jpeg` | OPULENZ Sliding System villa |
| `assets/images/opulenz-specs.jpeg` | OPULENZ specs diagram |
| `assets/images/sliding-bedroom.jpeg` | 109mm Sliding System bedroom interior |
| `assets/images/sliding-specs.jpeg` | 109mm sliding specs diagram |
| `assets/images/majestic-specs.jpeg` | MAJESTIC Sliding System specs |
| `assets/images/door-system.jpeg` | Door System profile diagram |
| `assets/images/apc40-windows.jpeg` | APC 40 Windows profile diagram |
| `assets/images/colour-finishes.jpeg` | Colour &amp; finish swatches |
| `assets/images/clients.jpeg` | Client logos page |
| `assets/images/contact-info.jpeg` | Contact back page with map |
| `assets/video/hero-reel.mp4` | Brand video reel (hero background) |

---

## Placeholders &amp; Known TODOs

The following items are noted for completion before the site goes live:

| # | Placeholder | Location | Action Required |
|---|-------------|----------|-----------------|
| 1 | **Favicon** | `<head>` in `index.html` | Create a 32×32 + 180×180 favicon set and replace the commented `<link rel="icon">` tag. |
| 2 | **Form backend** | `js/main.js` (TODO block) | Connect Netlify Forms, Formspree, or a custom API — see "Connecting a Form Backend" above. |
| 3 | **Kurukshetra address** | Network section in `index.html` | The Kurukshetra display centre is listed in the brochure but no address was provided. Add when available. |
| 4 | **OG / Social meta tags** | `<head>` in `index.html` | Add `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` tags for social sharing previews. |
| 5 | **Google Analytics** | `<head>` or before `</body>` | Add your GA4 tracking snippet if analytics are required. |
| 6 | **SSL / HTTPS** | Hosting platform | Ensure SSL is enabled (all major hosts do this automatically for custom domains). |

---

## Pre-Launch Checklist

Run through this list before making the site public:

- [ ] Favicon created and linked in `<head>`
- [ ] All images optimised (compress with [Squoosh](https://squoosh.app) or similar; target < 200 KB each)
- [ ] Hero video compressed (target < 8 MB; use HandBrake or FFmpeg: `ffmpeg -i hero-reel.mp4 -vcodec libx264 -crf 28 -preset slow hero-reel-opt.mp4`)
- [ ] Form backend connected and tested (receive a real submission)
- [ ] OG meta tags added and tested with [og.tool](https://og.tool) or Facebook Debugger
- [ ] Custom domain configured and SSL active
- [ ] Google Analytics (or alternative) snippet in place
- [ ] Kurukshetra address filled in (or section removed)
- [ ] Spell-check of all copy
- [ ] Test on Chrome, Firefox, Safari and mobile devices
- [ ] Run Lighthouse audit — target 90+ on Performance, Accessibility, SEO
- [ ] Confirm WhatsApp number is correct and message link is working

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Custom CSS3 with CSS custom properties |
| Scripting | Vanilla JavaScript (ES2020+, strict mode) |
| Fonts | Google Fonts – Inter + Playfair Display |
| Dependencies | None (zero external JS libraries) |

---

*Built for Arcuzo Decor Pvt. Ltd. · AlupPure · "Making Living Space"*
