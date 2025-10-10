export async function init() {
  const productoSelect = document.getElementById("productoSelect");
  const origenSelect = document.getElementById("origenSelect");
  const destinoSelect = document.getElementById("destinoSelect");
  const form = document.getElementById("formTraslado");
  const resultado = document.getElementById("resultadoTraslado");

  // Cargar productos
  const productos = await fetch("http://localhost:4000/api/productos").then(r => r.json());
  productoSelect.innerHTML = productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("");

  // Cargar negocios
  const negocios = await fetch("http://localhost:4000/api/negocios").then(r => r.json());
  origenSelect.innerHTML = negocios.map(n => `<option value="${n.id}">${n.nombre}</option>`).join("");
  destinoSelect.innerHTML = negocios.map(n => `<option value="${n.id}">${n.nombre}</option>`).join("");

  // Enviar traslado
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      productoId: productoSelect.value,
      origenId: origenSelect.value,
      destinoId: destinoSelect.value,
      cantidad: parseInt(document.getElementById("cantidadInput").value)
    };

    const res = await fetch("http://localhost:4000/api/traslados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const resultadoData = await res.json();
    resultado.innerHTML = `<pre>${JSON.stringify(resultadoData, null, 2)}</pre>`;
  });
}
