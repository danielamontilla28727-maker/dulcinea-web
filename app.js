
const selected = new Set();
const selectedBox = document.getElementById('selectedServices');

function renderSelected(){
  selectedBox.innerHTML = '';
  if(!selected.size){
    selectedBox.innerHTML = '<span class="empty-selection">Aún no ha agregado servicios.</span>';
    return;
  }
  [...selected].forEach(service => {
    const chip = document.createElement('span');
    chip.className = 'selected-chip';
    chip.innerHTML = `${service}<button type="button" aria-label="Quitar ${service}">×</button>`;
    chip.querySelector('button').addEventListener('click', () => {
      selected.delete(service);
      renderSelected();
    });
    selectedBox.appendChild(chip);
  });
}

document.querySelectorAll('.quote-service').forEach(btn => {
  btn.addEventListener('click', () => {
    selected.add(btn.dataset.service);
    renderSelected();
    document.getElementById('cotizar').scrollIntoView({behavior:'smooth'});
  });
});

document.getElementById('serviceSearch').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
  });
});

document.getElementById('quoteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const date = document.getElementById('requiredDate').value;
  const details = document.getElementById('details').value.trim();

  if(!selected.size){
    alert('Agregue al menos un servicio a la cotización.');
    return;
  }

  const message = [
    'Hola, Sra. Lucía. Deseo solicitar una cotización con Dulcinea.',
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    email ? `Correo: ${email}` : '',
    `Servicios: ${[...selected].join(', ')}`,
    quantity ? `Cantidad aproximada: ${quantity}` : '',
    date ? `Fecha requerida: ${date}` : '',
    details ? `Detalles: ${details}` : ''
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/573142594217?text=${encodeURIComponent(message)}`, '_blank');
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.lightbox;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

if('serviceWorker' in navigator){
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js'));
}
