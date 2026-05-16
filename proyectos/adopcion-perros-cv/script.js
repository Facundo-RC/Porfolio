const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const filterButtons = document.querySelectorAll(".filter-btn");
const dogCards = document.querySelectorAll(".dog-card");
const highlightDogBtn = document.getElementById("highlightDogBtn");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const dogButtons = document.querySelectorAll(".link-btn");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    dogCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === "todos" || category === filter;

      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

if (highlightDogBtn) {
  highlightDogBtn.addEventListener("click", () => {
    const dogsSection = document.getElementById("perros");

    dogsSection?.scrollIntoView({ behavior: "smooth" });

    dogCards.forEach((card) => {
      const title = card.querySelector("h3");
      const isLuna = title?.textContent === "Luna";

      card.style.outline = isLuna ? "3px solid #ff7a36" : "none";
      card.style.transform = isLuna ? "translateY(-6px)" : "";
    });
  });
}

dogButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dogName = button.dataset.dog ?? "este perro";

    if (formMessage) {
      formMessage.textContent = `Perfecto. Registramos tu interes en ${dogName}. Completa el formulario y te contactaremos pronto.`;
    }

    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  });
});

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("nombre");
    const interest = formData.get("interes");

    formMessage.textContent =
      `Gracias ${name}. Tu solicitud para ${interest} fue enviada con exito.`;
    form.reset();
  });
}
