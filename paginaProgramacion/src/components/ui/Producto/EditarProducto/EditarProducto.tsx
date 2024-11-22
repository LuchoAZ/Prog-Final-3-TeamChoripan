import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './EditarProducto.module.css'
import { IProductos } from '../../../../types/dtos/productos/IProductos';
import Modal from '../../Modal/Modal';

interface EditarProductoProps {
    producto: IProductos;
    onSave: (producto: IProductos) => void;
    onClose: () => void;
}

const EditarProducto: React.FC<EditarProductoProps> = ({ producto, onSave, onClose }) => {
    const [editedProducto, setEditedProducto] = useState<IProductos>({ ...producto });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedProducto({ ...editedProducto, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedProducto);
        onClose();
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Editar Producto</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        name="denominacion"
                        value={editedProducto.denominacion}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio de Venta</Form.Label>
                    <Form.Control
                        name="precioVenta"
                        type="number"
                        value={editedProducto.precioVenta}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        name="descripcion"
                        value={editedProducto.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        name="codigo"
                        value={editedProducto.codigo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className={styles.containerButton}>
                    <Button variant="secondary" onClick={onClose} className={styles.cancelButton}>Cancelar</Button>
                    <Button type="submit" className={styles.confirmButton}>Confirmar</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditarProducto;
