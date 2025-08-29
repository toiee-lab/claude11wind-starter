// Main JavaScript for 11ty site

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLazyLoading();
    initSmoothScrolling();
    initFormValidation();
    initImageOptimization();
    
    // Initialize Lucide icons with proper timing
    initLucideIcons();
    
    // Set up dynamic content observer for new icons
    initIconObserver();
});

/**
 * Initialize Lucide icons with error handling and retry logic
 */
function initLucideIcons() {
    function createIcons() {
        try {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
                console.log('Lucide icons initialized successfully');
            } else {
                console.warn('Lucide library not available');
            }
        } catch (error) {
            console.error('Error initializing Lucide icons:', error);
        }
    }
    
    // Try immediately
    createIcons();
    
    // Also try after a short delay to ensure all elements are ready
    setTimeout(createIcons, 100);
    
    // Retry after page fully loaded
    if (document.readyState !== 'complete') {
        window.addEventListener('load', createIcons);
    }
}

/**
 * Watch for dynamically added elements with lucide icons
 */
function initIconObserver() {
    if (!window.MutationObserver) return;
    
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        const hasLucideIcon = node.querySelector && (
                            node.querySelector('[data-lucide]') || 
                            node.hasAttribute && node.hasAttribute('data-lucide')
                        );
                        if (hasLucideIcon) {
                            shouldUpdate = true;
                        }
                    }
                });
            }
        });
        
        if (shouldUpdate) {
            // Debounce the icon creation to avoid excessive calls
            clearTimeout(window.lucideUpdateTimeout);
            window.lucideUpdateTimeout = setTimeout(function() {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 50);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.setAttribute('data-loaded', 'true');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required], [data-validate]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'この項目は必須です';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '正しいメールアドレスを入力してください';
        }
    }
    
    // Phone validation (Japanese format)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\-\(\)\+\s]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = '正しい電話番号を入力してください';
        }
    }
    
    // Custom validation rules
    const customRule = field.dataset.validate;
    if (customRule && value) {
        switch (customRule) {
            case 'minlength':
                const minLength = parseInt(field.dataset.minlength) || 0;
                if (value.length < minLength) {
                    isValid = false;
                    errorMessage = `最低${minLength}文字以上入力してください`;
                }
                break;
        }
    }
    
    // Show/hide error message
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('border-red-500', 'focus:border-red-500');
    field.classList.remove('border-gray-300', 'focus:border-primary-500');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-600 text-sm mt-1';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('border-red-500', 'focus:border-red-500');
    field.classList.add('border-gray-300', 'focus:border-primary-500');
}

/**
 * Image optimization helpers
 */
function initImageOptimization() {
    // Add loading="lazy" to images without it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
    });
    
    // Add error handling for broken images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
}

/**
 * Utility functions
 */

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
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
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get optimal image size based on viewport
function getOptimalImageSize(baseWidth) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const viewportWidth = window.innerWidth;
    
    let optimalWidth = baseWidth;
    
    if (viewportWidth <= 640) {
        optimalWidth = Math.min(640, baseWidth);
    } else if (viewportWidth <= 1024) {
        optimalWidth = Math.min(1024, baseWidth);
    }
    
    return Math.round(optimalWidth * devicePixelRatio);
}

// Copy text to clipboard
async function copyToClipboard(text) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
    } catch (err) {
        document.body.removeChild(textArea);
        console.error('Failed to copy:', err);
        return false;
    }
}

// Export functions for global use
window.siteUtils = {
    debounce,
    throttle,
    isInViewport,
    getOptimalImageSize,
    copyToClipboard,
    validateForm,
    validateField
};