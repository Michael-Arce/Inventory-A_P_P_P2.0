import Tabla from "../components/Tabla";

const Inventario = () => {
  return (
    <div className="p-4">
      <h2 className="text-primary border-bottom pb-2 mb-4">
        Gestión de Inventario
      </h2>
      <p className="text-muted">
        Vista principal de la gestión de existencias, stock y movimientos de
        almacén.
      </p>
      <div className="alert alert-info">
       <Tabla />
      </div>
    </div>
  );
};

export default Inventario;
