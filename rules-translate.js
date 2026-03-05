// Handle bilingual content switching for rules page
document.addEventListener('DOMContentLoaded', function() {
  updateRulesLanguage();
  
  // Listen for language toggle
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      setTimeout(updateRulesLanguage, 50);
    });
  }
});

function updateRulesLanguage() {
  const currentLang = localStorage.getItem('language') || 'en';
  
  // Show/hide language-specific content
  const enElements = document.querySelectorAll('[lang="en"]');
  const noElements = document.querySelectorAll('[lang="no"]');
  
  if (currentLang === 'en') {
    enElements.forEach(el => el.style.display = '');
    noElements.forEach(el => el.style.display = 'none');
  } else {
    enElements.forEach(el => el.style.display = 'none');
    noElements.forEach(el => el.style.display = '');
  }
}
