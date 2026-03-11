const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");
    const expanded = navLinks.classList.contains("open");
    navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-nav")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Formspree form handling
document.addEventListener("submit", async function (e) {
  if (!e.target.matches("[data-formspree]")) return;

  e.preventDefault();

  const form = e.target;
  const status = form.querySelector(".form-success");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      if (status) {
        status.hidden = false;
      }
    } else {
      alert("There was a problem sending your message. Please try again.");
    }
  } catch (error) {
    alert("There was a network error. Please try again.");
  }
});

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}
