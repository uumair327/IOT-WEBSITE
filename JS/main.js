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

// Set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'dark') {
            moonIcon?.classList.remove('d-none');
            sunIcon?.classList.add('d-none');
        } else {
            moonIcon?.classList.add('d-none');
            sunIcon?.classList.remove('d-none');
        }
    }
}

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

// Mobile menu toggle functions
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

// FAQ functionality removed - handled by inline script

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
// Cursor tracking
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hide cursor on touch devices
    document.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize cursor tracking
    initCursor();
    
    // Initialize counters
    initCounters();
    
    // Set initial navbar state
    handleNavbarScroll();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Close any open mobile menu on page load
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
});// Enh
anced Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formContent = document.getElementById('formContent');
    const formSuccess = document.getElementById('formSuccess');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (!form) return;
    
    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = '#ef4444';
                this.value = this.value.substring(0, 500);
                charCount.textContent = '500';
            } else if (count > 450) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    // Form validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + 'Error');
        const formGroup = field.closest('.form-group');
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Name validation
        if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }
        
        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }
        
        // Privacy checkbox validation
        if (fieldName === 'privacy' && field.type === 'checkbox') {
            if (!field.checked) {
                isValid = false;
                errorMessage = 'You must agree to the privacy policy';
            }
        }
        
        // Update UI
        if (errorElement) {
            errorElement.textContent = errorMessage;
            if (isValid) {
                errorElement.classList.remove('show');
                formGroup?.classList.remove('error');
            } else {
                errorElement.classList.add('show');
                formGroup?.classList.add('error');
            }
        }
        
        return isValid;
    }
    
    // Real-time validation
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group')?.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            formContent.classList.add('hide');
            formSuccess.classList.add('show');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                if (charCount) charCount.textContent = '0';
            }, 1000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

// Reset form function
function resetForm() {
    const form = document.getElementById('contactForm');
    const formContent = document.getElementById('formContent');
    const formSuccess = document.getElementById('formSuccess');
    const charCount = document.getElementById('charCount');
    
    if (form) {
        form.reset();
        formContent?.classList.remove('hide');
        formSuccess?.classList.remove('show');
        if (charCount) charCount.textContent = '0';
        
        // Clear all errors
        const errorElements = form.querySelectorAll('.form-error');
        const errorGroups = form.querySelectorAll('.form-group.error');
        
        errorElements.forEach(error => error.classList.remove('show'));
        errorGroups.forEach(group => group.classList.remove('error'));
    }
}

// Add smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    
    // Add click handlers for contact links
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
        });
    });
});// Enh
anced Gallery Functionality
function initFlexibleGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    // Auto-detect image aspect ratios and adjust slides
    function adjustSlideAspectRatios() {
        const slides = document.querySelectorAll('.swiper-slide');
        
        slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (!img) return;
            
            // Wait for image to load
            if (img.complete) {
                setSlideAspectRatio(slide, img);
            } else {
                img.addEventListener('load', () => {
                    setSlideAspectRatio(slide, img);
                });
            }
        });
    }
    
    function setSlideAspectRatio(slide, img) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        // Remove existing aspect ratio classes
        slide.classList.remove('aspect-16-9', 'aspect-4-3', 'aspect-1-1', 'aspect-3-2', 'auto-aspect');
        
        // Add appropriate aspect ratio class
        if (Math.abs(aspectRatio - 16/9) < 0.1) {
            slide.classList.add('aspect-16-9');
        } else if (Math.abs(aspectRatio - 4/3) < 0.1) {
            slide.classList.add('aspect-4-3');
        } else if (Math.abs(aspectRatio - 1) < 0.1) {
            slide.classList.add('aspect-1-1');
        } else if (Math.abs(aspectRatio - 3/2) < 0.1) {
            slide.classList.add('aspect-3-2');
        } else {
            slide.classList.add('auto-aspect');
        }
    }
    
    // Gallery mode switching
    function addGalleryModeControls() {
        const gallery = document.querySelector('.gallery .container');
        if (!gallery) return;
        
        const controlsHTML = `
            <div class="gallery-controls" data-aos="fade-up">
                <button class="gallery-mode-btn active" data-mode="contain">Fit Images</button>
                <button class="gallery-mode-btn" data-mode="cover">Fill Container</button>
                <button class="gallery-mode-btn" data-mode="auto">Auto Adjust</button>
            </div>
        `;
        
        const textCenter = gallery.querySelector('.text-center');
        if (textCenter) {
            textCenter.insertAdjacentHTML('afterend', controlsHTML);
        }
        
        // Add event listeners for mode switching
        const modeButtons = document.querySelectorAll('.gallery-mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                switchGalleryMode(mode);
                
                // Update active button
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    function switchGalleryMode(mode) {
        const container = document.querySelector('.gallery-container');
        if (!container) return;
        
        // Remove existing mode classes
        container.classList.remove('contain-mode', 'cover-mode', 'fill-mode');
        
        // Add new mode class
        switch(mode) {
            case 'contain':
                container.classList.add('contain-mode');
                break;
            case 'cover':
                container.classList.add('cover-mode');
                break;
            case 'auto':
                // Auto mode uses default styles
                adjustSlideAspectRatios();
                break;
        }
    }
    
    // Image error handling
    function handleImageErrors() {
        const images = document.querySelectorAll('.swiper-slide img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                const slide = img.closest('.swiper-slide');
                slide.innerHTML = `
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 300px;
                        background: var(--card-bg);
                        border-radius: 16px;
                        color: var(--text-secondary);
                        flex-direction: column;
                        gap: 1rem;
                    ">
                        <i class="fas fa-image" style="font-size: 3rem; opacity: 0.5;"></i>
                        <p>Image could not be loaded</p>
                    </div>
                `;
            });
        });
    }
    
    // Lazy loading enhancement
    function enhanceLazyLoading() {
        const images = document.querySelectorAll('.swiper-slide img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loading');
                        
                        img.addEventListener('load', () => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        });
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Initialize all gallery enhancements
    setTimeout(() => {
        adjustSlideAspectRatios();
        addGalleryModeControls();
        handleImageErrors();
        enhanceLazyLoading();
    }, 100);
    
    // Re-adjust on window resize
    window.addEventListener('resize', debounce(() => {
        adjustSlideAspectRatios();
    }, 250));
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFlexibleGallery();
});// Ga
llery Carousel Fix - Backup Initialization
function initGalleryCarousel() {
    // Wait for Swiper library to be loaded
    if (typeof Swiper === 'undefined') {
        console.log('Swiper library not loaded yet, retrying...');
        setTimeout(initGalleryCarousel, 500);
        return;
    }
    
    // Check if Swiper is already initialized
    const existingSwiper = document.querySelector('.mySwiper')?.swiper;
    if (existingSwiper) {
        console.log('Swiper already initialized');
        return;
    }
    
    try {
        const gallerySwiper = new Swiper('.mySwiper', {
            // Basic settings
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            
            // Loop
            loop: true,
            
            // Autoplay
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            
            // Navigation
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            
            // Effects
            effect: 'slide',
            speed: 600,
            
            // Responsive breakpoints
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            },
            
            // Events
            on: {
                init: function () {
                    console.log('Gallery Swiper initialized successfully');
                },
                slideChange: function () {
                    // Optional: Add slide change effects
                },
            },
        });
        
        // Store reference for debugging
        window.gallerySwiper = gallerySwiper;
        
    } catch (error) {
        console.error('Error initializing gallery Swiper:', error);
        
        // Fallback: Simple manual carousel
        initManualCarousel();
    }
}

// Manual carousel fallback
function initManualCarousel() {
    const slides = document.querySelectorAll('.swiper-slide');
    const nextBtn = document.querySelector('.swiper-button-next');
    const prevBtn = document.querySelector('.swiper-button-prev');
    const pagination = document.querySelector('.swiper-pagination');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Create pagination bullets
    if (pagination) {
        pagination.innerHTML = '';
        slides.forEach((_, index) => {
            const bullet = document.createElement('span');
            bullet.className = `swiper-pagination-bullet ${index === 0 ? 'swiper-pagination-bullet-active' : ''}`;
            bullet.addEventListener('click', () => goToSlide(index));
            pagination.appendChild(bullet);
        });
    }
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
        
        // Update pagination
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('swiper-pagination-bullet-active', i === index);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play
    setInterval(nextSlide, 4000);
    
    // Initialize
    showSlide(0);
    
    console.log('Manual carousel initialized as fallback');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all scripts are loaded
    setTimeout(initGalleryCarousel, 100);
});

// Also try to initialize when window loads (backup)
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.querySelector('.mySwiper')?.swiper) {
            initGalleryCarousel();
        }
    }, 500);
});//
 Enhanced FAQ Functionality
function initEnhancedFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    // Initialize FAQ functionality
    faqItems.forEach((item, index) => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const toggle = item.querySelector('.faq-toggle i');
        
        if (!header || !content || !toggle) return;
        
        // Add unique IDs for accessibility
        const contentId = `faq-content-${index}`;
        const headerId = `faq-header-${index}`;
        
        content.id = contentId;
        header.id = headerId;
        header.setAttribute('aria-controls', contentId);
        content.setAttribute('aria-labelledby', headerId);
        
        // Click handler
        header.addEventListener('click', () => {
            toggleFAQItem(item, header, content, toggle);
        });
        
        // Keyboard handler
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQItem(item, header, content, toggle);
            }
        });
        
        // Arrow key navigation
        header.addEventListener('keydown', (e) => {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = (index + 1) % faqItems.length;
                    faqItems[targetIndex].querySelector('.faq-header').focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = (index - 1 + faqItems.length) % faqItems.length;
                    faqItems[targetIndex].querySelector('.faq-header').focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    faqItems[0].querySelector('.faq-header').focus();
                    break;
                case 'End':
                    e.preventDefault();
                    faqItems[faqItems.length - 1].querySelector('.faq-header').focus();
                    break;
            }
        });
    });
    
    function toggleFAQItem(item, header, content, toggle) {
        const isActive = item.classList.contains('active');
        
        if (isActive) {
            // Close the item
            item.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');
            toggle.className = 'fas fa-plus';
            
            // Smooth close animation
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.maxHeight = '0px';
            });
        } else {
            // Close other items (accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherHeader = otherItem.querySelector('.faq-header');
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherToggle = otherItem.querySelector('.faq-toggle i');
                    
                    otherItem.classList.remove('active');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherToggle.className = 'fas fa-plus';
                    otherContent.style.maxHeight = '0px';
                }
            });
            
            // Open the clicked item
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            toggle.className = 'fas fa-minus';
            
            // Smooth open animation
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Scroll to item if needed
            setTimeout(() => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                
                if (!isVisible) {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 300);
        }
        
        // Announce change to screen readers
        announceToScreenReader(isActive ? 'FAQ item collapsed' : 'FAQ item expanded');
    }
    
    // Search functionality
    function addFAQSearch() {
        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) return;
        
        const searchHTML = `
            <div class="faq-search" data-aos="fade-up">
                <div class="search-container">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="faqSearch" placeholder="Search FAQs..." class="search-input">
                        <button type="button" id="clearSearch" class="clear-search" aria-label="Clear search">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="search-results-count" id="searchResults"></div>
                </div>
            </div>
        `;
        
        faqContainer.insertAdjacentHTML('beforebegin', searchHTML);
        
        const searchInput = document.getElementById('faqSearch');
        const clearButton = document.getElementById('clearSearch');
        const resultsCount = document.getElementById('searchResults');
        
        if (!searchInput) return;
        
        // Search functionality
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase().trim();
            filterFAQs(query, resultsCount);
            
            if (query) {
                clearButton.style.display = 'flex';
            } else {
                clearButton.style.display = 'none';
            }
        }, 300));
        
        // Clear search
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            clearButton.style.display = 'none';
            filterFAQs('', resultsCount);
            searchInput.focus();
        });
        
        // Enter key to expand first result
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)');
                if (visibleItems.length > 0) {
                    const firstItem = visibleItems[0];
                    const header = firstItem.querySelector('.faq-header');
                    if (header && !firstItem.classList.contains('active')) {
                        header.click();
                    }
                }
            }
        });
    }
    
    function filterFAQs(query, resultsElement) {
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (!query || question.includes(query) || answer.includes(query)) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
                // Close if open
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    const header = item.querySelector('.faq-header');
                    const content = item.querySelector('.faq-content');
                    const toggle = item.querySelector('.faq-toggle i');
                    
                    header.setAttribute('aria-expanded', 'false');
                    toggle.className = 'fas fa-plus';
                    content.style.maxHeight = '0px';
                }
            }
        });
        
        // Update results count
        if (resultsElement) {
            if (query) {
                resultsElement.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''} found`;
                resultsElement.style.display = 'block';
            } else {
                resultsElement.style.display = 'none';
            }
        }
    }
    
    // Add search functionality
    addFAQSearch();
    
    // Auto-expand first FAQ on page load (optional)
    // setTimeout(() => {
    //     if (faqItems.length > 0) {
    //         faqItems[0].querySelector('.faq-header').click();
    //     }
    // }, 1000);
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initEnhancedFAQ, 100);
});

// FAQ Search Styles
const faqSearchCSS = `
.faq-search {
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.search-container {
    position: relative;
}

.search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: var(--card-bg);
    border: 2px solid var(--card-border);
    border-radius: 50px;
    color: var(--text-primary);
    font-size: 1rem;
    transition: var(--transition);
    backdrop-filter: blur(10px);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 247, 255, 0.1);
}

.search-input::placeholder {
    color: var(--text-secondary);
}

.search-icon {
    position: absolute;
    left: 1rem;
    color: var(--text-secondary);
    font-size: 1rem;
    z-index: 2;
}

.clear-search {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.clear-search:hover {
    color: var(--primary);
    background: rgba(0, 247, 255, 0.1);
}

.search-results-count {
    text-align: center;
    margin-top: 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    display: none;
}

.faq-item.hidden {
    display: none !important;
}

@media (max-width: 768px) {
    .search-input {
        padding: 0.8rem 0.8rem 0.8rem 2.5rem;
        font-size: 0.9rem;
    }
    
    .search-icon {
        left: 0.8rem;
        font-size: 0.9rem;
    }
    
    .clear-search {
        right: 0.8rem;
    }
}
`;

// Inject FAQ search CSS
const faqStyle = document.createElement('style');
faqStyle.textContent = faqSearchCSS;
document.head.appendChild(faqStyle);//
 Simple and Reliable FAQ Toggle Functionality
function initSimpleFAQ() {
    console.log('Initializing simple FAQ functionality...');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const faqHeaders = document.querySelectorAll('.faq-header');
        console.log('Found FAQ headers:', faqHeaders.length);
        
        faqHeaders.forEach((header, index) => {
            const faqItem = header.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const toggleIcon = header.querySelector('.faq-toggle i');
            
            if (!faqItem || !content || !toggleIcon) {
                console.log('Missing elements for FAQ', index);
                return;
            }
            
            // Remove any existing listeners
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            
            // Add click listener to the new header
            newHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('FAQ clicked:', index);
                
                const isActive = faqItem.classList.contains('active');
                const newToggleIcon = newHeader.querySelector('.faq-toggle i');
                const newContent = faqItem.querySelector('.faq-content');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                    if (activeItem !== faqItem) {
                        activeItem.classList.remove('active');
                        const activeContent = activeItem.querySelector('.faq-content');
                        const activeToggle = activeItem.querySelector('.faq-toggle i');
                        
                        activeContent.style.maxHeight = '0px';
                        activeToggle.className = 'fas fa-plus';
                        activeItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current FAQ
                if (isActive) {
                    // Close
                    faqItem.classList.remove('active');
                    newContent.style.maxHeight = '0px';
                    newToggleIcon.className = 'fas fa-plus';
                    newHeader.setAttribute('aria-expanded', 'false');
                } else {
                    // Open
                    faqItem.classList.add('active');
                    newContent.style.maxHeight = newContent.scrollHeight + 'px';
                    newToggleIcon.className = 'fas fa-minus';
                    newHeader.setAttribute('aria-expanded', 'true');
                    
                    // Scroll to item after animation
                    setTimeout(() => {
                        faqItem.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            });
            
            // Add keyboard support
            newHeader.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    newHeader.click();
                }
            });
        });
        
        console.log('FAQ initialization complete');
    }, 500);
}

// Initialize FAQ when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing FAQ...');
    initSimpleFAQ();
});

// Backup initialization
window.addEventListener('load', function() {
    console.log('Window loaded, backup FAQ initialization...');
    setTimeout(initSimpleFAQ, 1000);
});