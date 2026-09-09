# Tenn Renovation website

Static site: `index.html`, `services.html`, `quote.html`, `privacy.html`, shared `styles.css` and `site.js`, media in `media/`.
No build step. Open `index.html` in a browser or serve the folder with any static host.

## Two settings to fill in

1. **Analytics.** In `site.js`, set `GA_MEASUREMENT_ID` to your Google Analytics 4 measurement ID (`G-XXXXXXXXXX`).
   Until it is set, nothing is loaded. Once set, every WhatsApp button reports a `whatsapp_click` event
   (which person, which button) and the quote form reports `generate_lead`. No names or phone numbers are sent.
2. **Public URL.** The site's address is assumed to be `https://lczx122.github.io/tenn-renovation/`.
   If you host it elsewhere, search-and-replace that string in `sitemap.xml`, `robots.txt`, `index.html`,
   `services.html` and `quote.html`.

## Notes

- The quote form never uploads anything: it composes a WhatsApp message on the visitor's device.
- `privacy.html` describes exactly that flow plus analytics and Google Fonts. Update it if either changes.
- Videos use `#t=0.1` to show a first frame; add `poster="..."` images if you export stills.
