// Shared footer for every page built from a template. `prefix` is the relative path to the site root.
export function siteFooter(prefix = "") {
  const column = (title, links) =>
    `<nav class="footer__column" aria-label="${title}"><h2>${title}</h2>${links
      .map(([label, href]) => `<a href="${href}">${label}</a>`)
      .join("")}</nav>`;
  return `<footer class="footer footer--home footer--site"><div class="auto__container"><a href="${prefix || "/"}" class="footer__brand"><img src="${prefix}images/footer-logo.png" alt="" width="40" height="40" /><span>Gratitude</span></a><div class="footer__grid">${[
    column("Get the app", [
      ["Download", `${prefix}download/`],
      ["iPhone", "https://apps.apple.com/app/id1372575227"],
      ["Android", "https://play.google.com/store/apps/details?id=com.northstar.gratitude"],
      ["Free vision board maker", `${prefix}visionboard/`],
    ]),
    column("The app", [
      ["Features", `${prefix}features/`],
      ["Pricing", `${prefix}pricing/`],
      ["Affirmations", `${prefix}affirmations/`],
      ["Vision board templates", `${prefix}visionboard/templates`],
    ]),
    column("About", [
      ["About Gratitude", `${prefix}about/`],
      ["Founder's story", "https://blog.gratefulness.me/pritesh-gratitude-story/"],
      ["Gratitude stories", "https://blog.gratefulness.me/tag/inspirational-stories/"],
      ["Blog", "https://blog.gratefulness.me/"],
    ]),
    column("Help", [
      ["FAQs", "https://faqs.gratefulness.me/"],
      ["Contact us", "mailto:team@gratefulness.me"],
      ["Privacy policy", `${prefix}privacy-policy.html`],
      ["Terms of use", `${prefix}terms-and-conditions.html`],
    ]),
    column("Social", [
      ["Instagram", "https://www.instagram.com/gratefulness.me/"],
      ["Facebook", "https://www.facebook.com/gratefulness.me"],
      ["X", "https://x.com/gratefulness_me"],
      ["YouTube", "https://www.youtube.com/@GratitudeChannel"],
    ]),
  ].join("")}</div><div class="footer__bottom"><p>&copy; 2026 Hapjoy Technologies Pvt. Ltd.</p></div></div></footer>`;
}
