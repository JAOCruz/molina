import { translations } from './translations.js';

// ═══════════════════════════════════════════
// PRELOADER
// ═══════════════════════════════════════════
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    }
});

// ═══════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX - 2 + 'px';
        cursorDot.style.top = mouseY - 2 + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state
    document.querySelectorAll('a, button, select, .video-thumb, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// ═══════════════════════════════════════════
// LANGUAGE SYSTEM
// ═══════════════════════════════════════════
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
            if (element.tagName === 'TITLE') {
                document.title = translations[lang][key];
            }
        }
    });
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}

const savedLang = localStorage.getItem('language') || 'es';
updateLanguage(savedLang);
document.getElementById('language-switcher').value = savedLang;
document.getElementById('language-switcher-mobile').value = savedLang;

document.getElementById('language-switcher').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
    document.getElementById('language-switcher-mobile').value = e.target.value;
});
document.getElementById('language-switcher-mobile').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
    document.getElementById('language-switcher').value = e.target.value;
});

// ═══════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════
window.toggleMenu = function() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
    const spans = document.querySelector('nav button').querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = menu.classList.contains('active')
            ? (index === 0 ? 'rotate(-45deg)' : 'rotate(45deg)')
            : 'none';
    });
};

window.addEventListener('load', () => {
    document.querySelector('.mobile-menu')?.classList.remove('active');
});

document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => window.toggleMenu());
});

// ═══════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            window.scrollTo({
                top: targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ═══════════════════════════════════════════
// HERO PARALLAX
// ═══════════════════════════════════════════
const heroImg = document.querySelector('.hero-parallax-img');
if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    heroImg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.05)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ═══════════════════════════════════════════
// SCROLL REVEAL (IntersectionObserver)
// ═══════════════════════════════════════════
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════
// NAV BACKGROUND ON SCROLL
// ═══════════════════════════════════════════
function setupNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.borderBottomColor = 'rgba(201, 169, 97, 0.15)';
        } else {
            nav.style.borderBottomColor = 'rgba(201, 169, 97, 0.05)';
        }
    });
}

// ═══════════════════════════════════════════
// IMAGE LOADING
// ═══════════════════════════════════════════
function loadImages() {
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
        'img-performance2': import.meta.env.VITE_IMG_PERFORMANCE2,
        'img-papa-molina': import.meta.env.VITE_IMG_PAPA_MOLINA
    };

    Object.entries(imageMap).forEach(([id, src]) => {
        const imgElement = document.getElementById(id);
        if (imgElement && src) {
            imgElement.src = src;
            imgElement.onload = () => imgElement.classList.add('loaded');
            imgElement.onerror = () => console.warn(`Failed to load: ${id}`);
        }
    });
}

// ═══════════════════════════════════════════
// VIDEO LOADING
// ═══════════════════════════════════════════
function loadVideos() {
    const videoMap = {
        'video-1': import.meta.env.VITE_VIDEO1,
        'video-2': import.meta.env.VITE_VIDEO2,
        'video-3': import.meta.env.VITE_VIDEO3,
        'video-4': import.meta.env.VITE_VIDEO4
    };

    const titleMap = {};
    ['video-1', 'video-2', 'video-3', 'video-4'].forEach((id, i) => {
        const el = document.querySelector(`[data-i18n="video${i + 1}_title"]`);
        if (el) titleMap[id] = el.textContent;
    });

    // Set thumbnail sources
    Object.entries(videoMap).forEach(([id, src]) => {
        const thumb = document.getElementById(`thumb-${id}`);
        if (thumb && src) {
            const source = thumb.querySelector('source');
            if (source) { source.src = src; thumb.load(); }
        }
    });

    const mainVideo = document.getElementById('main-video');
    const mainSource = mainVideo?.querySelector('source');
    const mainTitle = document.getElementById('main-video-title');

    function switchMainVideo(id) {
        if (mainSource && videoMap[id]) {
            mainSource.src = videoMap[id];
            mainVideo.load();
        }
        if (mainTitle) mainTitle.textContent = titleMap[id] || '';
        // Active state
        document.querySelectorAll('.video-thumb video').forEach(v => {
            v.classList.remove('video-thumb-active');
            v.classList.add('border-white/10');
        });
        const activeThumb = document.getElementById(`thumb-${id}`);
        if (activeThumb) {
            activeThumb.classList.add('video-thumb-active');
            activeThumb.classList.remove('border-white/10');
        }
    }

    switchMainVideo('video-1');

    document.querySelectorAll('.video-thumb').forEach(thumbDiv => {
        thumbDiv.addEventListener('click', function() {
            switchMainVideo(this.getAttribute('data-video'));
        });
    });
}

// ═══════════════════════════════════════════
// HERO TITLE ANIMATION
// ═══════════════════════════════════════════
function animateHeroTitle() {
    const lines = document.querySelectorAll('.hero-title-line');
    lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(100%)';
        setTimeout(() => {
            line.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 800 + i * 300);
    });
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
function init() {
    loadImages();
    loadVideos();
    setupScrollReveal();
    setupNavScroll();
    animateHeroTitle();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
