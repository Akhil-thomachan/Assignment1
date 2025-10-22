// Art Gallery JavaScript

// Application State
const appState = {
    currentPage: 'login',
    isLoading: false,
    user: null
};

// DOM Elements
const pages = {
    login: null,
    signup: null,
    home: null,
    gallery: null,
    artwork1: null,
    artwork2: null,
    artwork3: null,
    artwork4: null,
    artwork5: null
};

// Utility Functions
function showLoading() {
    appState.isLoading = true;
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    appState.isLoading = false;
    document.body.style.cursor = 'default';
}

function fadeOutElement(element) {
    return new Promise((resolve) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            element.style.display = 'none';
            resolve();
        }, 300);
    });
}

function fadeInElement(element) {
    return new Promise((resolve) => {
        element.style.display = 'block';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            resolve();
        }, 50);
    });
}

// Navigation Functions
async function showPage(pageId) {
    if (appState.isLoading) return;
    
    showLoading();
    
    // Initialize pages object if not already done
    if (!pages.login) {
        pages.login = document.getElementById('loginPage');
        pages.signup = document.getElementById('signupPage');
        pages.home = document.getElementById('homePage');
        pages.gallery = document.getElementById('galleryPage');
        pages.artwork1 = document.getElementById('artwork1Page');
        pages.artwork2 = document.getElementById('artwork2Page');
        pages.artwork3 = document.getElementById('artwork3Page');
        pages.artwork4 = document.getElementById('artwork4Page');
        pages.artwork5 = document.getElementById('artwork5Page');
    }
    
    // Hide current page
    const currentPage = pages[appState.currentPage];
    if (currentPage && currentPage.style.display !== 'none') {
        await fadeOutElement(currentPage);
    }
    
    // Show new page
    const newPage = pages[pageId];
    if (newPage) {
        await fadeInElement(newPage);
        appState.currentPage = pageId;
        
        // Update navigation active state
        updateNavigation(pageId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Page-specific actions
        initializePage(pageId);
    }
    
    hideLoading();
}

function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    const activeLink = document.querySelector(`[onclick="showPage('${activePageId}')"]`);
    if (activeLink && activeLink.classList.contains('nav-link')) {
        activeLink.classList.add('active');
    }
}

function initializePage(pageId) {
    switch (pageId) {
        case 'home':
            initializeHomePage();
            break;
        case 'gallery':
            initializeGalleryPage();
            break;
        case 'login':
            initializeLoginPage();
            break;
        case 'signup':
            initializeSignupPage();
            break;
        default:
            if (pageId.startsWith('artwork')) {
                initializeArtworkPage(pageId);
            }
    }
}

// Page Initialization Functions
function initializeHomePage() {
    // Add animation classes to elements
    const heroElements = document.querySelectorAll('.hero-text h1, .hero-text p, .hero-text .d-flex');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in');
        }, index * 200);
    });
    
    // Initialize artwork cards hover effects
    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeGalleryPage() {
    // Add staggered animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-fade-in');
        }, index * 100);
    });
}

function initializeLoginPage() {
    // Focus on email input
    const emailInput = document.getElementById('email');
    if (emailInput) {
        setTimeout(() => emailInput.focus(), 500);
    }
    
    // Add form submission handler
    const loginForm = document.querySelector('#loginPage form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function initializeSignupPage() {
    // Focus on name input
    const nameInput = document.getElementById('fullName');
    if (nameInput) {
        setTimeout(() => nameInput.focus(), 500);
    }
    
    // Add form submission handler
    const signupForm = document.querySelector('#signupPage form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function initializeArtworkPage(pageId) {
    // Add animation to artwork details
    const artworkElements = document.querySelectorAll(`#${pageId} .artwork-main-image, #${pageId} .artwork-details, #${pageId} .similar-artworks`);
    artworkElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in');
        }, index * 200);
    });
}

// Artwork Functions
function showArtwork(artworkId) {
    const pageId = `artwork${artworkId}`;
    showPage(pageId);
}

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    
    // Simulate login process
    showLoading();
    
    setTimeout(() => {
        // Simulate successful login
        appState.user = {
            email: document.getElementById('email').value,
            name: 'Art Lover'
        };
        
        hideLoading();
        showPage('home');
        
        // Show success message
        showNotification('Welcome back! Successfully logged in.', 'success');
    }, 1500);
}

function handleSignup(event) {
    event.preventDefault();
    
    // Basic validation
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Simulate signup process
    showLoading();
    
    setTimeout(() => {
        // Simulate successful signup
        appState.user = {
            email: document.getElementById('signupEmail').value,
            name: document.getElementById('fullName').value
        };
        
        hideLoading();
        showPage('home');
        
        // Show success message
        showNotification('Account created successfully! Welcome to Artisan Gallery.', 'success');
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll Functions
function scrollToFeatured() {
    const featuredSection = document.getElementById('featuredSection');
    if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(event) {
    // ESC key to go back
    if (event.key === 'Escape') {
        if (appState.currentPage.startsWith('artwork')) {
            showPage('gallery');
        } else if (appState.currentPage === 'gallery') {
            showPage('home');
        }
    }
    
    // Arrow keys for artwork navigation
    if (appState.currentPage.startsWith('artwork')) {
        const currentId = parseInt(appState.currentPage.replace('artwork', ''));
        
        if (event.key === 'ArrowLeft' && currentId > 1) {
            showArtwork(currentId - 1);
        } else if (event.key === 'ArrowRight' && currentId < 5) {
            showArtwork(currentId + 1);
        }
    }
}

// Responsive Navigation
function handleMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }
}

// Performance Optimization
function optimizePerformance() {
    // Optimize image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
}

// Initialize Application
function initializeApp() {
    console.log('🎨 Artisan Gallery - Initializing...');
    
    // Set initial page
    showPage('login');
    
    // Initialize mobile menu
    handleMobileMenu();
    
    // Setup keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Optimize performance
    optimizePerformance();
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✨ Artisan Gallery - Ready!');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - pausing animations');
    } else {
        console.log('Page visible - resuming animations');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showNotification('No internet connection', 'warning');
});

// Export functions for global access
window.showPage = showPage;
window.showArtwork = showArtwork;
window.scrollToFeatured = scrollToFeatured;