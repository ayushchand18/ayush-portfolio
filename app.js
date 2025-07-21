// Portfolio JavaScript - Modern Interactive Features
class PortfolioApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.createParticles();
        this.setupScrollAnimations();
    }

    init() {
        // Loading screen
        this.handleLoadingScreen();
        
        // Navigation
        this.setupNavigation();
        
        // Scroll progress
        this.setupScrollProgress();
        
        // Custom cursor
        this.setupCustomCursor();
        
        // Typewriter effect
        this.setupTypewriter();
        
        // Smooth scrolling - Fixed implementation
        this.setupSmoothScrolling();
        
        // Form handling
        this.setupContactForm();
        
        // Project filtering
        this.setupProjectFiltering();
        
        // Skills animation
        this.setupSkillsAnimation();
        
        // Counter animation
        this.setupCounterAnimation();
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleWindowLoad.bind(this));
        
        // Mouse events for custom cursor
        document.addEventListener('mousemove', this.updateCursor.bind(this));
        document.addEventListener('mouseenter', this.showCursor.bind(this));
        document.addEventListener('mouseleave', this.hideCursor.bind(this));
        
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    handleLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 3000);
    }

    setupNavigation() {
        const nav = document.getElementById('nav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Handle active nav link with smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Get target section
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset position
                    const navHeight = nav ? nav.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            
            if (progressBar) {
                progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
            }
        });
    }

    setupCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        this.cursorX = 0;
        this.cursorY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        // Create custom cursor element
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background: #00D4FF;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(this.cursor);
        
        this.animateCursor();
    }

    updateCursor(e) {
        if (window.innerWidth <= 768) return;
        
        this.targetX = e.clientX;
        this.targetY = e.clientY;
    }

    animateCursor() {
        if (window.innerWidth <= 768 || !this.cursor) return;
        
        this.cursorX += (this.targetX - this.cursorX) * 0.1;
        this.cursorY += (this.targetY - this.cursorY) * 0.1;
        
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        
        requestAnimationFrame(this.animateCursor.bind(this));
    }

    showCursor() {
        if (window.innerWidth <= 768) return;
        document.body.style.cursor = 'none';
    }

    hideCursor() {
        if (window.innerWidth <= 768) return;
        document.body.style.cursor = 'auto';
    }

    setupTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;

        const text = 'Ayush Chand';
        let index = 0;
        
        typewriterElement.textContent = '';
        
        const typeWriter = () => {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            }
        };
        
        setTimeout(typeWriter, 2000);
    }

    setupSmoothScrolling() {
        // Additional smooth scrolling for any missed links
        const allLinks = document.querySelectorAll('a[href^="#"]');
        
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const nav = document.getElementById('nav');
                        const offsetTop = targetElement.offsetTop - (nav ? nav.offsetHeight : 80);
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');
        
        if (!form || !formMessage) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all fields.';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter a valid email address.';
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                
                // Reset form and button
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        
                        // Stagger animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.5s ease';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-30px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    setupSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkills = () => {
            skillBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 200);
            });
        };
        
        // Trigger animation when skills section is in view
        const skillsSection = document.getElementById('skills');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        };
        
        // Trigger animation when about section is in view
        const aboutSection = document.getElementById('about');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = window.innerWidth <= 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation duration and delay
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 2;
            
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            // Random size
            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particlesContainer.appendChild(particle);
        }
    }

    setupScrollAnimations() {
        // Simple scroll animation implementation
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    handleScroll() {
        const nav = document.getElementById('nav');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to nav
        if (nav) {
            if (scrollTop > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        // Update active navigation link based on scroll position
        this.updateActiveNavLink();
        
        // Parallax effect for hero section
        this.updateParallax();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('href').substring(1);
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        const heroElements = document.querySelectorAll('.floating-element');
        
        heroElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleResize() {
        // Recreate particles on resize
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            this.createParticles();
        }
        
        // Update custom cursor for mobile
        if (window.innerWidth <= 768) {
            document.body.style.cursor = 'auto';
            if (this.cursor) {
                this.cursor.remove();
                this.cursor = null;
            }
        } else if (!this.cursor) {
            this.setupCustomCursor();
        }
    }

    handleWindowLoad() {
        // Additional animations on window load
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }
        
        if (heroVisual) {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }
    }
}

// Additional utility functions
class Utils {
    static throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    static debounce(func, delay) {
        let timeoutId;
        
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
}

// Enhanced scroll effects
class ScrollEffects {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Add scroll effects to timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            this.elements.push({
                element: item,
                type: 'timeline',
                delay: index * 100
            });
        });
        
        // Add scroll effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            this.elements.push({
                element: card,
                type: 'project',
                delay: index * 150
            });
        });
        
        // Add scroll effects to skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            this.elements.push({
                element: category,
                type: 'skill',
                delay: index * 200
            });
        });
        
        this.setupScrollListener();
    }
    
    setupScrollListener() {
        const scrollHandler = Utils.throttle(() => {
            this.elements.forEach(item => {
                if (Utils.isInViewport(item.element) && !item.animated) {
                    this.animateElement(item);
                    item.animated = true;
                }
            });
        }, 16);
        
        window.addEventListener('scroll', scrollHandler);
    }
    
    animateElement(item) {
        setTimeout(() => {
            item.element.style.opacity = '1';
            item.element.style.transform = 'translateY(0) scale(1)';
            item.element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            switch (item.type) {
                case 'timeline':
                    item.element.style.transform += ' rotateX(0deg)';
                    break;
                case 'project':
                    item.element.style.transform += ' rotateY(0deg)';
                    break;
                case 'skill':
                    item.element.style.transform += ' scale(1)';
                    break;
            }
        }, item.delay);
    }
}

// Text animations
class TextAnimations {
    constructor() {
        this.setupTextReveal();
    }
    
    setupTextReveal() {
        const textElements = document.querySelectorAll('.section-title, .section-subtitle');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.transition = `all 0.5s ease ${index * 50}ms`;
                element.appendChild(span);
            });
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        textElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }
    
    init() {
        if (this.prefersReducedMotion) {
            this.disableAnimations();
        }
        
        this.optimizeImages();
        this.setupIntersectionObserver();
    }
    
    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    setupIntersectionObserver() {
        const expensiveElements = document.querySelectorAll('.particle, .floating-element');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        });
        
        expensiveElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Main portfolio app
    const portfolio = new PortfolioApp();
    
    // Enhanced features
    const scrollEffects = new ScrollEffects();
    const textAnimations = new TextAnimations();
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.warn('Portfolio error:', e.error);
    });
    
    // Service worker registration for offline functionality (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Silently fail if no service worker
            });
        });
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Utils, ScrollEffects, TextAnimations, PerformanceOptimizer };
}