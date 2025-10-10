// routes/trasladoRoutes.js
import express from "express";
import { crearTraslado } from "../controllers/trasladoController.js";

const router = express.Router();

router.post("/", crearTraslado);

export default router;
