const LS_KEY = 'erp_products_v1';

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

export function init() {
    // re-leer DOM del fragmento cargado
    const form = document.getElementById('product-form');
    const tbody = document.getElementById('product-table-body');
    const totalEl = document.getElementById('total-products');
    const search = document.getElementById('search');

    let editingId = null;
    let products = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

    function save() { localStorage.setItem(LS_KEY, JSON.stringify(products)); }
    function render(filtered) {
        const list = filtered ?? products;
        tbody.innerHTML = list.map((p, idx) => `
      <tr>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.sku || '')}</td>
        <td>${Number(p.qty)}</td>
        <td>${Number(p.price).toFixed(2)}</td>
        <td>
          <button data-action="edit" data-id="${p.id}">Editar</button>
          <button data-action="delete" data-id="${p.id}">Eliminar</button>
        </td>
      </tr>`).join('');
        totalEl.textContent = list.length;
    }

    function escapeHtml(s) { return String(s || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') }

    render();

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('p-name').value.trim();
        const sku = document.getElementById('p-sku').value.trim();
        const qty = Number(document.getElementById('p-qty').value || 0);
        const price = Number(document.getElementById('p-price').value || 0);

        if (!name) { alert('El nombre es obligatorio'); return; }

        if (editingId) {
            const p = products.find(x => x.id === editingId);
            if (p) { p.name = name; p.sku = sku; p.qty = qty; p.price = price; }
            editingId = null;
            document.getElementById('p-id').value = '';
        } else {
            products.push({ id: uid(), name, sku, qty, price });
        }
        save();
        render();
        form.reset();
    });

    tbody.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if (action === 'delete') { products = products.filter(p => p.id !== id); save(); render(); }
        if (action === 'edit') {
            const p = products.find(x => x.id === id);
            if (!p) return;
            editingId = id;
            document.getElementById('p-id').value = id;
            document.getElementById('p-name').value = p.name;
            document.getElementById('p-sku').value = p.sku;
            document.getElementById('p-qty').value = p.qty;
            document.getElementById('p-price').value = p.price;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    search?.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        if (!q) { render(); return; }
        render(products.filter(p => (p.name || '').toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q)));
    });
}
