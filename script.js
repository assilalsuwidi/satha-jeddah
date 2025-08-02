// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isMobile = window.innerWidth <= 768;
        
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(44,62,80,0.95) 0%, rgba(52,73,94,0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
            
            // تصغير الهيدر في عرض الهاتف فقط
            if (isMobile) {
                header.style.padding = '8px 0';
                header.querySelector('.logo h1').style.fontSize = '1.4rem';
                header.querySelector('.tagline').style.fontSize = '0.7rem';
                header.querySelector('.phone-btn').style.padding = '8px 15px';
                header.querySelector('.phone-btn').style.fontSize = '0.85rem';
            }
        } else {
            header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            header.style.backdropFilter = 'none';
            
            // إعادة الحجم الطبيعي
            if (isMobile) {
                header.style.padding = '15px 0';
                header.querySelector('.logo h1').style.fontSize = '1.8rem';
                header.querySelector('.tagline').style.fontSize = '0.9rem';
                header.querySelector('.phone-btn').style.padding = '12px 20px';
                header.querySelector('.phone-btn').style.fontSize = '1rem';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .service-item, .area-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Phone number clicked:', this.href);
        });
    });
    
    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click-to-call functionality with confirmation
    const phoneButtons = document.querySelectorAll('.phone-btn, .btn-primary[href^="tel:"]');
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // On desktop, show confirmation
            if (window.innerWidth > 768) {
                const phoneNumber = this.href.replace('tel:', '');
                const confirmed = confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`);
                if (!confirmed) {
                    e.preventDefault();
                }
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '☰';
        menuToggle.style.display = 'none';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .menu-toggle {
                    display: block !important;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 10px;
                }
                
                nav ul.mobile-hidden {
                    display: none;
                }
                
                nav ul.mobile-visible {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(30,60,114,0.95);
                    backdrop-filter: blur(10px);
                    padding: 20px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
            }
        `;
        document.head.appendChild(style);
        
        nav.parentNode.insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', function() {
            const ul = nav.querySelector('ul');
            ul.classList.toggle('mobile-hidden');
            ul.classList.toggle('mobile-visible');
        });
    };
    
    // Initialize mobile menu if screen is small
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav ul');
        if (window.innerWidth > 768) {
            nav.classList.remove('mobile-hidden', 'mobile-visible');
        }
    });
});

