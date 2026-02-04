const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Form submission handling
document.addEventListener("submit", async function (e) {
  if (!e.target.matches("[data-formspree]")) return;

  e.preventDefault();
  const form = e.target;
  const status = form.querySelector(".form-success");

  const response = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { Accept: "application/json" },
  });

  if (response.ok) {
    form.reset();
    status.hidden = false;
  }
});
