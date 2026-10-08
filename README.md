# Tenn Renovation website

Static site, no build step. Open `index.html` in a browser or serve the folder with any static host.

| Page | Purpose |
| --- | --- |
| `index.html` | Home: hero, key figures, services, showcase reel, why Tenn, featured projects, process, testimonials, contact |
| `company.html` | Company profile: story, values, milestones, capabilities, leadership, growth & investor/partner enquiries |
| `services.html` | The four crafts in depth, the iron-work build gallery, and the SOP for each craft |
| `projects.html` | Ambience Pulau Gadong (B2C cabinet package), Klebang showroom (B2B show unit), Bukit Baru showroom (B2B lobby), and Kota Syahbandar (B2C fully furnished package, next) |
| `quote.html` | Contact page with direct WhatsApp links and the quote form (opens a prefilled WhatsApp chat) |
| `privacy.html` | PDPA privacy notice |

Shared files: `styles.css` (design system), `site.js` (header, mobile nav, counters, lightbox, SOP tabs, analytics hooks), `media/`.

## Two settings to fill in

1. **Analytics.** In `site.js`, set `GA_MEASUREMENT_ID` to your Google Analytics 4 measurement ID (`G-XXXXXXXXXX`).
   Until it is set nothing is loaded. Once set, every WhatsApp button reports a `whatsapp_click` event (which person,
   which placement) and the quote form reports `generate_lead`. No names or phone numbers are sent.
2. **Public URL.** The site assumes `https://lczx122.github.io/tenn-renovation/`. If you host it elsewhere,
   search-and-replace that string across the HTML files, `sitemap.xml` and `robots.txt`.

## Facts to confirm before showing investors

These are written from the information on the old site. Please check and correct them in `company.html` and `index.html`:

- Founded **2001** (used throughout, including the 25-year seal).
- **300+ homes** fitted with cabinet packages at Ambience Pulau Gadong.
- The milestone timeline has no years for the "Growth", "Ambience" and "Klebang" entries. Add real years in
  `company.html` under `#milestones` (replace the word in `<div class="yr">`).
- The Bukit Baru showroom lobby has no photos yet; its project entry is text only until you add some.
- Kota Syahbandar is described as "in planning" with no dates or unit counts. Add them once confirmed.
- Testimonials on the home page carry first names and areas only. Swap in real, attributable reviews.
- No address, phone number, email, SSM registration number or social links are shown yet.

## Content wish-list (photos, video, graphics)

See the shot list in the project chat or ask for it again. In short: a real hero photo of a finished Tenn kitchen,
one finished-project photo per service, workshop and powder-coating booth photos, headshots of Royce and Lucas,
a 30–60 s showcase reel in landscape, before/after pairs, and a PDF company profile for investors.

## Notes

- The quote form never uploads anything: it composes a WhatsApp message on the visitor's device.
- `privacy.html` describes that flow plus analytics and Google Fonts. Update it if either changes.
- Videos use `#t=0.1` to show a first frame; add `poster="..."` images if you export stills.
