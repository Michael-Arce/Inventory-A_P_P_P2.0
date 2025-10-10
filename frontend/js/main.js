const content = document.getElementById('app-content');
const navLinks = document.querySelectorAll('[data-module]');

function setActive(name){
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.module === name));
}

async function loadModule(name, push=true){
  try {
    // Cargar el HTML del módulo (desde frontend/modules)
    const res = await fetch(`../modules/${name}.html`);
    if (!res.ok) throw new Error('Módulo no encontrado: ' + name);
    content.innerHTML = await res.text();

    // Intentar importar el JS del módulo (desde frontend/js/modules)
    try {
      const mod = await import(`./modules/${name}.js`);
      if (mod && typeof mod.init === 'function') mod.init();
    } catch (err) {
      console.warn('No hay JS para el módulo', name, err);
    }

    setActive(name);
    if (push) history.pushState({ module: name }, '', `#${name}`);
  } catch (err) {
    content.innerHTML = `<div class="card"><h3>Error cargando módulo</h3><pre>${err.message}</pre></div>`;
  }
}

// Enlazar navegación
navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  loadModule(a.dataset.module);
}));

window.addEventListener('popstate', () => {
  const h = location.hash.replace('#', '') || 'inventario';
  loadModule(h, false);
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const start = location.hash.replace('#', '') || 'inventario';
  loadModule(start, false);
});

// Probar API y mostrar productos
fetch("http://localhost:4000/api/productos")
  .then(res => res.json())
  .then(data => {
    console.log("Productos desde el backend:", data);

    const tabla = document.createElement("table");
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(p => `
          <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.descripcion || "-"}</td>
            <td>${p.precio}</td>
            <td>${p.cantidad}</td>
          </tr>`).join("")}
      </tbody>
    `;

    const content = document.getElementById("app-content");
    content.innerHTML = "";
    content.appendChild(tabla);
  })
  .catch((err) => {
    console.error("Error:", err);
    const content = document.getElementById("app-content");
    content.innerHTML = `<p style="color:red;">Error al cargar productos 😞</p>`;
  });
