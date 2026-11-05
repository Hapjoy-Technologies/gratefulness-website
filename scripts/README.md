# Affirmation page generation

The checked-in HTML serves the affirmation library and 66 collection pages without a runtime build.

To regenerate, install Node.js and place the existing `gratitude-static-content` checkout beside this repository. The generator reads `s3/gratitude-static-content/v1/affn/discovery/section/v3_dev.json` from that checkout. Then run `node scripts/generate-affirmation-pages.mjs` from this repository.

Review generated changes before committing. The generator also writes the sitemap. Gentle Healing currently uses the explicit text list inside the generator; content owners should verify that list before production approval.

Temporary preview copies, ngrok URLs, and server logs must not be included in production. The local team-preview directory is separate from this repository.

Deployment review: the repository has GitHub Pages enabled and a CNAME of www.gratefulness.me. Confirm the Pages publishing branch and Cloudflare origin configuration with the site administrator before merging. A draft pull request is not production approval.

## Site pages and footer

`node scripts/generate-site-pages.mjs` builds `/features/`, `/pricing/`, `/download/` and `/about/`, and applies the shared footer (`scripts/site-footer.mjs`) and main navigation to the homepage and affirmation pages. Unlike the affirmation generator, it doesn't need the `gratitude-static-content` checkout.

Run `generate-site-pages.mjs` after `generate-affirmation-pages.mjs`: it also applies the shared style to the affirmation pages.
