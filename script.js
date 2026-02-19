const preloader = document.getElementById("preloader");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");
const startTime = performance.now();

const STORAGE_THEME_KEY = "mw-theme";
const STORAGE_LANG_KEY = "mw-lang";

const translations = {
  th: {
    navHome: "หน้าหลัก",
    navAbout: "เกี่ยวกับ",
    navProjects: "โปรเจค",
    navProducts: "สินค้า",
    navContact: "ติดต่อ",
    heroTitle: "สวัสดี, ผม Malakor",
    heroSubtitle: "Freelance Developer, Game Developer",
    heroPrimaryCta: "ดูโปรเจค",
    heroSecondaryCta: "ติดต่อ",
    aboutTitle: "เกี่ยวกับ",
    aboutIntro: "ยินดีที่ได้รู้จักคับ ! สวัสดีคับผมชื่อ 'เมฆ' และชื่อ ' Malakor ' เป็นแค่นามแฝงเฉยๆคับ ผมเป็น Freelance Developer และ Game Developer มือใหม่ โดยที่ผมไม่เคยมีประสบการณ์เขียนโค้ดมาก่อนและพึ่งเรื่มฝึกเมื่อปีที่แล้วเองคับ ยังไงก็ฝากตัวด้วยค้าบ",
    aboutIdentityTitle: "ตัวตน",
    aboutIdentityBody: "คนที่ชอบสร้างโลกใหม่ ไม่ว่าจะผ่านเกม เว็บไซต์ หรือคอนเทนต์ต่างๆ",
    aboutSkillsTitle: "ทักษะ",
    aboutSkillsBody: "Frontend, UI Design, Minecraft Map, Community Management และอื่นๆ",
    aboutGoalTitle: "เป้าหมาย",
    aboutGoalBody: "ใครที่กําลังฝึกเขียนโค้ดอยู่สู้ๆน้าาา หรือมีอะไรสามารถปรึกษาผมได้เรยยย",
    projectsTitle: "โปรเจค",
    projectsIntro: "โปรเจคที่ผมเคยทํา",
    project1Title: "Startify",
    project1Body: "แอปฟังเพลงที่ไม่มีโฆษณา และมีการ Sync เพลงกับ Youtube และมีระบบ Classic เช่น Shuffle, Repeat , Playlist",
    project2Title: "Malakor Tool",
    project2Body: "แอปที่สามารถบูส FPS ได้ และตัวแอปมีขนาดไฟล์น้อยมากๆเหมาะกับผู้เล่นที่มีทรัพยากรไม่มาก",
    project3Title: "Malakor ID",
    project3Body: "ระบบ Account Platform ที่ใช้สําหรับการ Login ทุกอย่างของแอปที่ Malakor สร้าง",
    productsTitle: "สินค้า",
    productsIntro: "สินค้าที่จําหน่าย",
    product1Title: "Coming Soon",
    product1Body: "Coming Soon",
    product2Title: "Coming Soon",
    product2Body: "Coming Soon",
    product3Title: "Coming Soon",
    product3Body: "Coming Soon",
    comingSoon: "Coming Soon",
    thinking: "Coming Soon",
    contactTitle: "ติดต่อ",
    contactIntro: "ถ้าสนใจร่วมงาน หรืออยากพูดคุย สามารถส่งข้อความหาฉันได้ที่นี่",
    contactNameLabel: "ชื่อ",
    contactNamePlaceholder: "ชื่อของคุณ",
    contactEmailLabel: "อีเมล",
    contactEmailPlaceholder: "you@example.com",
    contactMessageLabel: "ข้อความ",
    contactMessagePlaceholder: "อยากบอกอะไรกับฉัน",
    contactSubmit: "ส่งข้อความ (ตัวอย่าง)",
    contactOtherTitle: "ช่องทางอื่น",
    contactDiscord: "Discord: your-server-link",
    contactInstagram: "Instagram: @your_instagram",
    contactFacebook: "Facebook Page: Malakor World",
    contactNote: "ฟอร์มด้านซ้ายเป็นตัวอย่าง UI คุณสามารถเชื่อมต่อกับ Backend จริงหรือใช้บริการ Form ได้ภายหลัง",
    footerCopy: "© " + new Date().getFullYear().toString() + " Malakor World",
    footerTagline: "..",
    preloaderText: "กำลังโหลด....",
    themeLight: "โหมดสว่าง",
    themeDark: "โหมดมืด",
    formAlert: "ฟอร์มนี้เป็นตัวอย่าง UI เท่านั้น คุณสามารถเชื่อมต่อกับระบบจริงได้ภายหลัง",
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navProducts: "Products",
    navContact: "Contact",
    heroTitle: "Hi, I'm Malakor",
    heroSubtitle: "Freelance Developer, Game Developer",
    heroPrimaryCta: "View projects",
    heroSecondaryCta: "Contact",
    aboutTitle: "About",
    aboutIntro:
      "Nice to meet you! My name is Mek, and “Malakor” is just my online nickname. I'm a beginner Freelance Developer and Game Developer who only started learning to code last year, with no background before that. Please take care of me!",
    aboutIdentityTitle: "Who I am",
    aboutIdentityBody: "Someone who loves creating new worlds through games, websites, and all kinds of content.",
    aboutSkillsTitle: "Skills",
    aboutSkillsBody: "Frontend, UI design, Minecraft maps, community management, and more.",
    aboutGoalTitle: "Goal",
    aboutGoalBody:
      "If you're learning to code, keep going! And if you ever need help, feel free to reach out to me.",
    projectsTitle: "Projects",
    projectsIntro: "Projects I have built.",
    project1Title: "Startify",
    project1Body:
      "A music app with no ads that can sync songs with YouTube, and includes classic features like shuffle, repeat, and playlists.",
    project2Title: "Malakor Tool",
    project2Body:
      "An app that can boost FPS while staying very lightweight, perfect for players on low-end or limited-resource devices.",
    project3Title: "Malakor ID",
    project3Body:
      "An account platform used to log in to everything across the apps created by Malakor.",
    productsTitle: "Products",
    productsIntro: "Products available for sale.",
    product1Title: "Coming Soon",
    product1Body: "Coming Soon",
    product2Title: "Coming Soon",
    product2Body: "Coming Soon",
    product3Title: "Coming Soon",
    product3Body: "Coming Soon",
    comingSoon: "Coming Soon",
    thinking: "Coming Soon",
    contactTitle: "Contact",
    contactIntro: "If you want to work together or just chat, send me a message here.",
    contactNameLabel: "Name",
    contactNamePlaceholder: "Your name",
    contactEmailLabel: "Email",
    contactEmailPlaceholder: "you@example.com",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "What would you like to tell me?",
    contactSubmit: "Send message (demo)",
    contactOtherTitle: "Other channels",
    contactDiscord: "Discord: your-server-link",
    contactInstagram: "Instagram: @your_instagram",
    contactFacebook: "Facebook Page: Malakor World",
    contactNote: "The form on the left is demo UI. You can connect it to a real backend or form service later.",
    footerCopy: "© " + new Date().getFullYear().toString() + " Malakor World",
    footerTagline: "Made with love for fantasy worlds",
    preloaderText: "Preparing your cute world...",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    formAlert: "This form is only demo UI. You can hook it up to a real system later.",
  },
};

let currentLang = "th";
let currentTheme = "light";

const sectionTitleMap = {
  home: ".hero-title",
  about: "#about .section-title",
  projects: "#projects .section-title",
  products: "#products .section-title",
};

function setActiveSectionTitle(id) {
  const all = document.querySelectorAll(".section-title, .hero-title");
  all.forEach((el) => {
    el.classList.remove("section-title-active");
  });
  const selector = sectionTitleMap[id];
  if (!selector) return;
  const el = document.querySelector(selector);
  if (el) {
    el.classList.add("section-title-active");
  }

  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => link.classList.remove("nav-active"));
  const activeNav = document.querySelector(`.main-nav a[href="#${id}"]`);
  if (activeNav) {
    activeNav.classList.add("nav-active");
  }
}

function getCurrentSectionId() {
  const ids = Object.keys(sectionTitleMap);
  const viewportCenter = window.innerHeight / 2;
  let bestId = "home";
  let bestDistance = Infinity;

  ids.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestId = id;
    }
  });

  return bestId;
}

function initSectionTracking() {
  const update = () => {
    const id = getCurrentSectionId();
    setActiveSectionTitle(id);
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = dict[key];
    if (text) {
      el.textContent = text;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const text = dict[key];
    if (text) {
      el.setAttribute("placeholder", text);
    }
  });

  const preloaderText = document.querySelector(".preloader-text");
  if (preloaderText && dict.preloaderText) {
    preloaderText.textContent = dict.preloaderText;
  }

  const footerCopyEl = document.querySelector('[data-i18n="footerCopy"]');
  if (footerCopyEl && dict.footerCopy) {
    footerCopyEl.textContent = dict.footerCopy;
  }

  updateThemeToggleLabel();
  updateLangToggleState();

  localStorage.setItem(STORAGE_LANG_KEY, lang);
}

function setTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
  if (document.body) {
    document.body.dataset.theme = currentTheme;
  }
  localStorage.setItem(STORAGE_THEME_KEY, currentTheme);
  updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
  const labelEl = document.querySelector("[data-i18n-theme-label]");
  const dict = translations[currentLang];
  if (!labelEl || !dict) return;
  const key = currentTheme === "dark" ? "themeDark" : "themeLight";
  labelEl.textContent = dict[key];
}

function updateLangToggleState() {
  if (!langToggle) return;
  if (currentLang === "en") {
    langToggle.classList.add("lang-en");
  } else {
    langToggle.classList.remove("lang-en");
  }
}

function initPreferences() {
  const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
  const savedLang = localStorage.getItem(STORAGE_LANG_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme);
  } else {
    setTheme("light");
  }

  if (savedLang === "en" || savedLang === "th") {
    applyLanguage(savedLang);
  } else {
    applyLanguage("th");
  }
  initSectionTracking();
}

window.addEventListener("load", () => {
  const elapsed = performance.now() - startTime;
  const minimumVisible = 1200;
  const delay = Math.max(0, minimumVisible - elapsed);

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("preloader-hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 260);
    }
  }, delay);

  initPreferences();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const rect = target.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - headerHeight + 1;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });

    if (header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
    }
  });
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const next = currentLang === "th" ? "en" : "th";
    applyLanguage(next);
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = currentTheme === "light" ? "dark" : "light";
    setTheme(next);
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const dict = translations[currentLang];
    const message = dict ? dict.formAlert : "";
    if (message) {
      alert(message);
    }
  });
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
