// Componente Productos
import { useEffect, useState } from 'react';
import api from '../services/api';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [nomProducto, setNomProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [editando, setEditando] = useState(null);

    const cargarProductos = () => {
        api.get('/productos')
            .then(response => {
                setProductos(response.data);
                setCargando(false);
            })
            .catch(err => {
                setError('No se pudo cargar la lista de productos');
                setCargando(false);
                console.error(err);
            });
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // Crear o actualizar producto
    const guardarProducto = (e) => {
        e.preventDefault();

        const datos = {
            nomProducto,
            cantidad,
            precio
        };

        if (editando) {
            // Actualizar producto
            api.put(`/productos/${editando}`, datos)
                .then(() => {
                    alert('Producto actualizado correctamente');

                    limpiarFormulario();
                    cargarProductos();
                })
                .catch(err => {
                    console.error(err);
                    alert('No se pudo actualizar el producto');
                });
        } else {
            // Crear producto
            api.post('/productos', datos)
                .then(() => {
                    alert('Producto creado correctamente');

                    limpiarFormulario();
                    cargarProductos();
                })
                .catch(err => {
                    console.error(err);
                    alert('No se pudo crear el producto');
                });
        }
    };

    // Preparar producto para editar
    const editarProducto = (producto) => {
        setEditando(producto.id_producto);
        setNomProducto(producto.nomProducto);
        setCantidad(producto.cantidad);
        setPrecio(producto.precio);
    };

    // Eliminar producto
    const eliminarProducto = (id) => {
        const confirmar = window.confirm(
            '¿Seguro que quieres eliminar este producto?'
        );

        if (!confirmar) return;

        api.delete(`/productos/${id}`)
            .then(() => {
                alert('Producto eliminado correctamente');
                cargarProductos();
            })
            .catch(err => {
                console.error(err);
                alert('No se pudo eliminar el producto');
            });
    };

    // Limpiar formulario
    const limpiarFormulario = () => {
        setNomProducto('');
        setCantidad('');
        setPrecio('');
        setEditando(null);
    };

    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Listado de Productos</h2>

            <h3>
                {editando ? 'Editar Producto' : 'Crear Producto'}
            </h3>

            <form onSubmit={guardarProducto}>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nomProducto}
                    onChange={(e) => setNomProducto(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />

                <button type="submit">
                    {editando ? 'Actualizar Producto' : 'Crear Producto'}
                </button>

                {editando && (
                    <button
                        type="button"
                        onClick={limpiarFormulario}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <br />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map(p => (
                        <tr key={p.id_producto}>
                            <td>{p.id_producto}</td>
                            <td>{p.nomProducto}</td>
                            <td>{p.cantidad}</td>
                            <td>${p.precio}</td>

                            <td>
                                <button
                                    onClick={() => editarProducto(p)}
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => eliminarProducto(p.id_producto)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Productos;