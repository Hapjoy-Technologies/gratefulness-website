# Affirmation page generation

The checked-in HTML serves the affirmation library and 66 collection pages without a runtime build.

To regenerate, install Node.js and place the existing `gratitude-static-content` checkout beside this repository. The generator reads `s3/gratitude-static-content/v1/affn/discovery/section/v3_dev.json` from that checkout. Then run `node scripts/generate-affirmation-pages.mjs` from this repository.

Review generated changes before committing. The generator also writes the sitemap. Gentle Healing currently uses the explicit text list inside the generator; content owners should verify that list before production approval.

Temporary preview copies, ngrok URLs, and server logs must not be included in production. The local team-preview directory is separate from this repository.

Deployment review: the repository has GitHub Pages enabled and a CNAME of www.gratefulness.me. Confirm the Pages publishing branch and Cloudflare origin configuration with the site administrator before merging. A draft pull request is not production approval.

## Site pages and footer

`node scripts/generate-site-pages.mjs` builds `/features/`, `/pricing/`, `/download/` and `/about/`, and applies the shared footer (`scripts/site-footer.mjs`) and main navigation to the homepage and affirmation pages. Unlike the affirmation generator, it doesn't need the `gratitude-static-content` checkout.

Run `generate-site-pages.mjs` after `generate-affirmation-pages.mjs`: it also applies the shared style to the affirmation pages.

## What's new (changelog)

`/changelog/`, `/changelog/ios/` and `/changelog/android/` are built by `generate-site-pages.mjs` from `scripts/changelog-data.mjs`. To add a release, put a new entry at the top of its platform's list and run `node scripts/generate-site-pages.mjs`.

- While a Play release is staged, set `status: "Rolling out"`. Remove it when the rollout reaches 100%.
- The build stops with an error on bad release data: a malformed date, an image without alt text or file, or two releases with the same anchor.
- Dates: iOS from the App Store version history (apps.apple.com page) or the first day a version shows as an update (7F) in the daily sales report; Android from the "Release date" line of the GitHub release.
- Images (optional): real app screenshots on a brand colour, 1600×1000 WebP in `images/changelog/`. Make one with `python3 scripts/changelog/collage.py images/changelog/<name>.webp "#fff5cc" shot1.png [shot2.png]` (needs Pillow), then set `image` and `alt` on the entry.
