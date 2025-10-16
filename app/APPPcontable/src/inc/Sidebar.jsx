import React, { useState } from "react";
import { FaBoxes, FaCogs, FaFileInvoiceDollar, FaExchangeAlt, FaWarehouse } from "react-icons/fa"; // Importé un ícono extra por si se necesitaba para el inventario duplicado.

const Sidebar = () => {
  // Inicialmente, "Inventario" está duplicado en el menú, lo estableceremos por defecto
  const [active, setActive] = useState("Inventario");

  const menu = [
    { name: "Inventario", icon: <FaBoxes /> },
    { name: "Catálogo / Parametrización", icon: <FaCogs /> },
    { name: "Facturación / Ventas", icon: <FaFileInvoiceDollar /> },
    // **NOTA UX:** El elemento "Inventario" estaba duplicado, lo he cambiado a "Almacén" o lo puedes cambiar por otro
    { name: "Control de Almacén", icon: <FaWarehouse /> }, 
    { name: "Traslados", icon: <FaExchangeAlt /> },
  ];

  return (

    <div className="d-flex flex-column p-0 bg-white shadow-lg border-end" style={{ width: "280px", minHeight: "87vh" }}>
      <ul className="nav nav-pills flex-column p-3">
        {menu.map((item, i) => (
          // **UX:** Uso de 'my-1' para un pequeño margen vertical entre elementos
          <li key={i} className="nav-item my-1">
            <button
              onClick={() => setActive(item.name)}
              // **IU Moderno:**
              // - Clase 'rounded-3' para esquinas más redondeadas (moderno).
              // - Clase 'text-muted' para los inactivos y 'fw-semibold' para el texto.
              // - El 'hover' de Bootstrap (nav-link por defecto) ya es sutil.
              className={`nav-link text-start d-flex align-items-center gap-3 w-100 py-2 transition-all ${
                active === item.name
                  ? "bg-primary text-white fw-bold shadow-sm" // Resalte más fuerte para el activo
                  : "text-dark hover-bg-light" // Color oscuro para inactivos, mejor contraste que 'text-muted' en fondo blanco
              } rounded-3`} 
              // Removido 'style={{ borderRadius: "0.5rem" }}' para usar la clase 'rounded-3' de Bootstrap
            >
              <div className="fs-5">{item.icon}</div> {/* **UX:** Ícono un poco más grande */}
              <span className="text-truncate">{item.name}</span> {/* **UX:** Truncate para nombres largos */}
            </button>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default Sidebar;