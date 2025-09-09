// ===== Portfolio Website JavaScript =====
// Author: Ahmed Elsayed Elbatrawy
// Version: 1.0.0

// ===== Global Variables =====
let isScrolling = false;

// ===== DOM Content Loaded Event =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions
  initNavigation();
  initScrollEffects();
  initContactForm();
  initAnimations();
  initLoadingScreen();

  // Add smooth scrolling to all internal links
  initSmoothScrolling();
});

// ===== Navigation Functions =====
function initNavigation() {
  const navToggle = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Update active navigation link based on scroll position
  updateActiveNavLink();

  // Add scroll event listener for navbar effects
  window.addEventListener("scroll", function () {
    // Add scrolled class to navbar
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active navigation link
    updateActiveNavLink();

    // Handle back to top button
    handleBackToTop();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // Remove active class from all links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to current section link
  if (currentSection) {
    const activeLink = document.querySelector(
      `.nav-link[href="#${currentSection}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
}

// ===== Smooth Scrolling Functions =====
function initSmoothScrolling() {
  // Handle all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    });
  });
}

function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (targetSection && !isScrolling) {
    isScrolling = true;

    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = targetSection.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
}

// ===== Scroll Effects and Animations =====
function initScrollEffects() {
  // Initialize Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Special handling for progress bars
        if (entry.target.classList.contains("progress-fill")) {
          animateProgressBar(entry.target);
        }

        // Special handling for skill items
        if (entry.target.classList.contains("skill-item")) {
          animateSkillItems(entry.target.parentElement);
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
        .about-text p,
        .education-card,
        .skill-category,
        .timeline-item,
        .project-card,
        .achievement-card,
        .contact-item,
        .progress-item
    `);

  animatedElements.forEach((element) => {
    // Set initial state
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);
  });
}

function animateProgressBar(progressBar) {
  const width = progressBar.style.width;
  progressBar.style.width = "0";

  setTimeout(() => {
    progressBar.style.width = width;
  }, 300);
}

function animateSkillItems(container) {
  const skillItems = container.querySelectorAll(".skill-item");

  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });
}

function initAnimations() {
  // Add stagger animation to hero elements
  const heroElements = [
    document.querySelector(".hero-name"),
    document.querySelector(".hero-title"),
    document.querySelector(".hero-tagline"),
    document.querySelector(".cta-button"),
  ];

  heroElements.forEach((element, index) => {
    if (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 200 + 500);
    }
  });
}

// ===== Back to Top Button =====
function handleBackToTop() {
  const backToTopButton = document.getElementById("back-to-top");

  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

// Initialize back to top button
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// ===== Contact Form Functions =====
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);

    // Add real-time validation
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        clearFieldError(this);
      });
    });
  }
}

function handleFormSubmission(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector(".submit-button");

  // Validate all fields
  const isValid = validateForm(form);

  if (!isValid) {
    showFormMessage("Please correct the errors below.", "error");
    return;
  }

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate form submission (replace with actual backend integration)
  setTimeout(() => {
    // Reset form
    form.reset();

    // Show success message
    showFormMessage(
      "Thank you for your message! I'll get back to you soon.",
      "success"
    );

    // Reset submit button
    submitButton.disabled = false;
    submitButton.innerHTML =
      '<span>Send Message</span><i class="fas fa-paper-plane"></i>';

    // Clear any previous errors
    clearAllFieldErrors(form);
  }, 2000);

  // Log form data for development (remove in production)
  console.log("Form submitted with data:", Object.fromEntries(formData));
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const fieldName = field.getAttribute("name");
  const fieldValue = field.value.trim();
  const errorElement = document.getElementById(`${fieldName}-error`);

  // Clear previous error
  clearFieldError(field);

  // Required field validation
  if (field.hasAttribute("required") && !fieldValue) {
    showFieldError(field, "This field is required.");
    return false;
  }

  // Email validation
  if (field.type === "email" && fieldValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fieldValue)) {
      showFieldError(field, "Please enter a valid email address.");
      return false;
    }
  }

  // Name validation
  if (fieldName === "name" && fieldValue) {
    if (fieldValue.length < 2) {
      showFieldError(field, "Name must be at least 2 characters long.");
      return false;
    }

    const nameRegex = /^[a-zA-Z\s\u0600-\u06FF]+$/;
    if (!nameRegex.test(fieldValue)) {
      showFieldError(field, "Name can only contain letters and spaces.");
      return false;
    }
  }

  // Subject validation
  if (fieldName === "subject" && fieldValue) {
    if (fieldValue.length < 5) {
      showFieldError(field, "Subject must be at least 5 characters long.");
      return false;
    }
  }

  // Message validation
  if (fieldName === "message" && fieldValue) {
    if (fieldValue.length < 10) {
      showFieldError(field, "Message must be at least 10 characters long.");
      return false;
    }
  }

  return true;
}

function showFieldError(field, message) {
  const fieldName = field.getAttribute("name");
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  field.style.borderColor = "var(--error-color)";
  field.classList.add("error");
}

function clearFieldError(field) {
  const fieldName = field.getAttribute("name");
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }

  field.style.borderColor = "var(--medium-gray)";
  field.classList.remove("error");
}

function clearAllFieldErrors(form) {
  const fields = form.querySelectorAll("input, textarea");
  fields.forEach((field) => clearFieldError(field));
}

function showFormMessage(message, type = "info") {
  // Remove existing message
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageElement = document.createElement("div");
  messageElement.className = `form-message form-message--${type}`;
  messageElement.textContent = message;

  // Add styles
  messageElement.style.cssText = `
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        font-weight: 500;
        text-align: center;
        ${
          type === "success"
            ? "background: #d1fae5; color: #065f46; border: 1px solid #10b981;"
            : type === "error"
            ? "background: #fee2e2; color: #991b1b; border: 1px solid #dc2626;"
            : "background: #dbeafe; color: #1e40af; border: 1px solid #3b82f6;"
        }
        animation: slideIn 0.3s ease;
    `;

  // Insert message at the top of the form
  const form = document.getElementById("contact-form");
  form.insertBefore(messageElement, form.firstChild);

  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }
  }, 5000);
}

// ===== Loading Screen =====
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  // Hide loading screen after page is fully loaded
  window.addEventListener("load", function () {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add("hide");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }
    }, 1000);
  });
}

// ===== Utility Functions =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== Performance Optimizations =====

// Optimize scroll events with throttling
window.addEventListener(
  "scroll",
  throttle(function () {
    // Additional scroll-based functionality can be added here
  }, 100)
);

// Preload critical images (add actual image URLs when available)
function preloadImages() {
  const imageUrls = [
    // Add your actual image URLs here
    // 'path/to/hero-image.jpg',
    // 'path/to/headshot.jpg',
    // 'path/to/project-image.jpg'
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// ===== Accessibility Enhancements =====

// Focus management for modal/menu
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) return;

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
  });
}

// Keyboard navigation for mobile menu
document.addEventListener("keydown", function (e) {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("mobile-menu");

  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    navToggle.focus();
  }
});

// ===== Error Handling =====
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);

  // You can add error reporting here
  // For example, send error to analytics service
});

// ===== Custom Animations =====

// Add CSS for custom animations if not defined in CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .form-message {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===== Console Welcome Message =====
console.log(`
🚀 Ahmed Elsayed Elbatrawy - Portfolio Website
📧 Contact: albatrawyahmed@gmail.com
💻 GitHub: [Add your GitHub URL]
🔗 LinkedIn: https://linkedin.com/in/ahmed-albatrawy/

Built with vanilla HTML, CSS, and JavaScript
Version: 1.0.0
`);

// ===== Export functions for global access (if needed) =====
window.portfolioFunctions = {
  scrollToSection,
  showFormMessage,
  validateField,
};
