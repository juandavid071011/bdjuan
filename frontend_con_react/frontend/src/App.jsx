import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from "./componentes/Menu.jsx";
import Clientes from "./componentes/Clientes.jsx";
import Productos from "./componentes/Productos.jsx";
import Ventas from "./componentes/Ventas.jsx";
import DetalleVenta from "./componentes/DetalleVenta.jsx";
function App() {
    return (
        <BrowserRouter>
            <Menu />

            <div className="container mt-4">
                <Routes>
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/ventas" element={<Ventas />} />
                    <Route path="/detalle-venta" element={<DetalleVenta />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;