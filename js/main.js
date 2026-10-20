(() => {
  const page = document.body.dataset.page || "home";
  const lang = localStorage.getItem("aymanauto-lang") || "ar";
  const t = lang === "en" ? window.EN : window.AR;
  const config = window.SITE_CONFIG;
  const metaContent = page === "home" ? {title: `${config.brandName} — ${t.home.eyebrow}`, description: t.home.intro}
    : ({about:t.about, services:t.services, inspection:t.inspection, consultations:t.consultations, parts:t.parts, categories:t.categories, booking:t.booking, sell:t.sell, contact:t.contact, privacy:t.privacy}[page] || {title:"404", description:t.common.notFound});
  document.title = page === "home" ? metaContent.title : `${metaContent.title} — ${config.brandName}`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = metaContent.description;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.content = metaContent.description;
  const savedTheme = localStorage.getItem("aymanauto-theme") || "dark";
  const doc = document.documentElement;
  doc.lang = t.lang;
  doc.dir = t.dir;
  doc.dataset.theme = savedTheme;
  document.body.classList.add("page-ready");

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  const CACHE_VERSION = "35";
  const cacheHref = file => { if (/^(https?:|mailto:|tel:|#)/.test(file)) return file; const sep = file.includes("?") ? "&" : "?"; return `${file}${sep}v=${CACHE_VERSION}`; };
  const link = (file, label) => `<a href="${cacheHref(file)}">${label}</a>`;
  const pageFile = location.pathname.split("/").pop() || "index.html";

  function header() {
    const n = t.nav;
    const servicesLabel = lang === "en" ? "Service sections" : "أقسام الخدمات";
    const languageLabel = lang === "en" ? "Switch language" : "تبديل اللغة";
    const serviceLinks = [
      ["services.html", n.services], ["car-inspection.html", n.inspection], ["consultations.html", n.consultations],
      ["spare-parts.html", n.parts], ["car-categories.html", n.categories], ["booking.html", n.booking], ["sell-your-car.html", n.sell]
    ];
    return `<div class="site-progress" aria-hidden="true"><span></span></div><header class="topbar topbar-command"><div class="container topbar-inner">
      <a class="brand" href="index.html?v=${CACHE_VERSION}" aria-label="${esc(config.brandName)}">
        <span class="mark"><img src="${config.logo}" alt="${esc(config.brandName)} logo" onerror="this.onerror=null;this.src='${config.logoFallback}'"></span>
      </a>
      <nav class="nav" aria-label="${esc(t.common.navigation)}"><a href="${cacheHref("index.html")}">${n.home}</a><a href="${cacheHref("about.html")}">${n.about}</a><details class="services-menu"><summary class="services-trigger">${servicesLabel}<span aria-hidden="true">⌄</span></summary><div class="services-panel">${serviceLinks.map(([file,label]) => link(file,label)).join("")}</div></details><a href="${cacheHref("contact.html")}">${n.contact}</a></nav>
      <div class="header-actions"><button class="lang" id="langToggle" type="button" aria-label="${languageLabel}" title="${languageLabel}">${languageLabel}</button><button class="theme-toggle" type="button" aria-label="${t.common.theme}" title="${t.common.theme}"><span aria-hidden="true">☼</span></button></div>
    </div></header><a class="whatsapp-fab" href="https://wa.me/${esc(config.whatsapp)}" target="_blank" rel="noopener noreferrer" aria-label="${t.common.whatsapp}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.4ZM12.2 21.7c-1.7 0-3.3-.5-4.8-1.3l-.3-.2-3.8 1 1-3.7-.2-.3a9.8 9.8 0 1 1 8.1 4.5Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.2 3.2.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4 0-.2-.2-.3-.5-.4Z"/></svg></a>`;
  }

  function clockWidget() {
    const labels = lang === "en"
      ? { live: "LIVE / DRIVE TIME", gregorian: "Gregorian", hijri: "Hijri" }
      : { live: "الوقت الآن / DRIVE TIME", gregorian: "ميلادي", hijri: "هجري" };
    return `<aside class="site-clock" aria-label="${labels.live}" dir="${lang === "en" ? "ltr" : "rtl"}><div class="site-clock-car" aria-hidden="true"><svg viewBox="0 0 180 64" role="presentation"><path class="car-shadow" d="M18 52h144"/><path class="car-body" d="M24 45 36 25c3-5 8-8 14-8h59c8 0 15 4 20 10l11 14h13c5 0 9 4 9 9v3H24z"/><path class="car-window" d="M53 21 45 36h70l-11-15H53Z"/><path class="car-line" d="M31 43h112"/><circle class="car-wheel" cx="50" cy="48" r="10"/><circle class="car-wheel" cx="132" cy="48" r="10"/><circle class="car-hub" cx="50" cy="48" r="4"/><circle class="car-hub" cx="132" cy="48" r="4"/><path class="car-light" d="M147 34h8l5 6h-11z"/><path class="car-light car-light-back" d="M27 35h7l-4 6h-7z"/></svg></div><div class="site-clock-head"><span class="site-clock-kicker">${labels.live}</span><i aria-hidden="true"></i></div><time class="site-clock-time" data-clock-time>--:--:--</time><div class="site-clock-dates"><span><b>${labels.gregorian}</b><time data-clock-gregorian>—</time></span><span><b>${labels.hijri}</b><time data-clock-hijri>—</time></span></div></aside>`;
  }

  function footer() {
    const rightsLine = lang === "ar"
      ? `<span class="rights-main" dir="rtl">جميع الحقوق محفوظة © 2026 <bdi dir="ltr">Future Auto Services</bdi></span>`
      : `<span class="rights-main" dir="ltr">All rights reserved © 2026 <bdi dir="ltr">Future Auto Services</bdi></span>`;
    return `<footer class="footer footer-v2"><div class="container footer-grid"><div>
      <div class="footer-brand"><img class="footer-brand-logo" src="${config.logo}" alt="${esc(config.brandName)} logo" onerror="this.onerror=null;this.src='${config.logoFallback}'"><div><strong>${esc(config.brandName)}</strong><span>${t.brand.subline}</span></div></div>
      <p>${t.footer.desc}</p>
      <div class="footer-contact"><span>${esc(lang === "en" ? (config.addressEn || config.address) : config.address)}</span><span>${esc(lang === "en" ? (config.hoursEn || config.hours) : config.hours)}</span><span>${contactConfig()}</span></div>
    </div><nav>${link("privacy.html",t.privacy.title)} ${link("sell-your-car.html",t.nav.sell)} ${link("contact.html",t.nav.contact)}</nav><span class="footer-rights" dir="ltr">${rightsLine}<span class="footer-dev">${t.footer.dev}</span></span></div></footer>`;
  }

  function shell() {
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", clockWidget());
    document.body.insertAdjacentHTML("beforeend", footer());
    setupClock();
    $$('a[href*=".html"]').forEach(a => { if (new URL(a.href, location.href).pathname.endsWith(pageFile)) a.classList.add("active"); });
    $$('a[href*=".html"]').forEach(a => a.addEventListener("click", event => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || a.target === "_blank") return;
      const target = new URL(a.href, location.href);
      if (target.origin !== location.origin) return;
      event.preventDefault();
      document.body.classList.add("page-exit");
      window.setTimeout(() => { location.href = a.href; }, 180);
    }));
    const menu = $(".menu");
    const nav = $(".nav");
    menu?.addEventListener("click", () => { const open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); });
    $$(".nav a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); menu?.setAttribute("aria-expanded", "false"); $(".services-menu")?.classList.remove("open"); }));
    $("#langToggle")?.addEventListener("click", () => { localStorage.setItem("aymanauto-lang", lang === "en" ? "ar" : "en"); location.reload(); });
    const themeButton = $(".theme-toggle");
    const applyTheme = theme => {
      doc.dataset.theme = theme;
      localStorage.setItem("aymanauto-theme", theme);
      themeButton?.setAttribute("aria-pressed", String(theme === "light"));
      const icon = $("span", themeButton);
      if (icon) icon.textContent = theme === "light" ? "☾" : "☼";
    };
    applyTheme(doc.dataset.theme === "light" ? "light" : "dark");
    themeButton?.addEventListener("click", () => applyTheme(doc.dataset.theme === "light" ? "dark" : "light"));
    $$(".contact-card").forEach(card => card.addEventListener("click", () => {
      $$(".contact-card.is-active").forEach(active => active.classList.remove("is-active"));
      card.classList.add("is-active");
    }));
    $$(".phone-link").forEach(link => link.addEventListener("pointerdown", () => {
      $$(".contact-card.is-active").forEach(active => active.classList.remove("is-active"));
      link.classList.add("is-active");
    }));
    const interactiveSelector = 'a, button, summary, input, select, textarea, .card, .brand-card, .category-card, .contact-card';
    const interactive = $$(interactiveSelector);
    const setNear = (element, near, strength = 0) => {
      element.classList.toggle("is-near", near);
      element.style.setProperty("--proximity", near ? strength.toFixed(2) : "0");
    };
    const distanceToRect = (x, y, rect) => {
      const dx = Math.max(rect.left - x, 0, x - rect.right);
      const dy = Math.max(rect.top - y, 0, y - rect.bottom);
      return Math.hypot(dx, dy);
    };
    const clearProximity = () => interactive.forEach(element => { setNear(element, false); element.classList.remove("is-nearest"); });
    document.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      let closest = null;
      let closestDistance = Infinity;
      const range = 72;
      interactive.forEach(element => {
        const distance = distanceToRect(event.clientX, event.clientY, element.getBoundingClientRect());
        if (distance <= range && distance < closestDistance) { closest = element; closestDistance = distance; }
      });
      interactive.forEach(element => setNear(element, element === closest, closest === element ? 1 - (closestDistance / range) : 0));
      interactive.forEach(element => element.classList.toggle("is-nearest", element === closest));
    }, { passive: true });
    document.addEventListener("pointerleave", clearProximity, { passive: true });
    interactive.forEach(element => {
      element.addEventListener("pointerdown", () => {
        clearProximity();
        setNear(element, true, 1);
        element.classList.add("is-nearest", "touch-pulse");
        window.setTimeout(() => { setNear(element, false); element.classList.remove("is-nearest", "touch-pulse"); }, 460);
      }, { passive: true });
    });
    const servicesMenu = $(".services-menu");
    if (servicesMenu) {
      const trigger = $(".services-trigger", servicesMenu);
      const closeServices = () => { servicesMenu.open = false; };
      trigger?.addEventListener("click", event => { event.preventDefault(); servicesMenu.open = !servicesMenu.open; });
      servicesMenu.addEventListener("pointerleave", event => {
        if (event.pointerType !== "touch") window.setTimeout(() => { if (!servicesMenu.matches(":focus-within")) closeServices(); }, 160);
      });
      document.addEventListener("click", event => {
        if (!servicesMenu.contains(event.target)) closeServices();
      });
      document.addEventListener("pointermove", event => {
        if (event.pointerType !== "touch" && servicesMenu.open && !servicesMenu.contains(event.target)) closeServices();
      }, { passive: true });
      $$(".services-panel a", servicesMenu).forEach(item => item.addEventListener("click", closeServices));
    }
    const progress = $(".site-progress span");
    const updateProgress = () => { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`; };
    window.addEventListener("scroll", updateProgress, {passive:true}); updateProgress();
  }

  function setupClock() {
    const widget = $(".site-clock");
    if (!widget) return;
    const time = $("[data-clock-time]", widget);
    const gregorian = $("[data-clock-gregorian]", widget);
    const hijri = $("[data-clock-hijri]", widget);
    const locale = lang === "en" ? "en-US-u-nu-latn" : "ar-EG-u-nu-latn";
    const hijriLocale = lang === "en" ? "en-US-u-ca-islamic-umalqura-nu-latn" : "ar-EG-u-ca-islamic-umalqura-nu-latn";
    const timeFormatter = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const gregorianFormatter = new Intl.DateTimeFormat(locale, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    const hijriFormatter = new Intl.DateTimeFormat(hijriLocale, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    const update = () => {
      const now = new Date();
      time.textContent = timeFormatter.format(now);
      gregorian.textContent = gregorianFormatter.format(now);
      hijri.textContent = hijriFormatter.format(now);
    };
    update();
    const timer = window.setInterval(update, 1000);
    window.addEventListener("beforeunload", () => window.clearInterval(timer), { once: true });
  }

  function pageHero(title, intro, label = t.home.eyebrow) {
    return `<section class="page-hero"><div class="container"><div class="eyebrow">${esc(label)}</div><h1>${esc(title)}</h1><p>${esc(intro)}</p></div></section>`;
  }

  function list(items) {
    return `<ul class="list">${items.map((item, i) => `<li class="reveal delay-${Math.min(i % 4, 3)}">${esc(item)}</li>`).join("")}</ul>`;
  }

  function cards(items) {
    return `<div class="grid">${items.map((item, i) => `<article class="card reveal delay-${Math.min(i % 4, 3)}"><span class="num">${String(i + 1).padStart(2,"0")}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><a class="card-link" href="${cacheHref(item.link)}">${t.common.readMore} <span aria-hidden="true">↗</span></a></article>`).join("")}</div>`;
  }

  function categoryPreview() {
    return `<div class="category-stage"><div class="category-rail">${config.brandGroups.map((group, i) => { const copy=t.categories.groups[group.key]; return `<a class="category-card reveal delay-${i}" href="car-categories.html?group=${encodeURIComponent(group.key)}&v=${CACHE_VERSION}"><div class="category-card-top"><span class="category-index">${group.eyebrow} / 0${group.logos.length}</span><span class="category-badge" aria-hidden="true">↗</span></div><div><h3>${esc(copy.title)}</h3><p>${esc(copy.intro)}</p></div><div class="category-card-footer"><span>${group.logos.length} ${t.categories.brandCount}</span><span>${t.common.readMore} ↗</span></div></a>`; }).join("")}</div><div class="rail-hint">${lang === "en" ? "Swipe to explore categories" : "مرّر لاستكشاف الفئات"}</div></div>`;
  }

  function brandGroups() {
    const selected = new URLSearchParams(location.search).get("group");
    const groups = selected ? config.brandGroups.filter(group => group.key === selected) : config.brandGroups;
    return `<div class="brand-groups">${groups.map((group, index) => {
      const copy = t.categories.groups[group.key];
      return `<section class="brand-group reveal delay-${index % 4}"><div class="brand-group-head"><div><div class="eyebrow">${group.eyebrow} / ${esc(copy.label)}</div><h2>${esc(copy.title)}</h2></div><p>${esc(copy.intro)}</p></div><div class="brand-grid">${group.logos.map(brand => { const key = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"); const wide = /mercedes|volkswagen|ssangyong|citroen|skoda|jetour/i.test(brand.name) ? " brand-wide" : ""; const fitted = /mazda|mitsubishi|honda/i.test(brand.name) ? " brand-fitted" : ""; const compact = /mercedes|bmw|volkswagen|skoda|peugeot|renault|citroen|toyota|mitsubishi|honda/i.test(brand.name) ? " brand-compact" : ""; return `<div class="brand-card"><span class="brand-logo">${brand.file ? `<img class="brand-logo-img brand-${key}${wide}${fitted}${compact}" src="${brand.file}" alt="${esc(brand.name)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.hidden=false">` : ""}<span ${brand.file ? "hidden" : ""}>${esc(brand.mark)}</span></span><strong>${esc(brand.name)}</strong></div>`; }).join("")}</div></section>`;
    }).join("")}</div>`;
  }

  function phoneHref(number) {
    const cleaned = String(number || "").replace(/[^\d+]/g, "");
    if (cleaned.startsWith("+")) return `tel:${cleaned}`;
    if (cleaned.startsWith("0")) return `tel:+20${cleaned.slice(1)}`;
    return `tel:+${cleaned}`;
  }

  function contactConfig() {
    const parts = [];
    if (config.phone) parts.push(`<a class="phone-link" dir="ltr" href="${phoneHref(config.phone)}">${esc(config.phone)}</a>`);
    if (config.whatsapp) parts.push(`<a href="https://wa.me/${esc(config.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`);
    if (config.email) parts.push(`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>`);
    return parts.length ? parts.join(" · ") : `<span class="empty">${t.common.notConfigured}</span>`;
  }
  function contactIcon(type) {
    const icons = {
      whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.4ZM12.2 21.7c-1.7 0-3.3-.5-4.8-1.3l-3.8 1 1-3.7-.2-.3a9.8 9.8 0 1 1 8.1 4.5Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.2 3.2.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.6.8.2 1.5.1 2 .1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4 0-.2-.2-.4-.5-.4Z"/></svg>',
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2.5 9.9 2l1.7 4.2-2.1 1.8a15.8 15.8 0 0 0 6.5 6.5l1.8-2.1 4.2 1.7-.5 2.7a3 3 0 0 1-3.3 2.4C10.9 18.3 5.7 13.1 4.8 5.8a3 3 0 0 1 2.4-3.3Z"/></svg>',
      landline: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-2 3-2-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4h10M7 12h6"/></svg>',
      location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
      hours: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>'
    };
    return icons[type] || icons.phone;
  }

  function fieldOptions(field, kind) {
    const value = field.toLowerCase();
    if (value.includes("نوع الخدمة") || value.includes("requested service") || value.includes("request type")) {
      return lang === "en" ? ["Technical consultation", "Fault diagnostics", "Pre-purchase inspection", "Pre-sale inspection", "Genuine spare parts", "Vehicle selling assistance", "Other service"] : ["استشارة فنية", "تشخيص أعطال", "فحص قبل الشراء", "فحص قبل البيع", "قطع غيار أصلية", "مساعدة في بيع السيارة", "خدمة أخرى"];
    }
    if (value.includes("فئة السيارة") || value.includes("نوع السيارة") || value.includes("vehicle category") || value.includes("vehicle type")) {
      return lang === "en" ? ["Passenger car", "SUV", "Light commercial", "Other"] : ["سيارة ركوب", "SUV", "نقل خفيف", "أخرى"];
    }
    if (kind !== "sell" && (value.includes("الماركة") || value.includes("ماركة") || value === "make" || value.startsWith("make ") || value.includes("vehicle make"))) {
      return [...new Set(config.brandGroups.flatMap(group => group.logos.map(brand => brand.name)))].sort((a, b) => a.localeCompare(b));
    }
    return null;
  }
  function fieldRequired(kind, index) {
    const required = { booking: [0, 1, 2, 3, 5, 6], sell: [0, 1, 2, 3], parts: [0, 1, 2, 3, 4], contact: [0, 2] };
    return (required[kind] || []).includes(index);
  }
  function form(kind, fields) {
    const controls = fields.map((field, i) => {
      const value = field.toLowerCase();
      const id = `${kind}-${i}`;
      const required = fieldRequired(kind, i);
      const options = fieldOptions(field, kind);
      const long = field.length > 28 || /description|problem|details|condition|message|مشكلة|وصف|تفاصيل|حالة السيارة|الرسالة/i.test(field);
      const type = /phone|contact|هاتف|تواصل/i.test(field) ? "tel"
        : /email|البريد/i.test(field) ? "email"
        : /time|الوقت/i.test(field) ? "time"
        : /date|التاريخ/i.test(field) ? "date"
        : /year|سنة الصنع/i.test(field) ? "number"
        : /mileage|kilomet|المسافة|الكيلومترات|عدد الكيلومترات/i.test(field) ? "number"
        : /price|السعر/i.test(field) ? "number" : "text";
      const req = required ? "required" : "";
      const optional = required ? "" : ` <small>(${t.common.optional})</small>`;
      const attrs = type === "tel" ? ` autocomplete="tel" inputmode="tel"` : type === "email" ? ` autocomplete="email"` : "";
      const numeric = type === "number" ? (/year|سنة الصنع/i.test(field) ? ` min="1950" max="${new Date().getFullYear() + 1}" step="1"` : ` min="0" step="1"`) : "";
      let control;
      if (options) {
        const placeholder = lang === "en" ? "Choose an option" : "اختر من القائمة";
        control = `<select id="${id}" name="field_${i}" data-label="${esc(field)}" ${req}><option value="" disabled selected>${placeholder}</option>${options.map(option => `<option value="${esc(option)}">${esc(option)}</option>`).join("")}</select>`;
      } else if (long) {
        control = `<textarea id="${id}" name="field_${i}" data-label="${esc(field)}" maxlength="2000" ${req}></textarea>`;
      } else {
        control = `<input id="${id}" name="field_${i}" data-label="${esc(field)}" type="${type}" maxlength="${type === "text" ? 200 : 40}"${attrs}${numeric} ${req}>`;
      }
      return `<div class="field ${long ? "full" : ""}"><label for="${id}">${esc(field)}${optional}</label>${control}</div>`;
    }).join("");
    return `<form class="form reveal" data-form="${esc(kind)}"><div class="fields">${controls}<div class="field full consent-field"><label><input type="checkbox" name="privacy_consent" required> ${t.common.privacyAgree} <a href="privacy.html">${esc(t.privacy.title)}</a></label></div></div><p class="form-note">${t.common.formNotSent}</p><button class="btn" type="submit">${t.common.send} <span aria-hidden="true">↗</span></button><div class="status" role="status" aria-live="polite"></div></form>`;
  }
  function bindForms() {
    $$('form[data-form]').forEach(formElement => formElement.addEventListener("submit", event => {
      event.preventDefault();
      const status = $(".status", formElement);
      status.replaceChildren();
      status.className = "status show info";
      if (!config.whatsapp) {
        status.textContent = t.common.notConfigured;
        return;
      }
      const kind = formElement.dataset.form;
      const heading = kind === "booking" ? t.booking.title : kind === "sell" ? t.sell.title : kind === "parts" ? t.parts.title : t.contact.title;
      const entries = [...formElement.querySelectorAll('input:not([type="checkbox"]), textarea, select')]
        .filter(control => control.value.trim())
        .map(control => `${control.dataset.label}: ${control.value.trim()}`);
      const message = `${config.brandName}\n${heading}\n\n${entries.join("\n")}`;
      const url = `https://wa.me/${encodeURIComponent(config.whatsapp)}?text=${encodeURIComponent(message)}`;
      status.append(document.createTextNode(`${t.common.whatsappPrepared} `));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = t.common.openWhatsapp;
      status.append(anchor);
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      if (popup) popup.opener = null;
    }));
  }
  function render() {
    let html = "";
    if (page === "home") {
      const h = t.home;
      html = `<main class="site-v2"><section class="hero-v2 container"><div class="hero-v2-copy"><div class="hero-v2-kicker"><i></i>${esc(h.eyebrow)}</div><h1>${esc(h.titleLead)} <span>${esc(h.titleHighlight)}</span></h1><p>${esc(h.intro)}</p><div class="hero-v2-actions"><a class="btn" href="${cacheHref("booking.html")}">${t.common.book} <span aria-hidden="true">↗</span></a><a class="btn secondary" href="${cacheHref("services.html")}">${t.common.servicesCta}</a></div><div class="hero-v2-proof"><div><strong>16+</strong><span>${lang === "en" ? "years of experience" : "سنة خبرة مهنية"}</span></div><div><strong>03</strong><span>${lang === "en" ? "decision paths" : "مسارات لاتخاذ القرار"}</span></div><div><strong>01</strong><span>${lang === "en" ? "clear next step" : "خطوة تالية واضحة"}</span></div></div></div><div class="hero-v2-stage"><div class="hero-v2-image"><img src="assets/images/hero-inspection-original.webp" alt="${esc(h.imageAlt)}" width="1200" height="800" fetchpriority="high" decoding="async"><div class="hero-v2-image-caption"><strong>${esc(config.brandName)}</strong><span>${esc(h.trust)}</span></div></div><div class="hero-v2-float top"><b>01</b><small>${esc(h.pills[0])}</small></div><div class="hero-v2-float bottom"><b>03</b><small>${esc(h.pills[2])}</small></div></div><span class="home-index">FAS / 2026</span></section><section class="section band home-panel"><div class="container"><div class="section-head"><div><div class="eyebrow">01 / ${esc(h.servicesTitle)}</div><h2>${esc(h.servicesTitle)}</h2></div><p>${esc(h.servicesIntro)}</p></div>${cards(t.services.items)}</div></section><section class="section home-panel"><div class="container"><div class="section-head"><div><div class="eyebrow">02 / ${esc(h.categoriesTitle)}</div><h2>${esc(h.categoriesTitle)}</h2></div><p>${esc(t.categories.homeIntro)}</p></div>${categoryPreview()}</div></section><section class="section band home-panel"><div class="container"><div class="section-head"><div><div class="eyebrow">03 / ${esc(h.stepsTitle)}</div><h2>${esc(h.stepsTitle)}</h2></div></div><div class="steps">${h.steps.map((step, i) => `<div class="step reveal delay-${i}"><b>${String(i + 1).padStart(2,"0")}</b><p>${esc(step)}</p></div>`).join("")}</div></div></section><section class="section"><div class="container card reveal"><div class="eyebrow">${esc(h.ctaLabel)}</div><h2>${esc(h.ctaTitle)}</h2><p>${esc(h.ctaText)}</p><a class="btn" href="${cacheHref("contact.html")}">${t.common.contact} <span aria-hidden="true">↗</span></a></div></section></main>`;
    } else if (page === "about") {
      html = `<main>${pageHero(t.about.title,t.about.intro)}<section class="content container"><div class="split"><div class="prose reveal"><p>${esc(t.about.body)}</p></div><div>${list(t.about.points)}</div></div></section></main>`;
    } else if (page === "services") {
      html = `<main>${pageHero(t.services.title,t.services.intro)}<section class="content container">${cards(t.services.items)}</section></main>`;
    } else if (page === "inspection") {
      html = `<main>${pageHero(t.inspection.title,t.inspection.intro)}<section class="content container"><div class="split"><div>${list(t.inspection.items)}</div><div class="card reveal"><h3>${t.common.requestQuote}</h3><p>${esc(t.inspection.note)}</p><a class="btn" href="${cacheHref("booking.html")}">${t.common.requestQuote} <span aria-hidden="true">↗</span></a></div></div></section></main>`;
    } else if (page === "consultations") {
      html = `<main>${pageHero(t.consultations.title,t.consultations.intro)}<section class="content container"><div class="split"><div>${list(t.consultations.items)}</div><div class="card reveal"><h3>${t.consultations.priceTitle}</h3><p>${esc(t.consultations.price)}</p><p>${esc(t.consultations.free)}</p></div></div></section></main>`;
    } else if (page === "parts") {
      html = `<main>${pageHero(t.parts.title,t.parts.intro)}<section class="content container"><div class="card reveal"><p>${esc(t.parts.policy)}</p></div><br>${form("parts",t.parts.fields)}</section></main>`;
    } else if (page === "categories") {
      html = `<main>${pageHero(t.categories.title,t.categories.intro)}<section class="content container">${brandGroups()}<div class="disclaimer reveal"><b>i</b><span>${esc(t.categories.disclaimer)}</span></div><br><a class="btn" href="${cacheHref("booking.html")}">${t.common.book} <span aria-hidden="true">↗</span></a></section></main>`;
    } else if (page === "booking") {
      html = `<main>${pageHero(t.booking.title,t.booking.intro)}<section class="content container">${form("booking",t.booking.fields)}</section></main>`;
    } else if (page === "sell") {
      html = `<main>${pageHero(t.sell.title,t.sell.intro)}<section class="content container">${form("sell",t.sell.fields)}</section></main>`;
    } else if (page === "contact") {
      const address = lang === "en" ? (config.addressEn || config.address) : config.address;
      const hours = lang === "en" ? (config.hoursEn || config.hours) : config.hours;
      html = `<main>${pageHero(t.contact.title,t.contact.intro)}<section class="content container contact-layout"><div class="contact-panel reveal"><div class="contact-panel-head"><div><div class="eyebrow">FAS / CONNECT</div><h2>${t.contact.formTitle}</h2><p>${esc(t.contact.responseNote)}</p></div><span class="contact-pulse" aria-hidden="true"></span></div><div class="contact-cards"><a class="contact-card contact-card-primary" href="https://wa.me/${esc(config.whatsapp)}" target="_blank" rel="noopener noreferrer"><span class="contact-card-icon contact-icon-whatsapp">${contactIcon("whatsapp")}</span><span><small>WhatsApp</small><strong>${t.contact.whatsappCta}</strong><bdi dir="ltr">${esc(config.phone)}</bdi></span></a><a class="contact-card phone-link" href="${phoneHref(config.phone)}" aria-label="${esc(t.contact.mobile)}"><span class="contact-card-icon">${contactIcon("phone")}</span><span dir="${lang === "en" ? "ltr" : "rtl"}"><small>${t.contact.mobile}</small><strong>${t.contact.callCta}</strong><bdi dir="ltr">${esc(config.phone)}</bdi></span></a><a class="contact-card phone-link" href="${phoneHref(config.landline)}" aria-label="${esc(t.contact.landline)}"><span class="contact-card-icon">${contactIcon("landline")}</span><span dir="${lang === "en" ? "ltr" : "rtl"}"><small>${t.contact.landline}</small><strong>${t.contact.callCta}</strong><bdi dir="ltr">${esc(config.landlineDisplay || config.landline)}</bdi></span></a><div class="contact-card contact-card-static"><span class="contact-card-icon">${contactIcon("location")}</span><span><small>${t.contact.address}</small><strong>${esc(t.contact.locationNote)}</strong><b>${esc(address || t.common.notConfigured)}</b></span></div><div class="contact-card contact-card-static"><span class="contact-card-icon">${contactIcon("hours")}</span><span><small>${t.contact.hours}</small><strong>${esc(hours || t.common.notConfigured)}</strong><b>${esc(t.contact.responseNote)}</b></span></div></div></div><div class="contact-form-wrap reveal">${form("contact",[lang === "en" ? "Name" : "الاسم",lang === "en" ? "Email" : "البريد الإلكتروني",lang === "en" ? "Message" : "الرسالة"])}</div></section></main>`;
    } else if (page === "privacy") {
      html = `<main>${pageHero(t.privacy.title,t.privacy.intro)}<section class="content container prose">${t.privacy.sections.map((section,i) => `<section class="reveal delay-${i % 4}"><h2>${esc(section.h)}</h2><p>${esc(section.p)}</p></section>`).join("")}</section></main>`;
    } else {
      html = `<main class="container error-page"><div class="eyebrow">404</div><h1>404</h1><p>${t.common.notFound}</p><a class="btn" href="index.html">${t.nav.home}</a></main>`;
    }
    document.body.insertAdjacentHTML("beforeend", html);
    shell();
    bindForms();
    setupMotion();
  }

  function setupMotion() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach(item => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), {threshold:.12, rootMargin:"0px 0px -40px"});
    items.forEach(item => observer.observe(item));
  }

  render();
})();
