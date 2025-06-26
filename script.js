// Enhanced Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Utility functions - defined first
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.innerHTML = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    min-width: 300px;
                    max-width: 500px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    animation: slideInRight 0.3s ease-out;
                    border-left: 4px solid #007bff;
                }
                .notification-success {
                    border-left-color: #28a745;
                }
                .notification-error {
                    border-left-color: #dc3545;
                }
                .notification-content {
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-content i:first-child {
                    font-size: 18px;
                }
                .notification-success .notification-content i:first-child {
                    color: #28a745;
                }
                .notification-error .notification-content i:first-child {
                    color: #dc3545;
                }
                .notification-content span {
                    flex: 1;
                    color: #333;
                    font-weight: 500;
                }
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #666;
                    padding: 4px;
                    border-radius: 4px;
                }
                .notification-close:hover {
                    background: #f8f9fa;
                    color: #333;
                }
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
            `;
            document.head.appendChild(styles);
        }

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

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

    // Remove the old scroll listener call
    // window.addEventListener('scroll', toggleScrollToTop); // This is now handled in consolidated scroll handler

    // Consolidated scroll handler for better performance
    const observerOptions = {
        threshold: 0.02, // Reduced further to trigger very early
        rootMargin: '0px 0px 150px 0px' // Increased to trigger even earlier
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0ms';
                entry.target.classList.add('animate-in');
                
                // Clean up will-change after animation
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 350 + parseInt(entry.target.dataset.delay || '0'));
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animations - comprehensive list
    const animateElements = document.querySelectorAll('.service-card, .why-card, .pricing-card, .section-header, .testimonial-card, .tip-card, .team-member, .stat-card, .assessment-card, .waitlist-form, .contact-form, .benefit-item, .company-stats, .testimonials-stats');
    animateElements.forEach((el, index) => {
        el.dataset.delay = `${index * 30}ms`; // Reduced delay from 50ms to 30ms for faster staggered animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)'; // Reduced from 20px to 15px for more subtle effect
        observer.observe(el);
    });

    // Add animation class with faster timing
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* Smoother easing */
        }
    `;
    document.head.appendChild(style);

    // Consolidated scroll handler for better performance
    let lastScroll = 0;
    let scrollTicking = false;
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Scroll to top button
        if (currentScroll > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Enhanced navbar scroll effect
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
        
        // Active navigation link highlighting
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
        
        lastScroll = currentScroll;
        scrollTicking = false;
    }

    // Optimized scroll event listener with requestAnimationFrame
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(handleScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    // navLinks is already declared in the consolidated scroll handler

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
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const creatorType = formData.get('creator-type');
            const interestedPlan = formData.get('interested-plan');
            const securityConcerns = formData.get('security-concerns');

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

            try {
                // Prepare data for API
                const waitlistData = {
                    name: name,
                    email: email,
                    creator_type: creatorType,
                    interested_plan: interestedPlan,
                    cybersecurity_concerns: securityConcerns || ''
                };

                // Send data to backend API
                const response = await fetch('http://localhost:3000/api/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(waitlistData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Waitlist signup successful:', result);

                // Show success message
                showWaitlistSuccess();
                
                // Reset form
                this.reset();
                
            } catch (error) {
                console.error('Error submitting waitlist form:', error);
                showNotification('Sorry, there was an error joining the waitlist. Please try again later.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
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
