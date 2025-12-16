// Theme and palette toggle
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggles = document.querySelectorAll("#theme-toggle");

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.theme = isDark ? "dark" : "light";
    });
  });

  // Palette switching functionality
  const palettePicker = document.getElementById("palette-picker");
  if (palettePicker) {
    // Set initial value from localStorage
    if (localStorage.palette) {
      palettePicker.value = localStorage.palette;
    }

    palettePicker.addEventListener("change", (e) => {
      const palette = e.target.value;
      if (palette === "default") {
        delete document.documentElement.dataset.palette;
        delete localStorage.palette;
      } else {
        document.documentElement.dataset.palette = palette;
        localStorage.palette = palette;
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");

      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle("hidden");
        menuIconClose.classList.toggle("hidden");
      }
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.classList.remove("hidden");
          menuIconClose.classList.add("hidden");
        }
      });
    });
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
