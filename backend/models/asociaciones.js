import Negocio from "./Negocio.js";
import Producto from "./Producto.js";
import Traslado from "./Traslado.js";

// Relación Negocio - Producto
Negocio.hasMany(Producto, { foreignKey: "negocioId" });
Producto.belongsTo(Negocio, { foreignKey: "negocioId" });

// Relación Traslado - Producto
Producto.hasMany(Traslado, { foreignKey: "productoId" });
Traslado.belongsTo(Producto, { foreignKey: "productoId" });

// Relación Traslado - Negocio (origen y destino)
Traslado.belongsTo(Negocio, { as: "origen", foreignKey: "origenId" });
Traslado.belongsTo(Negocio, { as: "destino", foreignKey: "destinoId" });

export { Negocio, Producto, Traslado };