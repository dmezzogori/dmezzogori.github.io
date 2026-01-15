// i18n Module - Language Detection and Translation
(function () {
  "use strict";

  const SUPPORTED_LANGS = ["en", "it"];
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "lang";

  // Translation cache
  const translations = {
    en: null,
    it: null,
  };

  // Content translation cache (for longer content like project descriptions)
  const contentTranslations = {
    en: null,
    it: null,
  };

  // DOM element cache for performance (updated on init and when DOM changes)
  let elementsCache = null;

  /**
   * Build or refresh the DOM elements cache
   * This avoids multiple querySelectorAll calls on each language change
   */
  function buildElementsCache() {
    elementsCache = {
      i18n: document.querySelectorAll("[data-i18n]"),
      placeholder: document.querySelectorAll("[data-i18n-placeholder]"),
      aria: document.querySelectorAll("[data-i18n-aria]"),
      title: document.querySelectorAll("[data-i18n-title]"),
      content: document.querySelectorAll("[data-i18n-content]"),
      html: document.querySelectorAll("[data-i18n-html]"),
      langLabel: document.querySelectorAll(".lang-label"),
      date: document.querySelectorAll("[data-date]"),
    };
  }

  /**
   * Detect the user's preferred language
   * Priority: 1) localStorage, 2) browser language, 3) default (en)
   */
  function detectLanguage() {
    // 1. Check localStorage for user preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }

    // 2. Check browser language
    const browserLang = navigator.language?.split("-")[0];
    if (browserLang === "it") {
      return "it";
    }

    // 3. Default to English
    return DEFAULT_LANG;
  }

  /**
   * Get a nested translation value by dot notation path
   */
  function getTranslation(obj, path) {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  }

  /**
   * Apply translations to DOM elements with data-i18n attributes
   */
  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    // Ensure cache exists
    if (!elementsCache) buildElementsCache();

    // Translate elements with data-i18n attribute (text content)
    elementsCache.i18n.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getTranslation(t, key);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // Translate placeholder attributes
    elementsCache.placeholder.forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = getTranslation(t, key);
      if (value !== undefined) {
        el.placeholder = value;
      }
    });

    // Translate aria-label attributes
    elementsCache.aria.forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const value = getTranslation(t, key);
      if (value !== undefined) {
        el.setAttribute("aria-label", value);
      }
    });

    // Translate title attributes
    elementsCache.title.forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const value = getTranslation(t, key);
      if (value !== undefined) {
        el.title = value;
      }
    });

    // Update language toggle button labels
    elementsCache.langLabel.forEach((el) => {
      el.textContent = lang.toUpperCase();
    });

    // Format dates based on locale
    formatDates(lang);

    // Apply content translations if loaded
    applyContentTranslations(lang);
  }

  /**
   * Format dates based on locale
   */
  function formatDates(lang) {
    const t = translations[lang];
    const locale = t?.dates?.locale || (lang === "it" ? "it-IT" : "en-US");
    const format = { year: "numeric", month: "long", day: "numeric" };

    // Use cached elements
    if (!elementsCache) buildElementsCache();
    elementsCache.date.forEach((el) => {
      const isoDate = el.getAttribute("data-date");
      if (isoDate) {
        const date = new Date(isoDate);
        el.textContent = date.toLocaleDateString(locale, format);
      }
    });
  }

  /**
   * Apply content translations (projects, teaching, about, etc.)
   */
  function applyContentTranslations(lang) {
    const content = contentTranslations[lang];
    if (!content) return;

    // Ensure cache exists
    if (!elementsCache) buildElementsCache();

    // Translate content with data-i18n-content attribute
    elementsCache.content.forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      const value = getTranslation(content, key);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // Translate HTML content (like About section)
    elementsCache.html.forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = getTranslation(content, key);
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });
  }

  /**
   * Load UI translations from JSON file
   */
  async function loadTranslations(lang) {
    if (translations[lang]) {
      return translations[lang];
    }

    // Try to get embedded translations first (from data attribute)
    const embedded = document.getElementById("i18n-data");
    if (embedded) {
      try {
        const data = JSON.parse(embedded.textContent);
        // Eleventy embeds with filename as key (en, it)
        if (data.en) translations.en = data.en;
        if (data.it) translations.it = data.it;
        // Also load content translations if embedded
        if (data["content.en"]) contentTranslations.en = data["content.en"];
        if (data["content.it"]) contentTranslations.it = data["content.it"];
        if (translations[lang]) {
          return translations[lang];
        }
      } catch (e) {
        console.warn("Failed to parse embedded i18n data:", e);
      }
    }

    // Fallback to fetch
    try {
      const response = await fetch(`/assets/i18n/${lang}.json`);
      if (response.ok) {
        translations[lang] = await response.json();
        return translations[lang];
      }
    } catch (e) {
      console.error(`Failed to load translations for ${lang}:`, e);
    }

    return null;
  }

  /**
   * Load content translations (projects, teaching, blog, etc.)
   */
  async function loadContentTranslations(lang) {
    if (contentTranslations[lang]) {
      return contentTranslations[lang];
    }

    // Content may already be loaded from embedded data
    const embedded = document.getElementById("i18n-data");
    if (embedded && !contentTranslations[lang]) {
      try {
        const data = JSON.parse(embedded.textContent);
        if (data[`content.${lang}`]) {
          contentTranslations[lang] = data[`content.${lang}`];
          return contentTranslations[lang];
        }
      } catch (e) {
        // Ignore parse errors, will try fetch
      }
    }

    // Fallback to fetch
    try {
      const response = await fetch(`/assets/i18n/content.${lang}.json`);
      if (response.ok) {
        contentTranslations[lang] = await response.json();
        return contentTranslations[lang];
      }
    } catch (e) {
      // Content translations are optional, so don't error loudly
      console.debug(`No content translations found for ${lang}`);
    }

    return null;
  }

  /**
   * Set the current language
   */
  async function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }

    localStorage.setItem(STORAGE_KEY, lang);

    // Load translations if not cached
    await loadTranslations(lang);
    await loadContentTranslations(lang);

    // Apply translations
    applyTranslations(lang);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  /**
   * Toggle between languages
   */
  function toggleLanguage() {
    const currentLang = document.documentElement.dataset.lang || DEFAULT_LANG;
    const newLang = currentLang === "en" ? "it" : "en";
    setLanguage(newLang);
  }

  /**
   * Get current language
   */
  function getLanguage() {
    return document.documentElement.dataset.lang || DEFAULT_LANG;
  }

  /**
   * Initialize the i18n module
   */
  async function init() {
    const lang = detectLanguage();

    // Build DOM elements cache once at init
    buildElementsCache();

    // Load translations for detected language
    await loadTranslations(lang);

    // Preload alternate language for instant switching
    const altLang = lang === "en" ? "it" : "en";
    loadTranslations(altLang); // Don't await, load in background

    // Load content translations
    await loadContentTranslations(lang);

    // Apply translations
    applyTranslations(lang);

    // Set up language toggle buttons using event delegation on body
    document.body.addEventListener("click", (e) => {
      if (e.target.closest(".lang-toggle")) {
        toggleLanguage();
      }
    });
  }

  // Run on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose API globally
  window.i18n = {
    setLanguage,
    toggleLanguage,
    getLanguage,
    loadTranslations,
    applyTranslations,
    refreshCache: buildElementsCache, // Call after dynamically adding i18n elements
  };
})();
