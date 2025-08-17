/**
 * IoT KJSIT Website - Main Application
 * Modular, clean, and maintainable JavaScript architecture
 */

import { ThemeModule } from './modules/theme.js';
import { NavigationModule } from './modules/navigation.js';
import { CursorModule } from './modules/cursor.js';
import { Utils } from './modules/utils.js';

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
                document.body.classList.add('loaded');
            }, 500);
        }
    }
};

// =============================================================================
// PERFORMANCE MODULE
// =============================================================================
const PerformanceModule = {
    init() {
        this.optimizeImages();
        this.handleVisibilityChange();
        this.monitorPerformance();
    },

    optimizeImages() {
        // Lazy load images that don't have loading="lazy"
        const images = document.querySelectorAll('img:not([loading])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.loading = 'lazy';
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    },

    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations, videos, etc.
                this.pauseAnimations();
            } else {
                // Resume animations, videos, etc.
                this.resumeAnimations();
            }
        });
    },

    pauseAnimations() {
        document.body.classList.add('paused');
    },

    resumeAnimations() {
        document.body.classList.remove('paused');
    },

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            // This would require the web-vitals library
            // For now, we'll just log basic performance metrics
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Performance:', {
                            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                            totalTime: perfData.loadEventEnd - perfData.fetchStart
                        });
                    }
                }, 0);
            });
        }
    }
};

// =============================================================================
// ERROR HANDLING MODULE
// =============================================================================
const ErrorModule = {
    init() {
        this.setupGlobalErrorHandling();
        this.setupUnhandledRejectionHandling();
    },

    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global Error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
            
            // Don't show error to users in production
            if (window.location.hostname !== 'localhost') {
                event.preventDefault();
            }
        });
    },

    setupUnhandledRejectionHandling() {
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            
            // Don't show error to users in production
            if (window.location.hostname !== 'localhost') {
                event.preventDefault();
            }
        });
    }
};

// =============================================================================
// MAIN APPLICATION
// =============================================================================
class IoTWebsiteApp {
    constructor() {
        this.modules = new Map();
        this.isInitialized = false;
        this.config = {
            debug: window.location.hostname === 'localhost',
            version: '2.0.0'
        };
    }

    async init() {
        if (this.isInitialized) {
            console.warn('App already initialized');
            return;
        }

        try {
            this.log('Initializing IoT KJSIT Website...');
            
            // Initialize error handling first
            ErrorModule.init();
            
            // Initialize core modules
            await this.initializeModules();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Initialize performance monitoring
            PerformanceModule.init();
            
            this.isInitialized = true;
            this.log('IoT KJSIT Website initialized successfully!');
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('appInitialized', {
                detail: { version: this.config.version }
            }));
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }

    async initializeModules() {
        const moduleInitializers = [
            { name: 'Theme', module: ThemeModule },
            { name: 'Navigation', module: NavigationModule },
            { name: 'Cursor', module: CursorModule },
            { name: 'Preloader', module: PreloaderModule }
        ];

        for (const { name, module } of moduleInitializers) {
            try {
                this.log(`Initializing ${name} module...`);
                await module.init();
                this.modules.set(name.toLowerCase(), module);
                this.log(`${name} module initialized`);
            } catch (error) {
                console.error(`Failed to initialize ${name} module:`, error);
            }
        }
    }

    setupGlobalEvents() {
        // Handle resize with debouncing
        const handleResize = Utils.debounce(() => {
            document.dispatchEvent(new CustomEvent('appResize', {
                detail: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    deviceType: Utils.getDeviceType()
                }
            }));
        }, 250);

        window.addEventListener('resize', handleResize);

        // Handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                handleResize();
            }, 100);
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            document.body.classList.remove('offline');
            this.log('Connection restored');
        });

        window.addEventListener('offline', () => {
            document.body.classList.add('offline');
            this.log('Connection lost');
        });
    }

    getModule(name) {
        return this.modules.get(name.toLowerCase());
    }

    log(message, ...args) {
        if (this.config.debug) {
            console.log(`[IoT App] ${message}`, ...args);
        }
    }

    // Public API methods
    scrollToSection(sectionId) {
        const navigationModule = this.getModule('navigation');
        if (navigationModule && navigationModule.scrollToSection) {
            navigationModule.scrollToSection(sectionId);
        }
    }

    toggleTheme() {
        const themeModule = this.getModule('theme');
        if (themeModule && themeModule.toggleTheme) {
            themeModule.toggleTheme();
        }
    }

    getCurrentTheme() {
        const themeModule = this.getModule('theme');
        return themeModule && themeModule.getCurrentTheme ? themeModule.getCurrentTheme() : 'dark';
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================
const app = new IoTWebsiteApp();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Make app globally available for debugging
if (window.location.hostname === 'localhost') {
    window.IoTApp = app;
}

// Export for potential module use
export default app;