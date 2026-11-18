# Tenn Renovation website

Static site, no build step. Open `index.html` in a browser or serve the folder with any static host.

| Page | Purpose |
| --- | --- |
| `index.html` | Home: hero, key figures, services, showcase reel, why Tenn, featured projects, process, testimonials, contact |
| `company.html` | Company profile: story, values, milestones, capabilities, leadership, growth & investor/partner enquiries |
| `services.html` | Whole-house renovation, then cabinets, painting, iron grills, electrical & aluminium, the add-ons (leaking repair, aircon, tiling, partition, plaster ceiling, smart home), the iron-work build gallery and the SOPs |
| `projects.html` | Ambience Pulau Gadong (B2C cabinet package), Klebang showroom (B2B show unit), Bukit Baru showroom (B2B lobby), and Kota Syahbandar (B2C fully furnished package, next) |
| `quote.html` | Contact page with direct WhatsApp links and the quote form (opens a prefilled WhatsApp chat) |
| `privacy.html` | PDPA privacy notice |
| `404.html` | Not-found page served by GitHub Pages |

Shared files: `styles.css` (design system), `site.js` (header, mobile nav, counters, lightbox, SOP tabs, analytics hooks), `media/`.

## Settings to fill in (all in `site.js`, top of the file)

Everything is off until you paste a value. Edit `TENN_CONFIG`, bump the `?v=` version on the stylesheet and script links in every page, commit, merge.

| Setting | What it does | Where to get it |
| --- | --- | --- |
| `GA_MEASUREMENT_ID` | Google Analytics 4. Every WhatsApp button sends `whatsapp_click` (person + placement); the quote form sends `generate_lead`. No names or phone numbers are sent. | analytics.google.com → Admin → Data streams → Measurement ID (`G-…`) |
| `GTM_ID` | Google Tag Manager. Use this instead of the GA/pixel ids if you prefer to manage tags in GTM; the same events are pushed to `dataLayer`. | tagmanager.google.com → container id (`GTM-…`) |
| `META_PIXEL_ID` | Meta pixel for Facebook/Instagram ads. Fires `PageView` on every page and `Lead` on quote-form submit. | business.facebook.com → Events Manager → pixel id |
| `LEAD` | Where quote-form submissions are recorded (your CRM). See below. | |

### Connecting the quote form to a CRM

The form always opens WhatsApp with the details filled in. When `LEAD.kind` is set it **also** posts the lead to your system, so you keep a record even if the visitor never presses Send in WhatsApp. Each lead carries: name, phone, area, services, project type, budget, timeline, message, preferred contact (Royce/Lucas), consent text, page, time, and how the visitor found the site (`first_touch` / `last_touch` with UTM parameters, Google/Meta click ids, referrer and landing page).

Pick one:

1. **HubSpot (free CRM, recommended if you want a real CRM).**
   Create a free account at hubspot.com → Marketing → Forms → create a form with the fields **First name**, **Phone number** and **Message** (single-line/multi-line text). Open the form's share/embed screen to read the **portal id** and **form id**. Then set
   `LEAD: { kind: 'hubspot', hubspot: { portalId: '12345678', formId: 'xxxxxxxx-xxxx-…', region: 'na1' } }`
   (region is `eu1` if your account is hosted in Europe). Every submission creates a contact; the full detail of the enquiry, including attribution, lands in the Message field.

2. **Google Sheet via Make or Zapier (simplest "spreadsheet CRM").**
   In Make (make.com) or Zapier create a scenario that starts with a **Webhook** and ends with **Google Sheets → Add a row**. Copy the webhook URL and set
   `LEAD: { kind: 'webhook', url: 'https://hook.eu1.make.com/…' }`
   Map the JSON fields to columns. Add a second step to send yourself a WhatsApp/Telegram/email alert if you like.

3. **Formspree (email + dashboard, no CRM).**
   Create a form at formspree.io and set `LEAD: { kind: 'formspree', url: 'https://formspree.io/f/xxxxxxxx' }`. Each lead is emailed to you and listed in the Formspree dashboard, which can also forward to Google Sheets, Slack or a CRM.

4. **Web3Forms (free email).**
   Get an access key at web3forms.com and set `LEAD: { kind: 'web3forms', web3formsKey: '…' }`.

Test with a real submission on the live site and confirm the row/contact appears. If an endpoint is down the visitor is unaffected: WhatsApp still opens and the confirmation still shows.

### Consent and privacy

The form now has a required consent checkbox (PDPA). `privacy.html` describes the CRM storage, analytics and pixels. If you connect a CRM other than those named there, add it to the "Who else sees it" list.

### Search engines

- **Google Search Console:** search.google.com/search-console → add property `tennrenovation.com` (Domain) → verify with the DNS TXT record it gives you (add it in Cloudflare DNS) → Sitemaps → submit `https://tennrenovation.com/sitemap.xml`.
- **Google Business Profile:** business.google.com → create the listing with the workshop address, hours (Mon–Sat 9–6), the WhatsApp number and the website. Ask happy customers for reviews; this is the single biggest local-ranking factor.
- Structured data on the home page declares the business, service areas, services and an FAQ; sub-pages carry breadcrumbs. Check it at search.google.com/test/rich-results after each deploy.

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
