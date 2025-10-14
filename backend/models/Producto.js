// models/Producto.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Negocio from "./Negocio.js";

const Producto = sequelize.define("Producto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: true },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.FLOAT, allowNull: true },
  precio_recomendado: { type: DataTypes.FLOAT }, // nuevo
  cantidad: { type: DataTypes.INTEGER, allowNull: true },
});

// Relación: un producto pertenece a un negocio
Producto.belongsTo(Negocio, { foreignKey: "negocioId" });
Negocio.hasMany(Producto, { foreignKey: "negocioId" });

export default Producto;
