
const selected = new Set();
const selectedBox = document.getElementById('selectedServices');
const ordersBox = document.getElementById('savedOrders');

function renderSelected(){
  selectedBox.innerHTML = '';
  if(!selected.size){
    selectedBox.innerHTML = '<span class="muted">Aún no ha agregado servicios.</span>';
    return;
  }
  [...selected].forEach(service=>{
    const chip=document.createElement('span');
    chip.className='chip';
    chip.innerHTML=`${service}<button aria-label="Quitar ${service}">×</button>`;
    chip.querySelector('button').onclick=()=>{selected.delete(service);renderSelected();};
    selectedBox.appendChild(chip);
  });
}
document.querySelectorAll('.add-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{selected.add(btn.dataset.service);renderSelected();});
});
document.getElementById('search').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase().trim();
  document.querySelectorAll('.service-card').forEach(card=>{
    card.style.display=card.innerText.toLowerCase().includes(q)?'flex':'none';
  });
});

function buildOrder(){
  return {
    id: Date.now(),
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    quantity: document.getElementById('quantity').value.trim(),
    date: document.getElementById('date').value,
    details: document.getElementById('details').value.trim(),
    services: [...selected],
    createdAt: new Date().toLocaleString('es-CO')
  };
}
function validate(order){
  if(!order.name || !order.phone){alert('Por favor complete nombre y teléfono.');return false;}
  if(!order.services.length){alert('Agregue al menos un servicio a la cotización.');return false;}
  return true;
}
document.getElementById('quoteForm').addEventListener('submit',e=>{
  e.preventDefault();
  const o=buildOrder(); if(!validate(o)) return;
  const msg=[
    'Hola, Dulcinea. Deseo solicitar una cotización.',
    `Nombre: ${o.name}`,
    `Teléfono: ${o.phone}`,
    o.email?`Correo: ${o.email}`:'',
    `Servicios: ${o.services.join(', ')}`,
    o.quantity?`Cantidad: ${o.quantity}`:'',
    o.date?`Fecha requerida: ${o.date}`:'',
    o.details?`Detalles: ${o.details}`:''
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/573142594217?text=${encodeURIComponent(msg)}`,'_blank');
});
document.getElementById('saveOrder').addEventListener('click',()=>{
  const o=buildOrder(); if(!validate(o)) return;
  const orders=JSON.parse(localStorage.getItem('dulcinea_orders')||'[]');
  orders.unshift(o);
  localStorage.setItem('dulcinea_orders',JSON.stringify(orders));
  renderOrders();
  alert('Pedido guardado en este dispositivo.');
});
function renderOrders(){
  const orders=JSON.parse(localStorage.getItem('dulcinea_orders')||'[]');
  ordersBox.innerHTML='';
  if(!orders.length){ordersBox.innerHTML='<p class="muted">No hay pedidos guardados.</p>';return;}
  orders.forEach(o=>{
    const div=document.createElement('article');
    div.className='order-card';
    div.innerHTML=`<h3>${o.name}</h3>
      <p><strong>Servicios:</strong> ${o.services.join(', ')}</p>
      <p><strong>Teléfono:</strong> ${o.phone}</p>
      <p><strong>Guardado:</strong> ${o.createdAt}</p>`;
    ordersBox.appendChild(div);
  });
}
document.getElementById('clearOrders').onclick=()=>{
  if(confirm('¿Desea borrar el historial guardado?')){
    localStorage.removeItem('dulcinea_orders'); renderOrders();
  }
};
renderOrders();

let deferredPrompt;
const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault(); deferredPrompt=e; installBtn.classList.remove('hidden');
});
installBtn.addEventListener('click',async()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installBtn.classList.add('hidden');
});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js'));}
