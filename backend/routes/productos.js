import express from "express";
import { obtenerProductos, crearProducto } from "../controllers/productoController.js";
const router = express.Router();

router.get("/", obtenerProductos);
router.post("/", crearProducto);

export default router;
