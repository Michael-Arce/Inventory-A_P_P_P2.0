// controllers/negocioController.js
import Negocio from "../models/Negocio.js";

export const crearNegocio = async (req, res) => {
  try {
    const negocio = await Negocio.create(req.body);
    res.status(201).json(negocio);
  } catch (error) {
    res.status(500).json({ message: "Error al crear negocio", error });
  }
};

export const obtenerNegocios = async (req, res) => {
  try {
    const negocios = await Negocio.findAll();
    res.json(negocios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener negocios", error });
  }
};
