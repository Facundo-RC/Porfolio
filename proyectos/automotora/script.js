const header = document.getElementById('header');
const modal = document.getElementById('modal');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

document.querySelectorAll('.filtro').forEach(boton => {
  boton.addEventListener('click', () => {
    document.querySelector('.filtro.activo').classList.remove('activo');
    boton.classList.add('activo');

    const tipo = boton.dataset.tipo;
    document.querySelectorAll('.card').forEach(card => {
      card.classList.toggle('oculto', tipo !== 'todos' && card.dataset.tipo !== tipo);
    });
  });
});

function verDetalle(nombre, tipo, precio, anio, motor, trans, comb, color) {
  document.getElementById('modal-nombre').textContent = nombre;
  document.getElementById('modal-tipo').textContent   = tipo;
  document.getElementById('modal-precio').textContent = precio;
  document.getElementById('modal-anio').textContent   = anio;
  document.getElementById('modal-motor').textContent  = motor;
  document.getElementById('modal-trans').textContent  = trans;
  document.getElementById('modal-comb').textContent   = comb;
  document.getElementById('modal-color').textContent  = color;

  modal.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modal.classList.remove('abierto');
  document.body.style.overflow = '';
}

modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });

document.getElementById('form-contacto').addEventListener('submit', function(e) {
  e.preventDefault();
  if (this.nombre.value.trim() && this.email.value.trim() && this.mensaje.value.trim()) {
    this.reset();
    const msg = document.getElementById('msg-exito');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
  card.style.cssText = 'opacity:0; transform:translateY(20px); transition:opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
