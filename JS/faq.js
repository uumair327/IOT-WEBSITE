// Simple FAQ Toggle Functionality
console.log('FAQ script loaded');

function initFAQ() {
    console.log('Initializing FAQ...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFAQ);
    } else {
        setupFAQ();
    }
}

function setupFAQ() {
    console.log('Setting up FAQ...');
    
    const faqHeaders = document.querySelectorAll('.faq-header');
    console.log('Found FAQ headers:', faqHeaders.length);
    
    faqHeaders.forEach((header, index) => {
        console.log('Setting up FAQ header', index);
        
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('FAQ header clicked:', index);
            
            const faqItem = this.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const toggleIcon = this.querySelector('.faq-toggle i');
            
            if (!faqItem || !content || !toggleIcon) {
                console.log('Missing elements for FAQ', index);
                return;
            }
            
            const isActive = faqItem.classList.contains('active');
            console.log('FAQ is currently active:', isActive);
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const itemContent = item.querySelector('.faq-content');
                    const itemToggle = item.querySelector('.faq-toggle i');
                    
                    if (itemContent) itemContent.style.maxHeight = '0px';
                    if (itemToggle) itemToggle.className = 'fas fa-plus';
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                // Close
                console.log('Closing FAQ');
                faqItem.classList.remove('active');
                content.style.maxHeight = '0px';
                toggleIcon.className = 'fas fa-plus';
                this.setAttribute('aria-expanded', 'false');
            } else {
                // Open
                console.log('Opening FAQ');
                faqItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                toggleIcon.className = 'fas fa-minus';
                this.setAttribute('aria-expanded', 'true');
                
                // Scroll to item
                setTimeout(() => {
                    faqItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        });
        
        // Keyboard support
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log('FAQ setup complete');
}

// Initialize immediately
initFAQ();

// Also try after window load as backup
window.addEventListener('load', function() {
    console.log('Window loaded, backup FAQ init');
    setTimeout(setupFAQ, 500);
});