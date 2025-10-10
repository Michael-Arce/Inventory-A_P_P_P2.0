import express from "express";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import productoRouter from "./routes/productoRouter.js";
import negocioRoutes from "./routes/negocioRoutes.js";
import trasladoRoutes from "./routes/trasladoRoutes.js";

import "./models/asociaciones.js"; // Importar asociaciones

// Configuración de variables de entorno

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productoRouter);
app.use("/api/negocios", negocioRoutes);
app.use("/api/traslados", trasladoRoutes);

// 🚀 Probar conexión a la base de datos
try {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  console.log("✅ Conectado exitosamente a MySQL");
} catch (error) {
  console.error("❌ Error de conexión a MySQL:", error);
}

// Rutas base
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente ✅");
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
