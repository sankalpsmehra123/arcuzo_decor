# Arcuzo Decor – AlupPure Website

A production-quality multi-page lead-generation website for **Arcuzo Decor Pvt. Ltd.**, makers of the **AlupPure** range of intelligent German aluminium windows, doors and façade systems.

---

## Project Structure

```
arcuzo_decor/
├── index.html            ← Home page (all main sections)
├── residentialproject.html ← Residential project listing
├── commercialproject.html  ← Commercial project listing
├── css/
│   └── style.css         ← Full responsive stylesheet
├── js/
│   └── main.js           ← Vanilla JS (no dependencies)
├── assets/
│   ├── images/           ← Product, project, and hero images (JPEG)
│   └── video/
│       └── hero-reel.mp4 ← Brand video reel (currently unused)
├── .gitignore
└── README.md             ← This file
```

The home page presents two large "Our Work" cards — Residential Projects and Commercial Projects — each linking to its own detail page (`residentialproject.html` / `commercialproject.html`).

### Project galleries

Both project galleries are generated at runtime from their image folders. `js/main.js` probes `residential-01.jpeg`, `residential-02.jpeg`, … in `assets/images/projects/residential/` and `commercial-01.jpeg`, `commercial-02.jpeg`, … in `assets/images/projects/commercial/`, then renders every match as a gallery tile with the built-in lightbox.

To add a photo, drop it into the matching folder using the next sequential number (for example `residential-20.jpeg` or `commercial-10.jpeg`) and reload the page — no HTML edit is needed. Keep the numbering continuous and use the `.jpeg` extension. Discovery stops after three consecutive missing numbers, so gaps in the sequence will hide later photos. Descriptions for the current photos live in the `alts.residential` and `alts.commercial` maps in `js/main.js`; new photos automatically get a generic "Residential project photo NN" or "Commercial project photo NN" alt text until you add a specific one.

---

## Local Preview

### Option 1 – Python HTTP server (built into macOS / Linux)

```bash
cd arcuzo_decor
python -m http.server 8000      # use python3 on macOS / Linux
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

Most images were supplied by the client from their AlupPure product brochure (shared via WhatsApp). The first eight product-card images under `assets/images/products/` were downloaded from the client's previous Alupure website (alupure.co.in) and resized to 1000px wide. The four newer product images — `shower-enclosure.jpg`, `glass-railing.jpg`, `walkable-skylight.jpg` and `curtain-wall-system.jpg` — are now client-supplied. The remaining sample images under `assets/images/projects/` are temporary generated artwork pending the client's actual project photography (both home page overview cards now use client photos), while `assets/images/projects/residential/` holds the 19 client-supplied photos shown on the residential project page and `assets/images/projects/commercial/` holds the 9 client-supplied photos shown on the commercial project page.

> **Note:** the brochure JPEGs are phone photographs of the printed brochure — several are rotated 90° and include hands, page curl and reflections. They are placeholders until clean source photography is supplied. Thirteen files (`about-brochure`, `clients`, `colour-finishes`, `contact-info`, `features`, `opulenz-specs`, `sliding-specs`, `majestic-specs`, `door-system`, `apc40-windows`, `projects-1`, `opulenz-house`, `sliding-bedroom`) are currently unused.

| File | Description |
|------|-------------|
| `assets/images/hero-interior.jpeg` | Glazed interior with planting (hero background) |
| `assets/images/hero-house.jpeg` | Night-lit luxury house (currently unused) |
| `assets/images/who-are-we.jpeg` | Workers installing a curtain wall / Who We Are block in Why Us |
| `assets/images/about-brochure.jpeg` | AlupPure brochure about page |
| `assets/images/projects-1.jpeg` | Residential project – Janpath, Ludhiana (currently unused) |
| `assets/images/features.jpeg` | Salient features brochure page |
| `assets/images/opulenz-house.jpeg` | OPULENZ Sliding System villa (currently unused) |
| `assets/images/opulenz-specs.jpeg` | OPULENZ specs diagram |
| `assets/images/sliding-bedroom.jpeg` | 109mm Sliding System bedroom interior (currently unused) |
| `assets/images/sliding-specs.jpeg` | 109mm sliding specs diagram |
| `assets/images/majestic-specs.jpeg` | MAJESTIC Sliding System specs |
| `assets/images/door-system.jpeg` | Door System profile diagram |
| `assets/images/apc40-windows.jpeg` | APC 40 Windows profile diagram |
| `assets/images/colour-finishes.jpeg` | Colour &amp; finish swatches |
| `assets/images/clients.jpeg` | Client logos page |
| `assets/images/clients/mango-tree-villas.png` | Mango Tree Villas client logo (supplied by client) |
| `assets/images/contact-info.jpeg` | Contact back page with map |
| `assets/images/products/windows-casement.jpg` | Casement Windows product card |
| `assets/images/products/windows-sliding.jpg` | Sliding Windows product card |
| `assets/images/products/doors-casement.jpg` | Casement Doors product card |
| `assets/images/products/doors-sliding.jpg` | Sliding Doors product card |
| `assets/images/products/premium-sliding-folding.jpg` | Sliding Folding Doors product card |
| `assets/images/products/premium-opulenz.jpg` | Opulenz – Slim Interlock Sliding Doors product card |
| `assets/images/products/premium-majestic.jpg` | Majestic – Sleek Interlock Sliding Doors product card |
| `assets/images/products/premium-grande.jpg` | Grande – Premium Casement Doors product card |
| `assets/images/products/shower-enclosure.jpg` | Shower Enclosure product card (temporary sample) |
| `assets/images/products/glass-railing.jpg` | Glass Railing product card (temporary sample) |
| `assets/images/products/walkable-skylight.jpg` | Walkable Skylight product card (temporary sample) |
| `assets/images/products/curtain-wall-system.jpg` | Double Height Curtain Wall System product card (temporary sample) |
| `assets/images/projects/residential-projects-cover.jpg` | Home page overview card - Residential Projects (client-supplied glass garden pavilion photo) |
| `assets/images/projects/residential-courtyard-house.jpg` | Sample placeholder - The Courtyard House (no longer used) |
| `assets/images/projects/residential-lakeside-residence.jpg` | Sample placeholder – Lakeside Residence (no longer used) |
| `assets/images/projects/residential-skyline-penthouse.jpg` | Sample placeholder – Skyline Penthouse (no longer used) |
| `assets/images/projects/residential-hilltop-retreat.jpg` | Sample placeholder – Hilltop Retreat (no longer used) |
| `assets/images/projects/residential/` | 19 client-supplied residential project photos, named `residential-01.jpeg`…`residential-19.jpeg` (auto-discovered by the gallery on `residentialproject.html`) |
| `assets/images/projects/commercial-corporate-headquarters.jpg` | Sample placeholder - Corporate Headquarters (no longer used) |
| `assets/images/projects/commercial-business-park.jpg` | Sample placeholder - Business Park (no longer used) |
| `assets/images/projects/commercial-retail-pavilion.jpg` | Sample placeholder - Retail Pavilion (no longer used) |
| `assets/images/projects/commercial-hotel-atrium.jpg` | Sample placeholder - Hotel Atrium (no longer used) |
| `assets/images/projects/commercial/` | 9 client-supplied commercial project photos, named `commercial-01.jpeg`…`commercial-09.jpeg` (auto-discovered by the gallery on `commercialproject.html`; `commercial-03.jpeg` also used for the home page Commercial Projects card) |
| `assets/images/logo/arcuzo-logo-light.png` | White transparent brand logo (header, footer and other dark backgrounds) |
| `assets/images/logo/arcuzo-logo-dark.png` | Black transparent brand logo (favicon and light backgrounds) |
| `assets/video/hero-reel.mp4` | Brand video reel (currently unused) |

---

## Placeholders &amp; Known TODOs

The following items are noted for completion before the site goes live:

| # | Placeholder | Location | Action Required |
|---|-------------|----------|-----------------|
| 1 | **Favicon set** | `<head>` in all pages | The black PNG logo is linked as the favicon. Add dedicated 32×32 and 180×180 (Apple touch) icons if a full icon set is required. |
| 2 | **Form backend** | `js/main.js` (TODO block) | Connect Netlify Forms, Formspree, or a custom API — see "Connecting a Form Backend" above. |
| 3 | **Kurukshetra address** | Network section in `index.html` | Added: SK Road, Near Alishan Palace, Ladwa. |
| 4 | **OG / Social meta tags** | `<head>` in `index.html` | Add `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` tags for social sharing previews. |
| 5 | **Google Analytics** | `<head>` or before `</body>` | Add your GA4 tracking snippet if analytics are required. |
| 6 | **SSL / HTTPS** | Hosting platform | Ensure SSL is enabled (all major hosts do this automatically for custom domains). |
| 7 | **Photography** | `assets/images/` | Replace the remaining brochure photographs (rotated, hands/reflections visible) with clean architectural images. The first eight `assets/images/products/` cards use clean imagery from the old Alupure site; the shower enclosure, glass railing, walkable skylight and curtain wall cards now use client-supplied images. The `assets/images/projects/` sample cards use temporary generated images and should be swapped for the client's actual project photography, apart from the two home page overview cards, which now use client photos. The residential and commercial project pages already use the client's own site photos. |

---

## Pre-Launch Checklist

Run through this list before making the site public:

- [x] Favicon linked in `<head>` (PNG logo; dedicated icon set optional)
- [ ] Brochure photographs replaced with clean, correctly oriented source images
- [ ] Temporary project sample images replaced on the home page and both project detail pages
- [ ] All images optimised (compress with [Squoosh](https://squoosh.app) or similar; target < 200 KB each)
- [x] Hero background uses a static image (hero video no longer loaded)
- [ ] Form backend connected and tested (receive a real submission)
- [ ] OG meta tags added and tested with [og.tool](https://og.tool) or Facebook Debugger
- [ ] Custom domain configured and SSL active
- [ ] Google Analytics (or alternative) snippet in place
- [x] Kurukshetra address filled in
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
