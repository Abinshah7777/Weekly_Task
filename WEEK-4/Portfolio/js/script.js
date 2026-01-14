/* ================================================
   PORTFOLIO JAVASCRIPT - INTERACTIONS & ANIMATIONS
   Created for Abinshah P M
================================================ */

// ========== INITIALIZE EMAILJS ==========
(function() {
  emailjs.init("service_7ooqqfj"); // Replace with your actual EmailJS public key
})();

// ========== MOBILE NAVIGATION TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ========== SMOOTH SCROLLING ==========
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class for styling
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ========== ACTIVE NAVIGATION HIGHLIGHTING ==========
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollPosition = window.pageYOffset + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ========== SCROLL ANIMATIONS (INTERSECTION OBSERVER) ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// ========== TIMELINE ANIMATION ==========
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); // Stagger animation
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// ========== SKILL CHIPS HOVER EFFECT (ENHANCED) ==========
const skillChips = document.querySelectorAll('.skill-chip');

skillChips.forEach(chip => {
  chip.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px) scale(1.05)';
  });
  
  chip.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ========== CONTACT FORM HANDLING WITH EMAILJS ==========
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = contactForm.querySelector('.btn-submit');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  formStatus.classList.remove('show', 'success', 'error');
  
  try {
    // Send email using EmailJS
    const response = await emailjs.sendForm(
      'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
      contactForm
    );
    
    // Success
    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
    formStatus.classList.add('show', 'success');
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formStatus.classList.remove('show');
    }, 5000);
    
  } catch (error) {
    // Error
    console.error('EmailJS Error:', error);
    formStatus.textContent = '✗ Failed to send message. Please try again or email me directly.';
    formStatus.classList.add('show', 'error');
    
    // Hide error message after 7 seconds
    setTimeout(() => {
      formStatus.classList.remove('show');
    }, 7000);
  } finally {
    // Reset loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ========== FORM INPUT ANIMATIONS ==========
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
  // Add focus animation
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = '';
  });
});

// ========== PROJECT CARDS PARALLAX EFFECT ==========
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ========== SERVICE CARDS STAGGER ANIMATION ==========
const serviceCards = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

serviceCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  serviceObserver.observe(card);
});

// ========== CURSOR GRADIENT EFFECT (OPTIONAL) ==========
// Uncomment to enable custom cursor effect

document.addEventListener('mousemove', (e) => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-trail';
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  
  document.body.appendChild(cursor);
  
  setTimeout(() => {
    cursor.remove();
  }, 500);
});


// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
  this.style.transform = 'translateY(-4px) scale(1.1)';
  this.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
  this.style.transform = '';
  this.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
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

// Apply debounce to scroll events
const debouncedHighlight = debounce(highlightNavigation, 100);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ========== PRELOAD ANIMATIONS ==========
window.addEventListener('load', () => {
  // Add loaded class to body for any load-based animations
  document.body.classList.add('loaded');
  
  // Trigger initial scroll check for navigation highlighting
  highlightNavigation();
});

// ========== CONSOLE MESSAGE ==========
console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #64748b; font-size: 14px;');
console.log('%cCheck out my work: https://github.com/Abinshah7777', 'color: #10b981; font-size: 14px;');