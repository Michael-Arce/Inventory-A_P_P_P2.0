// App.js (Ejemplo de cómo se conectan los componentes)

import { useState } from 'react';
import Header from './inc/Header';
import Sidebar from './inc/Sidebar';
import MainContent from './pages/MainContent';


const App = () => {
    // 1. Estado Levantado: El estado activo debe estar aquí para compartirlo
    const [activeSection, setActiveSection] = useState("Inventario"); 
    
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header /> 
            
            <div className="d-flex flex-grow-1">
                {/* Sidebar ahora necesita la función para actualizar el estado */}
                <Sidebar active={activeSection} setActive={setActiveSection} /> 
                
                {/* MainContent recibe el estado activo para renderizar */}
                <MainContent active={activeSection} />
            </div>
        </div>
    );
};

export default App;

// Nota: El Sidebar original necesitaría una pequeña modificación para usar 'setActive'
// const Sidebar = ({ active, setActive }) => { ... onClick={() => setActive(item.name)} ... }