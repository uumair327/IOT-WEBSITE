/**
 * Website Configuration
 */
export const Config = {
    // App settings
    app: {
        name: 'IoT KJSIT Website',
        version: '2.0.0',
        debug: window.location.hostname === 'localhost'
    },

    // Theme settings
    theme: {
        default: 'dark',
        storageKey: 'theme',
        transitions: true
    },

    // Navigation settings
    navigation: {
        scrollOffset: 80,
        scrollBehavior: 'smooth',
        mobileBreakpoint: 768,
        activeThreshold: 100
    },

    // Cursor settings
    cursor: {
        enabled: true,
        mobileDisabled: true,
        followSpeed: 0.2,
        hoverScale: 1.5
    },

    // Performance settings
    performance: {
        lazyLoadImages: true,
        debounceResize: 250,
        throttleScroll: 16
    },

    // Animation settings
    animations: {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },

    // API endpoints (if needed)
    api: {
        baseUrl: '',
        timeout: 5000
    },

    // Social links
    social: {
        instagram: 'https://instagram.com/iot_kjsit',
        linkedin: 'https://linkedin.com/company/iot-kjsit',
        github: 'https://github.com/iot-kjsit',
        email: 'iot.kjsieit@somaiya.edu'
    },

    // Contact information
    contact: {
        email: 'iot.kjsieit@somaiya.edu',
        phone: '+91 70584 33848',
        address: 'KJ Somaiya Institute of Technology, Mumbai'
    }
};