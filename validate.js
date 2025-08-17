/**
 * Simple HTML/JS Validation Script
 * Checks for common issues in the website
 */

const fs = require('fs');

function validateHTML() {
    console.log('🔍 Validating HTML structure...');
    
    const html = fs.readFileSync('index.html', 'utf8');
    const issues = [];
    
    // Check for unclosed tags
    const openTags = html.match(/<[^/][^>]*>/g) || [];
    const closeTags = html.match(/<\/[^>]*>/g) || [];
    
    console.log(`Found ${openTags.length} opening tags and ${closeTags.length} closing tags`);
    
    // Check for specific issues - look for div> as text content, not in tags
    const strayDivMatches = html.match(/[^<]div>/g);
    if (strayDivMatches) {
        issues.push(`❌ Found ${strayDivMatches.length} stray "div>" text - possible broken HTML structure`);
    }
    
    if (html.includes('</div')) {
        const matches = html.match(/<\/div(?![>])/g);
        if (matches) {
            issues.push(`❌ Found ${matches.length} incomplete closing div tags`);
        }
    }
    
    // Check for duplicate IDs
    const ids = html.match(/id="([^"]+)"/g) || [];
    const idValues = ids.map(id => id.match(/id="([^"]+)"/)[1]);
    const duplicateIds = idValues.filter((id, index) => idValues.indexOf(id) !== index);
    
    if (duplicateIds.length > 0) {
        issues.push(`❌ Found duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);
    }
    
    // Check for missing alt attributes on images
    const images = html.match(/<img[^>]*>/g) || [];
    const imagesWithoutAlt = images.filter(img => !img.includes('alt='));
    
    if (imagesWithoutAlt.length > 0) {
        issues.push(`⚠️  Found ${imagesWithoutAlt.length} images without alt attributes`);
    }
    
    if (issues.length === 0) {
        console.log('✅ HTML structure looks good!');
    } else {
        console.log('Issues found:');
        issues.forEach(issue => console.log(issue));
    }
    
    return issues.length === 0;
}

function validateJS() {
    console.log('\n🔍 Validating JavaScript files...');
    
    const jsFiles = ['JS/main-clean.js', 'JS/faq.js'];
    let allValid = true;
    
    jsFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            
            // Basic syntax checks
            const issues = [];
            
            // Check for common syntax errors
            if (content.includes('function(')) {
                const functionCount = (content.match(/function\s*\(/g) || []).length;
                const functionEndCount = (content.match(/}\s*;?\s*$/gm) || []).length;
                console.log(`${file}: Found ${functionCount} function declarations`);
            }
            
            // Check for console.log statements (should be minimal in production)
            const consoleLogs = (content.match(/console\.log/g) || []).length;
            if (consoleLogs > 10) {
                issues.push(`⚠️  Many console.log statements (${consoleLogs}) - consider removing for production`);
            }
            
            // Check for duplicate function definitions
            const functionNames = content.match(/function\s+(\w+)/g) || [];
            const duplicateFunctions = functionNames.filter((fn, index) => functionNames.indexOf(fn) !== index);
            
            if (duplicateFunctions.length > 0) {
                issues.push(`❌ Duplicate functions: ${duplicateFunctions.join(', ')}`);
                allValid = false;
            }
            
            if (issues.length === 0) {
                console.log(`✅ ${file} looks good!`);
            } else {
                console.log(`${file} issues:`);
                issues.forEach(issue => console.log(`  ${issue}`));
            }
        } else {
            console.log(`❌ ${file} not found`);
            allValid = false;
        }
    });
    
    return allValid;
}

function validateCSS() {
    console.log('\n🔍 Validating CSS files...');
    
    const cssFiles = ['CSS/style.css', 'CSS/responsive.css'];
    let allValid = true;
    
    cssFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            
            // Check for unclosed braces
            const openBraces = (content.match(/{/g) || []).length;
            const closeBraces = (content.match(/}/g) || []).length;
            
            if (openBraces !== closeBraces) {
                console.log(`❌ ${file}: Mismatched braces (${openBraces} open, ${closeBraces} close)`);
                allValid = false;
            } else {
                console.log(`✅ ${file} braces balanced`);
            }
        } else {
            console.log(`❌ ${file} not found`);
        }
    });
    
    return allValid;
}

// Run all validations
console.log('🚀 Starting validation...\n');

const htmlValid = validateHTML();
const jsValid = validateJS();
const cssValid = validateCSS();

console.log('\n📊 Validation Summary:');
console.log(`HTML: ${htmlValid ? '✅ Valid' : '❌ Issues found'}`);
console.log(`JavaScript: ${jsValid ? '✅ Valid' : '❌ Issues found'}`);
console.log(`CSS: ${cssValid ? '✅ Valid' : '❌ Issues found'}`);

if (htmlValid && jsValid && cssValid) {
    console.log('\n🎉 All validations passed! Website should be working properly.');
} else {
    console.log('\n⚠️  Some issues found. Please review and fix before deployment.');
}