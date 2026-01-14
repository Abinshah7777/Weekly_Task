// ===============================
// Navbar Smooth Scroll
// ===============================
const navbarHeight = document.querySelector(".navbar").offsetHeight;

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    const offsetTop = targetSection.offsetTop - navbarHeight + 10; // Adjust spacing

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// ===============================
// Active Nav Link on Scroll
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= navbarHeight + 20 && rect.bottom >= navbarHeight + 20) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// ===============================
// Contact Section Hover Effect
// ===============================
const contactSection = document.getElementById("contact");

contactSection.addEventListener("mouseenter", () => {
  contactSection.classList.add("contact-hover");
});

contactSection.addEventListener("mouseleave", () => {
  contactSection.classList.remove("contact-hover");
});

// ===============================
// EmailJS Contact Form
// ===============================
emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  emailjs
    .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
    .then(
      () => {
        statusMsg.innerText = "Message sent successfully!";
        statusMsg.style.color = "green";
        contactForm.reset();
      },
      (err) => {
        statusMsg.innerText = "Failed to send message. Please try again.";
        statusMsg.style.color = "red";
        console.error("EmailJS Error:", err);
      }
    );
});
