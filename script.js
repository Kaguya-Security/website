// Enhanced Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Scroll to Top Button
    function toggleScrollToTop() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button on scroll
    window.addEventListener('scroll', toggleScrollToTop);

    // Intersection Observer for animations (trigger earlier and faster)
    const observerOptions = {
        threshold: 0.05, // Reduced from 0.1 to trigger earlier
        rootMargin: '0px 0px 100px 0px' // Changed to positive margin to trigger 100px before element enters viewport
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0ms';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animations
    const animateElements = document.querySelectorAll('.service-card, .why-card, .pricing-card, .section-header, .testimonial-card, .tip-card, .team-member, .stat-card');
    animateElements.forEach((el, index) => {
        el.dataset.delay = `${index * 50}ms`; // Reduced delay from 100ms to 50ms
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)'; // Reduced from 30px to 20px for subtler effect
        observer.observe(el);
    });

    // Add animation class with faster timing
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.4s ease-out forwards; /* Reduced from 0.6s to 0.4s */
        }
    `;
    document.head.appendChild(style);

    // Enhanced navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = 'none';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !service || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            this.reset();
        });
    }

    // Waitlist form handling
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const creatorType = formData.get('creator-type');
            const interestedPlan = formData.get('interested-plan');

            // Basic validation
            if (!name || !email || !creatorType || !interestedPlan) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('.waitlist-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                showWaitlistSuccess();
                
                // Log waitlist data (in real implementation, send to your backend)
                console.log('Waitlist signup:', {
                    name,
                    email,
                    creatorType,
                    interestedPlan,
                    securityConcerns: formData.get('security-concerns'),
                    timestamp: new Date().toISOString()
                });

                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Show waitlist success message
    function showWaitlistSuccess() {
        const waitlistForm = document.querySelector('.waitlist-form');
        const originalContent = waitlistForm.innerHTML;
        
        waitlistForm.innerHTML = `
            <div class="waitlist-success">
                <i class="fas fa-check-circle"></i>
                <h3>Welcome to the Waitlist!</h3>
                <p>You're all set! We'll notify you as soon as we launch with exclusive early access and special pricing.</p>
                <p><strong>Check your email</strong> for confirmation and next steps.</p>
            </div>
        `;

        // Restore form after 5 seconds
        setTimeout(() => {
            waitlistForm.innerHTML = originalContent;
            // Re-attach event listener
            const newForm = document.getElementById('waitlistForm');
            if (newForm) {
                // Re-run the waitlist form setup
                location.reload(); // Simple approach for demo
            }
        }, 5000);
    }

    // Enhanced hover effects for new sections
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        const tipLink = card.querySelector('.tip-link');
        if (tipLink) {
            card.addEventListener('mouseenter', () => {
                tipLink.style.transform = 'translateX(5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                tipLink.style.transform = 'translateX(0)';
            });
        }
    });

    // Smooth scroll for tip links (placeholder functionality)
    const tipLinks = document.querySelectorAll('.tip-link');
    tipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Blog posts coming soon! Stay tuned for detailed security guides.', 'info');
        });
    });

    // Team member card interactions
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const photo = member.querySelector('.member-photo');
            photo.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        member.addEventListener('mouseleave', () => {
            const photo = member.querySelector('.member-photo');
            photo.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }

    console.log('Kaguya Security website loaded successfully!');
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading class if it exists
    document.body.classList.remove('loading');
    
    // Initialize any heavy operations after page load
    setTimeout(() => {
        // Additional optimizations can go here
        console.log('All resources loaded');
    }, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Prevent right-click context menu (optional security feature)
// Uncomment if needed for production
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});
*/
