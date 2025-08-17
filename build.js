/**
 * Simple Build Script for IoT KJSIT Website
 * Combines modules into a single file for production
 */

const fs = require('fs');
const path = require('path');

const buildDir = 'dist';
const jsDir = 'JS';

// Create build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

// Read all module files
const modules = [
    'JS/modules/utils.js',
    'JS/modules/theme.js',
    'JS/modules/navigation.js',
    'JS/modules/cursor.js',
    'JS/config.js'
];

let combinedJS = `
/**
 * IoT KJSIT Website - Combined JavaScript
 * Generated on: ${new Date().toISOString()}
 */

// IIFE to avoid global namespace pollution
(function() {
    'use strict';
    
`;

// Read and combine all modules
modules.forEach(modulePath => {
    if (fs.existsSync(modulePath)) {
        const content = fs.readFileSync(modulePath, 'utf8');
        // Remove export statements and convert to regular functions/objects
        const processedContent = content
            .replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ')
            .replace(/export\s*{\s*([^}]+)\s*}/g, '// Exported: $1')
            .replace(/import\s+.*?from\s+.*?;/g, '// Import removed');
        
        combinedJS += `\n// === ${modulePath} ===\n`;
        combinedJS += processedContent;
        combinedJS += '\n';
    }
});

// Add initialization code
combinedJS += `
    // Initialize the application
    const app = {
        modules: {
            theme: ThemeModule,
            navigation: NavigationModule,
            cursor: CursorModule,
            utils: Utils
        },
        
        init() {
            try {
                console.log('IoT KJSIT Website - Initializing...');
                
                // Initialize all modules
                Object.values(this.modules).forEach(module => {
                    if (module && typeof module.init === 'function') {
                        module.init();
                    }
                });
                
                console.log('IoT KJSIT Website - Ready!');
            } catch (error) {
                console.error('Initialization error:', error);
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
    
    // Make app available globally for debugging
    if (typeof window !== 'undefined') {
        window.IoTApp = app;
    }
    
})();
`;

// Write combined file
const outputPath = path.join(buildDir, 'main.min.js');
fs.writeFileSync(outputPath, combinedJS);

console.log(`Build complete! Combined JavaScript written to: ${outputPath}`);
console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

// Create a simple HTML template for production
const htmlTemplate = `
<!-- Production JavaScript -->
<script src="dist/main.min.js"></script>
<script src="JS/faq.js"></script>
`;

fs.writeFileSync(path.join(buildDir, 'scripts.html'), htmlTemplate);
console.log('HTML template created: dist/scripts.html');