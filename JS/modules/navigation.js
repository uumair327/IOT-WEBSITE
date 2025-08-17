/**
 * Navigation Module - Handles navigation, mobile menu, and scroll effects
 */
export const NavigationModule = {
    elements: {},
    
    init() {
        this.cacheElements();
        this.bindMobileMenu();
        this.bindSmoothScrolling();
        this.bindScrollEffects();
        this.updateActiveLinks();
    },

    cacheElements() {
        this.elements = {
            navbar: document.querySelector('.navbar'),
            mobileToggle: document.getElementById('mobile-toggle'),
            mobileMenu: document.getElementById('mobile-menu'),
            mobileOverlay: document.getElementById('mobile-overlay'),
            mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
            navLinks: document.querySelectorAll('.nav-link'),
            sections: document.querySelectorAll('section[id]'),
            anchors: document.querySelectorAll('a[href^="#"]')
        };
    },

    bindMobileMenu() {
        const { mobileToggle, mobileMenu, mobileOverlay, mobileNavLinks } = this.elements;

        if (!mobileToggle || !mobileMenu || !mobileOverlay) return;

        // Toggle mobile menu
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Close on overlay click
        mobileOverlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close on nav link click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    },

    toggleMobileMenu() {
        const { mobileToggle, mobileMenu, mobileOverlay } = this.elements;
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    openMobileMenu() {
        const { mobileToggle, mobileMenu, mobileOverlay } = this.elements;
        
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set focus to first menu item for accessibility
        const firstLink = mobileMenu.querySelector('.mobile-nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    },

    closeMobileMenu() {
        const { mobileToggle, mobileMenu, mobileOverlay } = this.elements;
        
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    },

    bindSmoothScrolling() {
        this.elements.anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();
                this.smoothScrollTo(targetElement);
            });
        });
    },

    smoothScrollTo(targetElement, offset = 80) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
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

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call
        this.handleNavbarScroll();
    },

    handleNavbarScroll() {
        const { navbar } = this.elements;
        if (!navbar) return;

        const scrollThreshold = 50;
        const isScrolled = window.scrollY > scrollThreshold;
        
        navbar.classList.toggle('scrolled', isScrolled);
    },

    updateActiveLinks() {
        const { sections, navLinks } = this.elements;
        
        let current = '';
        const scrollOffset = 100;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= scrollOffset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${current}`;
            link.classList.toggle('active', isActive);
        });
    },

    // Public method to scroll to section
    scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            this.smoothScrollTo(targetElement);
        }
    }
};