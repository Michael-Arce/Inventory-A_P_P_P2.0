import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import productoRoutes from "./routes/productos.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productoRoutes);

// Sincronizar DB
sequelize.sync().then(() => console.log("🟢 DB conectada y sincronizada"));

// Puerto
app.listen(process.env.PORT, () =>
    console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`)
);
