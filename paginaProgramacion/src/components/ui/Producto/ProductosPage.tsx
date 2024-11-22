import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { IProductos } from '../../../types/dtos/productos/IProductos';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { addProducto, deleteProducto, fetchProductos, updateProducto } from '../../../store/slices/productosSlice';
import CrearProducto from './CrearProducto/CrearProducto';
import VerProducto from './VerProducto/VerProducto';
import EditarProducto from './EditarProducto/EditarProducto';

export const ProductosPage = () => {
    const [showCrearModal, setShowCrearModal] = useState(false);
    const [showVerModal, setShowVerModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState<IProductos | null>(null);

    const productos = useAppSelector((state) => state.productos.productos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProductos());
    }, [dispatch]);

    if (status === 'loading') return <p>Cargando productos...</p>;
    if (status === 'failed') return <p>Error al cargar productos: {Error}</p>;

     // Función para agregar un nuevo producto
    const handleAddProducto = (producto: IProductos) => {
        dispatch(addProducto(producto)); // Despacha la acción para agregar el producto
    };

    // Función para guardar cambios en un producto existente
    const handleSaveProducto = (producto: IProductos) => {
        dispatch(updateProducto(producto)); // Actualiza el producto en el estado global
    };

    // Función para eliminar un producto por su ID
    const handleDeleteProducto = (id: number) => {
        dispatch(deleteProducto(id)); // Elimina el producto del estado global
    };

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <Button onClick={() => setShowCrearModal(true)}>Agregar Producto</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.denominacion}</td>
                            <td>{producto.precioVenta}</td>
                            <td>{producto.descripcion}</td>
                            <td>
                                <Button onClick={() => { setSelectedProducto(producto); setShowVerModal(true); }}><span className="material-symbols-outlined">visibility</span></Button>
                                <Button onClick={() => { setSelectedProducto(producto); setShowEditarModal(true); }}><span className="material-symbols-outlined">edit</span></Button>
                                <Button variant="danger" onClick={() => handleDeleteProducto(producto.id)}><span className="material-symbols-outlined">delete</span></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {showCrearModal && <CrearProducto onAddProducto={handleAddProducto} onClose={() => setShowCrearModal(false)} />}
            {showVerModal && selectedProducto && <VerProducto producto={selectedProducto} onClose={() => setShowVerModal(false)} />}
            {showEditarModal && selectedProducto && <EditarProducto producto={selectedProducto} onSave={handleSaveProducto} onClose={() => setShowEditarModal(false)} />}
        </div>
    );
};
