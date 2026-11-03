/* =========================================
   YOUSSEF HOSSAM - PORTFOLIO
   INTERACTIONS, ANIMATIONS & LANGUAGES
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // LANGUAGE SYSTEM
  // =====================================

  const languageToggle = document.getElementById("languageToggle");

  let currentLanguage = localStorage.getItem("portfolioLanguage") || "en";

  function updateLanguage(language) {
    currentLanguage = language;

    localStorage.setItem("portfolioLanguage", language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach(element => {
      element.textContent =
        language === "ar"
          ? element.getAttribute("data-ar")
          : element.getAttribute("data-en");
    });

    document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach(element => {
      element.placeholder =
        language === "ar"
          ? element.getAttribute("data-placeholder-ar")
          : element.getAttribute("data-placeholder-en");
    });

    if (languageToggle) {
      const englishLabel = languageToggle.querySelector(".lang-en");
      const arabicLabel = languageToggle.querySelector(".lang-ar");

      if (englishLabel && arabicLabel) {
        englishLabel.classList.toggle("active", language === "en");
        arabicLabel.classList.toggle("active", language === "ar");
      }

      languageToggle.setAttribute(
        "aria-label",
        language === "ar" ? "Switch to English" : "التغيير إلى العربية"
      );
    }

    const pageTitles = {
      "index.html": {
        en: "Youssef Hossam | Two Worlds. One Identity.",
        ar: "يوسف حسام | عالمان، هوية واحدة"
      },
      "technology.html": {
        en: "Technology | Youssef Hossam",
        ar: "التكنولوجيا | يوسف حسام"
      },
      "business.html": {
        en: "Business | Youssef Hossam",
        ar: "الأعمال | يوسف حسام"
      }
    };

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    if (pageTitles[currentPage]) {
      document.title = pageTitles[currentPage][language];
    }

    const footerText = document.querySelector(".footer p");

    if (footerText) {
      const year = new Date().getFullYear();

      footerText.textContent =
        language === "ar"
          ? `© ${year} يوسف حسام. جميع الحقوق محفوظة.`
          : `© ${year} Youssef Hossam. All rights reserved.`;
    }
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      updateLanguage(currentLanguage === "en" ? "ar" : "en");
    });
  }

  updateLanguage(currentLanguage);


  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? (currentLanguage === "ar" ? "إغلاق القائمة" : "Close navigation menu")
          : (currentLanguage === "ar" ? "فتح القائمة" : "Open navigation menu")
      );
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", event => {
      if (
        !menuToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }


  // =====================================
  // REVEAL ELEMENTS ON SCROLL
  // =====================================

  const revealElements = document.querySelectorAll(
    ".world-card, .highlight-item, .about-content, .contact-section, " +
    ".business-skill, .metric-card, .business-experience-card, " +
    ".skill-box, .experience-item, .project-showcase"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }


  // =====================================
  // HERO MOUSE PARALLAX
  // =====================================

  if (window.matchMedia("(pointer: fine)").matches) {

    const heroVisual = document.querySelector(".hero-visual");

    const technologyArt = document.querySelector(".tech-hero-art");
    const businessArt = document.querySelector(".business-hero-art");

    // HOME PAGE - Keep original movement
    if (heroVisual) {
      document.addEventListener("mousemove", event => {
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;

        heroVisual.style.setProperty("--mouse-x", `${x}px`);
        heroVisual.style.setProperty("--mouse-y", `${y}px`);
      });
    }

    // TECHNOLOGY & BUSINESS - 3D mouse movement
    const interactiveArts = [technologyArt, businessArt].filter(Boolean);

    interactiveArts.forEach(art => {

      const layers = art.querySelectorAll(
        ".tech-circle, .tech-core, .tech-floating, " +
        ".business-ring, .business-core, .business-stat, .business-orbit-symbol"
      );

      // Smooth movement
      art.style.transition = "translate 0.25s ease-out";

      layers.forEach(layer => {
        layer.style.transition = "translate 0.3s ease-out";
      });

      document.addEventListener("mousemove", event => {

        const rect = art.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = (event.clientX - centerX) / (window.innerWidth / 2);
        const mouseY = (event.clientY - centerY) / (window.innerHeight / 2);

        const x = Math.max(-1, Math.min(1, mouseX));
        const y = Math.max(-1, Math.min(1, mouseY));

        // Move the whole illustration slightly
        art.style.translate = `${x * -10}px ${y * -10}px`;

        // Give each layer a different depth
        layers.forEach((layer, index) => {

          const depth = (index % 3 + 1) * 3;

          const moveX = x * depth * -1;
          const moveY = y * depth * -1;

          layer.style.translate = `${moveX}px ${moveY}px`;
        });

      });

      // Reset movement when mouse leaves the page
      document.addEventListener("mouseleave", () => {
        art.style.translate = "0px 0px";

        layers.forEach(layer => {
          layer.style.translate = "0px 0px";
        });
      });

    });
  }

});