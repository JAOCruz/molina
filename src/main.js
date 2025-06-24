import { translations } from './translations.js';

// Function to update text based on selected language
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = translations[lang][key];
        if (element.tagName === 'TITLE') {
            document.title = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}

// Initialize language
const savedLang = localStorage.getItem('language') || 'es';
updateLanguage(savedLang);
document.getElementById('language-switcher').value = savedLang;
document.getElementById('language-switcher-mobile').value = savedLang;

// Language switcher event listeners
document.getElementById('language-switcher').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
    document.getElementById('language-switcher-mobile').value = e.target.value;
});
document.getElementById('language-switcher-mobile').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
    document.getElementById('language-switcher').value = e.target.value;
});

window.toggleMenu = function() {
    console.log('toggleMenu called');
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
    
    const menuButton = document.querySelector('nav button');
    const spans = menuButton.querySelectorAll('span');
    
    spans.forEach((span, index) => {
        if (menu.classList.contains('active')) {
            span.style.transform = index === 0 ? 'rotate(-45deg)' : 'rotate(45deg)';
        } else {
            span.style.transform = 'none';
        }
    });
}

// Ensure mobile menu is hidden on page load
window.addEventListener('load', function () {
    console.log('Page loaded, hiding mobile menu');
    const menu = document.querySelector('.mobile-menu');
    menu.classList.remove('active');
});

// Close mobile menu on link click (for both click and touch events)
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', function () {
        console.log('Mobile menu link clicked');
        window.toggleMenu();
    });
    link.addEventListener('touchstart', function () {
        console.log('Mobile menu link touched');
        window.toggleMenu();
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Smooth scrolling triggered for:', this.getAttribute('href'));
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 