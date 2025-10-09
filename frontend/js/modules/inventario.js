const LS_KEY_PRODUCTS = 'erp_products_v2';
const LS_KEY_MOVES = 'erp_moves_v2';

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function escapeHtml(s){ return String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

export function init(){
  let products = JSON.parse(localStorage.getItem(LS_KEY_PRODUCTS) || '[]');
  let moves = JSON.parse(localStorage.getItem(LS_KEY_MOVES) || '[]');

  const formProd = document.getElementById('product-form');
  const formMove = document.getElementById('move-form');
  const tbodyProd = document.getElementById('product-table-body');
  const tbodyMoves = document.getElementById('move-table-body');
  const totalValue = document.getElementById('total-value');
  const selectProd = document.getElementById('m-product');

  const save = () => {
    localStorage.setItem(LS_KEY_PRODUCTS, JSON.stringify(products));
    localStorage.setItem(LS_KEY_MOVES, JSON.stringify(moves));
  };

  const renderProducts = () => {
    tbodyProd.innerHTML = products.map(p => `
      <tr>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.sku)}</td>
        <td>${p.qty}</td>
        <td>${p.price.toFixed(2)}</td>
        <td>${(p.qty * p.price).toFixed(2)}</td>
      </tr>`).join('');

    const total = products.reduce((sum,p)=>sum+p.qty*p.price,0);
    totalValue.textContent = `$${total.toFixed(2)}`;

    selectProd.innerHTML = products.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('');
  };

  const renderMoves = () => {
    tbodyMoves.innerHTML = moves.map(m => `
      <tr>
        <td>${new Date(m.date).toLocaleString()}</td>
        <td>${m.type}</td>
        <td>${escapeHtml(m.productName)}</td>
        <td>${m.qty}</td>
      </tr>`).join('');
  };

  // Form agregar producto
  formProd.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('p-name').value.trim();
    const sku = document.getElementById('p-sku').value.trim();
    const qty = Number(document.getElementById('p-qty').value) || 0;
    const price = Number(document.getElementById('p-price').value) || 0;

    if(!name){ alert('Nombre obligatorio'); return; }
    const newProd = { id: uid(), name, sku, qty, price };
    products.push(newProd);
    save();
    renderProducts();
    formProd.reset();
  });

  // Form movimientos
  formMove.addEventListener('submit', e => {
    e.preventDefault();
    const type = document.getElementById('m-type').value;
    const pid = document.getElementById('m-product').value;
    const qty = Number(document.getElementById('m-qty').value);

    const prod = products.find(p => p.id === pid);
    if(!prod){ alert('Producto no encontrado'); return; }
    if(qty <= 0){ alert('Cantidad inválida'); return; }

    if(type === 'entrada') prod.qty += qty;
    else if(type === 'salida'){
      if(prod.qty < qty){ alert('Stock insuficiente'); return; }
      prod.qty -= qty;
    }

    moves.push({
      id: uid(),
      productId: pid,
      productName: prod.name,
      type,
      qty,
      date: new Date().toISOString()
    });

    save();
    renderProducts();
    renderMoves();
    formMove.reset();
  });

  renderProducts();
  renderMoves();
}
