const content = document.getElementById('app-content');
const navLinks = document.querySelectorAll('[data-module]');

function setActive(name){
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.module === name));
}

async function loadModule(name, push=true){
  try{
    const res = await fetch(`modules/${name}.html`);
    if(!res.ok) throw new Error('Módulo no encontrado: ' + name);
    content.innerHTML = await res.text();

    // importar módulo JS correspondiente (si existe)
    try{
      const mod = await import(`./modules/${name}.js`);
      if(mod && typeof mod.init === 'function') mod.init();
    }catch(err){
      // módulo JS no existe o error; ok para módulos estáticos
      console.warn('No hay JS para el módulo', name, err);
    }

    setActive(name);
    if(push) history.pushState({module:name}, '', `#${name}`);
  }catch(err){
    content.innerHTML = `<div class="card"><h3>Error cargando módulo</h3><pre>${err.message}</pre></div>`;
  }
}

// bind nav
navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  loadModule(a.dataset.module);
}));

window.addEventListener('popstate', ()=> {
  const h = location.hash.replace('#','') || 'inventario';
  loadModule(h, false);
});

// inicial
document.addEventListener('DOMContentLoaded', ()=> {
  const start = location.hash.replace('#','') || 'inventario';
  loadModule(start, false);
});
