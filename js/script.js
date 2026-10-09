/* ==========================================================================
   ICT251 Web Technologies - Activity 3 JavaScript Implementation
   Features Included:
   1. Compulsory Contact Form Validation & Local Preview
   2. Theme Switch (Light/Dark Mode)
   3. Mobile Navigation Toggle
   4. Photo Gallery Viewer (Prev/Next Navigation)
   5. Project Search/Filter Utility
   6. Study Hours Calculator
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initContactForm();
  initGalleryViewer();
  initProjectFilter();
  initStudyCalculator();
});

/* --------------------------------------------------------------------------
   Feature 1: Theme Switch (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (!themeBtn) return;

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}

/* --------------------------------------------------------------------------
   Feature 2: Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById("menu-toggle-btn");
  const navList = document.querySelector("nav ul");

  if (!menuBtn || !navList) return;

  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show-nav");
  });
}

/* --------------------------------------------------------------------------
   Feature 3: Compulsory Contact Form Validation & Local Preview
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const previewBox = document.getElementById("contact-preview");

  if (!form || !previewBox) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh

    // Clear previous errors
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    previewBox.classList.add("hidden");

    const nameVal = document.getElementById("contact-name").value.trim();
    const emailVal = document.getElementById("contact-email").value.trim();
    const messageVal = document.getElementById("contact-message").value.trim();

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Name
    if (nameVal === "") {
      document.getElementById("name-error").textContent = "Please enter a valid name (spaces only not allowed).";
      isValid = false;
    }

    // Validate Email
    if (!emailRegex.test(emailVal)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate Message
    if (messageVal === "") {
      document.getElementById("message-error").textContent = "Please enter a message (spaces only not allowed).";
      isValid = false;
    }

    if (isValid) {
      // Build safe text output using textContent to avoid HTML injection
      previewBox.innerHTML = ""; // Clear existing content
      
      const title = document.createElement("h3");
      title.textContent = "Submission Validation Preview";

      const note = document.createElement("p");
      note.style.fontWeight = "bold";
      note.style.color = "var(--success-color)";
      note.textContent = "Data was validated locally (Browser demonstration only — no message was sent).";

      const nameP = document.createElement("p");
      nameP.textContent = `Name: ${nameVal}`;

      const emailP = document.createElement("p");
      emailP.textContent = `Email: ${emailVal}`;

      const msgP = document.createElement("p");
      msgP.textContent = `Message: ${messageVal}`;

      previewBox.appendChild(title);
      previewBox.appendChild(note);
      previewBox.appendChild(nameP);
      previewBox.appendChild(emailP);
      previewBox.appendChild(msgP);

      previewBox.classList.remove("hidden");
      form.reset();
    }
  });
}

/* --------------------------------------------------------------------------
   Feature 4: Gallery Viewer (Prev / Next Buttons)
   -------------------------------------------------------------------------- */
function initGalleryViewer() {
  const photos = [
    { src: "images/photo1.jpg", caption: "Mulungushi University Main Campus View" },
    { src: "images/photo2.jpg", caption: "Computer Science Library & Study Area" },
    { src: "images/photo3.jpg", caption: "Web Technologies Team Practical Session" }
  ];

  let currentIndex = 0;
  const imgEl = document.getElementById("gallery-img");
  const captionEl = document.getElementById("gallery-caption");
  const prevBtn = document.getElementById("prev-photo-btn");
  const nextBtn = document.getElementById("next-photo-btn");

  if (!imgEl || !captionEl || !prevBtn || !nextBtn) return;

  function updateGallery(index) {
    imgEl.src = photos[index].src;
    imgEl.alt = photos[index].caption;
    captionEl.textContent = photos[index].caption;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateGallery(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photos.length;
    updateGallery(currentIndex);
  });
}

/* --------------------------------------------------------------------------
   Feature 5: Project Search / Filter Utility
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const searchInput = document.getElementById("project-search");
  const resetBtn = document.getElementById("reset-filter-btn");
  const projects = document.querySelectorAll(".project-card");
  const noMsg = document.getElementById("no-projects-msg");

  if (!searchInput || !resetBtn) return;

  function filterProjects() {
    const query = searchInput.value.toLowerCase().trim();
    let matches = 0;

    projects.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const category = card.getAttribute("data-category") || "";

      if (text.includes(query) || category.toLowerCase().includes(query)) {
        card.style.display = "block";
        matches++;
      } else {
        card.style.display = "none";
      }
    });

    if (matches === 0) {
      noMsg.classList.remove("hidden-msg");
    } else {
      noMsg.classList.add("hidden-msg");
    }
  }

  searchInput.addEventListener("input", filterProjects);

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterProjects();
  });
}

/* --------------------------------------------------------------------------
   Feature 6: Study Hours Calculator
   -------------------------------------------------------------------------- */
function initStudyCalculator() {
  const calcForm = document.getElementById("calc-form");
  const resultBox = document.getElementById("calc-result");

  if (!calcForm || !resultBox) return;

  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const hours = parseFloat(document.getElementById("hours-per-day").value);
    const days = parseInt(document.getElementById("days-per-week").value, 10);

    if (isNaN(hours) || isNaN(days) || hours < 0 || days < 1 || days > 7) {
      resultBox.textContent = "Error: Please enter positive numeric hours and days between 1 and 7.";
      resultBox.style.color = "var(--error-color)";
      return;
    }

    const totalHours = hours * days;
    resultBox.textContent = `Total Planned Study Time: ${totalHours.toFixed(1)} hours per week.`;
    resultBox.style.color = "var(--success-color)";
  });
}