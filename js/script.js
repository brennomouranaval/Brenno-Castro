// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    const mainBackground = document.querySelector('.main-background');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
            
            // Control background visibility based on active section
            if (mainBackground) {
                if (sectionId === 'home') {
                    mainBackground.style.opacity = '0';
                    mainBackground.style.visibility = 'hidden';
                } else {
                    mainBackground.style.opacity = '0.05';
                    mainBackground.style.visibility = 'visible';
                }
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

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
            
            // Update background visibility immediately for navigation clicks
            const mainBackground = document.querySelector('.main-background');
            if (mainBackground) {
                const targetId = target.getAttribute('id');
                if (targetId === 'home') {
                    mainBackground.style.opacity = '0';
                    mainBackground.style.visibility = 'hidden';
                } else {
                    mainBackground.style.opacity = '0.05';
                    mainBackground.style.visibility = 'visible';
                }
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('expertise-category')) {
                animateSkillBars(entry.target);
            }
            
            // Animate stats
            if (entry.target.classList.contains('hero-stats')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Elements to observe
const elementsToAnimate = document.querySelectorAll(`
    .about-content,
    .info-card,
    .expertise-category,
    .research-card,
    .publication-card,
    .contact-card,
    .hero-stats
`);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animate skill bars
function animateSkillBars(container) {
    const skillFills = container.querySelectorAll('.skill-fill');
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Animate stats counter
function animateStats(container) {
    const statNumbers = container.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/[\d.]/g, '');
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// Floating icons animation
function createFloatingAnimation() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animation = `float ${6 + index}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 1.5}s`;
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Typing effect for hero title (optional enhancement)
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Theme toggler (for future enhancement)
function createThemeToggler() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: var(--accent-gradient);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition-fast);
        box-shadow: var(--accent-glow);
    `;
    
    themeToggle.addEventListener('click', () => {
        // Future implementation for light/dark theme toggle
        console.log('Theme toggle clicked');
    });
    
    document.body.appendChild(themeToggle);
}

// Scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--accent-gradient);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition-fast);
        z-index: 1000;
        box-shadow: var(--accent-glow);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-primary);
            border-top: 3px solid var(--accent-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimation();
    createFloatingAnimation();
    createScrollToTopButton();
    
    // Initialize carousel after a small delay to ensure all elements are ready
    setTimeout(() => {
        initResearchCarousel();
        initSoftwareCarousel();
        initNavigationTip();
    }, 100);
    
    // Initialize background visibility
    const mainBackground = document.querySelector('.main-background');
    if (mainBackground) {
        // Check if we're at the top of the page (home section)
        if (window.scrollY < 100) {
            mainBackground.style.opacity = '0';
            mainBackground.style.visibility = 'hidden';
        } else {
            mainBackground.style.opacity = '0.05';
            mainBackground.style.visibility = 'visible';
        }
    }
    
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.info-card, .research-card, .publication-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handlers
const debouncedUpdateNav = debounce(updateActiveNavLink, 10);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedUpdateNav);

// Error handling for external resources
window.addEventListener('error', (e) => {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Research Carousel Functionality
function initResearchCarousel() {
    const track = document.getElementById('researchTrack');
    const prevBtn = document.getElementById('researchPrev');
    const nextBtn = document.getElementById('researchNext');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const slides = document.querySelectorAll('.research-carousel-slide');
    
    console.log('Initializing carousel...', { track, prevBtn, nextBtn, indicators: indicators.length, slides: slides.length });
    
    if (!track || !prevBtn || !nextBtn || slides.length === 0) {
        console.error('Carousel elements not found');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    let autoPlayInterval;
    
    // Update carousel position and indicators
    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;
        
        console.log('Updating carousel to slide:', currentSlide);
        
        // Update track position
        const translateX = -currentSlide * 25; // 25% per slide
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Next slide
    function nextSlide() {
        console.log('Next slide clicked');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        console.log('Previous slide clicked');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex !== currentSlide && !isAnimating) {
            console.log('Going to slide:', slideIndex);
            currentSlide = slideIndex;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next button clicked');
        nextSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Previous button clicked');
        prevSlide();
        resetAutoPlay();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Indicator clicked:', index);
            goToSlide(index);
            resetAutoPlay();
        });
    });
    
    // Auto-play functionality
    function startAutoPlay() {
        if (autoPlayInterval) return;
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        setTimeout(startAutoPlay, 1000); // Restart after 1 second
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const carouselContainer = document.querySelector('.research-carousel-container');
        if (!carouselContainer) return;
        
        const rect = carouselContainer.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInView) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            resetAutoPlay();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    }
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.research-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', () => {
            setTimeout(startAutoPlay, 500);
        });
    }
    
    // Initialize
    console.log('Initializing carousel with slide 0');
    updateCarousel();
    setTimeout(startAutoPlay, 5000); // Start autoplay after 2 seconds
}




// Software Carousel Functionality
function initSoftwareCarousel() {
    const track = document.getElementById('softwareTrack');
    const prevBtn = document.getElementById('softwarePrev');
    const nextBtn = document.getElementById('softwareNext');
    const indicatorsContainer = document.getElementById('softwareIndicators');
    const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll('.carousel-indicator') : [];
    const slides = document.querySelectorAll('.software-carousel-slide');
    
    console.log('Initializing software carousel...', { track, prevBtn, nextBtn, indicators: indicators.length, slides: slides.length });
    
    if (!track || !prevBtn || !nextBtn || slides.length === 0) {
        console.error('Software carousel elements not found');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    let autoPlayInterval;
    
    // Update carousel position and indicators
    function updateCarouselSoftware() {
        if (isAnimating) return;
        isAnimating = true;
        
        console.log('Updating software carousel to slide:', currentSlide);
        
        // Update track position - each slide takes 50% width for software carousel  
        const translateX = -currentSlide * 50; // 50% per slide for 2-slide software carousel
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Next slide
    function nextSlideSoftware() {
        console.log('Next software slide clicked');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarouselSoftware();
    }
    
    // Previous slide
    function prevSlideSoftware() {
        console.log('Previous software slide clicked');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarouselSoftware();
    }
    
    // Go to specific slide
    function goToSlideSoftware(slideIndex) {
        if (slideIndex !== currentSlide && !isAnimating) {
            console.log('Going to software slide:', slideIndex);
            currentSlide = slideIndex;
            updateCarouselSoftware();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next software button clicked');
        nextSlideSoftware();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Previous software button clicked');
        prevSlideSoftware();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Software indicator clicked:', index);
            goToSlideSoftware(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const carouselContainer = document.querySelector('.software-carousel-container');
        if (!carouselContainer) return;
        
        const rect = carouselContainer.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInView) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlideSoftware();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlideSoftware();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlaySoftware();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeSoftware();
        resetAutoPlaySoftware();
    }, { passive: true });
    
    function handleSwipeSoftware() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlideSoftware(); // Swipe left - next slide
            } else {
                prevSlideSoftware(); // Swipe right - previous slide
            }
        }
    }
    
   
    // Initialize
    console.log('Initializing software carousel with slide 0');
    updateCarouselSoftware();
}

// Navigation Tip Management
function initNavigationTip() {
    const navigationTip = document.getElementById('navigationTip');
    const carouselContainer = document.querySelector('.software-carousel-container');
    
    if (!navigationTip || !carouselContainer) return;
    
    // Auto-hide tip after 5 seconds
    setTimeout(() => {
        navigationTip.classList.add('hidden');
    }, 5000);
    
    // Hide tip when user hovers over carousel
    carouselContainer.addEventListener('mouseenter', () => {
        navigationTip.classList.add('hidden');
    });
    
    // Show tip again when user leaves carousel (if not previously hidden by timer)
    carouselContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!navigationTip.classList.contains('hidden')) {
                navigationTip.classList.remove('hidden');
            }
        }, 1000);
    });
    
    // Hide tip when user clicks on navigation arrows
    const arrows = document.querySelectorAll('.carousel-arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            navigationTip.classList.add('hidden');
        });
    });
    
    // Hide tip when user clicks on indicators
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            navigationTip.classList.add('hidden');
        });
    });
    
    // Hide tip on mobile after first touch
    let hasInteracted = false;
    document.addEventListener('touchstart', () => {
        if (!hasInteracted) {
            hasInteracted = true;
            navigationTip.classList.add('hidden');
        }
    }, { once: true });
}
