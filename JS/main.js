// DOM Elements
const navbar = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const scrollDownBtn = document.querySelector('.scroll-down');
const accordionTogglers = document.querySelectorAll('.accordian_toggler');
const form = document.querySelector('form');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.querySelector('.navbar-collapse');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const html = document.documentElement;
const body = document.body;

// Theme toggle functionality

// Initialize theme
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(savedTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Mobile Menu Functionality
function initMobileMenu() {
    // Toggle mobile menu
    function toggleMobileMenu() {
        if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay) return;
        
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            // Open menu
            body.style.overflow = 'hidden';
            mobileMenu.classList.add('show');
            mobileMenuOverlay.classList.add('show');
            
            // Add event listeners for closing on overlay click or escape key
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
            document.addEventListener('keydown', handleEscapeKey);
            
            // Add click outside handler
            document.addEventListener('click', handleClickOutside);
        } else {
            closeMobileMenu();
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay) return;
        
        body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('show');
        mobileMenuOverlay.classList.remove('show');
        
        // Remove event listeners
        mobileMenuOverlay.removeEventListener('click', closeMobileMenu);
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', handleClickOutside);
    }
    
    // Handle click outside menu
    function handleClickOutside(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && 
            mobileMenuToggle && !mobileMenuToggle.contains(e.target) &&
            mobileMenuOverlay && mobileMenuOverlay.contains(e.target)) {
            closeMobileMenu();
        }
    }
    
    // Handle escape key press
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Only for mobile
                closeMobileMenu();
            }
        });
    });
    
    // Initialize mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleMobileMenu();
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Event Listeners
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Close menu when window is resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        closeMobileMenu();
    }
});

// Initialize Sponsor Carousel
function initSponsorCarousel() {
    const track = document.querySelector('.sponsors-track');
    if (!track) return;
    
    // Clone the first set of sponsors and append to the end for seamless looping
    const items = track.querySelectorAll('.sponsor-item');
    const firstSet = Array.from(items).slice(0, 3); // Get first 3 items (original set)
    
    // Add event listeners for smooth animation
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Handle animation iteration to create infinite loop effect
    track.addEventListener('animationiteration', () => {
        // Reset position when animation restarts
        track.style.animation = 'none';
        track.offsetHeight; // Trigger reflow
        track.style.animation = 'scroll 30s linear infinite';
    });
}

// Handle navbar scroll behavior
function handleNavbarScroll() {
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > heroHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const accordions = document.querySelectorAll('.accordian');
    
    accordions.forEach(accordion => {
        const head = accordion.querySelector('.accordian_head');
        
        head.addEventListener('click', () => {
            // Close all other accordions
            accordions.forEach(acc => {
                if (acc !== accordion && acc.classList.contains('active')) {
                    acc.classList.remove('active');
                    const body = acc.querySelector('.accordian_body');
                    body.style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            accordion.classList.toggle('active');
            const body = accordion.querySelector('.accordian_body');
            
            if (accordion.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                body.style.maxHeight = null;
            }
        });
        
        // Close accordion when clicking outside
        document.addEventListener('click', (e) => {
            if (!accordion.contains(e.target)) {
                accordion.classList.remove('active');
                const body = accordion.querySelector('.accordian_body');
                body.style.maxHeight = null;
            }
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Set initial navbar state
    handleNavbarScroll();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Close any open mobile menu on page load (in case of page refresh)
    if (mobileMenu && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('show');
        body.style.overflow = '';
    }
    
    // Initialize mobile menu functionality
    if (mobileMenuToggle && mobileMenu && mobileMenuOverlay) {
        initMobileMenu();
    }
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize sponsor carousel
    initSponsorCarousel();
    
    // Add scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll down button
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight - 80,
            behavior: 'smooth'
        });
    });
}

// Accordion functionality
accordionTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        const accordion = toggler.closest('.accordian');
        const accordionBody = accordion.querySelector('.accordian_body');
        
        // Toggle active class
        toggler.classList.toggle('active');
        accordionBody.classList.toggle('active_body');
    });
});

// Form submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Add animation class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Initialize animations for other elements
    animateOnScroll();
});
