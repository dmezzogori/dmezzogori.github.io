// Theme and palette toggle with event delegation for performance
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM references
  const html = document.documentElement;
  const palettePicker = document.getElementById("palette-picker");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  // Set initial palette picker value from localStorage
  if (palettePicker && localStorage.palette) {
    palettePicker.value = localStorage.palette;
  }

  // Helper function to close mobile menu
  function closeMobileMenu() {
    if (mobileMenu && mobileMenuButton) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
      }
    }
  }

  // Use event delegation on document.body for better performance
  document.body.addEventListener("click", (e) => {
    // Theme toggle - use data attribute for more reliable selection
    if (e.target.closest("#theme-toggle")) {
      const isDark = html.classList.toggle("dark");
      localStorage.theme = isDark ? "dark" : "light";
      return;
    }

    // Mobile menu button
    if (e.target.closest("#mobile-menu-button")) {
      const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle("hidden");
        menuIconClose.classList.toggle("hidden");
      }
      return;
    }

    // Mobile menu links - close menu on navigation
    if (mobileMenu && e.target.closest("#mobile-menu a")) {
      closeMobileMenu();
      return;
    }
  });

  // Palette picker change (not delegated - single element with ID)
  if (palettePicker) {
    palettePicker.addEventListener("change", (e) => {
      const palette = e.target.value;
      if (palette === "default") {
        delete html.dataset.palette;
        delete localStorage.palette;
      } else {
        html.dataset.palette = palette;
        localStorage.palette = palette;
      }
    });
  }

  // Intersection Observer for scroll-triggered reveal animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after revealing (animate once)
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});

// Handle system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      document.documentElement.classList.toggle("dark", e.matches);
    }
  });
