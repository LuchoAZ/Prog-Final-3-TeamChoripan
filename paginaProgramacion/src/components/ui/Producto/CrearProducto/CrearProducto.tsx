import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './CrearProducto.module.css';
import { IProductos } from '../../../../types/dtos/productos/IProductos';
import Modal from '../../Modal/Modal';

interface CrearProductoProps {
    onAddProducto: (producto: IProductos) => void;
    onClose: () => void;
}

const CrearProducto: React.FC<CrearProductoProps> = ({ onAddProducto, onClose }) => {
    const [newProducto, setNewProducto] = useState<IProductos>({
        id: Date.now(),
        denominacion: '',
        precioVenta: 0,
        descripcion: '',
        categoria: { id: 0, denominacion: '', eliminado: false, sucursales: [], subCategorias: [], articulos: [] },
        eliminado: false,
        habilitado: true,
        codigo: '',
        alergenos: [],
        imagen: { id: Date.now(), name: '', url: '' },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProducto({ ...newProducto, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewProducto({
                ...newProducto,
                imagen: { ...newProducto.imagen, name: file.name, url: URL.createObjectURL(file) },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProducto(newProducto);
        onClose();
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Crear Producto</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control name="denominacion" value={newProducto.denominacion} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio de Venta</Form.Label>
                    <Form.Control name="precioVenta" type="number" value={newProducto.precioVenta} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control name="descripcion" value={newProducto.descripcion} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <Form.Control name="codigo" value={newProducto.codigo} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>
                <div className={styles.containerButton}>
                    <Button variant="secondary" onClick={onClose} className={styles.cancelButton}>Cancelar</Button>
                    <Button type="submit" className={styles.confirmButton}>Confirmar</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CrearProducto;
