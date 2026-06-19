import { useLanguage, type Language } from "@/lib/i18n";

type NavItemCopy = {
  label: string;
  href: string;
};

type StepCopy = {
  title: string;
  body: string;
  detail?: string;
};

type CardCopy = {
  title: string;
  body: string;
};

type LabelValueCopy = {
  label: string;
  value: string;
};

type SiteCopy = {
  common: {
    brand: string;
    languageLabel: string;
    english: string;
    bangla: string;
    startAssessment: string;
    startOnWhatsApp: string;
    joinReviewQueue: string;
    runEstimate: string;
    continueWhatsApp: string;
    fallbackForm: string;
    referenceGallery: string;
  };
  nav: {
    items: NavItemCopy[];
    menuLabel: string;
    intro: string;
  };
  footer: {
    title: string;
    body: string;
    note: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    body: string;
    cardEyebrow: string;
    cardTitle: string;
    cardBody: string;
    trustNotes: string[];
    scrollCue: string;
  };
  problem: {
    eyebrow: string;
    headline: string;
    body: string;
    imageEyebrow: string;
    imageBody: string;
    opportunityLabel: string;
    cards: CardCopy[];
  };
  system: {
    eyebrow: string;
    headline: string;
    body: string;
    steps: StepCopy[];
  };
  value: {
    eyebrow: string;
    headline: string;
    cards: CardCopy[];
  };
  conversionBand: {
    eyebrow: string;
    headline: string;
    body: string;
    checklistTitle: string;
    checklist: string[];
    fallbackBody: string;
  };
  mission: {
    text: string;
  };
  transformation: {
    stages: StepCopy[];
  };
  trust: {
    eyebrow: string;
    headline: string;
    body: string;
    cards: { title: string; location: string; system: string }[];
    checklistTitle: string;
    checklist: string[];
  };
  finalCta: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  howItWorks: {
    eyebrow: string;
    headline: string;
    body: string;
    ctaLabel: string;
    steps: StepCopy[];
  };
  products: {
    eyebrow: string;
    headline: string;
    body: string;
    systemHeadline: string;
    systemBody: string;
    includedTitle: string;
    included: CardCopy[];
    ctaHeadline: string;
    outputBadge: string;
    specs: LabelValueCopy[];
  };
  projects: {
    eyebrow: string;
    headline: string;
    body: string;
    filters: string[];
    cards: { title: string; location: string; system: string; type: string }[];
    ctaBody: string;
    ctaLabel: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    thesisEyebrow: string;
    thesisLead: string;
    thesisBody: string[];
    proofEyebrow: string;
    proofCards: CardCopy[];
    partnersEyebrow: string;
    partnersLead: string;
    partnersBody: string[];
  };
  feasibility: {
    eyebrow: string;
    headline: string;
    body: string;
    whatsappHeadline: string;
    whatsappBody: string;
    fallbackHeadline: string;
    fallbackBody: string;
    successTitle: string;
    successBody: string;
    submit: string;
    submitAnother: string;
  };
};

const en: SiteCopy = {
  common: {
    brand: "NETSO ENERGY",
    languageLabel: "Language",
    english: "English",
    bangla: "বাংলা",
    startAssessment: "Check rooftop potential",
    startOnWhatsApp: "Start on WhatsApp",
    joinReviewQueue: "Claim early access",
    runEstimate: "Calculate my savings",
    continueWhatsApp: "Continue on WhatsApp",
    fallbackForm: "Feasibility",
    referenceGallery: "Projects",
  },
  nav: {
    items: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Products", href: "/products" },
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
    ],
    menuLabel: "Open menu",
    intro: "Rooftop energy infrastructure · Dhaka",
  },
  footer: {
    title: "Rooftop energy infrastructure for Bangladesh.",
    body: "We turn unused rooftops into long-term energy assets — quietly, beautifully, at scale.",
    note: "Distributed energy infrastructure · Made in Bangladesh.",
  },
  hero: {
    eyebrow: "Rooftop energy infrastructure · Dhaka",
    headline: "Turn your rooftop into an energy-generating asset.",
    body:
      "NETSO provides zero-CAPEX solar for factories and beautiful solar pergolas for homes. Transform your unused rooftop into productive energy infrastructure.",
    cardEyebrow: "Solar Pergola",
    cardTitle: "Architecture that shades, shelters, and generates.",
    cardBody:
      "A modular steel canopy with integrated photovoltaic panels — engineered for Bangladesh's climate and skyline.",
    trustNotes: ["Dhaka rooftops", "Solar pergolas", "Energy assets"],
    scrollCue: "Scroll to reveal",
  },
  problem: {
    eyebrow: "The problem",
    headline: "Dhaka has millions of rooftops. Almost none of them generate value.",
    body:
      "Unused roofs already sit above the city, but most remain cluttered, overheated, and economically idle instead of producing energy.",
    imageEyebrow: "The rooftop layer",
    imageBody: "Aerial views of Dhaka reveal a vast layer of unused rooftop surface waiting to be activated.",
    opportunityLabel: "The opportunity",
    cards: [
      {
        title: "Idle roofs",
        body: "Large areas of rooftop space in Dhaka still sit unused instead of supporting energy generation.",
      },
      {
        title: "Grid pressure",
        body: "Daytime demand and outage risk make onsite generation more valuable for many buildings.",
      },
      {
        title: "Higher slabs",
        body: "Bills climb quickly once monthly usage moves into the upper residential tariff bands.",
      },
    ],
  },
  system: {
    eyebrow: "The system",
    headline: "Three layers. One quietly powerful asset.",
    body:
      "Every NETSO installation works as a single, integrated system — engineered for the realities of Bangladesh's grid, weather, and architecture.",
    steps: [
      {
        title: "Capture",
        body: "Premium photovoltaic panels integrated into architectural pergolas convert sunlight into clean electricity — silently, all day.",
      },
      {
        title: "Optimize",
        body: "Smart inverters and battery options balance generation with consumption, prioritising self-use and grid resilience.",
      },
      {
        title: "Compound",
        body: "Lower daytime grid use, improve backup readiness, and turn existing roof area into a more useful asset.",
      },
    ],
  },
  value: {
    eyebrow: "The value stack",
    headline: "Three practical returns. One install.",
    cards: [
      {
        title: "Lower bills",
        body: "Daytime self-consumption can reduce grid spend when usage matches generation.",
      },
      {
        title: "Resilience",
        body: "Optional battery backup keeps essentials running through outages.",
      },
      {
        title: "Better roof use",
        body: "A shaded pergola can make part of the rooftop more comfortable and more usable.",
      },
    ],
  },
  conversionBand: {
    eyebrow: "Start where you are",
    headline: "Start your rooftop review in about 60 seconds.",
    body:
      "Start on WhatsApp now. Share the basics below and NETSO will review fit before guiding the next step.",
    checklistTitle: "What you'll need",
    checklist: [
      "Full name",
      "Phone number",
      "Address",
      "Building type",
      "Roof size",
      "Monthly bill",
    ],
    fallbackBody:
      "No obligation. NETSO follows up after reviewing the details you share.",
  },
  mission: {
    text: "Bangladesh doesn't have a land problem. It has a rooftop opportunity.",
  },
  transformation: {
    stages: [
      {
        title: "Empty",
        body: "An average Dhaka rooftop. Concrete, water tanks, wires.",
      },
      {
        title: "Structure",
        body: "A clean steel pergola — engineered, low-profile, resilient.",
      },
      {
        title: "Solar",
        body: "PV panels become the canopy. Power begins flowing.",
      },
      {
        title: "Power",
        body: "The roof starts generating value instead of only absorbing heat.",
      },
      {
        title: "Lifestyle",
        body: "A new floor of your home. Cooler, calmer, productive.",
      },
    ],
  },
  trust: {
    eyebrow: "Trusted on rooftops across Dhaka",
    headline: "Quietly building a city that powers itself.",
    body: "Residential and commercial rooftops across Dhaka show what distributed rooftop energy can look like.",
    cards: [
      {
        title: "Residential rooftop",
        location: "Gulshan, Dhaka",
        system: "Solar pergola installation",
      },
      {
        title: "Commercial rooftop",
        location: "Mirpur, Dhaka",
        system: "Rooftop solar installation",
      },
      {
        title: "Apartment rooftop",
        location: "Dhanmondi, Dhaka",
        system: "Site-reviewed solar canopy",
      },
    ],
    checklistTitle: "Review factors",
    checklist: ["Roof condition", "Daytime load", "Access", "Shading"],
  },
  finalCta: {
    eyebrow: "Early access",
    headline: "Claim early access for your rooftop review.",
    body:
      "Start on WhatsApp to reserve an early place. NETSO reviews the basics first, then guides the next step from there.",
  },
  howItWorks: {
    eyebrow: "How it works",
    headline: "From first check to operating roof, through one clear process.",
    body:
      "A staged process: first-pass assessment, engineering review, project confirmation, and commissioning.",
    ctaLabel: "Start with a feasibility check",
    steps: [
      {
        title: "Submit",
        body: "Share the basics of your building, roof, and bill so the team can review whether the site looks like a fit.",
        detail: "Quick start",
      },
      {
        title: "Analyze",
        body: "NETSO reviews the roof context, bill profile, and any photos available before advising on the next step.",
        detail: "Engineering review",
      },
      {
        title: "Install",
        body: "After site confirmation, structure, panels, and power electronics are installed to the agreed project scope.",
        detail: "Project-specific",
      },
      {
        title: "Activate",
        body: "The system is commissioned and handed over with the operating guidance needed for everyday use.",
        detail: "Handover",
      },
    ],
  },
  products: {
    eyebrow: "Product · Solar Pergola",
    headline: "One product. Three essential jobs.",
    body:
      "One product. Three jobs: shade, shelter, and energy generation — engineered for Bangladesh's climate and skyline.",
    systemHeadline: "Specifications",
    systemBody: "Built like infrastructure. Lives like architecture.",
    includedTitle: "What's included.",
    included: [
      {
        title: "Modular spans",
        body: "Configured to suit site geometry after survey.",
      },
      {
        title: "Integrated PV",
        body: "Tier-1 monocrystalline panels become the canopy itself.",
      },
      {
        title: "Wind & monsoon rated",
        body: "Engineering is matched to the site brief and rooftop conditions.",
      },
      {
        title: "Smart inverter",
        body: "Hybrid inverter with grid-tie and optional battery support.",
      },
      {
        title: "Underlight system",
        body: "Warm LED strip lighting integrated into the frame.",
      },
      {
        title: "Monitoring app",
        body: "Monitoring access is configured according to project scope.",
      },
    ],
    ctaHeadline: "Ready to model yours?",
    outputBadge: "Output · site-reviewed",
    specs: [
      { label: "Layout", value: "Site-fit" },
      { label: "Structure", value: "Review-led" },
      { label: "Warranty", value: "By scope" },
      { label: "Timeline", value: "After survey" },
    ],
  },
  projects: {
    eyebrow: "Projects",
    headline: "Selected rooftops across Dhaka.",
    body:
      "A mix of residential and commercial rooftop contexts shows how NETSO approaches real sites in the city.",
    filters: ["All", "Residential", "Commercial"],
    cards: [
      {
        title: "Educational campus",
        location: "Chattogram",
        system: "80kW Solar Pergola Installation",
        type: "Commercial",
      },
      {
        title: "RMG factory rooftop",
        location: "Chattogram EPZ",
        system: "150kW Rooftop Solar Installation",
        type: "Commercial",
      },
      {
        title: "Family home rooftop",
        location: "Dhaka",
        system: "3kW Site-reviewed Solar Canopy",
        type: "Residential",
      },
      {
        title: "Commercial building",
        location: "Gulshan, Dhaka",
        system: "60kW Assessment-led Solar Scope",
        type: "Commercial",
      },
      {
        title: "Townhouse rooftop",
        location: "Banani, Dhaka",
        system: "10kW Solar Canopy Concept",
        type: "Residential",
      },
      {
        title: "Apparel facility",
        location: "Gazipur, Dhaka",
        system: "250kW Context-specific rooftop review",
        type: "Commercial",
      },
    ],
    ctaBody: "Add your rooftop to the map.",
    ctaLabel: "Add your rooftop to the map",
  },
  about: {
    eyebrow: "About NETSO",
    headline: "Building Bangladesh's distributed energy backbone — one rooftop at a time.",
    thesisEyebrow: "Our thesis",
    thesisLead: "Bangladesh's next energy layer is already built into the skyline.",
    thesisBody: [
      "Every flat concrete roof in Dhaka is, in effect, a piece of unused energy infrastructure. NETSO exists to activate that infrastructure — turning private rooftops into a distributed, citizen-owned power grid.",
      "We're not a panel installer. We're a platform: design, financing, installation, and lifetime monitoring, built around a single hardware product — the Solar Pergola — that makes the upgrade beautiful, not industrial.",
      "Building the rooftop layer of Bangladesh's energy transition means treating rooftops as long-term infrastructure, not as leftover urban space.",
    ],
    proofEyebrow: "How we work",
    proofCards: [
      {
        title: "Engineering-led",
        body: "Each project starts with roof fit, load context, and real site constraints rather than template sizing.",
      },
      {
        title: "Roof-first",
        body: "The structure, shading, drainage, and access conditions of the roof shape the right scope for the project.",
      },
      {
        title: "Long-term support",
        body: "The goal is an energy asset that stays useful after commissioning, not a one-off installation handoff.",
      },
    ],
    partnersEyebrow: "For partners",
    partnersLead:
      "Developers, investors and institutions: we're building the rooftop layer of Bangladesh's energy transition.",
    partnersBody: [
      "We work with property developers integrating NETSO at design stage, with financiers building rooftop-as-a-service portfolios, and with institutions deploying at scale across staff housing and commercial assets.",
      "For project partnerships, documentation, or scaled deployment conversations, reach out directly.",
      "We believe rooftop infrastructure becomes more valuable when architecture, finance, and energy planning are designed together.",
    ],
  },
  feasibility: {
    eyebrow: "Feasibility check",
    headline: "Let's see what your rooftop can do.",
    body:
      "Share the basics of the building, roof, and bill so NETSO can review whether the site looks like a fit.",
    whatsappHeadline: "Start with a feasibility check",
    whatsappBody:
      "Share the basics first, then continue with the next step when you're ready.",
    fallbackHeadline: "Submit your rooftop details",
    fallbackBody:
      "Tell us about the building, the roof, and your current bill so the team can review the opportunity.",
    successTitle: "Your rooftop is in the queue.",
    successBody:
      "Our team will review what you shared and continue the assessment from there.",
    submit: "Start feasibility review",
    submitAnother: "Submit another rooftop",
  },
};

const bn: SiteCopy = {
  common: {
    brand: "NETSO ENERGY",
    languageLabel: "ভাষা",
    english: "English",
    bangla: "বাংলা",
    startAssessment: "ছাদের সম্ভাবনা দেখুন",
    startOnWhatsApp: "হোয়াটসঅ্যাপে শুরু করুন",
    joinReviewQueue: "আর্লি অ্যাক্সেস নিন",
    runEstimate: "সেভিংস হিসাব করুন",
    continueWhatsApp: "হোয়াটসঅ্যাপে চালিয়ে যান",
    fallbackForm: "ফিজিবিলিটি",
    referenceGallery: "প্রজেক্টস",
  },
  nav: {
    items: [
      { label: "কীভাবে কাজ করে", href: "/how-it-works" },
      { label: "পণ্য", href: "/products" },
      { label: "প্রজেক্টস", href: "/projects" },
      { label: "আমাদের সম্পর্কে", href: "/about" },
    ],
    menuLabel: "মেনু খুলুন",
    intro: "রুফটপ এনার্জি ইনফ্রাস্ট্রাকচার · ঢাকা",
  },
  footer: {
    title: "বাংলাদেশের জন্য রুফটপ এনার্জি ইনফ্রাস্ট্রাকচার।",
    body: "আমরা অব্যবহৃত ছাদকে দীর্ঘমেয়াদি জ্বালানি সম্পদে রূপ দিই — নীরবে, সুন্দরভাবে, স্কেলে।",
    note: "ডিস্ট্রিবিউটেড এনার্জি ইনফ্রাস্ট্রাকচার · মেইড ইন বাংলাদেশ।",
  },
  hero: {
    eyebrow: "রুফটপ এনার্জি ইনফ্রাস্ট্রাকচার · ঢাকা",
    headline: "আপনার ছাদকে বিদ্যুৎ-উৎপাদনকারী সম্পদে রূপ দিন।",
    body:
      "NETSO কারখানার জন্য জিরো-ক্যাপেক্স সোলার এবং বাড়ির জন্য সুন্দর সোলার পারগোলা প্রদান করে। আপনার অব্যবহৃত ছাদকে উৎপাদনশীল জ্বালানি অবকাঠামোয় রূপান্তর করুন।",
    cardEyebrow: "সোলার পারগোলা",
    cardTitle: "যে স্থাপত্য ছায়া দেয়, আশ্রয় দেয়, বিদ্যুৎও উৎপাদন করে।",
    cardBody:
      "ফটোভোল্টাইক প্যানেল-সমন্বিত একটি মডুলার স্টিল ক্যানপি — বাংলাদেশের জলবায়ু ও নগর দৃশ্যের জন্য ইঞ্জিনিয়ার্ড।",
    trustNotes: ["ঢাকার ছাদ", "সোলার পারগোলা", "এনার্জি অ্যাসেট"],
    scrollCue: "রিভিল দেখতে স্ক্রল করুন",
  },
  problem: {
    eyebrow: "সমস্যা",
    headline: "ঢাকায় লক্ষ লক্ষ ছাদ আছে। প্রায় কোনোটাই মূল্য তৈরি করে না।",
    body:
      "অব্যবহৃত ছাদ শহরের উপরেই আছে, কিন্তু বেশিরভাগই শক্তি উৎপাদনের বদলে অগোছালো, উত্তপ্ত এবং আর্থিকভাবে নিষ্ক্রিয় পড়ে থাকে।",
    imageEyebrow: "ছাদের স্তর",
    imageBody: "ঢাকার আকাশদৃশ্যে বিশাল এক অব্যবহৃত ছাদ-স্তর দেখা যায়, যা সক্রিয় হওয়ার অপেক্ষায় আছে।",
    opportunityLabel: "সুযোগ",
    cards: [
      {
        title: "অব্যবহৃত ছাদ",
        body: "ঢাকার বড় বড় ছাদ এখনও জ্বালানি উৎপাদনের বদলে অব্যবহৃত পড়ে আছে।",
      },
      {
        title: "গ্রিড চাপ",
        body: "দিনের চাহিদা ও বিদ্যুৎ বিভ্রাটের ঝুঁকি অনেক ভবনের জন্য অনসাইট জেনারেশনকে আরও মূল্যবান করে তোলে।",
      },
      {
        title: "উচ্চ ট্যারিফ স্ল্যাব",
        body: "মাসিক ব্যবহার উপরের আবাসিক ট্যারিফ স্ল্যাবে গেলে বিল দ্রুত বেড়ে যায়।",
      },
    ],
  },
  system: {
    eyebrow: "সিস্টেম",
    headline: "তিনটি স্তর। এক শান্ত অথচ শক্তিশালী সম্পদ।",
    body:
      "প্রতিটি NETSO ইনস্টলেশন একীভূত একটি সিস্টেম হিসেবে কাজ করে — বাংলাদেশের গ্রিড, আবহাওয়া ও স্থাপত্যের বাস্তবতার জন্য ইঞ্জিনিয়ার্ড।",
    steps: [
      {
        title: "ধরা",
        body: "আর্কিটেকচারাল পারগোলার সাথে একীভূত প্রিমিয়াম ফটোভোল্টাইক প্যানেল সূর্যালোককে নীরবে সারাদিন পরিষ্কার বিদ্যুতে রূপান্তর করে।",
      },
      {
        title: "অপ্টিমাইজ",
        body: "স্মার্ট ইনভার্টার এবং ব্যাটারি অপশন জেনারেশন ও ব্যবহারকে ভারসাম্য রাখে, স্ব-ব্যবহার ও গ্রিড রেজিলিয়েন্সকে অগ্রাধিকার দেয়।",
      },
      {
        title: "সংযোজন",
        body: "দিনের গ্রিড ব্যবহার কমান, ব্যাকআপ প্রস্তুতি বাড়ান, এবং বিদ্যমান ছাদকে আরও কার্যকর সম্পদে পরিণত করুন।",
      },
    ],
  },
  value: {
    eyebrow: "ভ্যালু স্ট্যাক",
    headline: "তিনটি বাস্তব রিটার্ন। এক ইনস্টল।",
    cards: [
      {
        title: "কম বিল",
        body: "দিনের স্ব-ব্যবহার, উৎপাদন ও ব্যবহারের মিল থাকলে, গ্রিড খরচ কমাতে পারে।",
      },
      {
        title: "রেজিলিয়েন্স",
        body: "ঐচ্ছিক ব্যাটারি ব্যাকআপ বিদ্যুৎ না থাকলেও প্রয়োজনীয় লোড চালু রাখতে সাহায্য করে।",
      },
      {
        title: "ছাদের ভালো ব্যবহার",
        body: "একটি ছায়াযুক্ত পারগোলা ছাদের একটি অংশকে আরও আরামদায়ক ও ব্যবহারযোগ্য করতে পারে।",
      },
    ],
  },
  conversionBand: {
    eyebrow: "যেখান থেকে আছেন, সেখান থেকেই শুরু করুন",
    headline: "প্রায় ৬০ সেকেন্ডে আপনার ছাদের রিভিউ শুরু করুন।",
    body:
      "এখনই হোয়াটসঅ্যাপে শুরু করুন। নিচের মৌলিক তথ্য শেয়ার করলে NETSO উপযুক্ততা রিভিউ করে পরের ধাপ জানাবে।",
    checklistTitle: "যা লাগবে",
    checklist: [
      "পূর্ণ নাম",
      "ফোন নম্বর",
      "ঠিকানা",
      "ভবনের ধরন",
      "ছাদের আকার",
      "মাসিক বিল",
    ],
    fallbackBody:
      "কোনো বাধ্যবাধকতা নেই। আপনি যে তথ্য শেয়ার করবেন, NETSO তা দেখে পরের ধাপে যোগাযোগ করবে।",
  },
  mission: {
    text: "বাংলাদেশের জমির সমস্যা নেই। আছে ছাদের সুযোগ।",
  },
  transformation: {
    stages: [
      {
        title: "খালি",
        body: "ঢাকার একটি সাধারণ ছাদ। কংক্রিট, পানির ট্যাঙ্ক, তার।",
      },
      {
        title: "স্ট্রাকচার",
        body: "পরিষ্কার স্টিল পারগোলা — ইঞ্জিনিয়ার্ড, লো-প্রোফাইল, রেজিলিয়েন্ট।",
      },
      {
        title: "সোলার",
        body: "PV প্যানেলই ক্যানপি হয়ে যায়। বিদ্যুৎ প্রবাহ শুরু হয়।",
      },
      {
        title: "পাওয়ার",
        body: "ছাদ শুধু তাপ শোষণ না করে, এখন থেকে মূল্যও তৈরি করতে শুরু করে।",
      },
      {
        title: "লাইফস্টাইল",
        body: "আপনার ঘরের নতুন একটি ফ্লোর। আরও ঠান্ডা, আরও শান্ত, আরও কার্যকর।",
      },
    ],
  },
  trust: {
    eyebrow: "ঢাকার ছাদজুড়ে আস্থা",
    headline: "নীরবে এমন এক শহর গড়ে উঠছে, যা নিজেই শক্তি জোগায়।",
    body: "ঢাকার আবাসিক ও বাণিজ্যিক ছাদগুলো দেখাচ্ছে, ডিস্ট্রিবিউটেড রুফটপ এনার্জি বাস্তবে কেমন হতে পারে।",
    cards: [
      {
        title: "আবাসিক ছাদ",
        location: "গুলশান, ঢাকা",
        system: "সোলার পারগোলা ইনস্টলেশন",
      },
      {
        title: "বাণিজ্যিক ছাদ",
        location: "মিরপুর, ঢাকা",
        system: "রুফটপ সোলার ইনস্টলেশন",
      },
      {
        title: "অ্যাপার্টমেন্ট ছাদ",
        location: "ধানমন্ডি, ঢাকা",
        system: "সাইট-রিভিউড সোলার ক্যানপি",
      },
    ],
    checklistTitle: "রিভিউ ফ্যাক্টর",
    checklist: ["ছাদের অবস্থা", "দিনের লোড", "অ্যাক্সেস", "ছায়া"],
  },
  finalCta: {
    eyebrow: "আর্লি অ্যাক্সেস",
    headline: "আপনার ছাদ রিভিউয়ের জন্য আর্লি অ্যাক্সেস নিন।",
    body:
      "হোয়াটসঅ্যাপে শুরু করে একটি আগাম জায়গা রিজার্ভ করুন। NETSO আগে মৌলিক তথ্য রিভিউ করে, তারপর পরের ধাপ গাইড করবে।",
  },
  howItWorks: {
    eyebrow: "কীভাবে কাজ করে",
    headline: "প্রথম চেক থেকে চালু ছাদ পর্যন্ত, একটি পরিষ্কার প্রক্রিয়ায়।",
    body:
      "একটি ধাপভিত্তিক প্রক্রিয়া: প্রথম-পাস অ্যাসেসমেন্ট, ইঞ্জিনিয়ারিং রিভিউ, প্রজেক্ট কনফার্মেশন, এবং কমিশনিং।",
    ctaLabel: "ফিজিবিলিটি চেক দিয়ে শুরু করুন",
    steps: [
      {
        title: "জমা দিন",
        body: "আপনার বিল্ডিং, ছাদ এবং বিলের মৌলিক তথ্য শেয়ার করুন, যাতে দলটি সাইটটি উপযুক্ত কি না তা রিভিউ করতে পারে।",
        detail: "দ্রুত শুরু",
      },
      {
        title: "বিশ্লেষণ",
        body: "NETSO পরের ধাপ জানাবার আগে ছাদের প্রসঙ্গ, বিল প্রোফাইল, এবং পাওয়া ছবি রিভিউ করে।",
        detail: "ইঞ্জিনিয়ারিং রিভিউ",
      },
      {
        title: "ইনস্টল",
        body: "সাইট কনফার্ম হওয়ার পর, স্ট্রাকচার, প্যানেল ও পাওয়ার ইলেক্ট্রনিক্স সম্মত প্রজেক্ট স্কোপ অনুযায়ী ইনস্টল করা হয়।",
        detail: "প্রজেক্ট-নির্দিষ্ট",
      },
      {
        title: "চালু করুন",
        body: "সিস্টেম কমিশন করা হয় এবং দৈনন্দিন ব্যবহারের জন্য প্রয়োজনীয় অপারেটিং গাইডেন্সসহ হস্তান্তর করা হয়।",
        detail: "হ্যান্ডওভার",
      },
    ],
  },
  products: {
    eyebrow: "পণ্য · সোলার পারগোলা",
    headline: "একটি পণ্য। তিনটি জরুরি কাজ।",
    body:
      "একটি পণ্য। তিনটি কাজ: ছায়া, আশ্রয়, এবং বিদ্যুৎ উৎপাদন — বাংলাদেশের জলবায়ু ও নগর প্রেক্ষাপটের জন্য ইঞ্জিনিয়ার্ড।",
    systemHeadline: "স্পেসিফিকেশন",
    systemBody: "ইনফ্রাস্ট্রাকচারের মতো নির্মিত। স্থাপত্যের মতো বসবাসযোগ্য।",
    includedTitle: "যা অন্তর্ভুক্ত।",
    included: [
      {
        title: "মডুলার স্প্যান",
        body: "সার্ভের পরে সাইট জ্যামিতি অনুযায়ী কনফিগার করা হয়।",
      },
      {
        title: "ইন্টিগ্রেটেড PV",
        body: "টিয়ার-১ মনোক্রিস্টালাইন প্যানেলই ক্যানপি হয়ে যায়।",
      },
      {
        title: "বাতাস ও বর্ষা-উপযোগী",
        body: "ইঞ্জিনিয়ারিং সাইট ব্রিফ ও ছাদের বাস্তব পরিস্থিতির সাথে মানানসই করা হয়।",
      },
      {
        title: "স্মার্ট ইনভার্টার",
        body: "গ্রিড-টাই ও ঐচ্ছিক ব্যাটারি সাপোর্টসহ হাইব্রিড ইনভার্টার।",
      },
      {
        title: "আন্ডারলাইট সিস্টেম",
        body: "ফ্রেমের মধ্যে ইন্টিগ্রেটেড উষ্ণ LED স্ট্রিপ লাইটিং।",
      },
      {
        title: "মনিটরিং অ্যাপ",
        body: "মনিটরিং অ্যাক্সেস প্রজেক্ট স্কোপ অনুযায়ী কনফিগার করা হয়।",
      },
    ],
    ctaHeadline: "আপনারটির মডেল করতে প্রস্তুত?",
    outputBadge: "আউটপুট · সাইট-রিভিউড",
    specs: [
      { label: "লেয়াউট", value: "সাইট-ফিট" },
      { label: "স্ট্রাকচার", value: "রিভিউ-লেড" },
      { label: "ওয়ারেন্টি", value: "স্কোপ অনুযায়ী" },
      { label: "টাইমলাইন", value: "সার্ভের পরে" },
    ],
  },
  projects: {
    eyebrow: "প্রজেক্টস",
    headline: "ঢাকার বাছাইকৃত ছাদসমূহ।",
    body:
      "আবাসিক ও বাণিজ্যিক রুফটপ কনটেক্সটের মিশ্রণ দেখায়, NETSO শহরের বাস্তব সাইটগুলোতে কীভাবে কাজ করে।",
    filters: ["সব", "আবাসিক", "বাণিজ্যিক"],
    cards: [
      {
        title: "শিক্ষাপ্রতিষ্ঠান ক্যাম্পাস",
        location: "চট্টগ্রাম",
        system: "৮০ কিলোওয়াট সোলার পারগোলা ইনস্টলেশন",
        type: "Commercial",
      },
      {
        title: "তৈরি পোশাক কারখানা",
        location: "চট্টগ্রাম ইপিজেড",
        system: "১৫০ কিলোওয়াট রুফটপ সোলার ইনস্টলেশন",
        type: "Commercial",
      },
      {
        title: "পারিবারিক বাড়ির ছাদ",
        location: "ঢাকা",
        system: "৩ কিলোওয়াট সাইট-রিভিউড সোলার ক্যানপি",
        type: "Residential",
      },
      {
        title: "বাণিজ্যিক ভবন",
        location: "গুলশান, ঢাকা",
        system: "৬০ কিলোওয়াট অ্যাসেসমেন্ট-নির্ভর সোলার স্কোপ",
        type: "Commercial",
      },
      {
        title: "টাউনহাউস ছাদ",
        location: "বনানী, ঢাকা",
        system: "১০ কিলোওয়াট সোলার ক্যানপি কনসেপ্ট",
        type: "Residential",
      },
      {
        title: "অ্যাপারেল ফ্যাসিলিটি",
        location: "গাজীপুর, ঢাকা",
        system: "২৫০ কিলোওয়াট প্রেক্ষাপট-নির্দিষ্ট রুফটপ রিভিউ",
        type: "Commercial",
      },
    ],
    ctaBody: "আপনার ছাদকেও এই মানচিত্রে যুক্ত করুন।",
    ctaLabel: "আপনার ছাদ যোগ করুন",
  },
  about: {
    eyebrow: "NETSO সম্পর্কে",
    headline: "বাংলাদেশের ডিস্ট্রিবিউটেড এনার্জি ব্যাকবোন গড়ে তোলা — এক ছাদ করে।",
    thesisEyebrow: "আমাদের থিসিস",
    thesisLead: "বাংলাদেশের পরের এনার্জি স্তর ইতিমধ্যেই স্কাইলাইনে তৈরি আছে।",
    thesisBody: [
      "ঢাকার প্রতিটি সমতল কংক্রিট ছাদ আসলে অব্যবহৃত জ্বালানি অবকাঠামোর একটি অংশ। NETSO সেই অবকাঠামো সক্রিয় করতে কাজ করে — ব্যক্তিমালিকানাধীন ছাদকে ডিস্ট্রিবিউটেড, নাগরিক-মালিকানাধীন বিদ্যুৎ গ্রিডে রূপান্তর করে।",
      "আমরা শুধু প্যানেল ইনস্টলার নই। আমরা একটি প্ল্যাটফর্ম: ডিজাইন, ফাইন্যান্সিং, ইনস্টলেশন এবং লাইফটাইম মনিটরিং — সবকিছু একটি হার্ডওয়্যার প্রোডাক্ট, সোলার পারগোলাকে ঘিরে, যা আপগ্রেডটিকে শিল্প-কারখানার মতো নয়, বরং সুন্দর করে তোলে।",
      "বাংলাদেশের এনার্জি ট্রানজিশনের রুফটপ স্তর গড়তে হলে ছাদকে অবশিষ্ট নগর জায়গা হিসেবে নয়, দীর্ঘমেয়াদি ইনফ্রাস্ট্রাকচার হিসেবে দেখতে হবে।",
    ],
    proofEyebrow: "আমরা যেভাবে কাজ করি",
    proofCards: [
      {
        title: "ইঞ্জিনিয়ারিং-নির্ভর",
        body: "প্রতিটি প্রজেক্ট শুরু হয় ছাদের ফিট, লোড কনটেক্সট, এবং বাস্তব সাইট সীমাবদ্ধতা দিয়ে; টেমপ্লেট-সাইজিং দিয়ে নয়।",
      },
      {
        title: "রুফ-ফার্স্ট",
        body: "স্ট্রাকচার, শেডিং, ড্রেনেজ, এবং অ্যাক্সেস কন্ডিশনই প্রজেক্টের সঠিক স্কোপ নির্ধারণ করে।",
      },
      {
        title: "দীর্ঘমেয়াদি সাপোর্ট",
        body: "লক্ষ্য হলো কমিশনিংয়ের পরেও কার্যকর থাকে এমন একটি এনার্জি অ্যাসেট; শুধু একবারের ইনস্টলেশন হ্যান্ডওভার নয়।",
      },
    ],
    partnersEyebrow: "পার্টনারদের জন্য",
    partnersLead:
      "ডেভেলপার, ইনভেস্টর ও ইনস্টিটিউশন: আমরা বাংলাদেশের এনার্জি ট্রানজিশনের রুফটপ স্তর গড়ে তুলছি।",
    partnersBody: [
      "আমরা সেই প্রপার্টি ডেভেলপারদের সাথে কাজ করি, যারা ডিজাইন পর্যায়েই NETSO একীভূত করতে চান; সেই ফাইন্যান্সারদের সাথে কাজ করি, যারা rooftop-as-a-service পোর্টফোলিও তৈরি করছেন; এবং সেই প্রতিষ্ঠানগুলোর সাথে কাজ করি, যারা স্টাফ হাউজিং ও বাণিজ্যিক সম্পদজুড়ে স্কেলে ডিপ্লয় করতে চান।",
      "প্রজেক্ট পার্টনারশিপ, ডকুমেন্টেশন, অথবা স্কেলড ডিপ্লয়মেন্ট নিয়ে আলোচনা করতে চাইলে সরাসরি যোগাযোগ করুন।",
      "আমরা বিশ্বাস করি, আর্কিটেকচার, ফাইন্যান্স এবং এনার্জি প্ল্যানিং একসাথে ডিজাইন করা হলে রুফটপ ইনফ্রাস্ট্রাকচারের মূল্য আরও বাড়ে।",
    ],
  },
  feasibility: {
    eyebrow: "ফিজিবিলিটি চেক",
    headline: "চলুন দেখি আপনার ছাদ কী করতে পারে।",
    body:
      "বিল্ডিং, ছাদ, এবং বিলের মৌলিক তথ্য শেয়ার করুন, যাতে NETSO রিভিউ করতে পারে সাইটটি উপযুক্ত কি না।",
    whatsappHeadline: "ফিজিবিলিটি চেক দিয়ে শুরু করুন",
    whatsappBody:
      "প্রথমে মৌলিক তথ্য শেয়ার করুন, তারপর প্রস্তুত হলে পরের ধাপে যান।",
    fallbackHeadline: "আপনার ছাদের তথ্য জমা দিন",
    fallbackBody:
      "বিল্ডিং, ছাদ, এবং বর্তমান বিল সম্পর্কে জানান, যাতে দলটি সুযোগটি রিভিউ করতে পারে।",
    successTitle: "আপনার ছাদ এখন কিউ-তে আছে।",
    successBody:
      "আপনি যা শেয়ার করেছেন, আমাদের দল তা দেখে সেখান থেকে মূল্যায়ন চালিয়ে যাবে।",
    submit: "ফিজিবিলিটি রিভিউ শুরু করুন",
    submitAnother: "আরেকটি ছাদ জমা দিন",
  },
};

const copyByLanguage: Record<Language, SiteCopy> = { en, bn };

export function useSiteCopy() {
  const { language } = useLanguage();
  return copyByLanguage[language];
}
