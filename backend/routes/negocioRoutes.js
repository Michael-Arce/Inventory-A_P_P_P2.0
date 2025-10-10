// routes/negocioRoutes.js
import express from "express";
import { crearNegocio, obtenerNegocios } from "../controllers/negocioController.js";

const router = express.Router();

router.post("/", crearNegocio);
router.get("/", obtenerNegocios);

export default router;
