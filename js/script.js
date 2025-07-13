// navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".pixel-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");

mobileToggle.addEventListener("click", function () {
  this.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});
const mobileClose = document.getElementById("mobileClose");

mobileClose.addEventListener("click", function () {
  mobileToggle.classList.remove("active");
  mobileMenu.classList.remove("open");
});

// Particle animation for logo
const particleContainer = document.getElementById("particle-container");

function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Random position around logo
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;

  // Random animation duration
  particle.style.animationDuration = `${3 + Math.random() * 3}s`;

  // Random delay
  particle.style.animationDelay = `${Math.random() * 2}s`;

  particleContainer.appendChild(particle);

  // Remove particle after animation completes
  setTimeout(() => {
    particle.remove();
  }, 6000);
}

// Create initial particles
for (let i = 0; i < 15; i++) {
  createParticle();
}

// Continuous particle generation
setInterval(createParticle, 300);
// -----------------------------------------------------------------

// hero section
document.addEventListener("DOMContentLoaded", function () {
  const techIcons = document.querySelectorAll(".tech-icon");

  techIcons.forEach((icon, index) => {
    // Randomize initial positions
    icon.style.left = `${Math.random() * 80 + 10}%`;
    icon.style.top = `${Math.random() * 80 + 10}%`;

    // Randomize animation duration
    icon.style.animationDuration = `${15 + Math.random() * 15}s`;

    // Random delay
    icon.style.animationDelay = `${Math.random() * 5}s`;
  });
});

// -------------------------------------------------------------------------

// logo slider
// Enhanced hover effects
document.querySelectorAll(".logo-slide").forEach((slide) => {
  slide.addEventListener("mouseenter", () => {
    slide.style.transform = "scale(1.1)";
    slide.style.filter = "grayscale(0) brightness(1)";
    slide.style.opacity = "1";
  });

  slide.addEventListener("mouseleave", () => {
    slide.style.transform = "scale(1)";
    slide.style.filter = "grayscale(100%) brightness(2)";
    slide.style.opacity = "0.7";
  });
});

// Pause animation on hover
const track = document.querySelector(".logo-track");
track.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

track.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});

// ----------------------------------------------------------------------------
// service overview
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
    card.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(-10px) rotateX(5deg)";
  });
});
// ----------------------------------------------------------------------------------------------

// about us
const timelineItems = document.querySelectorAll(".timeline-item");

function checkTimeline() {
  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < window.innerHeight - 100) {
      item.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkTimeline);
window.addEventListener("load", checkTimeline);

// Animated counter
const counters = document.querySelectorAll(".stat-number");
const speed = 200;

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Start counter when stats section is visible
const statsSection = document.querySelector(".stats-section");

function checkCounter() {
  const sectionTop = statsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100) {
    animateCounters();
    window.removeEventListener("scroll", checkCounter);
  }
}

window.addEventListener("scroll", checkCounter);
// --------------------------------------------------------
// why choose us
const benefitCards = document.querySelectorAll(".benefit-card");

function animateCards() {
  benefitCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      card.style.transitionDelay = `${index * 0.1}s`;
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

// Initialize cards as invisible
benefitCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
});

window.addEventListener("scroll", animateCards);
window.addEventListener("load", animateCards);
// ---------------------------------------------
// testi
const slider = document.getElementById("testimonialsSlider");
const dots = document.querySelectorAll(".nav-dot");
let currentIndex = 0;

// Update dots based on scroll position
slider.addEventListener("scroll", () => {
  const scrollPos = slider.scrollLeft;
  const cardWidth = slider.querySelector(".testimonial-card").offsetWidth + 30;
  currentIndex = Math.round(scrollPos / cardWidth);

  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
});

// Click dot to scroll to testimonial
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const cardWidth =
      slider.querySelector(".testimonial-card").offsetWidth + 30;
    slider.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  });
});

// Auto-scroll testimonials
function autoScrollTestimonials() {
  const cardCount = slider.querySelectorAll(
    ".testimonial-card, .video-testimonial"
  ).length;
  currentIndex = (currentIndex + 1) % cardCount;

  const cardWidth = slider.querySelector(".testimonial-card").offsetWidth + 30;
  slider.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });

  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

let scrollInterval = setInterval(autoScrollTestimonials, 5000);

// Pause auto-scroll on hover
slider.addEventListener("mouseenter", () => {
  clearInterval(scrollInterval);
});

slider.addEventListener("mouseleave", () => {
  scrollInterval = setInterval(autoScrollTestimonials, 5000);
});

// Video testimonial play button
const playButton = document.querySelector(".play-button");
const testimonialVideo = document.querySelector(".video-testimonial video");

playButton.addEventListener("click", () => {
  if (testimonialVideo.paused) {
    testimonialVideo.play();
    playButton.style.opacity = "0";
  } else {
    testimonialVideo.pause();
    playButton.style.opacity = "1";
  }
});

testimonialVideo.addEventListener("click", () => {
  if (testimonialVideo.paused) {
    testimonialVideo.play();
    playButton.style.opacity = "0";
  } else {
    testimonialVideo.pause();
    playButton.style.opacity = "1";
  }
});
// -------------------------------------------

// cta
document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(".floating-icon");

  icons.forEach((icon) => {
    // Randomize initial positions
    icon.style.left = `${Math.random() * 80 + 10}%`;
    icon.style.top = `${Math.random() * 100 + 50}%`;

    // Randomize animation duration
    icon.style.animationDuration = `${15 + Math.random() * 15}s`;

    // Random delay
    icon.style.animationDelay = `${Math.random() * 5}s`;
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".cta-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = this.classList.contains("cta-primary")
        ? "translateY(-5px)"
        : "translateY(-5px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
// ----------------------------------------------

// contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;

  // Here you would typically send the data to a server
  // For this example, we'll show a success message
  alert(
    `Thank you, ${name}! Your message has been received. We'll contact you soon at ${email} about ${
      service ? "our " + service + " service" : "your inquiry"
    }.`
  );

  // Reset form
  this.reset();
});

// Animate form elements on scroll
const formGroups = document.querySelectorAll(".form-group");

function animateForm() {
  formGroups.forEach((group, index) => {
    const groupTop = group.getBoundingClientRect().top;
    if (groupTop < window.innerHeight - 100) {
      group.style.transitionDelay = `${index * 0.1}s`;
      group.style.opacity = "1";
      group.style.transform = "translateY(0)";
    }
  });
}

// Initialize form groups as invisible
formGroups.forEach((group) => {
  group.style.opacity = "0";
  group.style.transform = "translateY(20px)";
});

window.addEventListener("scroll", animateForm);
window.addEventListener("load", animateForm);
// ---------------------------------------------------
// footer
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

backToTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input").value;
  alert(
    `Thank you for subscribing with ${email}! You'll receive our next newsletter.`
  );
  this.reset();
});

// Animate footer links on scroll
const footerLinks = document.querySelectorAll(".footer-links li");

function animateLinks() {
  footerLinks.forEach((link, index) => {
    const linkTop = link.getBoundingClientRect().top;
    if (linkTop < window.innerHeight - 100) {
      link.style.transitionDelay = `${index * 0.1}s`;
      link.style.opacity = "1";
      link.style.transform = "translateX(0)";
    }
  });
}

// Initialize links as invisible
footerLinks.forEach((link) => {
  link.style.opacity = "0";
  link.style.transform = "translateX(-20px)";
});

window.addEventListener("scroll", animateLinks);
window.addEventListener("load", animateLinks);
// ------------------------------------------------------------------

// tech stack
const techCategories = document.querySelectorAll(".tech-category");
const techItems = document.querySelectorAll(".tech-item");

techCategories.forEach((category) => {
  category.addEventListener("click", function () {
    // Update active category
    techCategories.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");

    const filter = this.textContent.toLowerCase();

    // Filter tech items
    techItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Animate tech items on load
function animateTechItems() {
  techItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < window.innerHeight - 100) {
      item.style.transitionDelay = `${index * 0.05}s`;
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }
  });
}

// Initialize items as invisible
techItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
});

window.addEventListener("scroll", animateTechItems);
window.addEventListener("load", animateTechItems);

// ----------------------------------------------------------
// chatbot
document.addEventListener("DOMContentLoaded", function () {
  const chatbotContainer = document.querySelector(".chatbot-container");
  const chatbotToggleBtn = document.querySelector(".chatbot-toggle-btn");
  const chatbotCloseBtn = document.querySelector(".chatbot-close-btn");
  const chatbotMessages = document.querySelector(".chatbot-messages");
  const chatbotInput = document.querySelector(".chatbot-text-input");
  const chatbotSendBtn = document.querySelector(".chatbot-send-btn");

  // Toggle chatbot visibility
  chatbotToggleBtn.addEventListener("click", function () {
    chatbotContainer.classList.toggle("active");
  });

  // Close chatbot
  chatbotCloseBtn.addEventListener("click", function () {
    chatbotContainer.classList.remove("active");
  });

  // Send message function
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === "") return;

    // Add user message
    addMessage(message, "user");
    chatbotInput.value = "";

    // Simulate bot response after a short delay
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, "bot");
    }, 500);
  }

  // Add message to chat
  function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "chatbot-message",
      sender === "user" ? "chatbot-query" : "chatbot-response"
    );

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("message-content");
    contentDiv.textContent = message;

    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Get bot response
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! How can I assist you with PixelPower today?";
    } else if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("offer")
    ) {
      return "PixelPower offers web development, mobile apps, UI/UX design, and digital marketing services.";
    } else if (
      lowerMessage.includes("technology") ||
      lowerMessage.includes("tech stack")
    ) {
      return "We use modern technologies like React, Node.js, Python, MongoDB, and more. Check out our technology stack section!";
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("phone")
    ) {
      return "You can reach us at contact@pixelpower.com or call +1 (555) 123-4567.";
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("how much")
    ) {
      return "Our pricing depends on project requirements. Could you share more details about your project?";
    } else if (
      lowerMessage.includes("thank") ||
      lowerMessage.includes("thanks")
    ) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm still learning! For now, I can tell you about our services, technologies, and contact information. Ask me anything about these topics!";
    }
  }

  // Event listeners
  chatbotSendBtn.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
// ----------------------------------------------------------------

// -----------------------------------------------------------------
// cursor
// Add this to your existing JS
const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

const trails = [];
const trailCount = 10; // Number of trailing elements

// Create trail elements
for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  trail.style.opacity = 1 - i / trailCount;
  trail.style.width = `${20 + i * 3}px`;
  trail.style.height = `${20 + i * 3}px`;
  document.body.appendChild(trail);
  trails.push({
    element: trail,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
}

let mouseX = 0;
let mouseY = 0;
let delayedX = 0;
let delayedY = 0;
const delay = 0.5; // Trail follow speed (higher = slower)

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Update main cursor
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

  // Update trails with delay
  let prevX = mouseX;
  let prevY = mouseY;

  trails.forEach((trail, index) => {
    trail.targetX = prevX;
    trail.targetY = prevY;
    trail.x = lerp(trail.x, trail.targetX, delay);
    trail.y = lerp(trail.y, trail.targetY, delay);

    trail.element.style.left = trail.x + "px";
    trail.element.style.top = trail.y + "px";

    // Color shift for each trail element
    const hue = (240 + index * 15) % 360;
    trail.element.style.background = `
      radial-gradient(
        circle, 
        hsla(${hue}, 80%, 60%, 0.7) 0%, 
        hsla(${(hue + 60) % 360}, 80%, 60%, 0.3) 50%, 
        transparent 70%
    `;

    prevX = trail.x;
    prevY = trail.y;
  });

  requestAnimationFrame(animate);
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// Hide cursor on touch devices
const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

if (isTouchDevice()) {
  cursor.style.display = "none";
  trails.forEach((trail) => {
    trail.element.style.display = "none";
  });
}

animate();
// ----------------------------------------------------

// CTA Dropdown Functionality
const ctaButton = document.getElementById("ctaButton");
const ctaOptions = document.getElementById("ctaOptions");
const mobileCtaButton = document.getElementById("mobileCtaButton");
const mobileCtaOptions = document.getElementById("mobileCtaOptions");

// Desktop toggle
ctaButton.addEventListener("click", (e) => {
  e.stopPropagation();
  ctaOptions.classList.toggle("show");
});

// Mobile toggle
mobileCtaButton.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileCtaOptions.classList.toggle("show");
});

// Close when clicking outside
document.addEventListener("click", () => {
  ctaOptions.classList.remove("show");
  mobileCtaOptions.classList.remove("show");
});

// Prevent dropdown from closing when clicking inside
ctaOptions.addEventListener("click", (e) => e.stopPropagation());
mobileCtaOptions.addEventListener("click", (e) => e.stopPropagation());

// Replace phone numbers with your actual numbers
document
  .querySelectorAll('[href^="tel:"], [href*="whatsapp"]')
  .forEach((el) => {
    el.setAttribute(
      "href",
      el.getAttribute("href").replace("1234567890", "YOUR_PHONE_NUMBER")
    );
  });
