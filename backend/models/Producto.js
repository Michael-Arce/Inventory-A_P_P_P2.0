import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Producto = sequelize.define("Producto", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    precio: { type: DataTypes.FLOAT, allowNull: false },
});
