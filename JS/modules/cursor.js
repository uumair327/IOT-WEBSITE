/**
 * Cursor Module - Handles custom cursor effects
 */
export const CursorModule = {
    elements: {},
    position: { x: 0, y: 0 },
    followerPosition: { x: 0, y: 0 },
    isInitialized: false,
    
    init() {
        // Only initialize on desktop devices
        if (this.isMobile()) return;
        
        this.cacheElements();
        if (!this.elements.cursor || !this.elements.cursorFollower) return;
        
        this.bindEvents();
        this.animate();
        this.isInitialized = true;
    },

    isMobile() {
        return window.innerWidth <= 768 || 'ontouchstart' in window;
    },

    cacheElements() {
        this.elements = {
            cursor: document.querySelector('.cursor'),
            cursorFollower: document.querySelector('.cursor-follower'),
            interactiveElements: document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"]')
        };
    },

    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.updatePosition(e.clientX, e.clientY);
        }, { passive: true });

        // Interactive elements hover
        this.elements.interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverState();
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverState();
            });
        });

        // Window leave/enter
        document.addEventListener('mouseleave', () => {
            this.hideCursor();
        });
        
        document.addEventListener('mouseenter', () => {
            this.showCursor();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.isMobile() && this.isInitialized) {
                this.destroy();
            } else if (!this.isMobile() && !this.isInitialized) {
                this.init();
            }
        });
    },

    updatePosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        
        if (this.elements.cursor) {
            this.elements.cursor.style.transform = `translate(${x}px, ${y}px)`;
        }
    },

    animate() {
        if (!this.isInitialized) return;
        
        const speed = 0.2;
        
        this.followerPosition.x += (this.position.x - this.followerPosition.x) * speed;
        this.followerPosition.y += (this.position.y - this.followerPosition.y) * speed;
        
        if (this.elements.cursorFollower) {
            this.elements.cursorFollower.style.transform = 
                `translate(${this.followerPosition.x}px, ${this.followerPosition.y}px)`;
        }
        
        requestAnimationFrame(() => this.animate());
    },

    addHoverState() {
        if (this.elements.cursor) this.elements.cursor.classList.add('hover');
        if (this.elements.cursorFollower) this.elements.cursorFollower.classList.add('hover');
    },

    removeHoverState() {
        if (this.elements.cursor) this.elements.cursor.classList.remove('hover');
        if (this.elements.cursorFollower) this.elements.cursorFollower.classList.remove('hover');
    },

    showCursor() {
        if (this.elements.cursor) this.elements.cursor.style.opacity = '1';
        if (this.elements.cursorFollower) this.elements.cursorFollower.style.opacity = '0.5';
    },

    hideCursor() {
        if (this.elements.cursor) this.elements.cursor.style.opacity = '0';
        if (this.elements.cursorFollower) this.elements.cursorFollower.style.opacity = '0';
    },

    destroy() {
        this.isInitialized = false;
        this.hideCursor();
    }
};