import React from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'; // Íconos modernos

const Header = () => {
    return (
        // UI Moderno: Fondo blanco 'bg-white', sombra sutil 'shadow-sm', y un padding superior e inferior más amplio 'py-3'.
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
            <div className="container-fluid px-4">
                
                {/* 1. Branding (UX): Texto más destacado y en color primario */}
                <a className="navbar-brand text-primary fw-bold fs-4" href="#">
                    Sistema PRO
                </a>

                {/* Toggler de Bootstrap para móviles */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    {/* 2. Elementos de Navegación (Centrados o a la izquierda) */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4"> 
                        <li className="nav-item">
                            <a className="nav-link active text-primary fw-semibold" aria-current="page" href="#">
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">Módulos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">Reportes</a>
                        </li>
                    </ul>
                    
                    {/* 3. Área de Utilidades (Search, Notificaciones, Perfil) - UX Estándar */}
                    <div className="d-flex align-items-center gap-3">
                        
                        {/* Barra de Búsqueda Integrada (UX/UI) */}
                        <form className="d-flex position-relative me-3" role="search">
                            <input 
                                className="form-control ps-5 rounded-pill" 
                                type="search" 
                                placeholder="Buscar..." 
                                aria-label="Search" 
                                style={{ width: '200px' }} 
                            />
                            {/* Ícono de búsqueda posicionado dentro del campo */}
                            <FaSearch className="position-absolute text-muted" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                        </form>

                        {/* Ícono de Notificaciones (UX) */}
                        <button className="btn btn-light rounded-circle p-2 position-relative">
                            <FaBell className="fs-5 text-dark" />
                            {/* Badge de notificación */}
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3
                                <span className="visually-hidden">notificaciones no leídas</span>
                            </span>
                        </button>

                        {/* Menú de Perfil/Usuario (UX) */}
                        <a className="nav-link text-dark d-flex align-items-center gap-2" href="#">
                            <FaUserCircle className="fs-3 text-secondary" />
                            <span className="d-none d-lg-inline text-dark fw-medium">Usuario Admin</span>
                        </a>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;