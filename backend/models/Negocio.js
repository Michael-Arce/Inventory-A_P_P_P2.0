// models/Negocio.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Negocio = sequelize.define("Negocio", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.STRING },
});

export default Negocio;
