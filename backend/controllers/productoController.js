import { Producto } from "../models/Producto.js";

export const obtenerProductos = async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
};

export const crearProducto = async (req, res) => {
    const nuevo = await Producto.create(req.body);
    res.json(nuevo);
};
