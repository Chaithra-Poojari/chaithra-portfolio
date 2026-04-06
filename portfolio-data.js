const PORTFOLIO_STORAGE_KEY = "cpw-portfolio-data";
const DEFAULT_EXCLUSIVE_PASSWORD_HASH = "J/LrPc0Var9IGa6v1KBt4k/5gXadbS2l8dBX29aGmws=";
const DEFAULT_EXCLUSIVE_PASSWORD_SALT = "Y9YKj4o+xBIVSVZsnYc4bQ==";

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
    heroImage: "/assets/banner.png",
    brand: {
      displayName: "Chaithra Poojary",
      caption: "Product Designer",
      iconImage: "/assets/Logo.png",
      faviconImage: "/assets/Logo.svg",
      accentStart: "#7A5CFF",
      accentEnd: "#5A8BFF",
      accentDot: "#7b72ed"
    },
    tagline: "Designing calm, intelligent products for complex workflows.",
    cvFile: "",
    cvFileName: "",
    cvAssetKey: "",
    about:
      "I'm a product designer who enjoys turning complexity into calm, useful interfaces. My work blends product thinking, systems design, and close collaboration to create experiences that feel both elegant and dependable.",
    contactCopy:
      "I'm open to product design roles, consulting, and collaborative projects focused on meaningful digital experiences.",
    image: "",
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
  settings: {
    exclusiveAccess: {
      passwordHash: DEFAULT_EXCLUSIVE_PASSWORD_HASH,
      passwordSalt: DEFAULT_EXCLUSIVE_PASSWORD_SALT,
      hint: "Enter password from my CV."
    }
  },
  cvDownloads: [],
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
  exclusiveProjects: [
    {
      id: "confidential-finops",
      title: "Confidential FinOps Platform",
      category: "Enterprise",
      summary:
        "Designed a financial operations workspace for high-volume internal teams handling approvals, exceptions, and reporting.",
      description:
        "Designed a financial operations workspace for high-volume internal teams handling approvals, exceptions, and reporting.",
      thumbnail: "/assets/project-orbit.svg",
      coverImage: "/assets/project-orbit.svg",
      tags: ["Enterprise", "Dashboard", "Systems"],
      template: "business-dashboard",
      featured: false,
      encryptedPayload: {
        version: 1,
        salt: "w5WNMICYAZ0GX8qMMoAs8w==",
        iv: "0d5ZVTEDnaDdkSlO",
        cipherText:
          "hf+XFlbcubYnWlUCXsmYDvOdPton8MVl4B9O5WXRujPD3K1j/tfJOkyZdfKa34TAzwHpSJf8Q4NlpdSDJ5gFQIh0wSR3q/+AzLPi1jntHY9yItVUXZrojQ67lB2yEEeOALjnMWtpTUTYX+q3Ur7WSMCP5FKjvIZ43+RCGKUJFgUNn6dPebDWmYIAO0t1SivsEm0RwrcYC2ztGStRd1BYuIAKDmWdRiMHX5Tp6/9DzIyCAJzavDxo8F4aB7dpwMgKin1JnWgjtwu320pW3lZdHHJioH51dkrfQ2WxwHjpN+FYnj+dsJ7nWC6jX62xaPIk+cJxDHZz4Ok4kMRf3uJdNvDi9cUy5mGwhqndkQZujGZ8eC4M1Zy7IaQyvM+OQk8fF+q2mHc+h9IKm5c5LjK/aDjV15xBIVluPeUVc50kk4R31+NheklkRLlvFnAAdjlX8xGOPQDr+OoyoSZFGwqRjmJw9gbGdS0DpSJuZR9Jl2laEns3MBpTMrrekHzsumt1sinBH43fh0c0tyg/B/EtJVzLmZqiMVxmXi673hdB0q0O8YmWXHK6jDopyCtFD9MM3A738zFkzSoj1jskd35Y3JvV4eP2Dnq2Jp1jmKh8d+C8pZlrjPnjIjhzx8Te0qPTG7BtJLyXGX1M09Z+ISgjbOCSnqTdZm16RO7YLZRhE2YjUA0U2RUuW3vZ4DM1wkrP/DAyRXI1hUiXaSDXqv+6q9vMMEfb/LBMxy9tvKzkDIY5r4omUUe9dHOeBW2t0tBEJZphNhGQ2ba80yJ2o/pHEQp47vIVQPQWXtAYUSW36OC7tzJStiiwXoSUbJeSW0NDEvWEyKxlfFbIXQKfPfe2a5khxXevf6QEhcwNVYL5xt3uzwJfXfcfgTVk6gk0sM5Zzog4e8apBE7DEj0PxrNu47CC97LAOQ8JXO71b0qTiy88ojbqZoR0Vv6SEOVg+cpnT07OxQMn9Vg6AY+hufmXmjvqjv0Slr2VdC3rrydbqJAD3nDtrlDdWhd6c/GQM3Aq3MvXEFhcbAxzCvG7iCHYyXTIr9OHPbWyEt+ArzWjipNUEneVmZzJo3CFkiuIycgZYxht7alCngPmY9/EfNIwaoO+IpmypeqGlLbw3ZxTPKP0e50KvDLRTk/uojjCVWC9W0BIjz5aK0Qj1S5dG7gA9KR+LKTDjC/6LT6ZN0eNYmNJRdTpaaMCorBOskrAoIY6b7sot9Fz9a4AwXYp6vf0dqWqFTdPlXlB82ujLB9cgS3RLMLw1yPKMeR89g/7hl2b7dx6lJyUwKrj7jFUC1nYzLd4hOSYvPWelfecCOrQ5cc6QQnTdYAW2YYTHp2jDgYazJqykWM8LgyM+gvddVi0bqabPODdCum5mbpcjUnyfyzHi2hsr4eeJWSviRm4f2cPW0NpTvke4M2jVk4gLrdWMgUJxAjt87ljYPyMUYH7ngK59kXZEeAsdOkC3M9fZ0Ni//VvSiYDt0dRsFQbv9EfHsQHdYRwGCCAxfezAfcT5Al/nOVOBie+mrGPtIz1Va4p5EdPKJBE93lDqduPGisWZB9L2oWor/urhit5mk51QQR8NsSq78uO+LwnpyTVUYFyBZBynYYpM5o890Oqp4UbUguwpqNLtJeSDjwPE9WBF0tv5tfNuKa0yFw0AFwGPOcQpjcr8ejSRty1Yk6z++l1VWBNyTe8uD1nIGkk8anAivmBWO7D61uoZnP+rZOr8cgM9FQzaDJr63rweNa/xRofNmN700zdye3ENZFoOS+J9ZvM9ecHIjfQvrUhGWsx1oF9x2R7Qhm72T9dVIQanf2N6UihFB3wEx088X41vraMHluYijOw19Ei7nghOyEQUcCTQe/avobXWPXc6QcZhlm9HC6qwPOa01TTKNmok1q3VWqwiw2k1USWNccUScH0rbDKU7q/XNTLLT8tOktgwYZC7hHtBAqLW/UZ06Pb15Z9+5szdgG7TPqgofTSKDnwCb2ncYNaUDsJmDb4n5Yf5L9W/OpfbVF0n2a8TFzhg12qzGFjWWlTVcBI3p+AZM2CEBRa3Imz2dcJgCbgUKi/6q21mU1vdDFfzHKjVmoyOcwV1iTSwVa+thNumYyLBHinxoajj7NKxskJeKeynh7KGZIr3J2TqwPLo+AI1/NWdaUi4u1O9U5o9U0Y9VBAStXmK+AvGqBdMMzUXo4H4nxJQaFzAaTzlXWixSTB0FtMXFAKNv8DcVqnylHLWSx7554XHr1cm7OmhEAauBxhRFUP+TaYJJheu/9XCtteH3X0oA4i7L4/j6jjMUJm4kHipTGmfE6S9HzpxDSMJWDIM97A8km5DfwhsA662IrdIhgNVGzPcoPfK0qzuOR84jEuO6PtTMCmS2kQXfRPgqrbdH3cjghDNEdsM1W98Vj4eAwRW7mDG0eAw7Bag6AIogahqMJxRcNE3j61MGsVSftJ+DFZb3ojq7q5L5C+ISp9wv0vTcnkwiRPKlj5APk6XVJJnQ7n6AvZ0kh86XuljDPAtkms+9e9+BdTd+NsoYcPfqOvBw8duxkqZ7wh3KOZ+e4pSbPCFbBAJFo+678sNMLTH3s8kKb7Tlv+jgRqfiTBJIWKvz7vU67S+xgGSRTofUYEtmt7xtgXjdHDFIHyN2G+luwBlkFM2/shRgvmduMpo8yubNjGwgamZazN7W616xf4R7/bEgizTFh2xuuMFonaueICovSiy0t9f054unbQqnVTVvPISBEmxUwQySkBK1B07yhy3bU/Rlhf+Et6v3ffsx8PcGrQIhSAxDOqTPu3jgWY75WNcy8Rh6xJqCwT787qdgk2ujYWW4jcsVg6lHYkzzbNVmHWO3GvgQUH+4/aQn1/nttcFT7e0KEt5HrVNWcKOZIHcBKLtg7GbQAs8TKsVVICODkYNYvmNyyvdtkC8pt3LHr5PiR+AV322gwjsiW0+9kj/snXg8VgJpY/+FDeHPPjqNK7eg9NF/jJlDWhYsGpKmJJYRZxBpPTgeJL+tnUq0E2ZWEWYtvtich9RKmyvzCzF7RQ/5aywI3cUGOYUHavzPi1DsDJgjLw3BZECUYcrqvBzIZivZrbHzN5JeZmshAId9Di0kyTlPPdTEeW77XvwrXU/BUdL0NoUSo/F+kDRom2eT7nFjCplAjHTE7ugkgGiaVMB4KBexb9g78KdaQQBnRm1fYyv3B8f3b6pb5viDAGvLwDo9jJEELU54eZVRx2ThxQKJftAljh+EE+1IKz9Yj1CAkK8BHTpT9zX2bqHEtph9DjBfJLYZ0faU4EvO3tpqUEV7jeBlSJb4BmPnv8TprGAeJfvt92n9yBT0f0BpMq0Qmp/ftIrFYZ3H7hnyYGujt5mrAevlKDwvZLDwbAByUgopKCLTCG1DENJ1anB5VJyj1CY7EGq3avLwHrzHexpRJnsRn6lgG7sj1oRvEWJ8mjjo1nt3jhtkQIDL/zOtBgym3nXFjz8pdCCfWhIkI3mrkLibLQTReD8CClsaahXsiRnh690BwJlH67/sJZngWfxegcfcEpD3rm5oySfHanhdDedFgBx8gyPmOom0VQVq8S5nBUsImOvfRUy8RhclLwDMx66l8VeQs3OGCa/ETw2laODP8smlm/Ia4Iw8jx5Czd7SVau8+6SlX63+FJGfbBkbFmk/uk4IpCblMqj4ffmHFGqTpLtuJ+Xc9H3jUg/9gHIP7zbNAcBml2VkTT+8vQRjRa6GXxo6XPXTEb4y3TYOvOKsM37lQPSm1GS2MXn3K4qBQReYXoVQe/25xESVGBoz8Q4Lv7Rb+kGWtaKQUQ80oOFZP2e6tYq3M0JCrFMQpNwStsQ+XOdBavTaAr8/+wPGKmkgj61AbL3sdZqeB0VVml65SuGYRBDp/pYmqBxug7FJHLyg+GWpWZlTl0sdad6Y0ChZxiaF5JVBIgYBFyDHyJvK/NExskG/yCPK5hE6/aX9H9i78PASpHfULnRHIDvpM3gg6azrE5hJMxig7w9F39wQ/vtDNPMp7wC1+faSpTqP8WaDQQOjtCPaos2CBgYcq+vggWGdh06lbj+4gHYP8Peogepy2hQ89UuTtKl+3ZZnHudTiYJ8yJ0UajNYNdCYr7NXXuN5NzdeB408ubV5tqqEMyNpta1nJsmjwmrQwM9xhw8Zn0nRAqscAOBD7lGWwTEnxIR4UO6ZIUltu4KWvEIIrY298lvVD8LRxls8PrPglilMRnzijd4xCvUvNRUIxDnPeZn/X0x24B3xutzif0g7EW6fbFprQyLDEt4ihN7K+Vbyj/JGxJ75+Q9iTThHVrpFw="
      }
    },
    {
      id: "confidential-mobile-care",
      title: "Confidential Mobile Care App",
      category: "Mobile App",
      summary:
        "Created a private mobile health companion focused on check-ins, task clarity, and continuity between appointments.",
      description:
        "Created a private mobile health companion focused on check-ins, task clarity, and continuity between appointments.",
      thumbnail: "/assets/project-atlas.svg",
      coverImage: "/assets/project-atlas.svg",
      tags: ["Mobile", "Healthcare", "UX"],
      template: "mobile-app",
      featured: false,
      encryptedPayload: {
        version: 1,
        salt: "TYVlr7UlovBp9nnm23kc2A==",
        iv: "711uIfOtLMgpYbZH",
        cipherText:
          "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"
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
const defaultExclusiveProjects = deepClone(defaultPortfolioData.exclusiveProjects || []);

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

const normalizeBase64Value = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");

const isBase64Like = (value) => {
  const normalized = normalizeBase64Value(value);
  return Boolean(normalized) && /^[A-Za-z0-9+/=]+$/.test(normalized);
};

const hasValidEncryptedPayload = (project) => {
  const payload = project?.encryptedPayload;
  return Boolean(
    payload &&
      typeof payload === "object" &&
      isBase64Like(payload.salt) &&
      isBase64Like(payload.iv) &&
      isBase64Like(payload.cipherText)
  );
};

const ensureExclusiveProjectStructure = (project) => ({
  id: project.id || `exclusive-${Date.now()}`,
  title: project.title || "Exclusive Project",
  category: project.category || "Confidential",
  summary: project.summary || project.description || "Confidential case study preview.",
  description: project.description || project.summary || "Confidential case study preview.",
  thumbnail: normalizeAssetPath(
    project.thumbnail || project.coverImage || "/assets/project-atlas.svg",
    "/assets/project-atlas.svg"
  ),
  coverImage: normalizeAssetPath(
    project.coverImage || project.thumbnail || "/assets/project-atlas.svg",
    "/assets/project-atlas.svg"
  ),
  tags: ensureArray(project.tags),
  template: project.template || "ai-saas",
  featured: Boolean(project.featured),
  encryptedPayload: hasValidEncryptedPayload(project) ? project.encryptedPayload : null
});

const encoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
const decoder = typeof TextDecoder !== "undefined" ? new TextDecoder() : null;

const bytesToBase64 = (bytes) => {
  if (typeof btoa !== "function") {
    return "";
  }

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const base64ToBytes = (value) => {
  if (typeof atob !== "function") {
    return new Uint8Array();
  }

  const normalized = normalizeBase64Value(value);

  const padded =
    normalized.length % 4 === 0
      ? normalized
      : normalized.padEnd(normalized.length + (4 - (normalized.length % 4)), "=");

  let binary = "";
  try {
    binary = atob(padded);
  } catch {
    return new Uint8Array();
  }

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const getRandomBytes = (length) => {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return bytes;
};

const deriveAesKey = async (secret, saltBase64) => {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltBase64),
      iterations: 120000,
      hash: "SHA-256"
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256
    },
    false,
    ["encrypt", "decrypt"]
  );
};

window.hashExclusivePassword = async (password, saltBase64 = "") => {
  const salt = saltBase64 || bytesToBase64(getRandomBytes(16));
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: base64ToBytes(salt),
      iterations: 120000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  return {
    salt,
    hash: bytesToBase64(new Uint8Array(bits))
  };
};

window.verifyExclusivePassword = async (password, settings = {}) => {
  if (!password || !settings.passwordHash || !settings.passwordSalt) {
    return false;
  }

  const result = await window.hashExclusivePassword(password, settings.passwordSalt);
  return result.hash === settings.passwordHash;
};

window.encryptExclusiveProject = async (project, password) => {
  const salt = bytesToBase64(getRandomBytes(16));
  const iv = bytesToBase64(getRandomBytes(12));
  const key = await deriveAesKey(password, salt);
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: base64ToBytes(iv)
    },
    key,
    encoder.encode(JSON.stringify(project))
  );

  return {
    version: 1,
    salt,
    iv,
    cipherText: bytesToBase64(new Uint8Array(encrypted))
  };
};

window.decryptExclusiveProject = async (encryptedPayload, password) => {
  if (
    !encryptedPayload ||
    !isBase64Like(encryptedPayload.salt) ||
    !isBase64Like(encryptedPayload.iv) ||
    !isBase64Like(encryptedPayload.cipherText)
  ) {
    throw new Error("Exclusive project data is invalid.");
  }

  const key = await deriveAesKey(password, encryptedPayload.salt);
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToBytes(encryptedPayload.iv)
    },
    key,
    base64ToBytes(encryptedPayload.cipherText)
  );

  return ensureProjectStructure(JSON.parse(decoder.decode(decrypted)));
};

window.createExclusivePreview = (project, encryptedPayload) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  summary: project.description || project.caseStudy?.overview?.summary || "Confidential case study preview.",
  description: project.description || project.caseStudy?.overview?.summary || "Confidential case study preview.",
  thumbnail: normalizeAssetPath(project.thumbnail || project.coverImage || "/assets/project-atlas.svg", "/assets/project-atlas.svg"),
  coverImage: normalizeAssetPath(project.coverImage || project.thumbnail || "/assets/project-atlas.svg", "/assets/project-atlas.svg"),
  tags: ensureArray(project.tags),
  template: project.template || "ai-saas",
  featured: Boolean(project.featured),
  encryptedPayload
});

const sanitizeExclusiveProjects = (projects) => {
  const sanitized = ensureArray(projects)
    .map(ensureExclusiveProjectStructure)
    .filter((project) => project.encryptedPayload);

  if (sanitized.length) {
    return sanitized;
  }

  return defaultExclusiveProjects
    .map(ensureExclusiveProjectStructure)
    .filter((project) => project.encryptedPayload);
};

const ensureProjectStructure = (project) => {
  const template = project.template || "ai-saas";
  const coverImage = normalizeAssetPath(project.coverImage || project.thumbnail, "/assets/project-atlas.svg");
  const finalScreens = ensureArray(project.caseStudy?.finalScreens);
  const fallbackPersona = project.caseStudy?.persona || {};
  const personas = ensureArray(project.caseStudy?.personas).length
    ? ensureArray(project.caseStudy?.personas)
    : [
        {
          name: fallbackPersona.name || "",
          role: fallbackPersona.role || "",
          summary: fallbackPersona.summary || "",
          goals: ensureArray(fallbackPersona.goals),
          frustrations: ensureArray(fallbackPersona.frustrations),
          image: normalizeAssetPath(fallbackPersona.image || "", "")
        }
      ];
  const normalizedPersonas = personas
    .filter((persona) => persona && (persona.name || persona.summary || persona.role || persona.image))
    .map((persona) => ({
      name: persona.name || "",
      role: persona.role || "",
      summary: persona.summary || "",
      goals: ensureArray(persona.goals),
      frustrations: ensureArray(persona.frustrations),
      image: normalizeAssetPath(persona.image || "", "")
    }));
  const primaryPersona = normalizedPersonas[0] || {
    name: "",
    role: "",
    summary: "",
    goals: [],
    frustrations: [],
    image: ""
  };

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
      persona: primaryPersona,
      personas: normalizedPersonas,
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
    base.profile.cvFile = base.profile.cvFile || "";
    base.profile.cvFileName = base.profile.cvFileName || "";
    base.profile.cvAssetKey = base.profile.cvAssetKey || "";
    base.profile.heroImage = normalizeAssetPath(
      base.profile.heroImage || defaultPortfolioData.profile.heroImage || "",
      ""
    );
    base.profile.brand = {
      displayName: base.profile.brand?.displayName || base.profile.name,
      caption: base.profile.brand?.caption || base.profile.role,
      iconImage: normalizeAssetPath(
        base.profile.brand?.iconImage || defaultPortfolioData.profile.brand?.iconImage || "",
        ""
      ),
      faviconImage: normalizeAssetPath(
        base.profile.brand?.faviconImage ||
          defaultPortfolioData.profile.brand?.faviconImage ||
          "",
        ""
      ),
      accentStart: base.profile.brand?.accentStart || "#7A5CFF",
      accentEnd: base.profile.brand?.accentEnd || "#5A8BFF",
      accentDot: base.profile.brand?.accentDot || "#7b72ed"
    };
    base.settings = {
      exclusiveAccess: {
        passwordHash: base.settings?.exclusiveAccess?.passwordHash || DEFAULT_EXCLUSIVE_PASSWORD_HASH,
        passwordSalt: base.settings?.exclusiveAccess?.passwordSalt || DEFAULT_EXCLUSIVE_PASSWORD_SALT,
        hint: base.settings?.exclusiveAccess?.hint || "Enter password from my CV."
      }
    };
    base.cvDownloads = ensureArray(base.cvDownloads);
    base.projects = ensureArray(base.projects).map(ensureProjectStructure);
    base.exclusiveProjects = sanitizeExclusiveProjects(base.exclusiveProjects);
    base.blogs = ensureArray(base.blogs).map(ensureBlogStructure);
    base.experience = ensureArray(base.experience);
    return base;
  } catch {
    const fallback = deepClone(defaultPortfolioData);
    fallback.profile.heroImage = normalizeAssetPath(
      fallback.profile.heroImage || defaultPortfolioData.profile.heroImage || "",
      ""
    );
    fallback.profile.image = normalizeAssetPath(fallback.profile.image || "", "");
    fallback.profile.cvFile = fallback.profile.cvFile || "";
    fallback.profile.cvFileName = fallback.profile.cvFileName || "";
    fallback.profile.cvAssetKey = fallback.profile.cvAssetKey || "";
    fallback.profile.brand = {
      displayName: fallback.profile.brand?.displayName || fallback.profile.name,
      caption: fallback.profile.brand?.caption || fallback.profile.role,
      iconImage: normalizeAssetPath(
        fallback.profile.brand?.iconImage ||
          defaultPortfolioData.profile.brand?.iconImage ||
          "",
        ""
      ),
      faviconImage: normalizeAssetPath(
        fallback.profile.brand?.faviconImage ||
          defaultPortfolioData.profile.brand?.faviconImage ||
          "",
        ""
      ),
      accentStart: fallback.profile.brand?.accentStart || "#7A5CFF",
      accentEnd: fallback.profile.brand?.accentEnd || "#5A8BFF",
      accentDot: fallback.profile.brand?.accentDot || "#7b72ed"
    };
    fallback.settings = {
      exclusiveAccess: {
        passwordHash: fallback.settings?.exclusiveAccess?.passwordHash || DEFAULT_EXCLUSIVE_PASSWORD_HASH,
        passwordSalt: fallback.settings?.exclusiveAccess?.passwordSalt || DEFAULT_EXCLUSIVE_PASSWORD_SALT,
        hint: fallback.settings?.exclusiveAccess?.hint || "Enter password from my CV."
      }
    };
    fallback.cvDownloads = ensureArray(fallback.cvDownloads);
    fallback.projects = fallback.projects.map(ensureProjectStructure);
    fallback.exclusiveProjects = sanitizeExclusiveProjects(fallback.exclusiveProjects);
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
  resetValue.profile.heroImage = normalizeAssetPath(
    resetValue.profile.heroImage || defaultPortfolioData.profile.heroImage || "",
    ""
  );
  resetValue.projects = resetValue.projects.map(ensureProjectStructure);
  resetValue.exclusiveProjects = sanitizeExclusiveProjects(resetValue.exclusiveProjects);
  resetValue.blogs = resetValue.blogs.map(ensureBlogStructure);
  return resetValue;
};

const MEDIA_DB_NAME = "cpw-media-db";
const MEDIA_STORE_NAME = "assets";

const openMediaDatabase = () =>
  new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable."));
      return;
    }

    const request = indexedDB.open(MEDIA_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(MEDIA_STORE_NAME)) {
        database.createObjectStore(MEDIA_STORE_NAME, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open media database."));
  });

const mediaTransaction = async (mode, handler) => {
  const database = await openMediaDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE_NAME, mode);
    const store = transaction.objectStore(MEDIA_STORE_NAME);
    const result = handler(store);

    transaction.oncomplete = () => {
      database.close();
      resolve(result?.result ?? result ?? null);
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error || new Error("Media database transaction failed."));
    };
  });
};

window.saveCvAsset = async (dataUrl, fileName = "") => {
  const key = `cv-${Date.now()}`;
  await mediaTransaction("readwrite", (store) =>
    store.put({
      key,
      type: "cv",
      dataUrl,
      fileName
    })
  );
  return key;
};

window.getCvAsset = async (key) => {
  if (!key) {
    return null;
  }

  const database = await openMediaDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE_NAME, "readonly");
    const store = transaction.objectStore(MEDIA_STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => {
      database.close();
      resolve(request.result || null);
    };
    request.onerror = () => {
      database.close();
      reject(request.error || new Error("Could not read CV asset."));
    };
  });
};

window.removeCvAsset = async (key) => {
  if (!key) {
    return;
  }

  await mediaTransaction("readwrite", (store) => store.delete(key));
};
