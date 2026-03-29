const ADMIN_SESSION_KEY = "cpw-admin-session";
const PROJECT_DRAFT_STORAGE_KEY = "cpw-project-draft";
const ADMIN_PASSWORD_STORAGE_KEY = "cpw-admin-password";
const EXCLUSIVE_ADMIN_PASSWORD_STORAGE_KEY = "cpw-exclusive-project-password";
const ADMIN_EMAIL = "chaithrapoojari1234@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "1234";
const DEFAULT_EXCLUSIVE_PASSWORD = "cv-access-2026";

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");
const logoutButton = document.getElementById("logout-button");
const faviconLink = document.getElementById("dynamic-favicon");
const navButtons = document.querySelectorAll("[data-section-target]");
const sections = document.querySelectorAll("[data-section]");

const projectTemplateStage = document.getElementById("project-template-stage");
const projectWizard = document.getElementById("project-wizard");
const templateGrid = document.getElementById("template-grid");
const wizardStepTabs = document.getElementById("wizard-step-tabs");
const wizardStepContent = document.getElementById("wizard-step-content");
const wizardStepLabel = document.getElementById("wizard-step-label");
const wizardStepTitle = document.getElementById("wizard-step-title");
const wizardProgressFill = document.getElementById("wizard-progress-fill");
const wizardPrevButton = document.getElementById("wizard-prev-button");
const wizardNextButton = document.getElementById("wizard-next-button");
const wizardSkipButton = document.getElementById("wizard-skip-button");
const wizardSaveDraftButton = document.getElementById("wizard-save-draft-button");
const projectSaveButton = document.getElementById("project-save-button");
const projectResetButton = document.getElementById("project-reset-button");
const projectBackButton = document.getElementById("project-back-button");
const projectStatus = document.getElementById("project-status");
const deleteProjectButton = document.getElementById("delete-project-button");
const projectEditorTitle = document.getElementById("project-editor-title");

const blogForm = document.getElementById("blog-form");
const blogStatus = document.getElementById("blog-status");
const blogInlineImageInput = document.getElementById("blog-inline-image-input");
const insertBlogImageButton = document.getElementById("insert-blog-image-button");
const blogBackButton = document.getElementById("blog-back-button");
const blogEditorTitle = document.getElementById("blog-editor-title");
const projectMediaList = document.getElementById("project-media-list");
const blogMediaList = document.getElementById("blog-media-list");
const saveProjectMediaButton = document.getElementById("save-project-media-button");
const saveBlogMediaButton = document.getElementById("save-blog-media-button");
const projectMediaStatus = document.getElementById("project-media-status");
const blogMediaStatus = document.getElementById("blog-media-status");
const removeProfileImageButton = document.getElementById("remove-profile-image-button");
const exclusiveProjectList = document.getElementById("exclusive-project-list");
const newExclusiveProjectButton = document.getElementById("new-exclusive-project-button");
const exportPortfolioDataButton = document.getElementById("export-portfolio-data-button");
const importPortfolioDataButton = document.getElementById("import-portfolio-data-button");
const portfolioDataImportInput = document.getElementById("portfolio-data-import");
const portfolioDataTransferStatus = document.getElementById("portfolio-data-transfer-status");

let portfolioData = window.getPortfolioData();
let selectedProjectId = portfolioData.projects[0]?.id || "";
let selectedBlogId = portfolioData.blogs[0]?.id || "";
let currentProjectDraft = null;
let currentProjectStep = 0;
let currentProjectMode = "public";
let pendingProjectMedia = {};
let pendingBlogMedia = {};
let pendingProfileUploads = {
  profileImage: "",
  bannerImage: "",
  brandIcon: "",
  favicon: ""
};
let removeProfileImageOnSave = false;

const projectTemplates = window.getProjectTemplates();
const caseStudyStepLabels = window.getCaseStudyStepLabels();
const empathyFields = ["says", "thinks", "does", "feels", "pains", "gains"];

const buildDefaultBrandMark = () => `
  <svg class="brand-mark-svg" viewBox="0 0 64 64" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="brand-accent-admin" x1="10%" y1="10%" x2="90%" y2="90%">
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

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `item-${Date.now()}`;

const parseTags = (value) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const readFileAsDataUrl = (file, options = {}) =>
  new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }

    const {
      maxWidth = 1600,
      maxHeight = 1600,
      quality = 0.82,
      mimeType = "image/webp",
      fit = "contain"
    } = options;

    const readOriginal = () => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    };

    if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
      readOriginal();
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          resolve(String(fileReader.result));
          return;
        }

        if (fit === "cover") {
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          const scale = Math.max(maxWidth / image.width, maxHeight / image.height);
          const drawWidth = image.width * scale;
          const drawHeight = image.height * scale;
          const offsetX = (maxWidth - drawWidth) / 2;
          const offsetY = (maxHeight - drawHeight) / 2;
          context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        } else {
          const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }

        resolve(canvas.toDataURL(mimeType, quality));
      };

      image.onerror = () => resolve(String(fileReader.result));
      image.src = String(fileReader.result);
    };

    fileReader.onerror = () => resolve("");
    fileReader.readAsDataURL(file);
  });

const createEmptyProjectDraft = (template = "") => ({
  id: "",
  title: "",
  category: "",
  description: "",
  tags: [],
  featured: false,
  template,
  status: "draft",
  role: "",
  scope: "",
  timeline: "",
  outcome: "",
  coverImage: "",
  caseStudy: {
    overview: {
      role: "",
      duration: "",
      team: "",
      tools: "",
      coverImage: "",
      summary: ""
    },
    problemStatement: "",
    goals: [],
    empathyMap: {
      says: "",
      thinks: "",
      does: "",
      feels: "",
      pains: "",
      gains: ""
    },
    persona: {
      name: "",
      role: "",
      summary: "",
      goals: [],
      frustrations: []
    },
    designPrinciples: [],
    userJourneyImage: "",
    userFlowImage: "",
    wireframesImage: "",
    finalScreens: [],
    outcome: "",
    learnings: ""
  }
});

const cloneDraft = (project) =>
  JSON.parse(JSON.stringify(project || createEmptyProjectDraft()));

const saveStudioProjectDraft = () => {
  if (!currentProjectDraft) {
    localStorage.removeItem(PROJECT_DRAFT_STORAGE_KEY);
    return;
  }

  localStorage.setItem(PROJECT_DRAFT_STORAGE_KEY, JSON.stringify(currentProjectDraft));
};

const loadStudioProjectDraft = () => {
  const raw = localStorage.getItem(PROJECT_DRAFT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const getAdminPassword = () =>
  localStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;

const getExclusiveSettings = () => portfolioData.settings?.exclusiveAccess || {};

const getExclusivePasswordInputValue = () =>
  document.getElementById("exclusive-password-input-admin")?.value.trim() ||
  localStorage.getItem(EXCLUSIVE_ADMIN_PASSWORD_STORAGE_KEY) ||
  DEFAULT_EXCLUSIVE_PASSWORD;

const uniquePasswords = (...values) => [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];

const decryptExclusiveWithFallbacks = async (project, ...candidatePasswords) => {
  const passwords = uniquePasswords(...candidatePasswords, DEFAULT_EXCLUSIVE_PASSWORD);
  for (const password of passwords) {
    try {
      return await window.decryptExclusiveProject(project.encryptedPayload, password);
    } catch {
      // Try the next candidate password. This helps recover older seeded projects
      // if the admin password and encrypted payloads briefly drifted out of sync.
    }
  }

  throw new Error("Exclusive project decryption failed.");
};

const getBrandSettings = () => ({
  displayName: portfolioData.profile.brand?.displayName || portfolioData.profile.name,
  caption: portfolioData.profile.brand?.caption || portfolioData.profile.role,
  iconImage: portfolioData.profile.brand?.iconImage || "",
  faviconImage: portfolioData.profile.brand?.faviconImage || "",
  accentStart: portfolioData.profile.brand?.accentStart || "#7A5CFF",
  accentEnd: portfolioData.profile.brand?.accentEnd || "#5A8BFF",
  accentDot: portfolioData.profile.brand?.accentDot || "#7b72ed"
});

const updateAdminFavicon = () => {
  if (!faviconLink) {
    return;
  }

  const brandSettings = getBrandSettings();
  if (brandSettings.faviconImage) {
    faviconLink.href = brandSettings.faviconImage;
    return;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stop-color="${brandSettings.accentStart}"/>
          <stop offset="100%" stop-color="${brandSettings.accentEnd}"/>
        </linearGradient>
      </defs>
      <path d="M12 12H52M12 24H52M12 36H52M12 48H52M12 12V52M24 12V52M36 12V52M48 12V52" stroke="rgba(23,32,51,0.18)" stroke-width="1" fill="none" stroke-linecap="round"/>
      <rect x="18" y="16" width="24" height="30" rx="4" stroke="#172033" stroke-width="2.2" fill="none"/>
      <path d="M22 22H38" stroke="#172033" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M22 28H33" stroke="#172033" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M39 34L47 26" stroke="url(#g)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M41 24H49V32" stroke="url(#g)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="38" r="2.5" fill="${brandSettings.accentDot}"/>
    </svg>
  `.trim();

  faviconLink.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const renderStudioBrand = () => {
  const brandSettings = getBrandSettings();
  const brandMark = document.querySelector(".studio-brand .brand-mark");
  const brandName = document.querySelector(".studio-brand .brand-signature");
  const brandCaption = document.querySelector(".studio-brand .brand-caption");
  const brandIconPreview = document.getElementById("brand-icon-preview");
  const faviconPreview = document.getElementById("favicon-preview");

  if (brandName) {
    brandName.textContent = brandSettings.displayName;
  }

  if (brandCaption) {
    brandCaption.textContent = brandSettings.caption;
  }

  if (brandMark) {
    brandMark.innerHTML = brandSettings.iconImage
      ? `<img class="brand-mark-image" src="${brandSettings.iconImage}" alt="" />`
      : buildDefaultBrandMark();
  }

  if (brandIconPreview) {
    brandIconPreview.innerHTML = pendingProfileUploads.brandIcon
      ? `<img class="brand-mark-image" src="${pendingProfileUploads.brandIcon}" alt="" />`
      : brandSettings.iconImage
        ? `<img class="brand-mark-image" src="${brandSettings.iconImage}" alt="" />`
        : buildDefaultBrandMark();
  }

  if (faviconPreview) {
    faviconPreview.innerHTML = pendingProfileUploads.favicon
      ? `<img class="brand-mark-image" src="${pendingProfileUploads.favicon}" alt="" />`
      : brandSettings.faviconImage
        ? `<img class="brand-mark-image" src="${brandSettings.faviconImage}" alt="" />`
        : buildDefaultBrandMark();
  }

  document
    .querySelectorAll(".studio-brand .brand-mark-svg linearGradient stop:first-child")
    .forEach((stop) => stop.setAttribute("stop-color", brandSettings.accentStart));
  document
    .querySelectorAll(".studio-brand .brand-mark-svg linearGradient stop:last-child")
    .forEach((stop) => stop.setAttribute("stop-color", brandSettings.accentEnd));
  document
    .querySelectorAll(".studio-brand .brand-mark-svg .brand-accent-dot")
    .forEach((dot) => dot.setAttribute("fill", brandSettings.accentDot));
  updateAdminFavicon();
};

const updateSessionState = () => {
  const isAuthenticated = sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  loginView.classList.toggle("is-hidden", isAuthenticated);
  dashboardView.classList.toggle("is-hidden", !isAuthenticated);
};

const showSection = (sectionName) => {
  const activeNavSection =
    sectionName === "project-editor"
      ? currentProjectMode === "exclusive"
        ? "exclusive-projects"
        : "projects"
      : sectionName === "blog-editor"
        ? "blogs"
        : sectionName;
  navButtons.forEach((button) =>
    button.classList.toggle("is-active", button.dataset.sectionTarget === activeNavSection)
  );
  sections.forEach((section) =>
    section.classList.toggle("is-hidden", section.dataset.section !== sectionName)
  );
};

const setStatus = (element, message) => {
  if (element) {
    element.textContent = message;
  }
};

const updateImagePreview = (elementId, image, emptyLabel = "No image") => {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }

  element.innerHTML = image
    ? `<img class="brand-mark-image" src="${image}" alt="" />`
    : `<span>${emptyLabel}</span>`;
};

const syncStudioSelections = () => {
  selectedProjectId = portfolioData.projects[0]?.id || "";
  selectedBlogId = portfolioData.blogs[0]?.id || "";
};

const saveAndRefresh = (message, statusElement = null) => {
  try {
    window.savePortfolioData(portfolioData);
    renderOverview();
    renderProjectsAdmin();
    renderExclusiveProjectsAdmin();
    renderBlogsAdmin();
    renderExperienceAdmin();
    populateProfileForm();
    if (statusElement) {
      setStatus(statusElement, message);
    }
    return true;
  } catch (error) {
    const fallbackMessage =
      error?.name === "QuotaExceededError"
        ? "Save failed. The uploaded images are too large for browser storage."
        : "Save failed. Please try again with a smaller image.";
    if (statusElement) {
      setStatus(statusElement, fallbackMessage);
    }
    return false;
  }
};

const downloadPortfolioBackup = () => {
  const payload = JSON.stringify(portfolioData, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `cpw-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  setStatus(portfolioDataTransferStatus, "Content JSON exported.");
};

const importPortfolioBackup = async (file) => {
  if (!file) {
    return;
  }

  try {
    const raw = await file.text();
    const importedData = JSON.parse(raw);
    window.savePortfolioData(importedData);
    portfolioData = window.getPortfolioData();
    syncStudioSelections();
    currentProjectDraft = null;
    currentProjectStep = 0;
    pendingProjectMedia = {};
    pendingBlogMedia = {};
    pendingProfileUploads = {
      profileImage: "",
      bannerImage: "",
      brandIcon: "",
      favicon: ""
    };
    removeProfileImageOnSave = false;
    renderStudioBrand();
    renderProjectWizard();
    saveAndRefresh("Content imported successfully.", portfolioDataTransferStatus);
  } catch {
    setStatus(
      portfolioDataTransferStatus,
      "Import failed. Please choose a valid exported JSON file."
    );
  } finally {
    portfolioDataImportInput.value = "";
  }
};

const renderOverview = () => {
  const stats = [
    {
      label: "Projects",
      value: portfolioData.projects.length,
      note: "public case studies in your library"
    },
    {
      label: "Exclusive",
      value: portfolioData.exclusiveProjects?.length || 0,
      note: "password-protected case studies"
    },
    {
      label: "Blogs",
      value: portfolioData.blogs.length,
      note: "published or drafted essays"
    },
    {
      label: "Featured Items",
      value:
        portfolioData.projects.filter((item) => item.featured).length +
        portfolioData.blogs.filter((item) => item.featured).length,
      note: "highlighted on the portfolio"
    },
    {
      label: "Experience Roles",
      value: portfolioData.experience.length,
      note: "story points on the journey"
    }
  ];

  document.getElementById("overview-stats").innerHTML = stats
    .map(
      (stat, index) => `
        <article class="admin-card stat-card stat-card-${index + 1}">
          <div class="stat-card-topline">
            <p class="admin-kicker">${stat.label}</p>
            <span class="stat-card-marker" aria-hidden="true"></span>
          </div>
          <strong>${String(stat.value).padStart(2, "0")}</strong>
          <p class="admin-muted stat-card-note">${stat.note}</p>
        </article>
      `
    )
    .join("");

  const featuredList = [
    ...portfolioData.projects.filter((item) => item.featured).map((item) => ({
      type: "Project",
      title: item.title,
      detail: item.description
    })),
    ...portfolioData.blogs.filter((item) => item.featured).map((item) => ({
      type: "Blog",
      title: item.title,
      detail: item.preview
    }))
  ];

  document.getElementById("overview-feature-list").innerHTML = featuredList
    .map(
      (item, index) => `
        <article class="feature-item">
          <div class="feature-item-topline">
            <p class="admin-kicker">${item.type}</p>
            <span class="feature-item-index">${String(index + 1).padStart(2, "0")}</span>
          </div>
          <div class="feature-item-copy">
            <h3>${item.title}</h3>
            <p class="admin-muted">${item.detail}</p>
          </div>
        </article>
      `
    )
    .join("");
};

const renderTemplateSelection = () => {
  templateGrid.innerHTML = projectTemplates
    .map(
      (template) => `
        <button class="template-card template-card-${template.id}" type="button" data-template-id="${template.id}">
          <span class="template-icon" aria-hidden="true">${template.icon}</span>
          <strong>${template.label}</strong>
          <span>${template.description}</span>
        </button>
      `
    )
    .join("");

  templateGrid.querySelectorAll("[data-template-id]").forEach((button) => {
    button.addEventListener("click", () => {
      currentProjectDraft = createEmptyProjectDraft(button.dataset.templateId);
      currentProjectStep = 0;
      selectedProjectId = "";
      projectStatus.textContent = "";
      renderProjectWizard();
    });
  });
};

const getTemplateMeta = (templateId) =>
  projectTemplates.find((template) => template.id === templateId) || projectTemplates[0];

const getEmpathyClass = (templateId) => {
  if (templateId === "medical") return "empathy-medical";
  if (templateId === "ai-saas") return "empathy-ai";
  if (templateId === "mobile-app") return "empathy-mobile";
  if (templateId === "business-dashboard") return "empathy-dashboard";
  if (templateId === "e-commerce") return "empathy-commerce";
  return "empathy-experimental";
};

const renderWizardStepTabs = () => {
  wizardStepTabs.innerHTML = caseStudyStepLabels
    .map(
      (label, index) => `
        <button
          class="wizard-step-tab ${index === currentProjectStep ? "is-active" : ""}"
          type="button"
          data-step-index="${index}"
        >
          <span>${index + 1}</span>${label}
        </button>
      `
    )
    .join("");

  wizardStepTabs.querySelectorAll("[data-step-index]").forEach((button) => {
    button.addEventListener("click", () => {
      currentProjectStep = Number(button.dataset.stepIndex);
      renderProjectWizard();
    });
  });
};

const projectStepMarkup = () => {
  if (!currentProjectDraft) {
    return "";
  }

  const draft = currentProjectDraft;
  switch (currentProjectStep) {
    case 0:
      return `
        <div class="wizard-grid">
          <label>Project title <input type="text" data-project-field="title" value="${draft.title}" /></label>
          <label>Category <input type="text" data-project-field="category" value="${draft.category}" /></label>
          <label class="wizard-grid-full">Short description <textarea rows="4" data-project-field="description">${draft.description}</textarea></label>
          <label>Tags <input type="text" data-project-tags value="${draft.tags.join(", ")}" placeholder="UX, AI, Healthcare" /></label>
          <label>Cover image <input type="file" data-project-upload="coverImage" accept="image/*" /></label>
          <label>Template <input type="text" value="${getTemplateMeta(draft.template).label}" disabled /></label>
          <label>Role <input type="text" data-project-field="role" value="${draft.role}" /></label>
          <label>Scope <input type="text" data-project-field="scope" value="${draft.scope}" /></label>
          <label>Timeline <input type="text" data-project-field="timeline" value="${draft.timeline}" /></label>
          <label class="inline-toggle wizard-toggle">
            <input type="checkbox" data-project-featured ${draft.featured ? "checked" : ""} />
            Featured project
          </label>
        </div>
      `;
    case 1:
      return `
        <label>Problem statement
          <textarea rows="8" data-project-rich="problemStatement">${draft.caseStudy.problemStatement.replace(/<[^>]+>/g, "")}</textarea>
        </label>
      `;
    case 2:
      return `
        <label>Goals & objectives
          <textarea rows="8" data-project-list="goals" placeholder="One goal per line">${draft.caseStudy.goals.join("\n")}</textarea>
        </label>
      `;
    case 3:
      return `
        <div class="empathy-map ${getEmpathyClass(draft.template)}">
          ${empathyFields
            .map(
              (field) => `
                <label class="empathy-card">
                  <span>${field.charAt(0).toUpperCase() + field.slice(1)}</span>
                  <textarea rows="4" data-empathy-field="${field}">${draft.caseStudy.empathyMap[field]}</textarea>
                </label>
              `
            )
            .join("")}
        </div>
      `;
    case 4:
      return `
        <div class="wizard-grid">
          <label>Name <input type="text" data-persona-field="name" value="${draft.caseStudy.persona.name}" /></label>
          <label>Role <input type="text" data-persona-field="role" value="${draft.caseStudy.persona.role}" /></label>
          <label class="wizard-grid-full">Summary
            <textarea rows="4" data-persona-field="summary">${draft.caseStudy.persona.summary}</textarea>
          </label>
          <label>Goals
            <textarea rows="6" data-persona-list="goals" placeholder="One goal per line">${draft.caseStudy.persona.goals.join("\n")}</textarea>
          </label>
          <label>Frustrations
            <textarea rows="6" data-persona-list="frustrations" placeholder="One frustration per line">${draft.caseStudy.persona.frustrations.join("\n")}</textarea>
          </label>
        </div>
      `;
    case 5:
      return `
        <label>Design principles
          <textarea rows="8" data-project-list="designPrinciples" placeholder="One principle per line">${draft.caseStudy.designPrinciples.join("\n")}</textarea>
        </label>
      `;
    case 6:
      return `
        <div class="upload-stage">
          <p class="admin-muted">Upload a user journey visual or storyboard.</p>
          <label>Journey image <input type="file" data-project-upload="userJourneyImage" accept="image/*" /></label>
          ${draft.caseStudy.userJourneyImage ? `<img class="upload-preview" src="${draft.caseStudy.userJourneyImage}" alt="User journey preview" />` : ""}
        </div>
      `;
    case 7:
      return `
        <div class="upload-stage">
          <p class="admin-muted">Upload the user flow artifact.</p>
          <label>User flow image <input type="file" data-project-upload="userFlowImage" accept="image/*" /></label>
          ${draft.caseStudy.userFlowImage ? `<img class="upload-preview" src="${draft.caseStudy.userFlowImage}" alt="User flow preview" />` : ""}
        </div>
      `;
    case 8:
      return `
        <div class="upload-stage">
          <p class="admin-muted">Upload wireframes or a UI guide board.</p>
          <label>Wireframes / UI guide <input type="file" data-project-upload="wireframesImage" accept="image/*" /></label>
          ${draft.caseStudy.wireframesImage ? `<img class="upload-preview" src="${draft.caseStudy.wireframesImage}" alt="Wireframes preview" />` : ""}
        </div>
      `;
    case 9:
      return `
        <div class="upload-stage">
          <p class="admin-muted">Upload final screens. You can add multiple images.</p>
          <label>Final screens <input type="file" data-project-upload="finalScreens" accept="image/*" multiple /></label>
          <div class="upload-gallery">
            ${draft.caseStudy.finalScreens
              .map(
                (item, index) => `
                  <figure class="upload-gallery-item">
                    <img src="${item}" alt="Final screen ${index + 1}" />
                    <button class="admin-button" type="button" data-remove-final-screen="${index}">Remove</button>
                  </figure>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    case 10:
      return `
        <div class="wizard-grid">
          <label>Outcome summary <input type="text" data-project-field="outcome" value="${draft.outcome}" /></label>
          <label class="wizard-grid-full">Outcome details
            <textarea rows="8" data-project-rich="outcome">${draft.caseStudy.outcome.replace(/<[^>]+>/g, "")}</textarea>
          </label>
        </div>
      `;
    case 11:
      return `
        <label>Learnings
          <textarea rows="8" data-project-rich="learnings">${draft.caseStudy.learnings.replace(/<[^>]+>/g, "")}</textarea>
        </label>
      `;
    default:
      return "";
  }
};

const bindWizardInputs = () => {
  wizardStepContent.querySelectorAll("[data-project-field]").forEach((input) => {
    input.addEventListener("input", () => {
      currentProjectDraft[input.dataset.projectField] = input.value.trim();
      if (input.dataset.projectField === "timeline") {
        currentProjectDraft.caseStudy.overview.duration = input.value.trim();
      }
    });
  });

  wizardStepContent.querySelectorAll("[data-project-tags]").forEach((input) => {
    input.addEventListener("input", () => {
      currentProjectDraft.tags = parseTags(input.value);
    });
  });

  wizardStepContent.querySelectorAll("[data-project-featured]").forEach((input) => {
    input.addEventListener("change", () => {
      currentProjectDraft.featured = input.checked;
    });
  });

  wizardStepContent.querySelectorAll("[data-project-list]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      currentProjectDraft.caseStudy[textarea.dataset.projectList] = textarea.value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    });
  });

  wizardStepContent.querySelectorAll("[data-project-rich]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      currentProjectDraft.caseStudy[textarea.dataset.projectRich] = `<p>${textarea.value
        .split("\n")
        .filter(Boolean)
        .join("</p><p>")}</p>`;
    });
  });

  wizardStepContent.querySelectorAll("[data-empathy-field]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      currentProjectDraft.caseStudy.empathyMap[textarea.dataset.empathyField] = textarea.value.trim();
    });
  });

  wizardStepContent.querySelectorAll("[data-persona-field]").forEach((input) => {
    input.addEventListener("input", () => {
      currentProjectDraft.caseStudy.persona[input.dataset.personaField] = input.value.trim();
    });
  });

  wizardStepContent.querySelectorAll("[data-persona-list]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      currentProjectDraft.caseStudy.persona[textarea.dataset.personaList] = textarea.value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    });
  });

  wizardStepContent.querySelectorAll("[data-project-upload]").forEach((input) => {
    input.addEventListener("change", async () => {
      const files = [...input.files];
      if (input.dataset.projectUpload === "finalScreens") {
        const uploadedFiles = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
        currentProjectDraft.caseStudy.finalScreens.push(...uploadedFiles.filter(Boolean));
      } else {
        const uploaded = await readFileAsDataUrl(files[0]);
        if (!uploaded) {
          return;
        }

        if (input.dataset.projectUpload === "coverImage") {
          currentProjectDraft.coverImage = uploaded;
          currentProjectDraft.thumbnail = uploaded;
          currentProjectDraft.caseStudy.overview.coverImage = uploaded;
        } else {
          currentProjectDraft.caseStudy[input.dataset.projectUpload] = uploaded;
        }
      }

      renderProjectWizard();
    });
  });

  wizardStepContent.querySelectorAll("[data-remove-final-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      currentProjectDraft.caseStudy.finalScreens.splice(Number(button.dataset.removeFinalScreen), 1);
      renderProjectWizard();
    });
  });
};

const renderProjectWizard = () => {
  const hasDraft = Boolean(currentProjectDraft?.template);
  projectTemplateStage.classList.toggle("is-hidden", hasDraft);
  projectWizard.classList.toggle("is-hidden", !hasDraft);
  projectSaveButton.textContent =
    currentProjectMode === "exclusive" ? "Save secret project" : "Publish project";
  projectBackButton.textContent =
    currentProjectMode === "exclusive" ? "Back to secret projects" : "Back to projects";

  if (!hasDraft) {
    projectEditorTitle.textContent =
      currentProjectMode === "exclusive"
        ? "Start a new secret case study"
        : "Start a new case study";
    return;
  }

  projectEditorTitle.textContent =
    currentProjectDraft.title ||
    `${getTemplateMeta(currentProjectDraft.template).label} ${
      currentProjectMode === "exclusive" ? "secret case study" : "case study"
    }`;
  wizardStepLabel.textContent = `Step ${currentProjectStep + 1} of ${caseStudyStepLabels.length}`;
  wizardStepTitle.textContent = caseStudyStepLabels[currentProjectStep];
  wizardProgressFill.style.width = `${((currentProjectStep + 1) / caseStudyStepLabels.length) * 100}%`;
  wizardPrevButton.disabled = currentProjectStep === 0;
  wizardNextButton.textContent =
    currentProjectStep === caseStudyStepLabels.length - 1 ? "Review" : "Next";
  renderWizardStepTabs();
  wizardStepContent.innerHTML = projectStepMarkup();
  bindWizardInputs();
  saveStudioProjectDraft();
};

const openProjectForEdit = (projectId) => {
  const project = portfolioData.projects.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  currentProjectMode = "public";
  selectedProjectId = project.id;
  currentProjectDraft = cloneDraft(project);
  currentProjectStep = 0;
  projectStatus.textContent = "";
  renderProjectWizard();
  showSection("project-editor");
};

const openExclusiveProjectForEdit = async (projectId) => {
  const project = (portfolioData.exclusiveProjects || []).find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  const password = getExclusivePasswordInputValue();
  if (!password) {
    setStatus(projectStatus, "Enter the exclusive-project password in Profile before editing.");
    showSection("profile");
    return;
  }

  try {
    currentProjectMode = "exclusive";
    currentProjectDraft = cloneDraft(
      await decryptExclusiveWithFallbacks(project, password)
    );
    selectedProjectId = project.id;
    currentProjectStep = 0;
    projectStatus.textContent = "";
    renderProjectWizard();
    showSection("project-editor");
  } catch {
    setStatus(projectStatus, "Exclusive password did not match the stored project data.");
    showSection("profile");
  }
};

const renderProjectsAdmin = () => {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = portfolioData.projects
    .map(
      (project) => `
        <article class="manager-item manager-item-project">
          <div>
            <h3>${project.title}</h3>
            <p class="manager-meta">${project.description}</p>
            <div class="tag-row-admin">
              <span>${project.category}</span>
              <span>${getTemplateMeta(project.template).label}</span>
              ${project.featured ? '<span class="pill">Featured</span>' : ""}
            </div>
          </div>
          <div class="manager-actions">
            <button class="admin-button" type="button" data-edit-project="${project.id}">
              Edit
            </button>
            <button class="admin-button" type="button" data-move-project-exclusive="${project.id}">
              Move to secret
            </button>
          </div>
        </article>
      `
    )
    .join("");

  projectList.querySelectorAll("[data-edit-project]").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectForEdit(button.dataset.editProject);
    });
  });

  projectList.querySelectorAll("[data-move-project-exclusive]").forEach((button) => {
    button.addEventListener("click", async () => {
      await movePublicProjectToExclusive(button.dataset.moveProjectExclusive);
    });
  });
};

const renderExclusiveProjectsAdmin = () => {
  if (!exclusiveProjectList) {
    return;
  }

  exclusiveProjectList.innerHTML = (portfolioData.exclusiveProjects || [])
    .map(
      (project) => `
        <article class="manager-item manager-item-project">
          <div>
            <h3>${project.title}</h3>
            <p class="manager-meta">${project.summary}</p>
            <div class="tag-row-admin">
              <span>${project.category}</span>
              <span>${getTemplateMeta(project.template).label}</span>
              <span class="pill">Exclusive</span>
            </div>
          </div>
          <div class="manager-actions">
            <button class="admin-button" type="button" data-edit-exclusive-project="${project.id}">
              Edit
            </button>
            <button class="admin-button" type="button" data-move-project-public="${project.id}">
              Move to public
            </button>
          </div>
        </article>
      `
    )
    .join("");

  exclusiveProjectList.querySelectorAll("[data-edit-exclusive-project]").forEach((button) => {
    button.addEventListener("click", async () => {
      await openExclusiveProjectForEdit(button.dataset.editExclusiveProject);
    });
  });

  exclusiveProjectList.querySelectorAll("[data-move-project-public]").forEach((button) => {
    button.addEventListener("click", async () => {
      await moveExclusiveProjectToPublic(button.dataset.moveProjectPublic);
    });
  });
};

const fillBlogForm = (blog) => {
  document.getElementById("blog-id").value = blog.id;
  document.getElementById("blog-title").value = blog.title;
  document.getElementById("blog-preview").value = blog.preview;
  document.getElementById("blog-summary").value = blog.summary || "";
  document.getElementById("blog-date").value = blog.date;
  document.getElementById("blog-tags").value = blog.tags.join(", ");
  document.getElementById("blog-featured").checked = blog.featured;
  document.querySelector('[data-editor="blog-content"]').innerHTML = blog.content;
  if (blogEditorTitle) {
    blogEditorTitle.textContent = blog.title || "Start a new blog";
  }
  blogStatus.textContent = "";
};

const renderBlogsAdmin = () => {
  const blogList = document.getElementById("blog-list-admin");
  blogList.innerHTML = portfolioData.blogs
    .map(
      (blog) => `
        <article class="manager-item manager-item-project">
          <div>
            <h3>${blog.title}</h3>
            <p class="manager-meta">${window.formatPortfolioDate(blog.date)} • ${blog.preview}</p>
            <div class="tag-row-admin">
              ${blog.tags.map((tag) => `<span>${tag}</span>`).join("")}
              ${blog.featured ? '<span class="pill">Featured</span>' : ""}
            </div>
          </div>
          <div class="manager-actions">
            <button class="admin-button" type="button" data-edit-blog="${blog.id}">Edit</button>
          </div>
        </article>
      `
    )
    .join("");

  const selectedBlog = portfolioData.blogs.find((item) => item.id === selectedBlogId) || portfolioData.blogs[0];
  if (selectedBlog) {
    selectedBlogId = selectedBlog.id;
    fillBlogForm(selectedBlog);
  }

  blogList.querySelectorAll("[data-edit-blog]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedBlogId = button.dataset.editBlog;
      const blog = portfolioData.blogs.find((item) => item.id === selectedBlogId);
      if (blog) {
        fillBlogForm(blog);
        showSection("blog-editor");
      }
    });
  });
};

const renderExperienceAdmin = () => {
  const list = document.getElementById("experience-admin-list");
  list.innerHTML = portfolioData.experience
    .map(
      (item, index) => `
        <article class="experience-row">
          <div>
            <h3 contenteditable="true" data-exp-field="role" data-exp-id="${item.id}">${item.role}</h3>
            <p class="manager-meta">
              <span contenteditable="true" data-exp-field="company" data-exp-id="${item.id}">${item.company}</span>
              •
              <span contenteditable="true" data-exp-field="duration" data-exp-id="${item.id}">${item.duration}</span>
            </p>
            <p class="experience-note" contenteditable="true" data-exp-field="highlights" data-exp-id="${item.id}">${item.highlights.join(" | ")}</p>
          </div>
          <div class="experience-actions">
            <button class="admin-button" type="button" data-move-up="${index}">Up</button>
            <button class="admin-button" type="button" data-move-down="${index}">Down</button>
            <button class="admin-button" type="button" data-delete-exp="${item.id}">Delete</button>
          </div>
        </article>
      `
    )
    .join("");

  list.querySelectorAll("[contenteditable='true']").forEach((field) => {
    field.addEventListener("blur", () => {
      const item = portfolioData.experience.find((entry) => entry.id === field.dataset.expId);
      if (!item) {
        return;
      }

      if (field.dataset.expField === "highlights") {
        item.highlights = field.textContent
          .split("|")
          .map((value) => value.trim())
          .filter(Boolean);
      } else {
        item[field.dataset.expField] = field.textContent.trim();
      }

      saveAndRefresh("Experience updated.");
    });
  });

  list.querySelectorAll("[data-move-up]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.moveUp);
      if (index === 0) return;
      [portfolioData.experience[index - 1], portfolioData.experience[index]] = [
        portfolioData.experience[index],
        portfolioData.experience[index - 1]
      ];
      saveAndRefresh("Experience reordered.");
    });
  });

  list.querySelectorAll("[data-move-down]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.moveDown);
      if (index === portfolioData.experience.length - 1) return;
      [portfolioData.experience[index + 1], portfolioData.experience[index]] = [
        portfolioData.experience[index],
        portfolioData.experience[index + 1]
      ];
      saveAndRefresh("Experience reordered.");
    });
  });

  list.querySelectorAll("[data-delete-exp]").forEach((button) => {
    button.addEventListener("click", () => {
      portfolioData.experience = portfolioData.experience.filter(
        (item) => item.id !== button.dataset.deleteExp
      );
      saveAndRefresh("Experience entry deleted.");
    });
  });
};

const bindMediaUploads = (root, mediaType) => {
  root.querySelectorAll("[data-dashboard-media-id]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      const uploadedImage = await readFileAsDataUrl(
        file,
        mediaType === "blog" || mediaType === "project"
          ? { maxWidth: 1400, maxHeight: 1400, quality: 0.8, mimeType: "image/webp" }
          : {}
      );
      if (!uploadedImage) {
        return;
      }

      if (mediaType === "project") {
        pendingProjectMedia[input.dataset.dashboardMediaId] = uploadedImage;
        setStatus(projectMediaStatus, "Project image ready. Click save to apply.");
      } else if (mediaType === "blog") {
        pendingBlogMedia[input.dataset.dashboardMediaId] = uploadedImage;
        setStatus(blogMediaStatus, "Blog image ready. Click save to apply.");
      }
      renderDashboardMediaAdmin();
    });
  });
};

const renderMediaList = (root, items, mediaType) => {
  if (!root) {
    return;
  }

  root.innerHTML = items
    .map(
      (item) => `
        <article class="dashboard-media-item">
          <div class="dashboard-media-preview">
            ${item.image ? `<img src="${item.image}" alt="${item.title} preview" />` : "<span>No image</span>"}
          </div>
          <div class="dashboard-media-copy">
            <p class="admin-kicker">${item.type}</p>
            <h3>${item.title}</h3>
            <p class="admin-muted">${item.meta}</p>
          </div>
          <label class="dashboard-media-upload">
            Replace image
            <input type="file" accept="image/*" data-dashboard-media-type="${item.type.toLowerCase()}" data-dashboard-media-id="${item.id}" />
          </label>
        </article>
      `
    )
    .join("");

  bindMediaUploads(root, mediaType);
};

const renderDashboardMediaAdmin = () => {
  renderMediaList(
    projectMediaList,
    portfolioData.projects.map((project) => ({
      type: "Project",
      id: project.id,
      title: project.title,
      image: pendingProjectMedia[project.id] || project.thumbnail || project.coverImage || "",
      meta: project.category || "Project cover"
    })),
    "project"
  );

  renderMediaList(
    blogMediaList,
    portfolioData.blogs.map((blog) => ({
      type: "Blog",
      id: blog.id,
      title: blog.title,
      image: pendingBlogMedia[blog.id] || blog.coverImage || "",
      meta: window.formatPortfolioDate(blog.date)
    })),
    "blog"
  );
};

const populateProfileForm = () => {
  const profile = portfolioData.profile;
  const brand = getBrandSettings();
  document.getElementById("profile-name").value = profile.name;
  document.getElementById("profile-first-name").value = profile.firstName;
  document.getElementById("profile-role").value = profile.role;
  document.getElementById("profile-tagline").value = profile.tagline;
  document.getElementById("profile-about").value = profile.about;
  document.getElementById("profile-contact-copy").value = profile.contactCopy;
  document.getElementById("focus-one").value = profile.focusAreas[0]?.title || "";
  document.getElementById("focus-two").value = profile.focusAreas[1]?.title || "";
  document.getElementById("focus-three").value = profile.focusAreas[2]?.title || "";
  document.getElementById("social-linkedin").value = profile.socials[0]?.url || "";
  document.getElementById("social-dribbble").value = profile.socials[1]?.url || "";
  document.getElementById("social-github").value = profile.socials[2]?.url || "";
  document.getElementById("skills-ux").value = profile.skills[0]?.items.join(", ") || "";
  document.getElementById("skills-ui").value = profile.skills[1]?.items.join(", ") || "";
  document.getElementById("skills-tools").value = profile.skills[2]?.items.join(", ") || "";
  document.getElementById("skills-systems").value = profile.skills[3]?.items.join(", ") || "";
  document.getElementById("brand-display-name").value = brand.displayName;
  document.getElementById("brand-caption-text").value = brand.caption;
  document.getElementById("brand-icon-image").value = "";
  document.getElementById("favicon-image").value = "";
  document.getElementById("profile-banner-image").value = "";
  document.getElementById("brand-accent-start").value = brand.accentStart;
  document.getElementById("brand-accent-end").value = brand.accentEnd;
  document.getElementById("brand-accent-dot").value = brand.accentDot;
  document.getElementById("admin-login-email-display").value = ADMIN_EMAIL;
  document.getElementById("admin-password-input").value = getAdminPassword();
  document.getElementById("exclusive-password-input-admin").value =
    localStorage.getItem(EXCLUSIVE_ADMIN_PASSWORD_STORAGE_KEY) || DEFAULT_EXCLUSIVE_PASSWORD;
  document.getElementById("exclusive-password-hint").value =
    getExclusiveSettings().hint || "Enter password from my CV.";
  updateImagePreview("banner-preview", pendingProfileUploads.bannerImage || profile.heroImage, "No banner");
  renderStudioBrand();
  renderDashboardMediaAdmin();
};

const savePendingProjectMedia = () => {
  const entries = Object.entries(pendingProjectMedia);
  if (!entries.length) {
    setStatus(projectMediaStatus, "No pending project image changes.");
    return;
  }

  entries.forEach(([projectId, image]) => {
    const project = portfolioData.projects.find((item) => item.id === projectId);
    if (!project) {
      return;
    }

    project.thumbnail = image;
    project.coverImage = image;
    if (project.caseStudy?.overview) {
      project.caseStudy.overview.coverImage = image;
    }
  });

  const didSave = saveAndRefresh("Project images saved.", projectMediaStatus);
  if (didSave) {
    pendingProjectMedia = {};
  }
};

const savePendingBlogMedia = () => {
  const entries = Object.entries(pendingBlogMedia);
  if (!entries.length) {
    setStatus(blogMediaStatus, "No pending blog image changes.");
    return;
  }

  entries.forEach(([blogId, image]) => {
    const blog = portfolioData.blogs.find((item) => item.id === blogId);
    if (!blog) {
      return;
    }

    blog.coverImage = image;
  });

  const didSave = saveAndRefresh("Blog images saved.", blogMediaStatus);
  if (didSave) {
    pendingBlogMedia = {};
  }
};

const buildProjectFromDraft = () => {
  if (!currentProjectDraft) {
    return null;
  }

  const title = currentProjectDraft.title.trim();
  if (!title) {
    return null;
  }

  const coverImage =
    currentProjectDraft.coverImage ||
    currentProjectDraft.caseStudy.overview.coverImage ||
    "/assets/project-atlas.svg";

  return {
    ...currentProjectDraft,
    id: currentProjectDraft.id || slugify(title),
    title,
    thumbnail: coverImage,
    coverImage,
    status: "published",
    caseStudy: {
      ...currentProjectDraft.caseStudy,
      overview: {
        ...currentProjectDraft.caseStudy.overview,
        coverImage,
        summary:
          currentProjectDraft.caseStudy.overview.summary || currentProjectDraft.description,
        role: currentProjectDraft.caseStudy.overview.role || currentProjectDraft.role,
        duration:
          currentProjectDraft.caseStudy.overview.duration || currentProjectDraft.timeline
      }
    },
    challenge: currentProjectDraft.caseStudy.problemStatement || currentProjectDraft.challenge || "",
    approach: `<p>${currentProjectDraft.caseStudy.designPrinciples.join("</p><p>")}</p>`,
    impact: currentProjectDraft.caseStudy.outcome || currentProjectDraft.impact || ""
  };
};

// Project transfer logic:
// Public -> Exclusive encrypts the full project payload and keeps only preview metadata public.
// Exclusive -> Public decrypts the stored payload and moves it back into the normal project list.
const movePublicProjectToExclusive = async (projectId) => {
  const project = portfolioData.projects.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  const password = getExclusivePasswordInputValue();
  if (!password) {
    setStatus(projectMediaStatus, "Set the exclusive-project password in Profile before moving a project.");
    showSection("profile");
    return;
  }

  try {
    const encryptedPayload = await window.encryptExclusiveProject(project, password);
    const preview = window.createExclusivePreview(project, encryptedPayload);
    portfolioData.projects = portfolioData.projects.filter((item) => item.id !== projectId);
    portfolioData.exclusiveProjects = [
      preview,
      ...(portfolioData.exclusiveProjects || []).filter((item) => item.id !== projectId)
    ];
    saveAndRefresh("Project moved to exclusive library.", projectMediaStatus);
  } catch {
    setStatus(projectMediaStatus, "Could not move the project. Please try again.");
  }
};

const moveExclusiveProjectToPublic = async (projectId) => {
  const preview = (portfolioData.exclusiveProjects || []).find((item) => item.id === projectId);
  if (!preview) {
    return;
  }

  const password = getExclusivePasswordInputValue();
  if (!password) {
    setStatus(projectStatus, "Enter the exclusive-project password in Profile before making a project public.");
    showSection("profile");
    return;
  }

  try {
    const project = await decryptExclusiveWithFallbacks(preview, password);
    portfolioData.exclusiveProjects = (portfolioData.exclusiveProjects || []).filter(
      (item) => item.id !== projectId
    );
    portfolioData.projects = [project, ...portfolioData.projects.filter((item) => item.id !== projectId)];
    saveAndRefresh("Exclusive project moved to public projects.", projectStatus);
  } catch {
    setStatus(projectStatus, "Could not unlock that project with the current exclusive password.");
  }
};

const publishCurrentProject = async () => {
  const project = buildProjectFromDraft();
  if (!project) {
    setStatus(projectStatus, "Add a project title before saving.");
    return;
  }

  if (currentProjectMode === "exclusive") {
    const password = getExclusivePasswordInputValue();
    if (!password) {
      setStatus(projectStatus, "Set the exclusive-project password in Profile before saving this project.");
      showSection("profile");
      return;
    }

    try {
      const encryptedPayload = await window.encryptExclusiveProject(project, password);
      const preview = window.createExclusivePreview(project, encryptedPayload);
      const existingIndex = (portfolioData.exclusiveProjects || []).findIndex(
        (item) => item.id === project.id
      );

      if (existingIndex >= 0) {
        portfolioData.exclusiveProjects[existingIndex] = preview;
      } else {
        portfolioData.exclusiveProjects = [preview, ...(portfolioData.exclusiveProjects || [])];
      }

      portfolioData.projects = portfolioData.projects.filter((item) => item.id !== project.id);
      selectedProjectId = project.id;
      currentProjectDraft = cloneDraft(project);
      saveAndRefresh("Exclusive project saved.", projectStatus);
      saveStudioProjectDraft();
    } catch {
      setStatus(projectStatus, "Could not encrypt the exclusive project. Please try again.");
    }
    return;
  }

  const existingIndex = portfolioData.projects.findIndex((item) => item.id === project.id);
  if (existingIndex >= 0) {
    portfolioData.projects[existingIndex] = project;
  } else {
    portfolioData.projects.unshift(project);
  }

  selectedProjectId = project.id;
  currentProjectDraft = cloneDraft(project);
  saveAndRefresh("Project published.", projectStatus);
  saveStudioProjectDraft();
};

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    const editor = document.querySelector(`[data-editor="${button.dataset.editorTarget}"]`);
    if (!editor) return;
    editor.focus();
    document.execCommand(button.dataset.command, false, null);
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("admin-email").value.trim();
  const passcode = document.getElementById("admin-passcode").value.trim();

  if (!email || !passcode) {
    loginStatus.textContent = "Enter both email and passcode.";
    return;
  }

  if (email !== ADMIN_EMAIL) {
    loginStatus.textContent = "Use the configured admin email.";
    return;
  }

  if (passcode !== getAdminPassword()) {
    loginStatus.textContent = "Incorrect password.";
    return;
  }

  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  loginStatus.textContent = "";
  updateSessionState();
});

logoutButton?.addEventListener("click", () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  updateSessionState();
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSection(button.dataset.sectionTarget);
  });
});

document.getElementById("new-project-button").addEventListener("click", () => {
  currentProjectMode = "public";
  currentProjectDraft = null;
  currentProjectStep = 0;
  selectedProjectId = "";
  projectStatus.textContent = "";
  renderProjectWizard();
  showSection("project-editor");
});

newExclusiveProjectButton?.addEventListener("click", () => {
  currentProjectMode = "exclusive";
  currentProjectDraft = null;
  currentProjectStep = 0;
  selectedProjectId = "";
  projectStatus.textContent = "";
  renderProjectWizard();
  showSection("project-editor");
});

projectResetButton.addEventListener("click", () => {
  currentProjectDraft = null;
  currentProjectStep = 0;
  localStorage.removeItem(PROJECT_DRAFT_STORAGE_KEY);
  projectStatus.textContent = "";
  renderProjectWizard();
});

projectBackButton.addEventListener("click", () => {
  showSection(currentProjectMode === "exclusive" ? "exclusive-projects" : "projects");
});

wizardPrevButton.addEventListener("click", () => {
  currentProjectStep = Math.max(0, currentProjectStep - 1);
  renderProjectWizard();
});

wizardNextButton.addEventListener("click", () => {
  currentProjectStep = Math.min(caseStudyStepLabels.length - 1, currentProjectStep + 1);
  renderProjectWizard();
});

wizardSkipButton.addEventListener("click", () => {
  currentProjectStep = Math.min(caseStudyStepLabels.length - 1, currentProjectStep + 1);
  setStatus(projectStatus, "Step skipped. You can come back anytime.");
  renderProjectWizard();
});

wizardSaveDraftButton.addEventListener("click", () => {
  saveStudioProjectDraft();
  setStatus(projectStatus, "Draft saved locally.");
});

projectSaveButton.addEventListener("click", async () => {
  await publishCurrentProject();
});

deleteProjectButton.addEventListener("click", () => {
  if (!currentProjectDraft?.id) {
    currentProjectDraft = null;
    renderProjectWizard();
    return;
  }

  if (currentProjectMode === "exclusive") {
    portfolioData.exclusiveProjects = (portfolioData.exclusiveProjects || []).filter(
      (item) => item.id !== currentProjectDraft.id
    );
  } else {
    portfolioData.projects = portfolioData.projects.filter((item) => item.id !== currentProjectDraft.id);
  }
  selectedProjectId = portfolioData.projects[0]?.id || "";
  currentProjectDraft = null;
  localStorage.removeItem(PROJECT_DRAFT_STORAGE_KEY);
  saveAndRefresh("Project deleted.", projectStatus);
  renderProjectWizard();
});

document.getElementById("new-blog-button").addEventListener("click", () => {
  selectedBlogId = "";
  fillBlogForm({
    id: "",
    title: "",
    preview: "",
    summary: "",
    date: "2026-03-29",
    featured: false,
    tags: [],
    coverImage: "",
    content: "<p></p>"
  });
  showSection("blog-editor");
});

blogBackButton?.addEventListener("click", () => {
  showSection("blogs");
});

saveProjectMediaButton?.addEventListener("click", savePendingProjectMedia);
saveBlogMediaButton?.addEventListener("click", savePendingBlogMedia);

document.getElementById("profile-banner-image")?.addEventListener("change", async (event) => {
  const uploadedBannerImage = await readFileAsDataUrl(event.target.files?.[0], {
    maxWidth: 1600,
    maxHeight: 1000,
    quality: 0.82,
    mimeType: "image/webp",
    fit: "cover"
  });
  if (!uploadedBannerImage) {
    return;
  }

  pendingProfileUploads.bannerImage = uploadedBannerImage;
  updateImagePreview("banner-preview", uploadedBannerImage, "No banner");

  setStatus(document.getElementById("profile-status"), "Banner selected. Click save profile to apply.");
});

document.getElementById("profile-image-input")?.addEventListener("change", async (event) => {
  const uploadedImage = await readFileAsDataUrl(event.target.files?.[0], {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.82,
    mimeType: "image/webp"
  });
  if (!uploadedImage) {
    return;
  }

  pendingProfileUploads.profileImage = uploadedImage;
  removeProfileImageOnSave = false;
  setStatus(document.getElementById("profile-status"), "Profile image selected. Click save profile to apply.");
});

removeProfileImageButton?.addEventListener("click", () => {
  pendingProfileUploads.profileImage = "";
  removeProfileImageOnSave = true;
  document.getElementById("profile-image-input").value = "";
  setStatus(document.getElementById("profile-status"), "Profile image will be removed when you save profile.");
});

document.getElementById("brand-icon-image")?.addEventListener("change", async (event) => {
  const uploadedIcon = await readFileAsDataUrl(event.target.files?.[0], {
    maxWidth: 512,
    maxHeight: 512,
    quality: 0.9,
    mimeType: "image/png"
  });
  if (!uploadedIcon) {
    return;
  }

  pendingProfileUploads.brandIcon = uploadedIcon;
  renderStudioBrand();
  setStatus(document.getElementById("profile-status"), "Logo icon selected. Click save profile to apply.");
});

document.getElementById("favicon-image")?.addEventListener("change", async (event) => {
  const uploadedFavicon = await readFileAsDataUrl(event.target.files?.[0], {
    maxWidth: 128,
    maxHeight: 128,
    quality: 0.92,
    mimeType: "image/png"
  });
  if (!uploadedFavicon) {
    return;
  }

  pendingProfileUploads.favicon = uploadedFavicon;
  renderStudioBrand();
  setStatus(document.getElementById("profile-status"), "Favicon selected. Click save profile to apply.");
});

blogForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const existingId = document.getElementById("blog-id").value;
  const existingBlog = portfolioData.blogs.find((item) => item.id === existingId);
  const blog = {
    id: existingId || slugify(document.getElementById("blog-title").value),
    title: document.getElementById("blog-title").value.trim(),
    preview: document.getElementById("blog-preview").value.trim(),
    summary: document.getElementById("blog-summary").value.trim(),
    date: document.getElementById("blog-date").value,
    tags: parseTags(document.getElementById("blog-tags").value),
    featured: document.getElementById("blog-featured").checked,
    coverImage: existingBlog?.coverImage || "/assets/project-lumen.svg",
    content: document.querySelector('[data-editor="blog-content"]').innerHTML
  };

  const index = portfolioData.blogs.findIndex((item) => item.id === existingId);
  if (index >= 0) {
    portfolioData.blogs[index] = blog;
  } else {
    portfolioData.blogs.unshift(blog);
  }

  selectedBlogId = blog.id;
  saveAndRefresh("Blog saved.", blogStatus);
});

document.getElementById("delete-blog-button").addEventListener("click", () => {
  const existingId = document.getElementById("blog-id").value;
  if (!existingId) return;

  portfolioData.blogs = portfolioData.blogs.filter((item) => item.id !== existingId);
  selectedBlogId = portfolioData.blogs[0]?.id || "";
  saveAndRefresh("Blog deleted.", blogStatus);
});

insertBlogImageButton?.addEventListener("click", () => {
  blogInlineImageInput.click();
});

blogInlineImageInput?.addEventListener("change", async () => {
  const file = blogInlineImageInput.files[0];
  const image = await readFileAsDataUrl(file, {
    maxWidth: 1400,
    maxHeight: 1400,
    quality: 0.8,
    mimeType: "image/webp"
  });
  if (!image) return;
  const editor = document.querySelector('[data-editor="blog-content"]');
  editor.focus();
  document.execCommand("insertHTML", false, `<p><img src="${image}" alt="Inline blog visual" /></p>`);
  blogInlineImageInput.value = "";
});

document.getElementById("new-experience-button").addEventListener("click", () => {
  portfolioData.experience.unshift({
    id: `experience-${Date.now()}`,
    role: "New Role",
    company: "Company",
    duration: "2026",
    highlights: ["Highlight one", "Highlight two", "Highlight three"]
  });
  saveAndRefresh("Experience added.");
});

document.getElementById("profile-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const exclusivePasswordValue = document.getElementById("exclusive-password-input-admin").value.trim();
  const exclusiveSettings = getExclusiveSettings();
  const currentExclusivePassword =
    localStorage.getItem(EXCLUSIVE_ADMIN_PASSWORD_STORAGE_KEY) || DEFAULT_EXCLUSIVE_PASSWORD;
  let exclusivePasswordHash = exclusiveSettings.passwordHash;
  let exclusivePasswordSalt = exclusiveSettings.passwordSalt;

  if (exclusivePasswordValue && (portfolioData.exclusiveProjects || []).length) {
    try {
      portfolioData.exclusiveProjects = await Promise.all(
        portfolioData.exclusiveProjects.map(async (project) => {
          const decrypted = await decryptExclusiveWithFallbacks(
            project,
            currentExclusivePassword,
            exclusivePasswordValue,
            localStorage.getItem(EXCLUSIVE_ADMIN_PASSWORD_STORAGE_KEY)
          );
          const encryptedPayload = await window.encryptExclusiveProject(
            decrypted,
            exclusivePasswordValue
          );
          return window.createExclusivePreview(decrypted, encryptedPayload);
        })
      );
    } catch {
      setStatus(
        document.getElementById("profile-status"),
        "Could not update the exclusive password because existing projects could not be re-encrypted."
      );
      return;
    }
  }

  if (exclusivePasswordValue) {
    const hashed = await window.hashExclusivePassword(exclusivePasswordValue);
    exclusivePasswordHash = hashed.hash;
    exclusivePasswordSalt = hashed.salt;
  }

  portfolioData.profile = {
    ...portfolioData.profile,
    name: document.getElementById("profile-name").value.trim(),
    firstName: document.getElementById("profile-first-name").value.trim(),
    role: document.getElementById("profile-role").value.trim(),
    tagline: document.getElementById("profile-tagline").value.trim(),
    about: document.getElementById("profile-about").value.trim(),
    contactCopy: document.getElementById("profile-contact-copy").value.trim(),
    image: removeProfileImageOnSave ? "" : pendingProfileUploads.profileImage || portfolioData.profile.image,
    heroImage: pendingProfileUploads.bannerImage || portfolioData.profile.heroImage,
    focusAreas: [
      document.getElementById("focus-one").value.trim(),
      document.getElementById("focus-two").value.trim(),
      document.getElementById("focus-three").value.trim()
    ]
      .filter(Boolean)
      .map((title) => ({ title, description: "Editable focus area from studio." })),
    socials: [
      { label: "LinkedIn", url: document.getElementById("social-linkedin").value.trim() },
      { label: "Dribbble", url: document.getElementById("social-dribbble").value.trim() },
      { label: "GitHub", url: document.getElementById("social-github").value.trim() }
    ],
    brand: {
      displayName: document.getElementById("brand-display-name").value.trim() || document.getElementById("profile-name").value.trim(),
      caption: document.getElementById("brand-caption-text").value.trim() || document.getElementById("profile-role").value.trim(),
      iconImage: pendingProfileUploads.brandIcon || portfolioData.profile.brand?.iconImage || "",
      faviconImage: pendingProfileUploads.favicon || portfolioData.profile.brand?.faviconImage || "",
      accentStart: document.getElementById("brand-accent-start").value,
      accentEnd: document.getElementById("brand-accent-end").value,
      accentDot: document.getElementById("brand-accent-dot").value
    },
    skills: [
      { group: "UX", items: parseTags(document.getElementById("skills-ux").value) },
      { group: "UI", items: parseTags(document.getElementById("skills-ui").value) },
      { group: "Tools", items: parseTags(document.getElementById("skills-tools").value) },
      { group: "Systems Thinking", items: parseTags(document.getElementById("skills-systems").value) }
    ]
  };
  portfolioData.settings = {
    ...portfolioData.settings,
    exclusiveAccess: {
      passwordHash: exclusivePasswordHash,
      passwordSalt: exclusivePasswordSalt,
      hint:
        document.getElementById("exclusive-password-hint").value.trim() ||
        "Enter password from my CV."
    }
  };

  const didSave = saveAndRefresh("Profile updated.", document.getElementById("profile-status"));
  if (didSave) {
    pendingProfileUploads = {
      profileImage: "",
      bannerImage: "",
      brandIcon: "",
      favicon: ""
    };
    removeProfileImageOnSave = false;
    renderStudioBrand();
    const nextPassword = document.getElementById("admin-password-input").value.trim();
    if (nextPassword) {
      localStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, nextPassword);
    }
    if (exclusivePasswordValue) {
      localStorage.setItem(EXCLUSIVE_ADMIN_PASSWORD_STORAGE_KEY, exclusivePasswordValue);
    }
    populateProfileForm();
  }
});

document.getElementById("reset-data-button").addEventListener("click", () => {
  portfolioData = window.resetPortfolioData();
  syncStudioSelections();
  currentProjectDraft = null;
  localStorage.removeItem(PROJECT_DRAFT_STORAGE_KEY);
  saveAndRefresh("Portfolio content reset to defaults.", document.getElementById("profile-status"));
  renderProjectWizard();
});

exportPortfolioDataButton?.addEventListener("click", downloadPortfolioBackup);

importPortfolioDataButton?.addEventListener("click", () => {
  portfolioDataImportInput?.click();
});

portfolioDataImportInput?.addEventListener("change", async () => {
  await importPortfolioBackup(portfolioDataImportInput.files?.[0]);
});

renderTemplateSelection();
renderOverview();
renderProjectsAdmin();
renderExclusiveProjectsAdmin();
renderBlogsAdmin();
renderExperienceAdmin();
populateProfileForm();

const savedDraft = loadStudioProjectDraft();
if (savedDraft?.template) {
  currentProjectDraft = savedDraft;
}

renderProjectWizard();
showSection("overview");
updateSessionState();
