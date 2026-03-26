// DOM Elements
const preloader = document.querySelector('.preloader');
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const admissionForm = document.getElementById('admissionForm');
const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slides = document.querySelectorAll('.slide');

// WhatsApp Number
const WHATSAPP_NUMBER = '918519854024';

// Page Load Animations
window.addEventListener('load', () => {
    // Hide preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize animations
    initializeAnimations();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Slider Functionality
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    const translateX = -index * 100;
    sliderWrapper.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Slider Controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Touch/Swipe support for mobile
let startX = 0;
let currentX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sliderWrapper.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
});

sliderWrapper.addEventListener('touchend', () => {
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

// WhatsApp Form Submission
admissionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const childName = document.getElementById('childName').value;
    const childAge = document.getElementById('childAge').value;
    const parentName = document.getElementById('parentName').value;
    const parentPhone = document.getElementById('parentPhone').value;
    const parentEmail = document.getElementById('parentEmail').value || 'Not provided';
    const message = document.getElementById('message').value || 'No special requirements';

    // Create WhatsApp message
    const whatsappMessage = `🎨 *RAINBOW PLAY SCHOOL - ADMISSION ENQUIRY* 🎨

👶 *Child's Name:* ${childName}
🎂 *Age:* ${childAge} years
👨‍👩‍👧 *Parent's Name:* ${parentName}
📱 *Phone:* ${parentPhone}
📧 *Email:* ${parentEmail}
💬 *Requirements:* ${message}

*New Admission Enquiry Received!* 🌈`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Show success message and reset form
    showSuccessMessage();
    this.reset();
});

// Success Message Function
function showSuccessMessage() {
    const submitBtn = admissionForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We received your enquiry.';
    submitBtn.style.background = 'linear-gradient(135deg, #56ab2f, #a8e6cf)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animate elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Glass cards animation
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Amenities cards
    document.querySelectorAll('.amenity-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Parallax Effect for Hero Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-card');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}px)`;
    });
});

// Form Input Focus Effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Gallery Lightbox Effect (Simple hover)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Simple zoom effect on click
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Phone number validation
document.getElementById('parentPhone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    this.value = value;
});

// Age validation
document.getElementById('childAge').addEventListener('input', function() {
    let value = parseInt(this.value);
    if (value < 2) this.value = 2;
    if (value > 5) this.value = 5;
});

// Back to top functionality (if needed)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top button if scrolled down
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-top');
    if (!scrollBtn) {
        if (window.scrollY > 1000) {
            createScrollTopButton();
        }
    } else {
        if (window.scrollY <= 1000) {
            scrollBtn.remove();
        }
    }
});

function createScrollTopButton() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.onclick = scrollToTop;
    document.body.appendChild(btn);
}

// Performance optimization - Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// PWA Ready - Add to home screen prompt (optional)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set default values or any initial setup
    console.log('🌈 Rainbow Play School - Website Loaded Successfully!');
});