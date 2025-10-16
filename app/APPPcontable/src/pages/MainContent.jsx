import React from 'react';
import Inventario from './Inventario';

// Importa los componentes de contenido definidos arriba
// (Asegúrate de que estén definidos o importados en el mismo archivo o en archivos separados)

// Componentes de ejemplo (repetidos aquí para un código auto-contenido):

const Catalogo = () => (<div className="p-4"><h2 className="text-success border-bottom pb-2 mb-4">Catálogo y Parametrización</h2><p className="text-muted">Aquí se administran categorías, proveedores, unidades de medida y parámetros del sistema.</p><div className="d-flex gap-3"><button className="btn btn-success">Configurar Impuestos</button><button className="btn btn-outline-success">Gestionar Marcas</button></div></div>);
const Facturacion = () => (<div className="p-4"><h2 className="text-warning border-bottom pb-2 mb-4">Facturación y Ventas</h2><p className="text-muted">Panel para generar nuevas facturas, consultar ventas y emitir reportes de ingresos.</p><div className="card shadow-sm p-3">Ventas del día: $15,300.00</div></div>);
const Traslados = () => (<div className="p-4"><h2 className="text-info border-bottom pb-2 mb-4">Gestión de Traslados</h2><p className="text-muted">Administración y seguimiento de movimientos de productos entre almacenes o bodegas.</p><div className="alert alert-warning">Traslados pendientes de aprobación: 2</div></div>);
const Almacen = () => (<div className="p-4"><h2 className="text-secondary border-bottom pb-2 mb-4">Control de Almacén</h2><p className="text-muted">Herramientas específicas para la gestión de ubicaciones y conteo físico en el almacén.</p><button className="btn btn-secondary">Iniciar Conteo Físico</button></div>);
const DefaultContent = ({ active }) => (<div className="p-5 text-center"><h3 className="text-secondary">Bienvenido al Panel de Control</h3><p className="text-muted">Selecciona una opción del menú lateral para comenzar. <br/> El módulo activo es: <span className="fw-bold text-dark">{active}</span></p></div>);


const MainContent = ({ active }) => {

    const renderContent = () => {
        switch (active) {
            case 'Inventario':
                return <Inventario />;
            case 'Catálogo / Parametrización':
                return <Catalogo />;
            case 'Facturación / Ventas':
                return <Facturacion />;
            case 'Traslados':
                return <Traslados />;
            // Asumo que 'Control de Almacén' es el elemento que corregimos en el Sidebar
            case 'Control de Almacén': 
                return <Almacen />;
            default:
                return <DefaultContent active={active} />;
        }
    };

    return (
        <main className="flex-grow-1 p-4 bg-light overflow-auto"> 
            <div className="card shadow-lg border-0 h-100">
                {/* Aquí renderizamos el contenido seleccionado */}
                {renderContent()}
            </div>
        </main>
    );
};

export default MainContent;