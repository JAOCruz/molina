import { translations } from './translations.js';

// Debug environment variables
console.log('All environment variables (client-side):', import.meta.env);
console.log('NODE_ENV:', import.meta.env.NODE_ENV);
console.log('DEV mode:', import.meta.env.DEV);

// List all VITE_ prefixed variables
Object.keys(import.meta.env).forEach(key => {
  if (key.startsWith('VITE_')) {
    console.log(`Found env var: ${key} = ${import.meta.env[key]}`);
  }
});

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

// Image loading from environment variables
function loadImages() {
    console.log('Loading images...');
    
    const imageMap = {
      'img-hero': import.meta.env.VITE_IMG_HERO,
      'img-profile': import.meta.env.VITE_IMG_PROFILE,
      'img-cnm-logo': import.meta.env.VITE_IMG_CNM_LOGO,
      'img-cnm': import.meta.env.VITE_IMG_CNM,
      'img-director': import.meta.env.VITE_IMG_DIRECTOR,
      'img-kennedy': import.meta.env.VITE_IMG_KENNEDY,
      'img-awards': import.meta.env.VITE_IMG_AWARDS,
      'img-osn-logo': import.meta.env.VITE_IMG_OSN_LOGO,
      'img-performance1': import.meta.env.VITE_IMG_PERFORMANCE1,
      'img-performance2': import.meta.env.VITE_IMG_PERFORMANCE2
    };
    
    console.log('Image map:', imageMap);
  
    // Set src attribute for each image
    Object.entries(imageMap).forEach(([id, src]) => {
      const imgElement = document.getElementById(id);
      console.log(`Processing ${id}: element found = ${!!imgElement}, src = ${src}`);
      
      if (imgElement && src) {
        imgElement.src = src;
        
        imgElement.onerror = function() {
          console.error(`Failed to load image: ${id} - ${src}`);
        };
        
        imgElement.onload = function() {
          console.log(`Successfully loaded: ${id}`);
        };
      } else if (!src) {
        console.warn(`No environment variable found for ${id}`);
      } else if (!imgElement) {
        console.warn(`No DOM element found with id: ${id}`);
      }
    });
}
  
// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', loadImages);

// If you're using this as a module, you can also call it immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadImages);
} else {
  loadImages();
}