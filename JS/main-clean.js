/**
 * IoT KJSIT Website - Modular JavaScript
 * Clean, organized, and bug-free implementation
 */

// =============================================================================
// THEME MODULE
// =============================================================================
const ThemeModule = {
    init() {
        this.initTheme();
        this.bindEvents();
    },

    initTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    bindEvents() {
        // Desktop theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Mobile theme toggle
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }
    }
};

// =============================================================================
// NAVIGATION MODULE
// =============================================================================
const NavigationModule = {
    init() {
        this.bindMobileMenu();
        this.bindSmoothScrolling();
        this.bindScrollEffects();
        this.updateActiveLinks();
    },

    bindMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');

        if (!mobileToggle || !mobileMenu || !mobileOverlay) return;

        // Toggle mobile menu
        mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu(mobileToggle, mobileMenu, mobileOverlay);
        });

        // Close on overlay click
        mobileOverlay.addEventListener('click', () => {
            this.closeMobileMenu(mobileToggle, mobileMenu, mobileOverlay);
        });

        // Close on nav link click
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(mobileToggle, mobileMenu, mobileOverlay);
            });
        });

        // Close on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu(mobileToggle, mobileMenu, mobileOverlay);
            }
        });
    },

    toggleMobileMenu(toggle, menu, overlay) {
        const isActive = toggle.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu(toggle, menu, overlay);
        } else {
            this.openMobileMenu(toggle, menu, overlay);
        }
    },

    openMobileMenu(toggle, menu, overlay) {
        toggle.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeMobileMenu(toggle, menu, overlay) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    },

    bindSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    },

    bindScrollEffects() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleNavbarScroll();
                    this.updateActiveLinks();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Initial call
        this.handleNavbarScroll();
    },

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    },

    updateActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
};

// =============================================================================
// CURSOR MODULE
// =============================================================================
const CursorModule = {
    init() {
        // Only initialize on desktop devices
        if (window.innerWidth <= 768) return;
        
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        if (!this.cursor || !this.cursorFollower) return;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;
        
        this.bindEvents();
        this.animate();
    },

    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        });

        // Interactive elements hover
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"]');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            });
        });

        // Window leave/enter
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorFollower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorFollower.style.opacity = '0.5';
        });
    },

    animate() {
        const speed = 0.2;
        
        this.followerX += (this.mouseX - this.followerX) * speed;
        this.followerY += (this.mouseY - this.followerY) * speed;
        
        this.cursorFollower.style.left = this.followerX + 'px';
        this.cursorFollower.style.top = this.followerY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
};

// =============================================================================
// PRELOADER MODULE
// =============================================================================
const PreloaderModule = {
    init() {
        window.addEventListener('load', () => {
            this.hidePreloader();
        });
    },

    hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
};

// =============================================================================
// UTILS MODULE
// =============================================================================
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// =============================================================================
// MAIN APP INITIALIZATION
// =============================================================================
const App = {
    init() {
        this.initModules();
        this.bindGlobalEvents();
    },

    initModules() {
        try {
            ThemeModule.init();
            NavigationModule.init();
            CursorModule.init();
            PreloaderModule.init();
        } catch (error) {
            console.error('Error initializing modules:', error);
        }
    },

    bindGlobalEvents() {
        // Handle resize events
        const handleResize = Utils.debounce(() => {
            // Re-initialize cursor on resize if needed
            if (window.innerWidth > 768 && !CursorModule.cursor) {
                CursorModule.init();
            }
        }, 250);

        window.addEventListener('resize', handleResize);

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden
                console.log('Page hidden');
            } else {
                // Page is visible
                console.log('Page visible');
            }
        });
    }
};

// =============================================================================
// INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('IoT KJSIT Website - Initializing...');
    App.init();
    console.log('IoT KJSIT Website - Ready!');
});

// Export modules for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeModule,
        NavigationModule,
        CursorModule,
        PreloaderModule,
        Utils,
        App
    };
}