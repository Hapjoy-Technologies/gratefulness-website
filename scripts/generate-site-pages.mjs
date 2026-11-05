// Builds /features/, /pricing/, /download/ and /about/, and applies the shared footer to the
// homepage and the affirmation pages. Run: node scripts/generate-site-pages.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteFooter } from "./site-footer.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://www.gratefulness.me";
const ios = "https://apps.apple.com/app/id1372575227";
const android = "https://play.google.com/store/apps/details?id=com.northstar.gratitude";
const org = { "@id": `${origin}/#organization` };

const stores = `<div class="store-buttons" role="group" aria-label="Download the Gratitude app"><a class="store-btn" href="${android}" target="_blank" rel="noopener"><img src="../images/google-play.svg" alt="Get it on Google Play" width="180" height="54" /></a><a class="store-btn" href="${ios}" target="_blank" rel="noopener"><img src="../images/app-store.svg" alt="Download on the App Store" width="180" height="54" /></a></div>`;

const page = ({ slug, title, description, h1, intro, body, type = "WebPage", extraSchema = [], headExtra = "" }) => {
  const url = `${origin}/${slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": type, "@id": `${url}#webpage`, url, name: title, description, isPartOf: { "@id": `${origin}/#website` }, about: { "@id": `${origin}/#app` }, publisher: org },
      ...extraSchema,
    ],
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/png" href="../favicon.png" />
  <link rel="apple-touch-icon" href="../images/apple-touch-icon.png" />
  <meta name="theme-color" content="#fbeeee" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Gratitude" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${origin}/images/og-gratitude-v2.jpg" />
  <meta property="og:image:width" content="2400" />
  <meta property="og:image:height" content="1260" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="apple-itunes-app" content="app-id=1372575227" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400..700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/main.css?v=site2" />
  <link rel="stylesheet" href="../css/home.css?v=20" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5B0WGJZT0D"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-5B0WGJZT0D");</script>
  <script async src="https://plausible.io/js/pa-bLydEOQt7HklO79Cjiv7A.js"></script>
  <script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>
</head>
<body class="home-page">
  <header class="header"><div class="auto__container"><div class="header__inner"><a href="../" class="header__inner-logo" aria-label="Gratitude home"><img src="../images/logo.svg" alt="" width="46" height="46" /><span>Gratitude</span></a><nav class="header__nav" aria-label="Main navigation"><a href="../affirmations/">Affirmations</a><a href="../visionboard/">Vision board</a><a class="header__nav-cta" href="../download/">Get the app</a></nav></div></div></header>
  <main class="home-sections">
    <section class="home-page-head"><div class="auto__container home-narrow"><h1>${h1}</h1><p>${intro}</p>${headExtra}</div></section>
${body}
  </main>
  ${siteFooter("../")}
</body>
</html>
`;
};

const section = (id, h2, html) => `    <section class="home-section" aria-labelledby="${id}"><div class="auto__container home-narrow"><h2 id="${id}">${h2}</h2>${html}</div></section>`;
const list = (items) => `<ul class="home-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const pills = (items) => `<ul class="home-pills">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const phone = (file, alt) => `<figure class="home-phone"><img src="../images/app/${file}.webp" alt="${alt}" width="603" height="1311" loading="lazy" decoding="async" /></figure>`;
const band = (id, cls, h2, line, items, link, shot) => `    <section id="${id}" class="home-feature${cls}" aria-labelledby="h-${id}"><div class="auto__container home-feature__inner"><div class="home-feature__text"><h2 id="h-${id}">${h2}</h2><p class="home-feature__sub">${line}</p>${list(items)}${link}</div><div class="home-phones home-phones--one">${shot}</div></div></section>`;
const cta = (title, text) => `    <section class="home-cta" aria-labelledby="cta"><div class="auto__container"><h2 id="cta">${title}</h2><p>${text}</p>${stores}</div></section>`;
const plans = `    <section class="home-section" aria-label="Plans"><div class="auto__container"><div class="home-grid home-grid--two"><div class="home-panel"><h2 class="home-panel__title">Free</h2><p class="home-plan-price">$0</p>${list(["Gratitude journal with prompts and reminders", "One photo per entry", "Free affirmations, plus your own", "One vision board", "Backup and sync"])}</div><div class="home-panel"><h2 class="home-panel__title">Gratitude Pro</h2><p class="home-plan-price">$39.99 a year <span>or $6.99 a month</span></p>${list(["Everything in Free", "Up to five photos per entry", "600+ premium affirmations", "Unlimited vision boards", "Your journal as a PDF", "More backgrounds and fonts"])}</div></div><p class="home-plan-note">US prices. Prices vary by country.</p></div></section>`;

const pages = [
  {
    slug: "features",
    title: "Gratitude App Features: Journal, Affirmations, Vision Boards",
    description: "What you can do in the Gratitude app: a gratitude journal with prompts and voice entries, affirmations with music, Daily Zen quotes and vision boards.",
    h1: "Gratitude app features",
    intro: "One app for iPhone and Android, with four tools that work together.",
    type: "CollectionPage",
    body: [
      band("gratitude-journal", "", "Gratitude journal", "Write a few lines a day, in your own way.", ["Hundreds of journal prompts", "Reminders with prompts to help you build the habit", "Photos on your entries: one on the free plan, up to five with Pro", "Record an entry in your voice", "A journal streak to keep you going", "Backgrounds and fonts for your entries, with more in Pro", "Download your journal as a PDF with Pro"], `<a href="https://blog.gratefulness.me/how-to-start-gratitude-journaling/">How to start a gratitude journal</a>`, phone("gratitude-journal-sunset", "Gratitude journal entries: a rooftop at sunset, a voice note, and a list about market apples and hydrangeas with photos of them")),
      band("affirmations", " home-feature--flip", "Affirmations", "Read or listen, whatever you need today.", ["Hundreds of affirmations", "Folders by topic, such as sleep, healing and confidence", "Write your own affirmations", "Add music, or record them in your voice", "600+ premium affirmations with Pro"], `<a href="../affirmations/">Browse affirmations by topic</a>`, phone("affirmations-folders", "Illustrated affirmation folders in the Gratitude app, including Sleep Better and Cleanse Mind")),
      band("daily-zen", "", "Daily Zen", "Something new to read every day.", ["Gratitude and motivation quotes", "Thought switch ideas", "Thank you cards", "Affirmations and blog articles", "Real stories of people who changed their mindset with gratitude"], `<a href="https://blog.gratefulness.me/tag/inspirational-stories/">Read gratitude stories</a>`, phone("daily-zen-cards", "Daily Zen cards with the affirmation I make space for things that delight me, and a thought switch")),
      band("vision-board", " home-feature--flip", "Vision boards", "Keep your goals where you can see them.", ["Build a board from photos, quotes and affirmations", "Organise it into sections with goal ideas", "Play your board as a video with music", "One board on the free plan, unlimited with Pro"], `<a href="../visionboard/">Try the free vision board maker on the web</a>`, phone("vision-board-home", "A vision board called Our first home together, with taped photo prints")),
      section("f-data", "Backup, sync and Apple Health", list(["Back up to your own Google Drive on iPhone and Android", "Sync across Apple devices with iCloud", "No account needed", "Your entries live on your device, so deleting the app without a backup deletes them", "On iPhone, you can choose to save mindful minutes to Apple Health"])),
      cta("Free to download.", `See <a href="../pricing/">what's free and what's in Pro</a>.`),
    ].join("\n"),
  },
  {
    slug: "pricing",
    title: "Gratitude App Pricing: Free and Gratitude Pro",
    description: "The Gratitude app is free to download and use. Gratitude Pro costs $39.99 a year or $6.99 a month in the US, with a free trial on the yearly plan for eligible users.",
    h1: "Gratitude pricing",
    intro: "Free to download and use. Gratitude Pro is optional.",
    extraSchema: [{ "@type": "SoftwareApplication", "@id": `${origin}/#app`, name: "Gratitude", operatingSystem: "Android, iOS", applicationCategory: "LifestyleApplication", offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Gratitude Pro yearly", price: "39.99", priceCurrency: "USD" },
      { "@type": "Offer", name: "Gratitude Pro monthly", price: "6.99", priceCurrency: "USD" },
    ] }],
    body: [
      plans,
      `    <section class="home-section" aria-labelledby="p-faq"><div class="auto__container"><h2 id="p-faq">Pricing questions</h2><div class="home-faq"><div><h3>Do prices change by country?</h3><p>Yes. The App Store or Google Play shows the price for your country before you pay.</p></div><div><h3>Is there a free trial?</h3><p>The yearly plan includes a free trial for eligible users. You aren't charged until the trial ends.</p></div><div><h3>How do I cancel?</h3><p>Turn off renewal in your App Store or Google Play account settings at least 24 hours before the current period ends.</p></div><div><h3>Do you store my card details?</h3><p>No. The App Store or Google Play handles your payment.</p></div></div></div></section>`,
      cta("Start for free.", "Free on iPhone and Android. No account needed."),
    ].join("\n"),
  },
  {
    slug: "download",
    title: "Download the Gratitude App for iPhone and Android",
    description: "Download Gratitude, the free journal, affirmations and vision board app for iPhone and Android. Rated 4.8 out of 5 from over 260,000 ratings.",
    h1: "Download Gratitude",
    intro: "Free on iPhone and Android, with no account needed.",
    headExtra: `${stores}<p class="home-page-head__proof">Rated 4.8 out of 5 from over 260,000 ratings, with over 8 million downloads.</p>`,
    body: [
      `    <section class="home-gallery" aria-label="Inside the app"><div class="auto__container"><div class="home-gallery__row">${phone("gratitude-journal-sunset", "Gratitude journal entries: a rooftop at sunset, a voice note, and a list about market apples and hydrangeas with photos of them")}${phone("affirmations-folders", "Illustrated affirmation folders")}${phone("daily-zen-cards", "Daily Zen cards")}${phone("vision-board-home", "A vision board with taped photo prints")}</div></div></section>`,
      `    <section class="home-section" aria-labelledby="d-web"><div class="auto__container home-faq"><div><h2 id="d-web">On a computer?</h2><p>The journal is a phone app, but the <a href="../visionboard/">free vision board maker</a> runs in your browser.</p></div><div><h2>Before you download</h2><p>See <a href="../features/">what's in the app</a> and <a href="../pricing/">what's free</a>.</p></div></div></section>`,
    ].join("\n"),
  },
  {
    slug: "about",
    title: "About Gratitude and Hapjoy Technologies",
    description: "Gratitude is a self-care app made by Hapjoy Technologies Pvt. Ltd., a small team in India. It was founded by Pritesh Sankhe in 2018.",
    h1: "About Gratitude",
    intro: "We help people notice what's good in their lives.",
    type: "AboutPage",
    body: [
      `    <section class="home-maker" aria-label="How Gratitude started"><div class="auto__container"><img class="home-maker__photo" src="../images/pritesh-sankhe.webp" alt="Pritesh Sankhe, founder of Gratitude" width="480" height="480" /><blockquote>&ldquo;I built this app out of a personal need to cope with a tough time.&rdquo;</blockquote><p class="home-maker__name">Pritesh Sankhe, founder</p><p class="home-maker__team">Pritesh began a daily gratitude practice during a hard period in 2017, and founded Gratitude in 2018.</p><p class="home-maker__links"><a href="https://blog.gratefulness.me/pritesh-gratitude-story/">Read the story</a></p></div></section>`,
      `    <section class="home-privacy" aria-labelledby="a-facts"><div class="auto__container"><h2 id="a-facts">Gratitude at a glance</h2><div class="home-privacy__grid"><div><h3>8M+ downloads</h3><p>On iPhone and Android.</p></div><div><h3>4.8 out of 5</h3><p>From over 260,000 ratings.</p></div><div><h3>Since 2018</h3><p>Made by Hapjoy Technologies Pvt. Ltd., a small team in India.</p></div></div></div></section>`,
      `    <section class="home-section" aria-labelledby="a-recognition"><div class="auto__container"><h2 id="a-recognition">Recognition</h2><div class="home-faq"><div><h3>Google Play Editors' Choice</h3><p>Gratitude carries the Editors' Choice badge on <a href="https://play.google.com/store/apps/details?id=com.northstar.gratitude&amp;hl=en_US&amp;gl=US">Google Play</a> in the US.</p></div><div><h3>Featured on the App Store</h3><p>The App Store told our story in <a href="https://apps.apple.com/us/story/id1818561810">Building a more resilient world</a>, a Meet the Developer feature from August 2025.</p></div></div></div></section>`,
      section("a-contact", "Get in touch", `<p>Email us at <a href="mailto:team@gratefulness.me">team@gratefulness.me</a>, or read the <a href="https://faqs.gratefulness.me/">FAQs</a>.</p>`),
    ].join("\n"),
  },
];

for (const p of pages) {
  const dir = path.join(root, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(p));
}

// Shared footer on the homepage and on the generated affirmation pages.
const footerPattern = /<footer class="footer footer--home[\s\S]*?<\/footer>/;
const apply = (file, prefix) => {
  const html = fs.readFileSync(file, "utf8");
  if (!footerPattern.test(html)) throw new Error(`No footer in ${file}`);
  fs.writeFileSync(file, html.replace(footerPattern, () => siteFooter(prefix)));
};
// Same main navigation on the affirmation pages.
const applyNav = (file, prefix) => {
  const html = fs.readFileSync(file, "utf8");
  const nav = `<nav class="header__nav" aria-label="Main navigation"><a href="${prefix}affirmations/">Affirmations</a><a href="${prefix}visionboard/">Vision board</a></nav>`;
  fs.writeFileSync(file, html.replace(/<nav class="header__nav" aria-label="Main navigation">[\s\S]*?<\/nav>/, nav));
};
apply(path.join(root, "index.html"), "");
apply(path.join(root, "affirmations", "index.html"), "../");
applyNav(path.join(root, "affirmations", "index.html"), "../");
const affirmations = path.join(root, "affirmations");
for (const entry of fs.readdirSync(affirmations, { withFileTypes: true })) {
  const file = path.join(affirmations, entry.name, "index.html");
  if (entry.isDirectory() && fs.existsSync(file)) {
    apply(file, "../../");
    applyNav(file, "../../");
  }
}
console.log(`Built ${pages.length} pages and applied the shared footer.`);
