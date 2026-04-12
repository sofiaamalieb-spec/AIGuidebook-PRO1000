// State
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initFontSize();
  initNavigation();
  initHamburgerMenu();
  initAccordions();
  initChecklist();
  initBackToTop();
  
  // Font size toggle
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  if (fontSizeBtn) {
    fontSizeBtn.addEventListener('click', increaseFontSize);
  }
});

// Language Functions
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

// Hamburger Menu Toggle
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.setAttribute('aria-expanded', 'false');

    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    hamburgerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.focus();
      }
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Accordion / Collapsible Sections
function initAccordions() {
  // .is-collapsible style (rule-header / section-header): uses 'collapsed' class to hide
  document.querySelectorAll('.is-collapsible').forEach(function(header) {
    header.addEventListener('click', function() {
      toggleCollapsibleSection(header);
    });
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCollapsibleSection(header);
      }
    });
  });

  // button.accordion-header style (examples.html): uses 'open' class to show
  document.querySelectorAll('button.accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
      toggleAccordionButton(header);
    });
  });

  // On mobile, collapse all sections by default
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelectorAll('.is-collapsible').forEach(function(header) {
      setCollapsibleState(header, false);
    });
    document.querySelectorAll('button.accordion-header').forEach(function(header) {
      setAccordionButtonState(header, false);
    });
  }
}

function setCollapsibleState(header, isOpen) {
  var contentId = header.getAttribute('aria-controls');
  if (!contentId) return;
  var content = document.getElementById(contentId);
  if (!content) return;
  var icon = header.querySelector('.accordion-icon');

  content.classList.toggle('collapsed', !isOpen);
  header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (icon) {
    icon.classList.toggle('open', isOpen);
  }
}

function toggleCollapsibleSection(header) {
  var contentId = header.getAttribute('aria-controls');
  if (!contentId) return;
  var content = document.getElementById(contentId);
  if (!content) return;

  var isOpen = !content.classList.contains('collapsed');
  setCollapsibleState(header, !isOpen);
}

function setAccordionButtonState(header, isOpen) {
  var contentId = header.getAttribute('aria-controls');
  if (!contentId) return;
  var content = document.getElementById(contentId);
  if (!content) return;
  var icon = header.querySelector('.accordion-icon');

  content.classList.toggle('open', isOpen);
  header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (icon) {
    icon.classList.toggle('open', isOpen);
  }
}

function toggleAccordionButton(header) {
  var contentId = header.getAttribute('aria-controls');
  if (!contentId) return;
  var content = document.getElementById(contentId);
  if (!content) return;

  var isOpen = content.classList.contains('open');
  setAccordionButtonState(header, !isOpen);
}

function initChecklist() {
  const checklist = document.querySelectorAll('.ai-check');
  const progress = document.getElementById('checklist-progress');
  const completionMessage = document.getElementById('checklist-complete');
  const resetButton = document.getElementById('resetChecklist');

  if (!checklist.length || !progress || !completionMessage || !resetButton) {
    return;
  }

  const updateChecklistState = () => {
    const completed = Array.from(checklist).filter(item => item.checked).length;
    const total = checklist.length;

    progress.textContent = `${completed} av ${total} fullført`;
    completionMessage.classList.toggle('visible', completed === total);
  };

  checklist.forEach(item => {
    item.addEventListener('change', updateChecklistState);
  });

  resetButton.addEventListener('click', () => {
    checklist.forEach(item => {
      item.checked = false;
    });

    updateChecklistState();
  });

  updateChecklistState();
}

// Gå til toppen-knapp
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('is-visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const logo = document.querySelector('.logo');
    if (logo) logo.focus();
  });
}

// Export for use in other contexts if needed
