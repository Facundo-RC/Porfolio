let usuarioCorrecto = "cross12";
let contraseñaCorrecta = "mx12";
let saldo = 1000000;

const divInfo = document.getElementById("info-usuario");
const menuProductos = document.getElementById("menu-productos");
const mensaje = document.getElementById("mensaje-bienvenida");
const btnSalir = document.getElementById("btn-salir");
const galeria = document.getElementById("galeria-productos");
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const loginMensaje = document.getElementById("login-mensaje");
const loginUsuario = document.getElementById("login-usuario");
const loginPass = document.getElementById("login-pass");
let intentos = 3;

const inputProducto = document.getElementById("input-producto");
const btnComprarInput = document.getElementById("btn-comprar-input");

// ===== LOGIN =====
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = (loginUsuario?.value || "").trim();
        const contraseña = (loginPass?.value || "").trim();

        if (usuario.toLowerCase() === usuarioCorrecto.toLowerCase() && contraseña === contraseñaCorrecta) {
            loginMensaje.textContent = "¡Bienvenido a MX Shop!";
            iniciarTienda();
            if (loginSection) loginSection.style.display = "none";
        } else {
            intentos -= 1;
            if (intentos > 0) {
                loginMensaje.textContent = "Usuario o contraseña incorrecto, te quedan " + intentos + " intentos";
            } else {
                loginMensaje.textContent = "Agotaste los intentos";
                Array.from(loginForm.elements).forEach(el => el.disabled = true);
            }
        }
    });
}

// ===== COMPRA POR INPUT =====
btnComprarInput.addEventListener("click", () => {
    const seleccion = inputProducto.value.toLowerCase().trim();

    if (seleccion === "KTM150cc" || seleccion === "150cc" || seleccion === "KTM150") {
        ejecutarCompra("KTM150cc", 150000);
    } else if (seleccion === "YZ250cc" || seleccion === "250cc" || seleccion === "YZ250") {
        ejecutarCompra("YZ250cc", 280000);
    } else if (seleccion === "CRF450cc" || seleccion === "450cc" || seleccion === " CRF450") {
        ejecutarCompra("CRF450cc", 380000);
    } else if (seleccion === "casco") {
        ejecutarCompra("Casco", 18000);
    } else if (seleccion === "buzo mx" || seleccion === "buzo") {
        ejecutarCompra("Buzo MX", 9000);
    } else if (seleccion === "botas") {
        ejecutarCompra("Botas", 22000);
    } else if (seleccion === "antiparra" || seleccion === "antiparras") {
        ejecutarCompra("Antiparra", 5000);
    } else {
        alert("Producto no encontrado. Intenta con: KTM 150cc, YZ 250cc, CRF 450cc, Casco, Buzo MX o Botas, Antiparra");
    }

    inputProducto.value = "";
});

// ===== FUNCIONES =====
function iniciarTienda() {
    menuProductos.style.display = "block";
    if (galeria) {
        galeria.style.display = "grid";
    }
    mensaje.innerText = "Selecciona tu equipo";
    actualizarPantallaSaldo();
}

function actualizarPantallaSaldo() {
    divInfo.innerHTML = `<h3>Tu saldo actual: $${saldo.toLocaleString("es-AR")}</h3>`;
}

function ejecutarCompra(nombre, precio) {
    if (saldo >= precio) {
        saldo -= precio;
        alert(`Compraste ${nombre}. Se descontaron $${precio.toLocaleString("es-AR")}`);
        actualizarPantallaSaldo();
    } else {
        alert("Saldo insuficiente");
    }
}

btnSalir.addEventListener("click", () => {
    alert("Saldo final: $" + saldo.toLocaleString("es-AR") + ". ¡Hasta la próxima carrera!");
    window.location.href = "https://www.google.com";
});

// ===== GALERÍA: click en botón o imagen =====
if (galeria) {
    galeria.addEventListener("click", (e) => {
        const card = e.target.closest(".producto");
        if (!card) return;
        const nombre = card.dataset.nombre;
        const precio = parseInt(card.dataset.precio, 10);

        if (e.target.classList.contains("btn-seleccionar")) {
            const preset = card.dataset.input || nombre.toLowerCase();
            inputProducto.value = preset;
            inputProducto.focus();
        } else if (e.target.tagName === "IMG" && !e.target.classList.contains("carrusel-img")) {
            ejecutarCompra(nombre, precio);
        }
    });
}

// ===== CARRUSEL CASCO FOX =====
const imagenesCarrusel = [
    "imgn/cascofox.avif",
    "imgn/cascofox2.webp",
    "imgn/cascofox3.webp"
];

let indexCarrusel = 0;

const carruselImg       = document.querySelector(".carrusel-img");
const carruselIndicador = document.querySelector(".carrusel-indicador");
const btnPrev           = document.querySelector(".carrusel-prev");
const btnNext           = document.querySelector(".carrusel-next");

function actualizarCarrusel() {
   
    carruselImg.style.opacity = "0";
    setTimeout(() => {
        carruselImg.src = imagenesCarrusel[indexCarrusel];
        carruselImg.alt = `Casco Fox - vista ${indexCarrusel + 1}`;
        carruselIndicador.textContent = `${indexCarrusel + 1} / ${imagenesCarrusel.length}`;
        carruselImg.style.opacity = "1";
    }, 200);
}

if (btnPrev && btnNext) {
    btnPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        indexCarrusel = (indexCarrusel - 1 + imagenesCarrusel.length) % imagenesCarrusel.length;
        actualizarCarrusel();
    });

    btnNext.addEventListener("click", (e) => {
        e.stopPropagation();
        indexCarrusel = (indexCarrusel + 1) % imagenesCarrusel.length;
        actualizarCarrusel();
    });
}
