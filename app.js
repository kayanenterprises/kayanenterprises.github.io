// ============================================================
// Kayan Enterprises – site logic (catalog, language switcher, form)
// ============================================================
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeewyyob";

// Product photos: drop real photos at media/products/<id>.jpg and they replace
// the placeholder illustration (<id>.svg) automatically.
const CATALOG = [
    { id: "trap-a",   type: "trap", key: "trapA", interest: "Traps" },
    { id: "trap-b",   type: "trap", key: "trapB", interest: "Traps" },
    { id: "lure-me",  type: "lure", key: "me",    interest: "Lures" },
    { id: "lure-cue", type: "lure", key: "cue",   interest: "Lures" },
    { id: "kit",      type: "kit",  key: "kit",   interest: "Kits"  }
];

// Target markets shown in the "Serving growers worldwide" section.
// langCode links a market to its language so it can be highlighted.
const MARKETS = [
    { key: "us", flag: "media/flags/us.svg", langCode: "en" },
    { key: "br", flag: "media/flags/br.svg", langCode: "pt" },
    { key: "ar", flag: "media/flags/ar.svg", langCode: "es" },
    { key: "vn", flag: "media/flags/vn.svg", langCode: "vi" },
    { key: "id", flag: "media/flags/id.svg", langCode: "id" }
];

// ISO country codes offered in the inquiry form (names are localised via Intl.DisplayNames)
const COUNTRY_CODES = ["US","BR","AR","VN","ID","JP","CN","BE","NL","FR","DE","ES","PT","IT","GB","MX","CO","PE","CL","EC","CR","GT","TH","MY","PH","SG","KR","AU","NZ","ZA","KE","TZ","UG","EG","MA","AE","SA","TR","BD","LK","NP","PK","CA"];

let currentLang = "en";
let formState = null;   // remembers last form message so it can be re-translated

// ---------- Translation helpers ----------
function t(key, lang = currentLang) {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

function detectLanguage() {
    try {
        const param = new URLSearchParams(location.search).get("lang");
        if (param && TRANSLATIONS[param]) return param;
        const saved = localStorage.getItem("kayan_lang");
        if (saved && TRANSLATIONS[saved]) return saved;
    } catch (e) { /* storage blocked – ignore */ }
    for (const l of (navigator.languages || [navigator.language || "en"])) {
        const base = String(l).toLowerCase().split("-")[0];
        const code = base === "in" ? "id" : base;
        if (TRANSLATIONS[code]) return code;
    }
    return "en";
}

function applyLanguage(code, { persist = true } = {}) {
    if (!TRANSLATIONS[code]) code = "en";
    currentLang = code;
    const meta = LANGUAGES.find(l => l.code === code);

    document.documentElement.lang = meta.htmlLang;
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));

    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });

    // Switcher button + menu state
    const flagEl = document.getElementById("lang-current-flag");
    const codeEl = document.getElementById("lang-current-code");
    if (flagEl) { flagEl.src = meta.flag; flagEl.alt = meta.label; }
    if (codeEl) codeEl.textContent = code.toUpperCase();
    document.querySelectorAll("#lang-menu li").forEach(li => {
        li.setAttribute("aria-selected", li.dataset.code === code ? "true" : "false");
    });

    const hidden = document.getElementById("site-language");
    if (hidden) hidden.value = code;

    renderProducts();
    renderMarkets();
    renderCountries();
    refreshFormState();

    if (persist) { try { localStorage.setItem("kayan_lang", code); } catch (e) {} }
}

// ---------- Renderers ----------
function renderProducts() {
    const el = document.getElementById("product-catalog");
    if (!el) return;
    el.innerHTML = CATALOG.map(p => `
        <article class="product-card">
            <div class="product-img-wrapper">
                <span class="tag ${p.type}">${t("tag." + p.type)}</span>
                <img src="media/products/${p.id}.jpg" alt="${t("p." + p.key + ".n")}" loading="lazy"
                     onerror="this.onerror=null;this.src='media/products/${p.id}.svg'">
            </div>
            <div class="product-info">
                <h3>${t("p." + p.key + ".n")}</h3>
                <p>${t("p." + p.key + ".d")}</p>
                <a class="product-link" href="#contact" data-interest="${p.interest}">${t("products.quote")}</a>
            </div>
        </article>
    `).join("");

    // Pre-select the matching interest in the form when "Request quote" is clicked
    el.querySelectorAll(".product-link").forEach(a => a.addEventListener("click", () => {
        const sel = document.getElementById("interest");
        if (sel) sel.value = a.dataset.interest;
    }));
}

function renderMarkets() {
    const el = document.getElementById("market-grid");
    if (!el) return;
    el.innerHTML = MARKETS.map(m => `
        <div class="market-card ${m.langCode === currentLang ? "active" : ""}">
            <img src="${m.flag}" alt="" width="40" height="27">
            <h3>${t("m." + m.key + ".n")}</h3>
            <p>${t("m." + m.key + ".d")}</p>
        </div>
    `).join("");
}

function renderCountries() {
    const sel = document.getElementById("country");
    if (!sel) return;
    const previous = sel.value;
    let names;
    try { names = new Intl.DisplayNames([currentLang], { type: "region" }); } catch (e) { names = null; }
    const list = COUNTRY_CODES
        .map(c => ({ code: c, name: names ? names.of(c) : c }))
        .sort((a, b) => a.name.localeCompare(b.name, currentLang));
    sel.innerHTML = `<option value="" disabled selected>${t("f.country.ph")}</option>` +
        list.map(c => `<option value="${c.name}" data-code="${c.code}">${c.name}</option>`).join("") +
        `<option value="Other">${t("f.int.other")}</option>`;
    // Restore previous choice by country code after re-translation
    if (previous) {
        const prevCode = sel.dataset.selectedCode;
        const opt = Array.from(sel.options).find(o => o.dataset.code === prevCode);
        if (opt) sel.value = opt.value;
    }
}

function renderLanguageMenu() {
    const menu = document.getElementById("lang-menu");
    const btn = document.getElementById("lang-btn");
    if (!menu || !btn) return;

    menu.innerHTML = LANGUAGES.map(l => `
        <li role="option" tabindex="0" data-code="${l.code}" aria-selected="false">
            <img src="${l.flag}" alt="" width="24" height="16"><span>${l.label}</span>
        </li>`).join("");

    const close = () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
    const open  = () => { menu.hidden = false; btn.setAttribute("aria-expanded", "true"); };

    btn.addEventListener("click", e => { e.stopPropagation(); menu.hidden ? open() : close(); });
    menu.addEventListener("click", e => {
        const li = e.target.closest("li");
        if (li) { applyLanguage(li.dataset.code); close(); btn.focus(); }
    });
    menu.addEventListener("keydown", e => {
        const li = e.target.closest("li");
        if (!li) return;
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); li.click(); }
        if (e.key === "ArrowDown") { e.preventDefault(); (li.nextElementSibling || menu.firstElementChild).focus(); }
        if (e.key === "ArrowUp")   { e.preventDefault(); (li.previousElementSibling || menu.lastElementChild).focus(); }
    });
    document.addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

// ---------- Contact form (Formspree) ----------
function showStatus(kind, msgKey) {
    formState = { kind, msgKey };
    refreshFormState();
}

function refreshFormState() {
    const alertEl = document.getElementById("form-status-alert");
    const btn = document.getElementById("submit-btn");
    if (!alertEl || !btn) return;

    const styles = {
        ok:      ["#E8F0E8", "#1F4E2E", "#C3E6CB"],
        already: ["#FFF4DA", "#2C3E2B", "#F2A30F"],
        error:   ["#FDF2F2", "#9B1C1C", "#FDE8E8"]
    };

    if (formState) {
        const [bg, color, border] = styles[formState.kind];
        alertEl.style.display = "block";
        alertEl.style.backgroundColor = bg;
        alertEl.style.color = color;
        alertEl.style.borderColor = border;
        alertEl.textContent = t(formState.msgKey);
    }
    if (formState && formState.btnKey) {
        btn.textContent = t(formState.btnKey);
    } else if (!btn.disabled) {
        btn.textContent = t("f.send");
    }
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    const btn = document.getElementById("submit-btn");
    const country = document.getElementById("country");
    if (!form || !btn) return;

    if (country) country.addEventListener("change", () => {
        country.dataset.selectedCode = country.selectedOptions[0]?.dataset.code || "";
    });

    const lock = btnKey => {
        Array.from(form.elements).forEach(el => el.disabled = true);
        btn.style.opacity = ".6";
        formState.btnKey = btnKey;
        refreshFormState();
    };

    let already = false;
    try { already = localStorage.getItem("kayan_form_submitted") === "true"; } catch (e) {}
    if (already) {
        showStatus("already", "f.already");
        lock("f.alreadyBtn");
        return;
    }

    form.addEventListener("submit", async event => {
        event.preventDefault();
        btn.textContent = t("f.sending");
        btn.disabled = true;
        document.getElementById("form-status-alert").style.display = "none";
        formState = null;

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });
            if (!response.ok) throw new Error("rejected");

            try { localStorage.setItem("kayan_form_submitted", "true"); } catch (e) {}
            showStatus("ok", "f.ok");
            lock("f.sent");
        } catch (err) {
            showStatus("error", navigator.onLine ? "f.errServer" : "f.err");
            btn.disabled = false;
            btn.textContent = t("f.send");
        }
    });
}

// ---------- Mobile menu ----------
function initMobileMenu() {
    const toggle = document.getElementById("mobile-menu");
    const list = document.getElementById("nav-list");
    if (!toggle || !list) return;
    toggle.addEventListener("click", () => list.classList.toggle("active"));
    list.querySelectorAll("a").forEach(a => a.addEventListener("click", () => list.classList.remove("active")));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
    renderLanguageMenu();
    initMobileMenu();
    initContactForm();
    applyLanguage(detectLanguage(), { persist: false });
});
