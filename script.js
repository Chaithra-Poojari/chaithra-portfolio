const pageType = document.body.dataset.page || "portfolio";
const CONTACT_EMAIL = "chaithrapoojari1234@gmail.com";
const EXCLUSIVE_UNLOCKED_KEY = "cpw-exclusive-projects-unlocked";
const EXCLUSIVE_PASSWORD_SESSION_KEY = "cpw-exclusive-project-password";
const themeButtons = document.querySelectorAll("[data-theme-target]");
const revealItems = document.querySelectorAll(".reveal");
const savedTheme = localStorage.getItem("portfolio-theme");
const contactForm = document.querySelector(".contact-form");
const adminEntry = document.querySelector("[data-admin-entry]");
const adminLogo = document.querySelector("[data-admin-logo]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const heroRoot = document.querySelector("[data-parallax-root]");
const navSectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const brandName = document.querySelector("[data-brand-name]");
const brandCaption = document.querySelector(".brand-caption");
const faviconLink = document.getElementById("dynamic-favicon");
const sceneSections = document.querySelectorAll("main section[id]");
const exclusiveSeparator = document.getElementById("exclusive-separator");
const exclusiveProjectsShell = document.getElementById("exclusive-projects-shell");
const exclusiveProjectsGrid = document.getElementById("exclusive-projects-grid");
const exclusiveSectionTrigger = document.getElementById("exclusive-section-trigger");
const exclusiveModal = document.getElementById("exclusive-modal");
const exclusiveUnlockForm = document.getElementById("exclusive-unlock-form");
const exclusivePasswordInput = document.getElementById("exclusive-password-input");
const exclusiveUnlockStatus = document.getElementById("exclusive-unlock-status");
const exclusiveModalHint = document.getElementById("exclusive-modal-hint");
const cvModal = document.getElementById("cv-modal");
const cvAccessForm = document.getElementById("cv-access-form");
const cvEmailInput = document.getElementById("cv-email-input");
const cvCompanyEmailInput = document.getElementById("cv-company-email-input");
const cvAccessStatus = document.getElementById("cv-access-status");
const cvSkipButton = document.getElementById("cv-skip-button");
let footerClickTimer = null;
let exclusiveUnlockTarget = "";
let unlockedExclusiveProjects = [];

const buildDefaultBrandMark = (gradientId) => `
  <svg class="brand-mark-svg" viewBox="0 0 64 64" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="${gradientId}" x1="10%" y1="10%" x2="90%" y2="90%">
        <stop offset="0%" stop-color="#7A5CFF"></stop>
        <stop offset="100%" stop-color="#5A8BFF"></stop>
      </linearGradient>
    </defs>
    <path class="brand-grid" d="M12 12H52M12 24H52M12 36H52M12 48H52M12 12V52M24 12V52M36 12V52M48 12V52"></path>
    <rect class="brand-frame" x="18" y="16" width="24" height="30" rx="4"></rect>
    <path class="brand-frame" d="M22 22H38"></path>
    <path class="brand-frame" d="M22 28H33"></path>
    <path class="brand-accent" d="M39 34L47 26"></path>
    <path class="brand-accent" d="M41 24H49V32"></path>
    <circle class="brand-accent-dot" cx="24" cy="38" r="2.5"></circle>
  </svg>
`;

if (savedTheme) {
  document.body.dataset.theme = savedTheme;
}

const syncThemeButtons = () => {
  const currentTheme = document.body.dataset.theme;
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeTarget === currentTheme;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute(
      "aria-label",
      isActive ? `${button.dataset.themeTarget} theme active` : `Switch to ${button.dataset.themeTarget} theme`
    );
  });
};

const updateFavicon = () => {
  if (!faviconLink) {
    return;
  }

  const data = window.getPortfolioData?.();
  const customFavicon = data?.profile?.brand?.faviconImage;
  if (customFavicon) {
    faviconLink.href = customFavicon;
    return;
  }

  const theme = document.body.dataset.theme;
  const faviconMap = {
    light: {
      text: "#16181f",
      grid: "rgba(22,24,31,0.16)",
      accent: ["#7A5CFF", "#5A8BFF"]
    },
    dark: {
      text: "#ffffff",
      grid: "rgba(255,255,255,0.14)",
      accent: ["#7A5CFF", "#5A8BFF"]
    },
    "midnight-orchid": {
      text: "#3a2f56",
      grid: "rgba(58,47,86,0.14)",
      accent: ["#d37ac5", "#8a79ff"]
    }
  };

  const selected = faviconMap[theme] || faviconMap["midnight-orchid"];
  const defs = `<defs><linearGradient id="g" x1="10%" y1="10%" x2="90%" y2="90%"><stop offset="0%" stop-color="${selected.accent[0]}"/><stop offset="100%" stop-color="${selected.accent[1]}"/></linearGradient></defs>`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${defs}
      <path d="M12 12H52M12 24H52M12 36H52M12 48H52M12 12V52M24 12V52M36 12V52M48 12V52" stroke="${selected.grid}" stroke-width="1" fill="none" stroke-linecap="round"/>
      <rect x="18" y="16" width="24" height="30" rx="4" stroke="${selected.text}" stroke-width="2.2" fill="none"/>
      <path d="M22 22H38" stroke="${selected.text}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M22 28H33" stroke="${selected.text}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M39 34L47 26" stroke="url(#g)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M41 24H49V32" stroke="url(#g)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="38" r="2.5" fill="url(#g)"/>
    </svg>
  `.trim();

  faviconLink.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const applyBrandSettings = (profile) => {
  const brandSettings = {
    displayName: profile.brand?.displayName || profile.name,
    caption: profile.brand?.caption || profile.role,
    iconImage: profile.brand?.iconImage || "",
    faviconImage: profile.brand?.faviconImage || "",
    accentStart: profile.brand?.accentStart || "#7A5CFF",
    accentEnd: profile.brand?.accentEnd || "#5A8BFF",
    accentDot: profile.brand?.accentDot || "#7b72ed"
  };
  const brandMark = document.querySelector(".brand-mark");
  const gradientId =
    pageType === "case-study"
      ? "brand-accent-case"
      : pageType === "blog-post"
        ? "brand-accent-blog"
        : "brand-accent-main";

  if (brandName) {
    brandName.textContent = brandSettings.displayName;
  }

  if (brandCaption) {
    brandCaption.textContent = brandSettings.caption;
  }

  if (brandMark) {
    brandMark.innerHTML = brandSettings.iconImage
      ? `<img class="brand-mark-image" src="${brandSettings.iconImage}" alt="" />`
      : buildDefaultBrandMark(gradientId);
  }

  document
    .querySelectorAll(".brand-mark-svg linearGradient stop:first-child")
    .forEach((stop) => stop.setAttribute("stop-color", brandSettings.accentStart));
  document
    .querySelectorAll(".brand-mark-svg linearGradient stop:last-child")
    .forEach((stop) => stop.setAttribute("stop-color", brandSettings.accentEnd));
  document
    .querySelectorAll(".brand-mark-svg .brand-accent-dot")
    .forEach((dot) => dot.setAttribute("fill", brandSettings.accentDot));
};

const setRobotsNoIndex = (enabled) => {
  let meta = document.querySelector('meta[name="robots"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "robots";
    document.head.append(meta);
  }

  meta.content = enabled ? "noindex, nofollow, noarchive" : "index, follow";
};

const getExclusivePasswordFromSession = () =>
  sessionStorage.getItem(EXCLUSIVE_PASSWORD_SESSION_KEY) || "";

const setExclusiveSession = (password) => {
  sessionStorage.setItem(EXCLUSIVE_UNLOCKED_KEY, "true");
  sessionStorage.setItem(EXCLUSIVE_PASSWORD_SESSION_KEY, password);
};

const clearExclusiveSession = () => {
  sessionStorage.removeItem(EXCLUSIVE_UNLOCKED_KEY);
  sessionStorage.removeItem(EXCLUSIVE_PASSWORD_SESSION_KEY);
};

const isExclusiveUnlocked = () =>
  sessionStorage.getItem(EXCLUSIVE_UNLOCKED_KEY) === "true";

const buildPublicProjectCardMarkup = (project, className = "") => `
  <a class="${`project-card reveal ${className}`.trim()}" href="/projects/case-study.html?id=${project.id}">
    <img src="${project.thumbnail}" alt="${project.title} thumbnail" class="project-thumb" />
    <div class="project-body">
      <div class="project-topline">
        <h3>${project.title}</h3>
        <span>${project.category}</span>
      </div>
      <p>${project.description}</p>
      <div class="tag-row">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>
  </a>
`;

const buildExclusivePreviewCardMarkup = (project, index, total) => `
  <article class="project-card exclusive-project-card exclusive-project-card-locked reveal" data-exclusive-preview="${project.id}">
    <div class="exclusive-project-card-inner">
      <div class="exclusive-project-card-copy">
        <div class="exclusive-project-topline">
          <span class="exclusive-project-badge">
            <span class="exclusive-project-badge-icon" aria-hidden="true"></span>
            Exclusive
          </span>
        </div>
        <div class="project-topline">
          <h3>${project.title}</h3>
          <span>${project.category}</span>
        </div>
        <p>${index === 0 ? `${total} protected case studies available after unlock.` : project.summary}</p>
      </div>
    </div>
  </article>
`;

const buildExclusiveUnlockedCardMarkup = (project) => `
  <a class="project-card reveal exclusive-project-card exclusive-project-card-unlocked" href="/projects/case-study.html?id=${project.id}">
    <div class="exclusive-project-card-inner">
      <div class="exclusive-project-card-copy">
        <div class="exclusive-project-topline">
          <span class="exclusive-project-badge">
            <span class="exclusive-project-badge-icon" aria-hidden="true"></span>
            Exclusive
          </span>
        </div>
        <div class="project-topline">
          <h3>${project.title}</h3>
          <span>${project.category}</span>
        </div>
        <p>${project.description}</p>
        <div class="tag-row">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  </a>
`;

const decryptExclusiveProjects = async (exclusiveProjects, password) => {
  const settledProjects = await Promise.allSettled(
    exclusiveProjects.map(async (project) => {
      const decryptedProject = await window.decryptExclusiveProject(
        project.encryptedPayload,
        password
      );

      return {
        ...decryptedProject,
        id: project.id,
        title: decryptedProject.title || project.title,
        category: decryptedProject.category || project.category,
        description: decryptedProject.description || project.summary,
        thumbnail: decryptedProject.thumbnail || project.thumbnail,
        coverImage: decryptedProject.coverImage || project.coverImage
      };
    })
  );

  return settledProjects
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
};

const unlockExclusiveProjects = async (password, data) => {
  const isValid = await window.verifyExclusivePassword(
    password,
    data.settings?.exclusiveAccess || {}
  );

  if (!isValid) {
    throw new Error("Incorrect password. Please try again.");
  }

  const decryptedProjects = await decryptExclusiveProjects(data.exclusiveProjects || [], password);
  if (!decryptedProjects.length && (data.exclusiveProjects || []).length) {
    throw new Error("Exclusive projects could not be opened. Please refresh and try again.");
  }
  unlockedExclusiveProjects = decryptedProjects;
  setExclusiveSession(password);
  return decryptedProjects;
};

const openExclusiveModal = (projectId = "") => {
  if (!exclusiveModal) {
    return;
  }

  exclusiveUnlockTarget = projectId;
  exclusiveUnlockStatus.textContent = "";
  exclusivePasswordInput.value = "";
  exclusiveModal.hidden = false;
  document.body.classList.add("modal-open");
  exclusivePasswordInput.focus();
};

const closeExclusiveModal = () => {
  if (!exclusiveModal) {
    return;
  }

  exclusiveModal.hidden = true;
  document.body.classList.remove("modal-open");
  exclusiveUnlockTarget = "";
};

const openCvModal = () => {
  if (!cvModal) {
    return;
  }

  cvAccessStatus.textContent = "";
  cvEmailInput.value = "";
  cvCompanyEmailInput.value = "";
  cvModal.hidden = false;
  document.body.classList.add("modal-open");
  cvEmailInput.focus();
};

const closeCvModal = () => {
  if (!cvModal) {
    return;
  }

  cvModal.hidden = true;
  document.body.classList.remove("modal-open");
};

const isPdfLikeDataUrl = (value, fileName = "") => {
  const dataUrl = String(value || "");
  const normalizedName = String(fileName || "").toLowerCase();
  return (
    /^data:application\/pdf;base64,/i.test(dataUrl) ||
    /^data:application\/x-pdf;base64,/i.test(dataUrl) ||
    (/^data:application\/octet-stream;base64,/i.test(dataUrl) && normalizedName.endsWith(".pdf"))
  );
};

const dataUrlToBlob = (dataUrl) => {
  const matches = String(dataUrl || "").match(/^data:([^;]+);base64,(.*)$/i);
  if (!matches) {
    throw new Error("Invalid PDF file data.");
  }

  const mimeType = matches[1];
  const binary = atob(matches[2]);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new Blob([bytes], { type: mimeType });
};

const resolveCvSource = async (profile) => {
  const assetKey = String(profile.cvAssetKey || "").trim();
  if (assetKey && typeof window.getCvAsset === "function") {
    try {
      const storedAsset = await window.getCvAsset(assetKey);
      if (storedAsset?.dataUrl) {
        return {
          dataUrl: storedAsset.dataUrl,
          fileName: storedAsset.fileName || profile.cvFileName || "Chaithra-Poojary CV.pdf"
        };
      }
    } catch {
      // Fall through to legacy localStorage-backed CV data when IndexedDB is unavailable.
    }
  }

  return {
    dataUrl: profile.cvFile || "",
    fileName: profile.cvFileName || "Chaithra-Poojary CV.pdf"
  };
};

const downloadCvFile = async (profile) => {
  const cvSource = await resolveCvSource(profile);
  const fileBlob = dataUrlToBlob(cvSource.dataUrl);
  const objectUrl = URL.createObjectURL(fileBlob);
  const tempLink = document.createElement("a");
  tempLink.href = objectUrl;
  tempLink.download = cvSource.fileName || "Chaithra-Poojary CV.pdf";
  document.body.append(tempLink);
  tempLink.click();
  tempLink.remove();
  URL.revokeObjectURL(objectUrl);
};

const isValidWorkEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isGenericEmailDomain = (value) => {
  const domain = String(value || "").split("@")[1]?.toLowerCase() || "";
  return [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "proton.me",
    "protonmail.com"
  ].includes(domain);
};

const normalizeCompanyToken = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getDomainCompanyHint = (email) => {
  const domain = String(email || "").split("@")[1]?.toLowerCase() || "";
  const withoutTld = domain.split(".").slice(0, -1).join(" ") || domain;
  return normalizeCompanyToken(
    withoutTld.replace(
      /\b(mail|email|careers|jobs|hr|people|talent|team|global|group|app|hq|inc|co|corp|company|studio|design|labs|tech)\b/g,
      " "
    )
  );
};

const doesCompanyNameMatchEmail = (email, companyName) => {
  const company = normalizeCompanyToken(companyName);
  const domainHint = getDomainCompanyHint(email);

  if (!company || !domainHint) {
    return false;
  }

  const companyWords = company.split(" ").filter(Boolean);
  const domainWords = domainHint.split(" ").filter(Boolean);

  return companyWords.some((word) => word.length > 2 && domainWords.includes(word));
};

const recordCvDownloadLead = (email, companyName) => {
  const portfolioData = window.getPortfolioData?.();
  if (!portfolioData) {
    return;
  }

  const nextEntry = {
    email,
    companyName,
    requestedAt: new Date().toISOString()
  };

  const existingEntries = Array.isArray(portfolioData.cvDownloads) ? portfolioData.cvDownloads : [];
  portfolioData.cvDownloads = [nextEntry, ...existingEntries].slice(0, 100);
  window.savePortfolioData?.(portfolioData);
};

const navigateWithTransition = (href) => {
  if (!href) {
    return;
  }

  document.body.classList.add("page-exit");
  window.setTimeout(() => {
    window.location.href = href;
  }, 220);
};

const openAdminStudio = () => {
  window.open("/studio/", "_blank", "noopener");
};

const setMenuState = (isOpen) => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.hidden = !isOpen;
  mobileMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

const shouldInterceptLink = (link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) {
    return false;
  }

  if (link.target === "_blank" || link.hasAttribute("download")) {
    return false;
  }

  return href.startsWith("/") || href.endsWith(".html") || href.includes(".html?");
};

const renderFocusAreas = (items) => {
  const focusList = document.getElementById("hero-focus-list");
  if (!focusList) {
    return;
  }

  focusList.innerHTML = items
    .map(
      (item) => `
        <div>
          <strong>${item.title}</strong>
          ${item.description && item.description !== "Editable focus area from studio." ? `<span>${item.description}</span>` : ""}
        </div>
      `
    )
    .join("");
};

const empathyIcons = {
  says: "💬",
  thinks: "🧠",
  does: "🛠️",
  feels: "💗",
  pains: "⚠️",
  gains: "✨"
};

const getCasePersonas = (caseStudy) => {
  const personas = Array.isArray(caseStudy.personas) ? caseStudy.personas.filter(Boolean) : [];
  if (personas.length) {
    return personas;
  }

  if (caseStudy.persona && (caseStudy.persona.name || caseStudy.persona.summary)) {
    return [caseStudy.persona];
  }

  return [];
};

const renderSkills = (skills) => {
  const skillsGrid = document.getElementById("skills-grid");
  if (!skillsGrid) {
    return;
  }

  skillsGrid.innerHTML = skills
    .map(
      (skill) => `
        <article class="skill-card glass-card reveal">
          <h3>${skill.group}</h3>
          <p>${skill.items.join(", ")}</p>
        </article>
      `
    )
    .join("");
};

const renderProjects = (projects) => {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = projects.map((project) => buildPublicProjectCardMarkup(project)).join("");
};

const renderExclusiveProjects = async (data) => {
  if (!exclusiveSeparator || !exclusiveProjectsShell || !exclusiveProjectsGrid) {
    return;
  }

  const exclusiveProjects = data.exclusiveProjects || [];
  const hasExclusiveProjects = exclusiveProjects.length > 0;
  exclusiveSeparator.hidden = !hasExclusiveProjects;
  exclusiveProjectsShell.hidden = !hasExclusiveProjects;

  if (!hasExclusiveProjects) {
    exclusiveProjectsGrid.innerHTML = "";
    unlockedExclusiveProjects = [];
    return;
  }

  const hint = data.settings?.exclusiveAccess?.hint || "Enter password from my CV.";
  if (exclusiveSectionTrigger) {
    exclusiveSectionTrigger.textContent = hint;
  }
  if (exclusiveModalHint) {
    exclusiveModalHint.textContent = hint;
  }

  // Password unlock flow:
  // 1. The public page renders only preview metadata for exclusive projects.
  // 2. Full case-study data stays encrypted until the recruiter enters the correct password.
  // 3. A successful unlock stores the password only in sessionStorage for the current tab/session.
  const sessionPassword = getExclusivePasswordFromSession();
  if (isExclusiveUnlocked() && sessionPassword) {
    try {
      unlockedExclusiveProjects = await decryptExclusiveProjects(exclusiveProjects, sessionPassword);
    } catch {
      clearExclusiveSession();
      unlockedExclusiveProjects = [];
    }
  } else {
    unlockedExclusiveProjects = [];
  }

  if (unlockedExclusiveProjects.length) {
    exclusiveProjectsGrid.innerHTML = unlockedExclusiveProjects
      .map((project) => buildExclusiveUnlockedCardMarkup(project))
      .join("");
    exclusiveProjectsShell.classList.add("is-unlocked");
  } else {
    exclusiveProjectsGrid.innerHTML = exclusiveProjects
      .map((project, index) =>
        buildExclusivePreviewCardMarkup(project, index, exclusiveProjects.length)
      )
      .join("");
    exclusiveProjectsShell.classList.remove("is-unlocked");
  }
};

const renderExperience = (experience) => {
  const experienceList = document.getElementById("experience-list");
  if (!experienceList) {
    return;
  }

  const count = experience.length;
  const viewWidth = 1000;
  const viewHeight = Math.max(900, count * 270 + 200);
  const startX = 340;
  const endX = 660;
  const points = experience.map((_, index) => ({
    x: index % 2 === 0 ? startX : endX,
    y: 120 + index * 250
  }));

  const pathData = points.reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const sway = index % 2 === 0 ? -120 : 120;
    const controlOneX = previous.x + sway;
    const controlOneY = previous.y + 90;
    const controlTwoX = point.x - sway;
    const controlTwoY = point.y - 90;
    return `${acc} C ${controlOneX} ${controlOneY}, ${controlTwoX} ${controlTwoY}, ${point.x} ${point.y}`;
  }, "");

  const journeyIcons = [
    `
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect x="8" y="9" width="24" height="22" rx="6"></rect>
        <path d="M14 16H26"></path>
        <path d="M14 22H22"></path>
        <circle cx="26" cy="24.5" r="2.4"></circle>
      </svg>
    `,
    `
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M11 11H29V29H11Z"></path>
        <path d="M15 15H25"></path>
        <path d="M15 20H23"></path>
        <path d="M24 25L29 20"></path>
      </svg>
    `,
    `
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="13" cy="14" r="3.5"></circle>
        <circle cx="27" cy="14" r="3.5"></circle>
        <circle cx="20" cy="26" r="3.5"></circle>
        <path d="M16 15.5L24 15.5"></path>
        <path d="M15.8 17.3L18.2 22.7"></path>
        <path d="M24.2 17.3L21.8 22.7"></path>
      </svg>
    `,
    `
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M14 10V30"></path>
        <path d="M20 14V30"></path>
        <path d="M26 18V30"></path>
        <path d="M11 30H29"></path>
        <circle cx="14" cy="10" r="2.5"></circle>
      </svg>
    `
  ];

  experienceList.innerHTML = `
    <div class="journey-path" aria-hidden="true">
      <svg viewBox="0 0 ${viewWidth} ${viewHeight}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="journey-gradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.35)"></stop>
            <stop offset="55%" stop-color="var(--accent)"></stop>
            <stop offset="100%" stop-color="rgba(90,139,255,0.55)"></stop>
          </linearGradient>
        </defs>
        <path
          class="journey-track"
          d="${pathData}"
        ></path>
        <path
          class="journey-active"
          id="journey-active-path"
          d="${pathData}"
        ></path>
      </svg>
    </div>
    <div class="journey-character" id="journey-character" aria-hidden="true">
      <svg viewBox="0 0 96 146" class="journey-character-svg">
        <defs>
          <linearGradient id="dressGradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stop-color="#f09fd4"></stop>
            <stop offset="100%" stop-color="#8e79ff"></stop>
          </linearGradient>
          <linearGradient id="skinShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffd7c7"></stop>
            <stop offset="100%" stop-color="#efbfa7"></stop>
          </linearGradient>
        </defs>
        <ellipse cx="49" cy="136" rx="16" ry="5" fill="rgba(0,0,0,0.08)"></ellipse>
        <path d="M32 28C33 17 42 9 53 9C65 9 74 17 75 30C76 43 69 51 61 55C54 58 46 58 39 55C32 52 31 40 32 28Z" fill="#2f2637"></path>
        <path d="M28 25C25 30 24 35 24 41C24 48 27 53 31 56" fill="none" stroke="#2f2637" stroke-width="5" stroke-linecap="round"/>
        <path d="M78 25C81 30 82 35 82 41C82 48 79 53 75 56" fill="none" stroke="#2f2637" stroke-width="5" stroke-linecap="round"/>
        <path d="M24 33C19 36 17 43 20 49C23 55 29 56 33 52" fill="none" stroke="#2f2637" stroke-width="4.4" stroke-linecap="round"/>
        <path d="M80 33C85 36 87 43 84 49C81 55 75 56 71 52" fill="none" stroke="#2f2637" stroke-width="4.4" stroke-linecap="round"/>
        <ellipse cx="53" cy="43" rx="15.5" ry="17.5" fill="url(#skinShade)"></ellipse>
        <path d="M37.8 37C39 27 46 21 55 21C64 21 70.5 27.2 70.8 36.6C66.8 33.8 62.1 32.4 57 32.4C49.1 32.4 42.5 35.1 37.8 37Z" fill="#2f2637"></path>
        <circle cx="47.5" cy="44" r="1.8" fill="#34272d"></circle>
        <circle cx="58.7" cy="44" r="1.8" fill="#34272d"></circle>
        <path d="M49 52C52.5 55 56.2 55 59.4 52" fill="none" stroke="#b07676" stroke-width="1.8" stroke-linecap="round"></path>
        <path d="M43 60C45.4 69 49 75 54 77C58.6 74.8 62.3 69 64.8 60" fill="none" stroke="#ffffff" stroke-opacity="0.36" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="M44 60L38 87L53 100L68 87L62 60" fill="url(#dressGradient)"></path>
        <path d="M44 60L38 87L53 100L68 87L62 60" fill="none" stroke="#473356" stroke-width="2.6" stroke-linejoin="round"></path>
        <path d="M46 63L53 70L60 63" fill="none" stroke="#ffffff" stroke-opacity="0.52" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M44 62C40 72 37 82 37 92" fill="none" stroke="#efc6b2" stroke-width="3.2" stroke-linecap="round"></path>
        <path d="M62 62C67 72 70 82 70 92" fill="none" stroke="#efc6b2" stroke-width="3.2" stroke-linecap="round"></path>
        <path d="M49 100C47 109 45.5 117 45 128" fill="none" stroke="#473356" stroke-width="3.2" stroke-linecap="round"></path>
        <path d="M57 100C59 109 60.5 117 61 128" fill="none" stroke="#473356" stroke-width="3.2" stroke-linecap="round"></path>
      </svg>
    </div>
    <div class="journey-nodes" data-journey-height="${viewHeight}" style="min-height: ${viewHeight}px;">
      ${experience
        .map((item, index) => {
          const point = points[index];
          const side = index % 2 === 0 ? "left" : "right";
          const iconMarkup = journeyIcons[index % journeyIcons.length];
          return `
            <article
              class="journey-node journey-node-${side}"
              data-node-index="${item.id}"
              style="--node-x:${((point.x / viewWidth) * 100).toFixed(2)}%; --node-y:${((point.y / viewHeight) * 100).toFixed(2)}%;"
            >
              <div class="journey-node-card">
                <div class="journey-node-header">
                  <span class="journey-company-logo" aria-hidden="true">${iconMarkup}</span>
                  <div>
                    <h3>${item.role}</h3>
                    <p class="journey-node-meta">${item.company}</p>
                  </div>
                </div>
                <p class="journey-node-duration">${item.duration}</p>
                <p class="journey-node-description">${item.highlights[0]}</p>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
};

const renderBlogs = (blogs) => {
  const blogList = document.getElementById("blog-list");
  if (!blogList) {
    return;
  }

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  blogList.innerHTML = sortedBlogs
    .map(
      (blog, index) => `
        <a class="blog-card glass-card reveal ${index === 0 ? "blog-card-featured" : ""}" href="/blogs/post.html?id=${blog.id}">
          <div class="blog-card-top">
            <span class="blog-card-kicker">${index === 0 ? "Latest Post" : "Journal"}</span>
            <time datetime="${blog.date}">${window.formatPortfolioDate(blog.date)}</time>
          </div>
          <div class="blog-card-body">
            <h3>${blog.title}</h3>
            <p>${blog.preview}</p>
          </div>
          <div class="blog-card-bottom">
            <div class="blog-tags">
              ${(blog.tags || []).map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <span class="blog-card-link">Read article</span>
          </div>
        </a>
      `
    )
    .join("");
};

const renderSocials = (socials) => {
  const socialLinks = document.getElementById("social-links");
  const markup = socials
    .map(
      (social) => `
        <a href="${social.url}" target="_blank" rel="noreferrer">${social.label}</a>
      `
    )
    .join("");

  if (!socialLinks) {
    return;
  }

  socialLinks.innerHTML = markup;
};

const renderPortfolioPage = async () => {
  if (pageType !== "portfolio") {
    return;
  }

  const data = window.getPortfolioData();

  document.title = `${data.profile.name} | ${data.profile.role}`;
  applyBrandSettings(data.profile);
  document.getElementById("hero-name").textContent = data.profile.name;
  document.getElementById("hero-role").textContent = data.profile.role;
  document.getElementById("hero-tagline").textContent = data.profile.tagline;
  document.getElementById("about-heading").textContent = `Hi, I'm ${data.profile.firstName}.`;
  document.getElementById("about-intro").textContent = data.profile.about;
  document.getElementById("contact-copy").textContent = data.profile.contactCopy;
  const cvActions = document.getElementById("about-actions");
  const cvDownloadLink = document.getElementById("cv-download-link");
  if (cvActions && cvDownloadLink) {
    const cvSource = await resolveCvSource(data.profile);
    const hasCv = isPdfLikeDataUrl(cvSource.dataUrl, cvSource.fileName);
    cvActions.hidden = !hasCv;
    cvDownloadLink.href = hasCv ? cvSource.dataUrl : "#";
    cvDownloadLink.setAttribute(
      "download",
      cvSource.fileName || "Chaithra-Poojary CV.pdf"
    );
    cvDownloadLink.setAttribute("aria-disabled", String(!hasCv));
    cvDownloadLink.classList.toggle("is-disabled", !hasCv);
    cvDownloadLink.onclick = (event) => {
      if (!hasCv) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      openCvModal();
    };
  }

  const profileImage = document.getElementById("profile-image");
  const profileVisual = document.getElementById("profile-visual");
  const profileCard = profileVisual?.closest(".profile-card");
  if (profileImage && profileVisual) {
    const hasProfileImage = Boolean(data.profile.image);
    profileVisual.hidden = !hasProfileImage;
    profileCard?.classList.toggle("is-text-only", !hasProfileImage);
    profileImage.src = hasProfileImage ? data.profile.image : "";
    profileImage.alt = hasProfileImage ? `Portrait of ${data.profile.name}` : "";
  }

  const heroBannerImage = document.getElementById("hero-banner-image");
  const heroCanvas = heroBannerImage?.closest(".hero-canvas");
  if (heroBannerImage && heroCanvas) {
    const hasHeroImage = Boolean(data.profile.heroImage);
    heroBannerImage.hidden = !hasHeroImage;
    heroBannerImage.src = hasHeroImage ? data.profile.heroImage : "";
    heroCanvas.classList.toggle("has-banner", hasHeroImage);
  }

  renderFocusAreas(data.profile.focusAreas);
  renderSkills(data.profile.skills);
  renderProjects(data.projects);
  await renderExclusiveProjects(data);
  renderExperience(data.experience);
  renderBlogs(data.blogs);
  renderSocials(data.profile.socials);
};

const renderCaseStudyPage = async () => {
  if (pageType !== "case-study") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const data = window.getPortfolioData();
  const publicProject = data.projects.find((item) => item.id === projectId);
  const exclusivePreview = (data.exclusiveProjects || []).find((item) => item.id === projectId);
  let project = publicProject || data.projects[0];

  if (!publicProject && exclusivePreview) {
    setRobotsNoIndex(true);
    const password = getExclusivePasswordFromSession();

    if (password) {
      try {
        project = await window.decryptExclusiveProject(exclusivePreview.encryptedPayload, password);
      } catch {
        clearExclusiveSession();
      }
    }

    if (!password || !project || project.id !== exclusivePreview.id) {
      document.title = `Exclusive Case Study | ${data.profile.name}`;
      applyBrandSettings(data.profile);
      document.body.dataset.caseTemplate = exclusivePreview.template || "ai-saas";
      document.getElementById("case-title").textContent = exclusivePreview.title;
      document.getElementById("case-intro").textContent = exclusivePreview.summary;
      document.getElementById("case-image").src = exclusivePreview.thumbnail;
      document.getElementById("case-image").alt = `${exclusivePreview.title} preview`;
      document.getElementById("case-role").textContent = "Confidential";
      document.getElementById("case-scope").textContent = "Password protected";
      document.getElementById("case-timeline").textContent = "Shared on request";
      document.getElementById("case-outcome").textContent = "Available after unlock";
      document.getElementById("case-content").innerHTML = `
        <section class="reveal exclusive-case-lock">
          <p class="eyebrow">Exclusive Access</p>
          <h2>This case study is available after password entry.</h2>
          <p>${data.settings?.exclusiveAccess?.hint || "Enter password from my CV."}</p>
          <button class="button button-primary" type="button" id="exclusive-case-unlock-button">
            Enter password from my CV.
          </button>
          <p class="form-status" id="exclusive-case-status" aria-live="polite"></p>
        </section>
      `;
      document
        .getElementById("exclusive-case-unlock-button")
        ?.addEventListener("click", () => openExclusiveModal(exclusivePreview.id));
      return;
    }

    project = {
      ...project,
      id: exclusivePreview.id,
      title: project.title || exclusivePreview.title,
      category: project.category || exclusivePreview.category,
      description: project.description || exclusivePreview.summary
    };
  } else {
    setRobotsNoIndex(false);
  }

  document.title = `${project.title} Case Study | ${data.profile.name}`;
  applyBrandSettings(data.profile);
  document.body.dataset.caseTemplate = project.template || "ai-saas";
  document.getElementById("case-title").textContent = project.title;
  document.getElementById("case-intro").textContent =
    project.caseStudy?.overview?.summary || project.description;
  document.getElementById("case-image").src =
    project.caseStudy?.overview?.coverImage || project.coverImage || project.thumbnail;
  document.getElementById("case-image").alt = `${project.title} cover`;
  document.getElementById("case-role").textContent = project.role;
  document.getElementById("case-scope").textContent = project.scope;
  document.getElementById("case-timeline").textContent = project.timeline;
  document.getElementById("case-outcome").textContent = project.outcome;

  const sections = [];
  const caseStudy = project.caseStudy || {};
  const pushSection = (title, content) => {
    if (!content) {
      return;
    }

    sections.push(`
      <section class="reveal">
        <h2>${title}</h2>
        <div>${content}</div>
      </section>
    `);
  };

  pushSection("The challenge", caseStudy.problemStatement || project.challenge);
  if (caseStudy.goals?.length) {
    pushSection(
      "Goals & Objectives",
      `<ul>${caseStudy.goals.map((item) => `<li>${item}</li>`).join("")}</ul>`
    );
  }

  if (caseStudy.empathyMap && Object.values(caseStudy.empathyMap).some(Boolean)) {
    pushSection(
      "Empathy Map",
      `<div class="case-empathy-grid">
        ${Object.entries(caseStudy.empathyMap)
          .map(
            ([key, value]) => `
              <article class="case-empathy-card">
                <span class="case-empathy-icon">${empathyIcons[key] || "✦"}</span>
                <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>${value || "—"}</p>
              </article>
            `
          )
          .join("")}
      </div>`
    );
  }

  const personas = getCasePersonas(caseStudy);
  if (personas.length) {
    pushSection(
      personas.length > 1 ? "User Personas" : "User Persona",
      `<div class="case-persona-grid">
        ${personas
          .map(
            (persona, index) => `
              <article class="case-persona-card">
                ${persona.image ? `<div class="case-persona-visual"><img src="${persona.image}" alt="${persona.name || `Persona ${index + 1}`}" /></div>` : ""}
                <h3>${persona.name || `${index === 0 ? "Primary" : index === 1 ? "Secondary" : "Additional"} Persona`}</h3>
                <p class="case-persona-role">${persona.role || ""}</p>
                <p>${persona.summary || ""}</p>
                ${
                  persona.goals?.length
                    ? `<h4>Goals</h4><ul>${persona.goals.map((item) => `<li>${item}</li>`).join("")}</ul>`
                    : ""
                }
                ${
                  persona.frustrations?.length
                    ? `<h4>Frustrations</h4><ul>${persona.frustrations
                        .map((item) => `<li>${item}</li>`)
                        .join("")}</ul>`
                    : ""
                }
              </article>
            `
          )
          .join("")}
      </div>`
    );
  }

  if (caseStudy.designPrinciples?.length) {
    pushSection(
      "Design Principles",
      `<div class="case-principles">${caseStudy.designPrinciples
        .map((item) => `<span>${item}</span>`)
        .join("")}</div>`
    );
  }

  if (caseStudy.userJourneyImage) {
    pushSection(
      "User Journey",
      `<div class="case-media"><img src="${caseStudy.userJourneyImage}" alt="User journey" /></div>`
    );
  }

  if (caseStudy.userFlowImage) {
    pushSection(
      "User Flow",
      `<div class="case-media"><img src="${caseStudy.userFlowImage}" alt="User flow" /></div>`
    );
  }

  if (caseStudy.wireframesImage) {
    pushSection(
      "Wireframes & UI Guide",
      `<div class="case-media"><img src="${caseStudy.wireframesImage}" alt="Wireframes and UI guide" /></div>`
    );
  }

  if (caseStudy.finalScreens?.length) {
    pushSection(
      "Final Screens",
      `<div class="case-screen-grid">${caseStudy.finalScreens
        .map((item, index) => `<img src="${item}" alt="Final screen ${index + 1}" />`)
        .join("")}</div>`
    );
  }

  pushSection("Outcome", caseStudy.outcome || project.impact);
  pushSection("Learnings", caseStudy.learnings);
  document.getElementById("case-content").innerHTML = sections.join("");
};

const renderBlogPostPage = () => {
  if (pageType !== "blog-post") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");
  const data = window.getPortfolioData();
  const blog = data.blogs.find((item) => item.id === blogId) || data.blogs[0];

  document.title = `${blog.title} | ${data.profile.name}`;
  applyBrandSettings(data.profile);

  document.getElementById("blog-post-title").textContent = blog.title;
  document.getElementById("blog-post-date").textContent = window.formatPortfolioDate(blog.date);
  document.getElementById("blog-post-summary").textContent = blog.summary || blog.preview;
  document.getElementById("blog-post-cover").src = blog.coverImage;
  document.getElementById("blog-post-cover").alt = `${blog.title} cover`;
  document.getElementById("blog-post-content").innerHTML = blog.content;
  document.getElementById("blog-post-summary-section").textContent = blog.summary || blog.preview;
};

const refreshRevealObserver = () => {
  const currentRevealItems = document.querySelectorAll(".reveal");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    currentRevealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  currentRevealItems.forEach((item) => revealObserver.observe(item));
};

const initJourneyAnimation = () => {
  const journey = document.getElementById("experience-list");
  const activePath = document.getElementById("journey-active-path");
  const character = document.getElementById("journey-character");
  const trackPath = journey?.querySelector(".journey-track");
  const journeyNodes = journey?.querySelector(".journey-nodes");
  if (!journey || !activePath || !trackPath || !character) {
    return;
  }

  const length = trackPath.getTotalLength();
  journey.style.setProperty("--journey-length", `${length}`);
  activePath.style.strokeDasharray = `${length}`;
  activePath.style.strokeDashoffset = `${length}`;

  const nodes = journey.querySelectorAll(".journey-node");
  const nodeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.24 }
  );

  nodes.forEach((node) => nodeObserver.observe(node));

  const updatePathProgress = () => {
    const rect = journey.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const rawProgress = (viewportHeight - rect.top) / (rect.height + viewportHeight * 0.35);
    const progress = Math.max(0, Math.min(1, rawProgress));
    journey.style.setProperty("--journey-progress", progress.toFixed(3));
    activePath.style.strokeDashoffset = `${length * (1 - progress)}`;

    const point = trackPath.getPointAtLength(length * progress);
    const x = (point.x / 1000) * 100;
    const viewHeight = Number(journeyNodes?.dataset.journeyHeight || 900);
    const y = (point.y / viewHeight) * 100;
    character.style.left = `${x}%`;
    character.style.top = `${y}%`;
  };

  updatePathProgress();
  window.addEventListener("scroll", updatePathProgress, { passive: true });
  window.addEventListener("resize", updatePathProgress);
};

const initHeroParallax = () => {
  if (!heroRoot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  heroRoot.addEventListener("mousemove", (event) => {
    const rect = heroRoot.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRoot.style.setProperty("--parallax-x", `${x * 22}px`);
    heroRoot.style.setProperty("--parallax-y", `${y * 18}px`);
  });

  heroRoot.addEventListener("mouseleave", () => {
    heroRoot.style.setProperty("--parallax-x", "0px");
    heroRoot.style.setProperty("--parallax-y", "0px");
  });
};

const initGlobalBackground = () => {
  const updateBackgroundDepth = () => {
    const scroll = window.scrollY;
    document.body.style.setProperty("--bg-shift", `${Math.min(scroll * 0.08, 80)}px`);
  };

  updateBackgroundDepth();
  window.addEventListener("scroll", updateBackgroundDepth, { passive: true });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    document.body.style.setProperty("--bg-parallax-x", `${x * 16}px`);
    document.body.style.setProperty("--bg-parallax-y", `${y * 12}px`);
  });
};

const initActiveNav = () => {
  if (!navSectionLinks.length) {
    return;
  }

  const sections = [...navSectionLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setCurrentLink = (id) => {
    navSectionLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setCurrentLink(visible.target.id);
        document.body.dataset.scene = visible.target.id;
      }
    },
    {
      threshold: [0.28, 0.5, 0.72],
      rootMargin: "-18% 0px -45% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
};

const initSceneSections = () => {
  if (!sceneSections.length) {
    return;
  }

  const sceneObserver = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (active?.target?.id) {
        document.body.dataset.scene = active.target.id;
      }
    },
    {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: "-10% 0px -35% 0px"
    }
  );

  sceneSections.forEach((section) => sceneObserver.observe(section));
};

const initScrollChrome = () => {
  const updateScrolledState = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  updateScrolledState();
  window.addEventListener("scroll", updateScrolledState, { passive: true });
};

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = button.dataset.themeTarget;
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
    syncThemeButtons();
    updateFavicon();
  });
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.closest("[data-mobile-menu]")) {
      setMenuState(false);
    }

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !shouldInterceptLink(link)
    ) {
      return;
    }

    event.preventDefault();
    navigateWithTransition(link.getAttribute("href"));
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

menuClose?.addEventListener("click", () => {
  setMenuState(false);
});

exclusiveSectionTrigger?.addEventListener("click", () => {
  openExclusiveModal();
});

document.querySelectorAll("[data-exclusive-close]").forEach((button) => {
  button.addEventListener("click", closeExclusiveModal);
});

document.querySelectorAll("[data-cv-close]").forEach((button) => {
  button.addEventListener("click", closeCvModal);
});

exclusiveUnlockForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = exclusivePasswordInput.value.trim();
  const data = window.getPortfolioData();

  if (!password) {
    exclusiveUnlockStatus.textContent = "Enter the password from the CV to continue.";
    return;
  }

  try {
    exclusiveUnlockStatus.textContent = "Unlocking projects...";
    await unlockExclusiveProjects(password, data);
    const nextExclusiveTarget = exclusiveUnlockTarget;
    closeExclusiveModal();

    if (pageType === "portfolio") {
      await renderExclusiveProjects(window.getPortfolioData());
      refreshRevealObserver();
    }

    if (pageType === "case-study" && nextExclusiveTarget) {
      navigateWithTransition(`/projects/case-study.html?id=${nextExclusiveTarget}`);
    }
  } catch (error) {
    exclusiveUnlockStatus.textContent =
      error.message || "Could not unlock the exclusive section.";
  }
});

cvAccessForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = window.getPortfolioData();
  const email = cvEmailInput.value.trim();
  const companyName = cvCompanyEmailInput.value.trim();

  if (!isValidWorkEmail(email) || !companyName) {
    cvAccessStatus.textContent = "Enter a valid work email and company name to continue.";
    return;
  }

  if (isGenericEmailDomain(email)) {
    cvAccessStatus.textContent = "Please use your work email address.";
    return;
  }

  if (!doesCompanyNameMatchEmail(email, companyName)) {
    cvAccessStatus.textContent = "Your work email and company name do not seem to match.";
    return;
  }

  try {
    recordCvDownloadLead(email, companyName);
    await downloadCvFile(data.profile);
    closeCvModal();
  } catch {
    cvAccessStatus.textContent = "Could not download the CV right now. Please try again.";
  }
});

cvSkipButton?.addEventListener("click", async () => {
  try {
    const data = window.getPortfolioData();
    await downloadCvFile(data.profile);
    closeCvModal();
  } catch {
    cvAccessStatus.textContent = "Could not download the CV right now. Please try again.";
  }
});

window.addEventListener("storage", async (event) => {
  if (event.key !== "cpw-portfolio-data") {
    return;
  }

  // Admin saves can happen in a separate tab. When that happens, clear any stale
  // exclusive unlock session so the website always re-validates against the latest data.
  clearExclusiveSession();
  unlockedExclusiveProjects = [];

  if (pageType === "portfolio") {
    await renderPortfolioPage();
    refreshRevealObserver();
    return;
  }

  if (pageType === "case-study") {
    await renderCaseStudyPage();
    refreshRevealObserver();
    return;
  }

  if (pageType === "blog-post") {
    renderBlogPostPage();
    refreshRevealObserver();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector(".form-status");
    const name = contactForm.querySelector('input[name="name"]')?.value.trim() || "";
    const email = contactForm.querySelector('input[name="email"]')?.value.trim() || "";
    const message = contactForm.querySelector('textarea[name="message"]')?.value.trim() || "";

    if (!name || !email || !message) {
      if (status) {
        status.textContent = "Please fill in your name, email, and message.";
      }
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    if (status) {
      status.textContent = "Sending your message...";
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || "Message could not be sent.");
      }

      contactForm.reset();
      if (status) {
        status.textContent = "Message sent successfully.";
      }
    } catch (error) {
      if (status) {
        status.textContent =
          error.message || "Message could not be sent right now. Please try again.";
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}

if (adminEntry) {
  adminEntry.addEventListener("click", () => {
    if (footerClickTimer) {
      window.clearTimeout(footerClickTimer);
    }
    footerClickTimer = window.setTimeout(() => {
      navigateWithTransition("/admin-login/");
    }, 220);
  });

  adminEntry.addEventListener("dblclick", () => {
    if (footerClickTimer) {
      window.clearTimeout(footerClickTimer);
      footerClickTimer = null;
    }
    openAdminStudio();
  });
}

if (adminLogo) {
  adminLogo.addEventListener("click", (event) => {
    if (event.detail === 3) {
      event.preventDefault();
      openAdminStudio();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    closeExclusiveModal();
  }

  if (event.shiftKey && event.key.toLowerCase() === "c") {
    openAdminStudio();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    setMenuState(false);
  }
});

syncThemeButtons();
updateFavicon();

const initPage = async () => {
  await renderPortfolioPage();
  await renderCaseStudyPage();
  renderBlogPostPage();
  document.body.classList.add("page-enter");
  refreshRevealObserver();
  initJourneyAnimation();
  initHeroParallax();
  initActiveNav();
  initSceneSections();
  initGlobalBackground();
  initScrollChrome();
};

initPage();
