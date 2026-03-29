const PORTFOLIO_STORAGE_KEY = "cpw-portfolio-data";

const PROJECT_TEMPLATES = [
  {
    id: "medical",
    label: "Medical",
    icon: "Cross",
    description: "Care journeys, clinical workflows, and patient-centered systems."
  },
  {
    id: "ai-saas",
    label: "AI / SaaS",
    icon: "Spark",
    description: "Intelligent product flows, SaaS platforms, and automation experiences."
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    icon: "Phone",
    description: "Mobile-first journeys, feature launches, and compact touch interactions."
  },
  {
    id: "business-dashboard",
    label: "Business Dashboard",
    icon: "Grid",
    description: "Operational dashboards, analytics tools, and complex data interfaces."
  },
  {
    id: "e-commerce",
    label: "E-commerce",
    icon: "Bag",
    description: "Commerce funnels, browsing flows, and conversion-driven product design."
  },
  {
    id: "experimental",
    label: "Experimental",
    icon: "Orbit",
    description: "Concept-driven explorations, emerging interactions, and future-facing design."
  }
];

const CASE_STUDY_STEP_LABELS = [
  "Project Overview",
  "Problem Statement",
  "Goals & Objectives",
  "Empathy Map",
  "User Persona",
  "Design Principles",
  "User Journey",
  "User Flow",
  "Wireframes/UI Guide",
  "Final Screens",
  "Outcome",
  "Learnings"
];

const defaultPortfolioData = {
  profile: {
    name: "Chaithra Poojary",
    firstName: "Chaithra",
    role: "Product Designer",
    heroImage: "",
    brand: {
      displayName: "Chaithra Poojary",
      caption: "Product Designer",
      iconImage: "",
      faviconImage: "",
      accentStart: "#7A5CFF",
      accentEnd: "#5A8BFF",
      accentDot: "#7b72ed"
    },
    tagline: "Designing calm, intelligent products for complex workflows.",
    about:
      "I'm a product designer who enjoys turning complexity into calm, useful interfaces. My work blends product thinking, systems design, and close collaboration to create experiences that feel both elegant and dependable.",
    contactCopy:
      "I'm open to product design roles, consulting, and collaborative projects focused on meaningful digital experiences.",
    image: "./assets/profile-portrait.svg",
    focusAreas: [
      {
        title: "AI-assisted workflows",
        description: "Reducing friction in high-stakes product journeys."
      },
      {
        title: "Design systems",
        description: "Creating scalable patterns with warmth and clarity."
      },
      {
        title: "Cross-functional design",
        description: "Partnering deeply with product, research, and engineering."
      }
    ],
    skills: [
      { group: "UX", items: ["User flows", "Research synthesis", "Service blueprints"] },
      { group: "UI", items: ["Interface design", "Visual systems", "Prototyping"] },
      { group: "Tools", items: ["Figma", "Framer", "FigJam", "Maze", "Notion"] },
      {
        group: "Systems Thinking",
        items: ["Design systems", "Platform strategy", "Cross-team alignment"]
      }
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com" },
      { label: "Dribbble", url: "https://dribbble.com" },
      { label: "GitHub", url: "https://github.com" }
    ]
  },
  projects: [
    {
      id: "atlas-care",
      title: "Atlas Care",
      category: "Healthcare",
      description: "Redesigned a care coordination platform to reduce clinical friction.",
      tags: ["UX", "Healthcare", "Systems"],
      featured: true,
      thumbnail: "/assets/project-atlas.svg",
      coverImage: "/assets/project-atlas.svg",
      template: "medical",
      status: "published",
      role: "Lead Product Designer",
      scope: "Research, interaction design, visual design, handoff",
      timeline: "14 weeks",
      outcome: "Improved task completion and reduced support tickets",
      challenge:
        "<p>Care teams were navigating dense dashboards, repeated form entry, and fragmented status updates. The product needed to feel lighter without losing the depth required for clinical work.</p>",
      approach:
        "<p>I mapped recurring provider tasks, audited the information hierarchy, and introduced a calmer structure centered on urgency, next steps, and clear ownership across the workflow.</p>",
      impact:
        "<p>The final direction streamlined navigation, clarified patient status, and created reusable patterns for forms, tables, and task states across the wider product suite.</p>",
      caseStudy: {
        overview: {
          role: "Lead Product Designer",
          duration: "14 weeks",
          team: "PM, clinical ops, engineering",
          tools: "Figma, FigJam, Maze",
          coverImage: "/assets/project-atlas.svg",
          summary:
            "A calmer care coordination workflow for clinical teams managing patient tasks, communication, and next-step visibility."
        },
        problemStatement:
          "<p>Clinicians were navigating dense dashboards and fragmented task states, which slowed follow-through and increased support overhead.</p>",
        goals: [
          "Reduce friction in daily coordination tasks.",
          "Clarify urgency, ownership, and patient next steps.",
          "Create reusable patterns for future clinical product work."
        ],
        empathyMap: {
          says: "I need to know what matters right now.",
          thinks: "I can’t waste time jumping between views.",
          does: "Checks statuses, updates records, follows up with patients.",
          feels: "Overloaded when information is fragmented.",
          pains: "Duplicate entry, unclear prioritization, hidden task ownership.",
          gains: "Faster scanning, confidence, and calmer day-to-day workflows."
        },
        persona: {
          name: "Care Operations Lead",
          role: "Clinical workflow coordinator",
          summary:
            "Balances operational efficiency with patient safety, and needs clarity more than extra surface area.",
          goals: ["Prioritize tasks quickly", "Reduce coordination errors", "Keep teams aligned"],
          frustrations: ["Too many status patterns", "No clear urgency view", "Repeated manual checking"]
        },
        designPrinciples: [
          "Surface the next best action clearly.",
          "Reduce visual load without reducing context.",
          "Design for trust and handoff clarity."
        ],
        userJourneyImage: "/assets/project-atlas.svg",
        userFlowImage: "/assets/project-atlas.svg",
        wireframesImage: "/assets/project-atlas.svg",
        finalScreens: ["/assets/project-atlas.svg"],
        outcome:
          "<p>The redesign improved task completion, reduced support questions, and became a foundation for broader workflow standardization.</p>",
        learnings:
          "<p>In healthcare tools, small gains in clarity create outsized trust. Reducing noise mattered as much as adding capability.</p>"
      }
    },
    {
      id: "lumen-ai",
      title: "Lumen AI",
      category: "AI",
      description: "Designed an AI copilot that helped analysts move from insight to action.",
      tags: ["AI", "Product", "Workflow"],
      featured: true,
      thumbnail: "/assets/project-lumen.svg",
      coverImage: "/assets/project-lumen.svg",
      template: "ai-saas",
      status: "published",
      role: "Senior Product Designer",
      scope: "Concept design, prototyping, AI interaction patterns",
      timeline: "10 weeks",
      outcome: "Higher adoption in pilot teams and clearer AI feedback loops",
      challenge:
        "<p>Analysts wanted speed, but not at the cost of visibility. Early AI concepts felt opaque and made it difficult to understand why a recommendation appeared.</p>",
      approach:
        "<p>I designed a copilot flow with progressive disclosure, editable suggestions, and confidence cues so the interface felt collaborative rather than prescriptive.</p>",
      impact:
        "<p>The shipped experience gave teams a faster path to insight while preserving review, traceability, and control in moments that carried business risk.</p>",
      caseStudy: {
        overview: {
          role: "Senior Product Designer",
          duration: "10 weeks",
          team: "Product, ML, design, engineering",
          tools: "Figma, Framer, Notion",
          coverImage: "/assets/project-lumen.svg",
          summary:
            "An AI copilot experience that balanced speed with explainability for enterprise analysts."
        },
        problemStatement:
          "<p>Teams needed faster insight generation, but existing AI concepts obscured confidence and made collaboration harder.</p>",
        goals: [
          "Make AI recommendations editable and transparent.",
          "Create collaborative review moments in the workflow.",
          "Increase pilot adoption without sacrificing trust."
        ],
        empathyMap: {
          says: "Show me why the system suggested this.",
          thinks: "I want speed, but I still need to validate the answer.",
          does: "Reviews insights, edits recommendations, shares findings.",
          feels: "Curious but cautious with AI-generated output.",
          pains: "Opaque suggestions, low traceability, hard collaboration loops.",
          gains: "Faster synthesis, better confidence, clearer review controls."
        },
        persona: {
          name: "Research Analyst",
          role: "Enterprise insights specialist",
          summary:
            "Works across large datasets and needs assisted speed without losing confidence in recommendations.",
          goals: ["Move from insight to action faster", "Validate outputs quickly", "Collaborate with stakeholders"],
          frustrations: ["Black-box AI", "Weak auditability", "Slow feedback loops"]
        },
        designPrinciples: [
          "Make AI feel collaborative, not final.",
          "Show confidence and rationale where decisions matter.",
          "Keep editing and validation always within reach."
        ],
        userJourneyImage: "/assets/project-lumen.svg",
        userFlowImage: "/assets/project-lumen.svg",
        wireframesImage: "/assets/project-lumen.svg",
        finalScreens: ["/assets/project-lumen.svg"],
        outcome:
          "<p>The new copilot improved pilot adoption, reduced hesitation, and created clearer paths from AI output to team decisions.</p>",
        learnings:
          "<p>AI UX succeeds when assistance is paired with explanation. Speed is only useful when people stay oriented.</p>"
      }
    },
    {
      id: "orbit-ds",
      title: "Orbit DS",
      category: "Design System",
      description: "Built a modular system to unify product quality across three teams.",
      tags: ["UI", "Design System", "Platform"],
      featured: false,
      thumbnail: "/assets/project-orbit.svg",
      coverImage: "/assets/project-orbit.svg",
      template: "business-dashboard",
      status: "published",
      role: "Design Systems Lead",
      scope: "Token strategy, component specs, governance",
      timeline: "6 months",
      outcome: "Improved consistency and faster collaboration across squads",
      challenge:
        "<p>Product teams had parallel UI patterns, inconsistent spacing, and repeated design debt. We needed a shared foundation that still felt adaptable for different product surfaces.</p>",
      approach:
        "<p>I created an 8px spacing system, a clear token structure, and modular component guidance with implementation-ready specs for engineering partners.</p>",
      impact:
        "<p>Orbit helped teams ship faster with stronger visual consistency while making future product work easier to extend and maintain.</p>",
      caseStudy: {
        overview: {
          role: "Design Systems Lead",
          duration: "6 months",
          team: "Three product squads, engineering, brand",
          tools: "Figma, Tokens Studio, Storybook",
          coverImage: "/assets/project-orbit.svg",
          summary:
            "A modular design system that aligned patterns, tokens, and component governance across three teams."
        },
        problemStatement:
          "<p>Parallel product teams were shipping with inconsistent patterns, creating design debt and slowing cross-team collaboration.</p>",
        goals: [
          "Define a durable token and spacing foundation.",
          "Reduce duplicate UI decisions across squads.",
          "Improve handoff quality and implementation consistency."
        ],
        empathyMap: {
          says: "We need consistency without killing team speed.",
          thinks: "I don’t want another system that feels too rigid.",
          does: "Builds new features, adapts components, collaborates across squads.",
          feels: "Frustrated by repeated UI debt and rework.",
          pains: "Duplicate components, weak governance, inconsistent naming.",
          gains: "Shared language, faster delivery, more reliable patterns."
        },
        persona: {
          name: "Product Squad Designer",
          role: "Platform contributor",
          summary:
            "Needs a flexible system that reduces repetitive work while supporting product-specific needs.",
          goals: ["Move faster", "Reduce inconsistency", "Stay aligned with engineering"],
          frustrations: ["Too many one-off components", "Weak specs", "No scalable governance"]
        },
        designPrinciples: [
          "Create foundations first, components second.",
          "Bias toward clarity in naming and reuse.",
          "Design for adoption, not just documentation."
        ],
        userJourneyImage: "/assets/project-orbit.svg",
        userFlowImage: "/assets/project-orbit.svg",
        wireframesImage: "/assets/project-orbit.svg",
        finalScreens: ["/assets/project-orbit.svg"],
        outcome:
          "<p>The system reduced UI fragmentation and gave teams a shared, implementation-ready language to build from.</p>",
        learnings:
          "<p>A design system only works when teams feel ownership. Governance had to be lightweight, collaborative, and useful in real product work.</p>"
      }
    }
  ],
  blogs: [
    {
      id: "ai-boundaries",
      title: "Designing AI features with clearer boundaries",
      preview:
        "How framing, disclosure, and fallback states build confidence in AI interfaces.",
      date: "2026-02-14",
      featured: true,
      tags: ["AI", "Trust"],
      coverImage: "/assets/project-lumen.svg",
      summary:
        "Clarity, guardrails, and explicit handoff moments help AI feel more useful and more honest.",
      content:
        "<p>Clear boundaries help AI features feel more useful and more honest. The strongest product patterns make the system's role obvious, expose uncertainty, and leave room for human review.</p><p>When teams can see where automation begins and where judgment still matters, confidence rises. Trust comes from transparency, not mystery.</p>"
    },
    {
      id: "calm-interfaces",
      title: "Why calm interfaces matter in healthcare products",
      preview: "A look at reducing visual strain and cognitive load in clinical tools.",
      date: "2025-11-05",
      featured: false,
      tags: ["Healthcare", "Accessibility"],
      coverImage: "/assets/project-atlas.svg",
      summary:
        "In high-stakes environments, calmer interfaces help people scan faster and make safer decisions.",
      content:
        "<p>In clinical environments, visual noise has a real cost. Calm interfaces help teams scan faster, make safer decisions, and stay focused through long working sessions.</p><p>Hierarchy, spacing, and tone can reduce effort in ways that feel small on paper but meaningful in practice.</p>"
    },
    {
      id: "system-maturity",
      title: "Three signals your design system is ready to mature",
      preview:
        "Patterns for moving from ad hoc consistency to a durable shared language.",
      date: "2025-07-19",
      featured: false,
      tags: ["Design Systems", "Operations"],
      coverImage: "/assets/project-orbit.svg",
      summary:
        "A system matures when reuse becomes natural, inconsistencies create measurable drag, and teams want the same primitives.",
      content:
        "<p>A system is ready to mature when teams start asking for reuse on their own, when inconsistencies create measurable friction, and when design and engineering want the same primitives.</p><p>Growth is less about adding more components and more about improving the rules, relationships, and clarity around them.</p>"
    }
  ],
  experience: [
    {
      id: "nexa",
      role: "Senior Product Designer",
      company: "Nexa Health",
      duration: "2023 - Present",
      highlights: [
        "Led end-to-end redesign of patient and provider operations flows.",
        "Introduced a shared component language across web experiences.",
        "Partnered with PM and engineering to align roadmap with usability findings."
      ]
    },
    {
      id: "northstar",
      role: "Product Designer",
      company: "Northstar Labs",
      duration: "2020 - 2023",
      highlights: [
        "Designed AI and analytics interfaces for enterprise research teams.",
        "Improved activation by simplifying multi-step onboarding and setup.",
        "Created patterns for trust, explainability, and collaborative review."
      ]
    },
    {
      id: "studio-common",
      role: "Visual & UX Designer",
      company: "Studio Common",
      duration: "2017 - 2020",
      highlights: [
        "Crafted responsive product marketing and SaaS interfaces for startups.",
        "Built design foundations spanning typography, spacing, and interaction.",
        "Supported brand evolution through closely aligned visual systems."
      ]
    }
  ]
};

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const normalizeAssetPath = (image, fallback = "./assets/profile-portrait.svg") => {
  if (!image) {
    return fallback;
  }

  if (image.startsWith("data:")) {
    return image;
  }

  return image;
};

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const ensureProjectStructure = (project) => {
  const template = project.template || "ai-saas";
  const coverImage = normalizeAssetPath(project.coverImage || project.thumbnail, "/assets/project-atlas.svg");
  const finalScreens = ensureArray(project.caseStudy?.finalScreens);

  return {
    ...project,
    template,
    status: project.status || "published",
    thumbnail: normalizeAssetPath(project.thumbnail || coverImage, "/assets/project-atlas.svg"),
    coverImage,
    tags: ensureArray(project.tags),
    caseStudy: {
      overview: {
        role: project.caseStudy?.overview?.role || project.role || "",
        duration: project.caseStudy?.overview?.duration || project.timeline || "",
        team: project.caseStudy?.overview?.team || "",
        tools: project.caseStudy?.overview?.tools || "",
        coverImage,
        summary:
          project.caseStudy?.overview?.summary || project.description || ""
      },
      problemStatement: project.caseStudy?.problemStatement || project.challenge || "",
      goals: ensureArray(project.caseStudy?.goals),
      empathyMap: {
        says: project.caseStudy?.empathyMap?.says || "",
        thinks: project.caseStudy?.empathyMap?.thinks || "",
        does: project.caseStudy?.empathyMap?.does || "",
        feels: project.caseStudy?.empathyMap?.feels || "",
        pains: project.caseStudy?.empathyMap?.pains || "",
        gains: project.caseStudy?.empathyMap?.gains || ""
      },
      persona: {
        name: project.caseStudy?.persona?.name || "",
        role: project.caseStudy?.persona?.role || "",
        summary: project.caseStudy?.persona?.summary || "",
        goals: ensureArray(project.caseStudy?.persona?.goals),
        frustrations: ensureArray(project.caseStudy?.persona?.frustrations)
      },
      designPrinciples: ensureArray(project.caseStudy?.designPrinciples),
      userJourneyImage: normalizeAssetPath(project.caseStudy?.userJourneyImage || "", ""),
      userFlowImage: normalizeAssetPath(project.caseStudy?.userFlowImage || "", ""),
      wireframesImage: normalizeAssetPath(project.caseStudy?.wireframesImage || "", ""),
      finalScreens: finalScreens.map((item) => normalizeAssetPath(item, "")),
      outcome: project.caseStudy?.outcome || project.impact || `<p>${project.outcome || ""}</p>`,
      learnings: project.caseStudy?.learnings || "",
      legacyChallenge: project.challenge || "",
      legacyApproach: project.approach || "",
      legacyImpact: project.impact || ""
    }
  };
};

const ensureBlogStructure = (blog) => ({
  ...blog,
  tags: ensureArray(blog.tags),
  coverImage: normalizeAssetPath(blog.coverImage || "/assets/project-lumen.svg", "/assets/project-lumen.svg"),
  summary: blog.summary || blog.preview || "",
  content: blog.content || "<p></p>"
});

window.formatPortfolioDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

window.getProjectTemplates = () => deepClone(PROJECT_TEMPLATES);
window.getCaseStudyStepLabels = () => deepClone(CASE_STUDY_STEP_LABELS);

window.getPortfolioData = () => {
  try {
    const storedValue = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    const base = storedValue ? JSON.parse(storedValue) : deepClone(defaultPortfolioData);
    base.profile.image = normalizeAssetPath(base.profile.image || "", "");
    base.profile.heroImage = normalizeAssetPath(base.profile.heroImage || "", "");
    base.profile.brand = {
      displayName: base.profile.brand?.displayName || base.profile.name,
      caption: base.profile.brand?.caption || base.profile.role,
      iconImage: normalizeAssetPath(base.profile.brand?.iconImage || "", ""),
      faviconImage: normalizeAssetPath(base.profile.brand?.faviconImage || "", ""),
      accentStart: base.profile.brand?.accentStart || "#7A5CFF",
      accentEnd: base.profile.brand?.accentEnd || "#5A8BFF",
      accentDot: base.profile.brand?.accentDot || "#7b72ed"
    };
    base.projects = ensureArray(base.projects).map(ensureProjectStructure);
    base.blogs = ensureArray(base.blogs).map(ensureBlogStructure);
    base.experience = ensureArray(base.experience);
    return base;
  } catch {
    const fallback = deepClone(defaultPortfolioData);
    fallback.profile.heroImage = normalizeAssetPath(fallback.profile.heroImage || "", "");
    fallback.profile.image = normalizeAssetPath(fallback.profile.image || "", "");
    fallback.profile.brand = {
      displayName: fallback.profile.brand?.displayName || fallback.profile.name,
      caption: fallback.profile.brand?.caption || fallback.profile.role,
      iconImage: normalizeAssetPath(fallback.profile.brand?.iconImage || "", ""),
      faviconImage: normalizeAssetPath(fallback.profile.brand?.faviconImage || "", ""),
      accentStart: fallback.profile.brand?.accentStart || "#7A5CFF",
      accentEnd: fallback.profile.brand?.accentEnd || "#5A8BFF",
      accentDot: fallback.profile.brand?.accentDot || "#7b72ed"
    };
    fallback.projects = fallback.projects.map(ensureProjectStructure);
    fallback.blogs = fallback.blogs.map(ensureBlogStructure);
    return fallback;
  }
};

window.savePortfolioData = (value) => {
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(value));
};

window.resetPortfolioData = () => {
  localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  const resetValue = deepClone(defaultPortfolioData);
  resetValue.profile.heroImage = normalizeAssetPath(resetValue.profile.heroImage || "", "");
  resetValue.projects = resetValue.projects.map(ensureProjectStructure);
  resetValue.blogs = resetValue.blogs.map(ensureBlogStructure);
  return resetValue;
};
