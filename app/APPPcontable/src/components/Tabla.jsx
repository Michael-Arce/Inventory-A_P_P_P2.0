import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaBoxes, FaExclamationTriangle } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Tabla = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        precio: "",
        cantidad: "",
    });

    const onCloseModal = () => setOpen(false);
    const onOpenModal = () => setOpen(true);

    const pesos = (num) => {
        return num.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    };
    // 🔹 Cargar productos al iniciar
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:4000/api/productos");
            setProductos(response.data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError("Error al cargar los datos. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // 🔹 Actualizar los valores del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [id]: value });
    };

    // 🔹 Enviar datos por POST a la API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.cantidad) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/productos", nuevoProducto);

            // Actualiza la lista de productos con el nuevo
            setProductos([...productos, response.data]);

            // Limpia el formulario y cierra el modal
            setNuevoProducto({ nombre: "", precio: "", cantidad: "" });
            onCloseModal();
        } catch (err) {
            console.error("Error al agregar producto:", err);
            alert("No se pudo agregar el producto. Inténtalo nuevamente.");
        }
    };

    // 🌀 Estado de carga
    if (loading) {
        return (
            <div className="text-center p-5">
                <FaSpinner className="fa-spin text-primary fs-3 mb-3" />
                <p className="text-muted">Cargando productos...</p>
            </div>
        );
    }

    // ⚠️ Error
    if (error) {
        return (
            <div className="alert alert-danger text-center m-4" role="alert">
                <FaExclamationTriangle className="me-2" />
                {error}
            </div>
        );
    }

    // 📦 Si no hay productos
    if (productos.length === 0) {
        return (
            <div className="text-center p-5 border rounded m-4 bg-light">
                <FaBoxes className="fs-1 text-secondary mb-3" />
                <h4 className="text-dark">No hay productos registrados</h4>
                <p className="text-muted">Comienza agregando nuevos elementos a tu inventario.</p>
                <button className="btn btn-primary mt-2" onClick={onOpenModal}>
                    Agregar Producto
                </button>

                {/* Modal para agregar producto */}
                <Modal open={open} onClose={onCloseModal} center>
                    <h2 className="fw-bold mb-3">Agregar Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                value={nuevoProducto.nombre}
                                onChange={handleChange}
                                placeholder="Nombre del producto"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">
                                Precio
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="precio"
                                value={nuevoProducto.precio}
                                onChange={handleChange}
                                placeholder="Precio del producto"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad"
                                value={nuevoProducto.cantidad}
                                onChange={handleChange}
                                placeholder="Cantidad del producto"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Guardar Producto
                        </button>
                    </form>
                </Modal>
            </div>
        );
    }

    // 🧾 Render de la tabla
    return (
        <div className="table-responsive p-3 bg-white rounded shadow-sm m-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-dark border-bottom pb-2 mb-0">Lista de Productos</h4>
                <button className="btn btn-primary" onClick={onOpenModal}>
                    Agregar producto
                </button>
            </div>

            <table className="table table-hover table-striped align-middle">
                <thead>
                    <tr className="table-light">
                        <th>ID</th>
                        <th className="text-start">Nombre</th>
                        <th className="text-end">Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td className="text-muted fw-semibold">{producto.id}</td>
                            <td className="fw-bold text-dark text-start">{producto.nombre}</td>
                            <td className="text-end text-success fw-bold">
                                {pesos(producto.precio)}
                            </td>
                            <td className="text-center">
                                <span className={`badge ${producto.cantidad < 10 ? "bg-danger" : "bg-primary"}`}>
                                    {producto.cantidad}
                                </span>
                            </td>
                            <td className="text-center">
                                <button className="btn btn-sm btn-outline-info me-2">Editar</button>
                                <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar producto */}
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="fw-bold mb-3">Agregar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={nuevoProducto.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">
                            Precio
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="precio"
                            value={nuevoProducto.precio}
                            onChange={handleChange}
                            placeholder="Precio del producto"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cantidad" className="form-label">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="cantidad"
                            value={nuevoProducto.cantidad}
                            onChange={handleChange}
                            placeholder="Cantidad del producto"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Guardar Producto
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Tabla;
