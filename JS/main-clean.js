// Clean Main JavaScript - Essential Functions Only
console.log('Main script loaded');

// Theme functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'dark') {
            if (moonIcon) moonIcon.classList.add('d-none');
            if (sunIcon) sunIcon.classList.remove('d-none');
        } else {
            if (moonIcon) moonIcon.classList.remove('d-none');
            if (sunIcon) sunIcon.classList.add('d-none');
        }
    }
}

function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
                const headerOffset = 80;
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    try {
        // Initialize theme
        initTheme();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Add theme toggle listener
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Add scroll listener for navbar
        window.addEventListener('scroll', handleNavbarScroll);
        
        // Initial navbar state
        handleNavbarScroll();
        
        // Initialize cursor trail
        initCursorTrail();
        
        // Initialize mobile navigation
        initMobileNavigation();
        
        // Add resize listener
        window.addEventListener('resize', handleResize);
        
        console.log('Main script initialization complete');
    } catch (error) {
        console.error('Error in main script:', error);
    }
});

// Window load backup
window.addEventListener('load', function() {
    console.log('Window loaded');
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Cursor Trail Effect
function initCursorTrail() {
    // Only initialize on desktop devices
    if (window.innerWidth <= 768) return;
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const speed = 0.2;
        
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
    
    console.log('Cursor trail initialized');
}// Mob
ile Navigation
function initMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!mobileToggle || !navbarCollapse) return;
    
    mobileToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        navbarCollapse.classList.toggle('show');
        
        if (mobileOverlay) {
            mobileOverlay.classList.toggle('show');
        }
        
        // Toggle hamburger animation
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            mobileToggle.setAttribute('aria-expanded', 'false');
            navbarCollapse.classList.remove('show');
            this.classList.remove('show');
            mobileToggle.classList.remove('active');
        });
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navbarCollapse.classList.remove('show');
                if (mobileOverlay) mobileOverlay.classList.remove('show');
                mobileToggle.classList.remove('active');
            }
        });
    });
}

// Responsive utilities
function handleResize() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (window.innerWidth > 991) {
        // Desktop view - ensure mobile menu is closed
        if (navbarCollapse) navbarCollapse.classList.remove('show');
        if (mobileOverlay) mobileOverlay.classList.remove('show');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.classList.remove('active');
        }
    }
}