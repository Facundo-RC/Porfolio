const contenedorEstrellas = document.getElementById("estrellas");
const elementosAnimados = document.querySelectorAll(".revelar");
const enlacesNav = document.querySelectorAll(".enlaces-nav a");
const secciones = document.querySelectorAll("main section[id]");

function crearEstrellas(total) {
  if (!contenedorEstrellas) return;

  const fragmento = document.createDocumentFragment();

  for (let i = 0; i < total; i += 1) {
    const estrella = document.createElement("span");
    estrella.className = "estrella";
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 100}%`;
    estrella.style.opacity = `${0.3 + Math.random() * 0.7}`;
    estrella.style.setProperty("--delay", `${Math.random() * 4}s`);
    estrella.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
    fragmento.appendChild(estrella);
  }

  contenedorEstrellas.appendChild(fragmento);
}

function mostrarAlDesplazar() {
  if (!("IntersectionObserver" in window)) {
    elementosAnimados.forEach((elemento) => elemento.classList.add("visible"));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementosAnimados.forEach((elemento) => observador.observe(elemento));
}

function marcarSeccionActiva() {
  const posicionActual = window.scrollY + 180;
  const alFondo = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

  if (alFondo) {
    const ultimaSeccion = secciones[secciones.length - 1];
    const ultimoId = ultimaSeccion ? ultimaSeccion.getAttribute("id") : null;
    enlacesNav.forEach((enlace) => {
      enlace.classList.toggle("activo", enlace.getAttribute("href") === `#${ultimoId}`);
    });
    return;
  }

  secciones.forEach((seccion) => {
    const inicio = seccion.offsetTop;
    const fin = inicio + seccion.offsetHeight;
    const id = seccion.getAttribute("id");
    const estaActiva = posicionActual >= inicio && posicionActual < fin;

    if (!estaActiva) return;

    enlacesNav.forEach((enlace) => {
      enlace.classList.toggle("activo", enlace.getAttribute("href") === `#${id}`);
    });
  });
}

crearEstrellas(100);
mostrarAlDesplazar();
marcarSeccionActiva();

window.addEventListener("scroll", marcarSeccionActiva);
