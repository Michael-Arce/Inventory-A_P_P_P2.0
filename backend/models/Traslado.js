// models/Traslado.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Traslado = sequelize.define("Traslado", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Traslado;

