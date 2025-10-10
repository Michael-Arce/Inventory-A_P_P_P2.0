import Traslado from "../models/Traslado.js";
import Producto from "../models/Producto.js";
import Negocio from "../models/Negocio.js";

export const crearTraslado = async (req, res) => {
  try {
    const { productoId, cantidad, origenId, destinoId } = req.body;

    // 1. Validar datos básicos
    if (!productoId || !cantidad || !origenId || !destinoId) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // 2. Buscar el producto
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // 3. Validar stock en el negocio origen
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente en el negocio origen" });
    }

    // 4. Actualizar inventario
    // Restar en origen
    producto.cantidad -= cantidad;
    await producto.save();

    // Sumar en destino → crear copia del producto si no existe en destino
    let productoDestino = await Producto.findOne({
      where: { nombre: producto.nombre, negocioId: destinoId }
    });

    if (!productoDestino) {
      // Crear producto en destino con misma info pero cantidad = traslado
      productoDestino = await Producto.create({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        precio_recomendado: producto.precio_recomendado,
        cantidad: cantidad,
        negocioId: destinoId
      });
    } else {
      // Si ya existe, solo sumamos
      productoDestino.cantidad += cantidad;
      await productoDestino.save();
    }

    // 5. Registrar traslado
    const traslado = await Traslado.create({
      productoId,
      cantidad,
      origenId,
      destinoId
    });

    res.status(201).json({
      message: "Traslado realizado con éxito",
      traslado,
      inventarioOrigen: producto,
      inventarioDestino: productoDestino
    });

  } catch (error) {
    console.error("❌ Error en traslado:", error);
    res.status(500).json({ error: "Error al procesar traslado", detalle: error.message });
  }
};