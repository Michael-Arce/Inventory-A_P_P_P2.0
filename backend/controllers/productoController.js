import Producto from "../models/Producto.js";

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.update(req.body, { where: { id } });
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
