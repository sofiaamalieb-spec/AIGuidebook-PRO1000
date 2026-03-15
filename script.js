// Translation Data
const translations = {
  en: {
    siteTitle: "AI for Students",
    siteSubtitle: "Using AI Responsibly in Your Studies",
    navPrompts: "Prompts",
    navQuotations: "Examples and Prompts",
    navConcerns: "Ethics, copyright and plagiarism",
    navWhatIsAI: "What is AI",
    navRules: "Rules",
    footerText: "© 2026 AI for Students - Educational Resource for Responsible AI Use",
    footerAccessibility: "Designed with universal accessibility principles in mind",
    homeWelcomeTitle: "Welcome to AI for Students",
    homeWelcomeText: "This guide will help you use AI tools responsibly and effectively in your studies. Learn best practices, understand the risks, and become a confident, ethical AI user.",
    homePromptsTitle: "Writing Good Prompts",
    homePromptsDesc: "Learn how to craft effective prompts by defining roles, output formats, and tone.",
    homeQuotationsTitle: "Citing AI Sources",
    homeQuotationsDesc: "Understand APA7 citation style for AI tools and avoid academic integrity issues.",
    homeConcernsTitle: "Important Concerns",
    homeConcernsDesc: "Be aware of copyright, privacy, AI hallucinations, and bias in training data.",
    homeWhatIsAITitle: "What is AI?",
    homeWhatIsAIDesc: "Discover how language models work and how they're trained on data.",
    homeRulesTitle: "Usage Rules",
    homeRulesDesc: "Clear guidelines for allowed and not-allowed use of AI in student work.",
    homeQuickTipsTitle: "Quick Tips for Responsible AI Use",
    homeTip1: "Always cite when you use AI tools in your work",
    homeTip2: "Verify facts - AI can make mistakes or \"hallucinate\" information",
    homeTip3: "Protect privacy - Never share sensitive personal information with AI",
    homeTip4: "Use AI as a tool - Not a replacement for your own learning and thinking",
  },
  no: {
    siteTitle: "AI for Studenter",
    siteSubtitle: "Ansvarlig bruk av AI i dine studier",
    navPrompts: "Prompter",
    navQuotations: "Eksempler og prompter",
    navConcerns: "Etikk, opphavsrett og plagiat",
    navWhatIsAI: "Hva er AI",
    navRules: "Regler",
    footerText: "© 2026 AI for Studenter - Pedagogisk ressurs for ansvarlig AI-bruk",
    footerAccessibility: "Designet med universelle tilgjengelighetsprinsipper",
    homeWelcomeTitle: "Velkommen til AI for Studenter",
    homeWelcomeText: "Denne guiden vil hjelpe deg å bruke AI-verktøy ansvarlig og effektivt i studiene dine. Lær beste praksis, forstå risikoene, og bli en trygg, etisk AI-bruker.",
    homePromptsTitle: "Skrive gode prompter",
    homePromptsDesc: "Lær hvordan du lager effektive prompter ved å definere roller, utdataformater og tone.",
    homeQuotationsTitle: "Sitere AI-kilder",
    homeQuotationsDesc: "Forstå APA7-siteringsstil for AI-verktøy og unngå problemer med akademisk integritet.",
    homeConcernsTitle: "Viktige bekymringer",
    homeConcernsDesc: "Vær oppmerksom på opphavsrett, personvern, AI-hallusinasjoner og skjevheter i treningsdata.",
    homeWhatIsAITitle: "Hva er AI?",
    homeWhatIsAIDesc: "Oppdag hvordan språkmodeller fungerer og hvordan de trenes på data.",
    homeRulesTitle: "Bruksregler",
    homeRulesDesc: "Klare retningslinjer for tillatt og ikke-tillatt bruk av KI i studiearbeid.",
    homeQuickTipsTitle: "Raske tips for ansvarlig AI-bruk",
    homeTip1: "Siter alltid når du bruker AI-verktøy i arbeidet ditt",
    homeTip2: "Verifiser fakta - AI kan gjøre feil eller \"hallusinere\" informasjon",
    homeTip3: "Beskytt personvern - Del aldri sensitiv personlig informasjon med AI",
    homeTip4: "Bruk AI som et verktøy - Ikke en erstatning for din egen læring og tenkning",
  }
};

// State
let currentLanguage = localStorage.getItem('language') || 'en';
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initLanguage();
  initFontSize();
  initNavigation();
  
  // Language toggle
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
  }
  
  // Font size toggle
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  if (fontSizeBtn) {
    fontSizeBtn.addEventListener('click', increaseFontSize);
  }
});

// Language Functions
function initLanguage() {
  updateLanguage();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'no' : 'en';
  localStorage.setItem('language', currentLanguage);
  updateLanguage();
}

function updateLanguage() {
  // Update flag icon
  const flagIcon = document.getElementById('flagIcon');
  if (flagIcon) {
    if (currentLanguage === 'en') {
      flagIcon.src = 'https://flagcdn.com/w80/gb.png';
      flagIcon.alt = 'English';
      document.documentElement.lang = 'en';
    } else {
      flagIcon.src = 'https://flagcdn.com/w80/no.png';
      flagIcon.alt = 'Norsk';
      document.documentElement.lang = 'no';
    }
  }
  
  // Update all translatable elements
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
}

// Font Size Functions
function initFontSize() {
  updateFontSize();
}

function increaseFontSize() {
  currentFontSize += 10;
  if (currentFontSize > 130) {
    currentFontSize = 100;
  }
  localStorage.setItem('fontSize', currentFontSize);
  updateFontSize();
}

function updateFontSize() {
  const body = document.body;
  const display = document.getElementById('fontSizeDisplay');
  
  // Remove all font classes
  body.classList.remove('font-medium', 'font-large', 'font-xlarge');
  
  // Add appropriate class
  if (currentFontSize === 110) {
    body.classList.add('font-medium');
  } else if (currentFontSize === 120) {
    body.classList.add('font-large');
  } else if (currentFontSize === 130) {
    body.classList.add('font-xlarge');
  }
  
  // Update display
  if (display) {
    display.textContent = currentFontSize + '%';
  }
}

// Navigation Active State
function initNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Export for use in other contexts if needed
window.translate = function(key) {
  return translations[currentLanguage][key] || key;
};
