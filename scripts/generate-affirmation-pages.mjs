import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteFooter } from "./site-footer.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(scriptDir, "..");
const sourcePath = path.resolve(siteDir, "..", "gratitude-static-content", "s3", "gratitude-static-content", "v1", "affn", "discovery", "section", "v3_dev.json");
const catalog = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const sectionOrder = [
  "Achieve Your Goals", "Manifest Wealth", "Be Free", "Enhance Your Well-being",
  "Love Yourself", "Embrace New Beginnings", "Balance Your Chakras",
  "Wake Up Cheerfully", "Love Unconditionally", "Words Of Louise Hay",
  "Boost Your Career", "Be Joyful At Work", "Be Grateful", "Better Mental Health", "For Kids",
];

const sectionDescriptions = {
  "Achieve Your Goals": "Turn intention into steady, confident action.",
  "Manifest Wealth": "Make room for possibility, security, and abundance.",
  "Be Free": "Release what weighs you down and make peace with the past.",
  "Enhance Your Well-being": "Rest, reset, and care for your whole self.",
  "Love Yourself": "Meet yourself with acceptance, care, and compassion.",
  "Embrace New Beginnings": "Welcome fresh starts with hope and intention.",
  "Balance Your Chakras": "Bring calm attention to your energy and inner balance.",
  "Wake Up Cheerfully": "Begin the day with gratitude, joy, and possibility.",
  "Love Unconditionally": "Nurture healthy, caring relationships in your life.",
  "Words Of Louise Hay": "Practice timeless thoughts for healing and happiness.",
  "Boost Your Career": "Grow with confidence, clarity, and purpose at work.",
  "Be Joyful At Work": "Create more balance, ease, and connection in your workday.",
  "Be Grateful": "Notice the people, moments, and memories that make life meaningful.",
  "Better Mental Health": "Meet difficult moments with calm, hope, and strength.",
  "For Kids": "Simple, encouraging words for growing minds.",
};

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
const jsonForHtml = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const siteOrigin = "https://www.gratefulness.me";
const appLink = (category) => (category.shareMessage || "").match(/https?:\/\/[^\s]+/)?.[0] || `${siteOrigin}/app/`;
const googleAnalyticsId = "G-5B0WGJZT0D";

const sections = sectionOrder.map((title) => {
  const section = catalog.sections.find((item) => item.title === title);
  const categories = catalog.sectionCategories
    .filter((item) => item.sectionId === section.identifier)
    .map((category) => ({
      ...category,
      slug: slugify(category.title),
      affirmations: catalog.affirmations.filter((item) => item.categoryId === category.identifier),
    }));
  return {...section, slug: slugify(title), description: sectionDescriptions[title], categories};
});

const gentleTitles = [
  "I give myself permission to heal.",
  "I am willing to be at peace with myself and everyone.",
  "My immune system is healthy and strong.",
  "I am grateful for my body.",
  "I am healing gently.",
  "I allow myself to give and receive love.",
  "I am capable of unconditional love.",
  "I trust that everything in my life is unfolding perfectly.",
  "I heal lovingly.",
  "I am healthy, happy, and radiant.",
];
const gentle = {
  title: "Gentle Healing",
  identifier: "d8fa7ebe-47e9-4809-ae8a-50397369b091",
  slug: "gentle-healing",
  bgColor: "#F7DAD9",
  blushImageURL: "https://static.gratefulness.me/affns/discovery/folderimages/affn_folder_36.png",
  shareMessage: "Gentle ones for when you need to heal, at your own pace. Thinking of you.\nhttps://links.gratefulness.me/GentleHealingAffirmations",
  affirmations: gentleTitles.map((title, index) => ({title, identifier: `gentle-healing-${index + 1}`})),
  sectionId: sections.find((item) => item.title === "Enhance Your Well-being").identifier,
};
sections.find((item) => item.title === "Enhance Your Well-being").categories.push(gentle);
const allCategories = sections.flatMap((section) => section.categories.map((category) => ({...category, section})));
const exactAffirmationCount = allCategories.reduce((sum, category) => sum + category.affirmations.length, 0);

function header(prefix = "../") {
  return `<div class="pageWrapper aff-pageWrapper">
    <div class="pageWrapper__left"><img src="${prefix}images/shape-left.svg" alt="" width="1130" height="1629" /></div>
    <div class="pageWrapper__right"><img src="${prefix}images/shape-right.svg" alt="" width="1241" height="1598" /></div>
    <header class="header">
      <div class="auto__container"><div class="header__inner">
        <a href="${prefix}" class="header__inner-logo" aria-label="Gratitude home"><img src="${prefix}images/footer-logo.png" alt="" width="60" height="60" /><span>Gratitude</span></a>
        <nav class="header__nav" aria-label="Main navigation"><a href="${prefix}affirmations/">Affirmations</a><a href="${prefix}visionboard/">Vision board</a></nav>
      </div></div>
    </header>`;
}

function footer(prefix = "../") {
  return siteFooter(prefix);
}

function head({title, description, canonical, image, prefix = "../", detail = false, schema}) {
  return `<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}" /><meta name="robots" content="index,follow" />
    <link rel="canonical" href="${canonical}" /><link rel="icon" type="image/png" href="${prefix}favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link rel="preconnect" href="https://static.gratefulness.me" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${prefix}css/main.css?v=site2" /><link rel="stylesheet" href="${prefix}css/affirmations.css?v=14" />${detail ? `<link rel="stylesheet" href="${prefix}css/affirmation-detail.css?v=8" />` : ""}
    <meta property="og:type" content="website" /><meta property="og:site_name" content="Gratitude" /><meta property="og:title" content="${escapeHtml(title)}" /><meta property="og:description" content="${escapeHtml(description)}" /><meta property="og:url" content="${canonical}" />${image ? `<meta property="og:image" content="${image}" /><meta property="og:image:alt" content="${escapeHtml(title)}" /><meta name="twitter:image" content="${image}" /><meta name="twitter:image:alt" content="${escapeHtml(title)}" />` : ""}<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escapeHtml(title)}" /><meta name="twitter:description" content="${escapeHtml(description)}" />
    <script type="application/ld+json">${jsonForHtml(schema)}</script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"></script>
    <script>if(location.hostname==="localhost"||location.hostname==="127.0.0.1")window["ga-disable-${googleAnalyticsId}"]=true;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${googleAnalyticsId}");</script>
  </head>`;
}

function coverMarkup(category) {
  if (!category.blushImageURL) return `<div class="aff-card__image aff-card__image--gentle" style="--card-bg:${category.bgColor}"><span aria-hidden="true">✦</span></div>`;
  return `<div class="aff-card__image" style="--card-bg:${category.bgColor}"><img src="${category.blushImageURL}" alt="" width="624" height="600" loading="lazy" /></div>`;
}

function card(category) {
  const searchableText = [
    category.section.title,
    category.title,
    ...category.affirmations.map((affirmation) => affirmation.title),
  ].join(" ");
  return `<article class="aff-card" data-name="${escapeHtml(category.title)}" data-search="${escapeHtml(searchableText)}"><a href="${category.slug}/" aria-label="Read ${escapeHtml(category.title)} affirmations">${coverMarkup(category)}<div class="aff-card__body"><h4>${escapeHtml(category.title)}</h4><p>${category.isCatalogPending ? "10" : category.affirmations.length} affirmations</p><span>Read affirmations <b aria-hidden="true">→</b></span></div></a></article>`;
}

const sectionMarkup = sections.map((section, index) => `<section class="aff-section" data-section="${section.slug}" aria-labelledby="${section.slug}-title">
  <div class="aff-section__title"><span>${String(index + 1).padStart(2,"0")}</span><div><h3 id="${section.slug}-title">${escapeHtml(section.title)}</h3><p>${escapeHtml(section.description)}</p></div></div>
  <div class="aff-grid">${section.categories.map((category) => card({...category, section})).join("")}</div>
</section>`).join("");

const filterMarkup = sections.map((section) => `<button type="button" data-filter="${section.slug}" aria-pressed="false">${escapeHtml(section.title)}</button>`).join("");
const hubDescription = "Explore 66 positive affirmation collections for confidence, motivation, self-love, healing, abundance, kids, gratitude, and personal growth.";
const hubSchema = {"@context":"https://schema.org","@type":"CollectionPage",name:"Positive Affirmations",description:hubDescription,url:`${siteOrigin}/affirmations/`,isPartOf:{"@type":"WebSite",name:"Gratitude",url:`${siteOrigin}/`},numberOfItems:66};
const hub = `<!doctype html><html lang="en">${head({title:"Positive Affirmations for Confidence, Healing & Growth | Gratitude",description:hubDescription,canonical:`${siteOrigin}/affirmations/`,image:`${siteOrigin}/images/affirmations-social-preview.png?v=2`,schema:hubSchema})}<body class="affirmations-page">
  <a class="skip-link" href="#affirmation-library">Skip to affirmations</a>${header("../")}
  <main><section class="aff-hero" aria-labelledby="page-title"><div class="auto__container aff-hero__container"><div class="intro__inner"><div class="aff-hero__content intro__inner-content"><p class="aff-eyebrow"><span aria-hidden="true">✦</span> Your words shape your world</p><h1 id="page-title">Positive affirmations for <em>every part of you</em></h1><p class="aff-hero__intro">Choose what you need today. Find a little more confidence, make space for what matters, be gentle with yourself, and take things at your own pace.</p><a class="aff-primary" href="#affirmation-library">Explore affirmations <span aria-hidden="true">↓</span></a></div><div class="intro__inner-image"><img src="../images/ola.svg" alt="Woman using the Gratitude app" width="483" height="520" /><div class="intro__inner-image-plant"><img src="../images/plant.svg" alt="" width="252" height="396" /></div></div></div></div></section>
  <section class="aff-library" id="affirmation-library" aria-labelledby="library-title"><div class="auto__container"><div class="aff-library__heading"><div><p class="aff-kicker">Find your focus</p><h2 id="library-title">Explore all collections</h2></div><p>66 collections · ${exactAffirmationCount} affirmations</p></div><div class="aff-tools"><label class="aff-search"><span class="sr-only">Search collections, categories, and affirmation text</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4 4"></path></svg><input id="affirmation-search" type="search" placeholder="Search collections or affirmation words..." autocomplete="off" /></label><button class="aff-category-toggle" id="affirmation-filter-toggle" type="button" aria-expanded="false" aria-controls="affirmation-filter-list"><span>Categories</span><span aria-hidden="true">＋</span></button><div class="aff-category-list" id="affirmation-filter-list" aria-label="Filter by category" hidden><button class="is-active" type="button" data-filter="all" aria-pressed="true">All categories</button>${filterMarkup}</div></div><p class="aff-results" id="results-status" aria-live="polite">Showing all 66 collections</p><div class="aff-sections">${sectionMarkup}</div><div class="aff-empty" id="empty-state" hidden><span aria-hidden="true">♡</span><h3>No match found</h3><p>Try another affirmation word, collection, or category.</p><button type="button" id="clear-search">Show all affirmations</button></div></div></section>
  <section class="aff-cta"><div class="auto__container"><div class="aff-cta__inner"><div><p class="aff-kicker">Make it a daily practice</p><h2>Carry these words with you</h2><p>Create your own affirmations, listen in calming voices, and build a routine that feels like yours in the Gratitude app.</p></div><a class="aff-primary aff-primary--dark" href="${siteOrigin}/app/">Get the free app <span aria-hidden="true">↗</span></a></div></div></section></main></div>${footer("../")}<script src="../js/affirmations.js?v=6" defer></script></body></html>`;

fs.writeFileSync(path.join(siteDir, "affirmations", "index.html"), hub);

for (const category of allCategories) {
  const outDir = path.join(siteDir, "affirmations", category.slug);
  fs.mkdirSync(outDir, {recursive: true});
  const count = category.isCatalogPending ? 10 : category.affirmations.length;
  const title = `${count} ${category.title} Affirmations | Gratitude`;
  const description = `Read ${count} positive ${category.title.toLowerCase()} affirmations from Gratitude and carry them with you in the free app.`;
  const canonical = `${siteOrigin}/affirmations/${category.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type":"ItemList",name:`${category.title} Affirmations`,description,url:canonical,numberOfItems:count,itemListElement:category.affirmations.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.title}))},
      {"@type":"BreadcrumbList",itemListElement:[
        {"@type":"ListItem",position:1,name:"Home",item:`${siteOrigin}/`},
        {"@type":"ListItem",position:2,name:"Affirmations",item:`${siteOrigin}/affirmations/`},
        {"@type":"ListItem",position:3,name:`${category.title} Affirmations`,item:canonical},
      ]},
    ],
  };
  const affirmationList = category.affirmations.length
    ? `<ol class="detail-list">${category.affirmations.map((item,index)=>`<li><span>${String(index+1).padStart(2,"0")}</span><p>${escapeHtml(item.title)}</p></li>`).join("")}</ol>`
    : `<div class="detail-pending"><span aria-hidden="true">✦</span><h2>Continue with Gentle Healing</h2><p>This newest collection is ready to practice in the Gratitude app.</p></div>`;
  const related = category.section.categories.filter((item)=>item.slug!==category.slug).slice(0,3).map((item)=>`<a class="detail-related__card" href="../${item.slug}/">${coverMarkup(item)}<strong>${escapeHtml(item.title)}</strong><span>${item.isCatalogPending ? 10 : item.affirmations.length} affirmations</span></a>`).join("");
  const trackedQrUrl = `${siteOrigin}/app/?utm_source=affirmations&utm_medium=qr&utm_campaign=app_download&utm_content=${encodeURIComponent(category.slug)}`;
  const storeBadges = `<div class="detail-store-buttons" role="group" aria-label="Download Gratitude"><a href="https://play.google.com/store/apps/details?id=com.northstar.gratitude" target="_blank" rel="noopener" aria-label="Get Gratitude on Google Play" data-app-event="google_play_click" data-app-platform="android" data-collection="${category.slug}"><img src="../../images/google-play.svg" alt="Get it on Google Play" width="154" height="46" /></a><a href="https://apps.apple.com/app/id1372575227" target="_blank" rel="noopener" aria-label="Download Gratitude on the App Store" data-app-event="app_store_click" data-app-platform="ios" data-collection="${category.slug}"><img src="../../images/app-store.svg" alt="Download on the App Store" width="154" height="46" /></a></div>`;
  const qrDownload = `<a class="detail-download-qr" href="${escapeHtml(trackedQrUrl)}" aria-label="Scan the QR code to download the Gratitude app"><span class="detail-download-qr__code" data-url="${escapeHtml(trackedQrUrl)}" aria-hidden="true"></span><span class="detail-download-qr__label"><strong>Scan to open</strong><span>Use your phone camera</span></span></a>`;
  const page = `<!doctype html><html lang="en">${head({title,description,canonical,image:category.blushImageURL,prefix:"../../",detail:true,schema})}<body class="affirmations-page detail-page"><a class="skip-link" href="#affirmation-list">Skip to affirmations</a>${header("../../")}<main><section class="detail-hero"><div class="auto__container"><nav class="detail-breadcrumb" aria-label="Breadcrumb"><a href="../">Affirmations</a><span aria-hidden="true">/</span><span>${escapeHtml(category.section.title)}</span></nav><div class="detail-hero__grid"><div class="detail-hero__copy"><h1>${escapeHtml(category.title)} <span>Affirmations</span></h1><p>${escapeHtml(category.section.description)}</p><div class="detail-app-panel"><div class="detail-app-copy"><div class="detail-app-message"><strong>Listen to all ${count} affirmations in Gratitude</strong><span>Open this collection in the app and choose a calming voice.</span></div><div class="detail-actions"><a class="aff-primary" href="${appLink(category)}">Open in Gratitude <span aria-hidden="true">↗</span></a>${storeBadges}<span class="detail-actions__divider" aria-hidden="true"></span>${qrDownload}</div></div></div></div><div class="detail-cover" style="--card-bg:${category.bgColor}">${category.blushImageURL ? `<img src="${category.blushImageURL}" alt="${escapeHtml(category.title)} affirmation collection artwork" width="624" height="600" />` : `<span aria-hidden="true">✦</span>`}<small>${count} affirmations</small></div></div></div></section><section class="detail-content" id="affirmation-list"><div class="auto__container detail-content__grid"><div><p class="aff-kicker">Read and repeat</p><h2>${count} affirmations for ${escapeHtml(category.title.toLowerCase())}</h2><p class="detail-intro">Pause after each sentence. Repeat it out loud or save the one you want to carry into your day.</p>${affirmationList}</div></div></section><section class="detail-related"><div class="auto__container"><div class="detail-related__heading"><div><p class="aff-kicker">Keep exploring</p><h2>More from ${escapeHtml(category.section.title)}</h2></div><a href="../">View all collections →</a></div><div class="detail-related__grid">${related}</div></div></section></main></div>${footer("../../")}<script defer src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script><script defer src="../../js/affirmation-detail.js?v=3"></script></body></html>`;
  const pageWithoutOpenButton = page.replace(/<a class="aff-primary" href="[^"]+">Open in Gratitude <span aria-hidden="true">↗<\/span><\/a>/, "");
  fs.writeFileSync(path.join(outDir, "index.html"), pageWithoutOpenButton);
}

const sitemapEntries = [
  "",
  "affirmations/",
  ...allCategories.map((item) => `affirmations/${item.slug}/`),
  "visionboard/",
  "visionboard/templates",
  "visionboard/templates/health-vision-board",
  "visionboard/templates/career-vision-board",
  "visionboard/templates/love-vision-board",
  "visionboard/templates/travel-vision-board",
  "visionboard/templates/money-vision-board",
  "visionboard/templates/dream-home-vision-board",
  "visionboard/templates/personal-growth-vision-board",
  "visionboard/templates/hobbies-vision-board",
  "visionboard/templates/family-and-friends-vision-board",
  "visionboard/templates/peace-and-calm-vision-board",
  "visionboard/templates/scrapbook-vision-board",
  "visionboard/templates/mosaic-vision-board",
  "visionboard/templates/minimalist-vision-board",
  "visionboard/templates/doodle-vision-board",
  "world-gratitude-day-challenge.html",
  "embracing-myself-challenge.html",
  "remembering-with-gratitude-challenge.html",
  "new-year-challenge.html",
  "features/",
  "pricing/",
  "download/",
  "about/",
  "privacy-policy.html",
  "terms-and-conditions.html",
];
const sitemapLastModified = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map((route)=>`  <url><loc>${siteOrigin}/${route}</loc><lastmod>${sitemapLastModified}</lastmod></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(siteDir, "sitemap.xml"), sitemap);
console.log(`Generated ${allCategories.length} collection pages with ${exactAffirmationCount} exact affirmation texts.`);
