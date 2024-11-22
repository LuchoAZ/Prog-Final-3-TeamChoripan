import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './VerProducto.module.css'
import { IProductos } from '../../../../types/dtos/productos/IProductos';
import Modal from '../../Modal/Modal';

interface VerProductoProps {
    producto: IProductos;
    onClose: () => void;
}

const VerProducto: React.FC<VerProductoProps> = ({ producto, onClose }) => {
    return (
        <Modal>
            <div className={styles.VerContainer}>
                <h2>Ver Producto</h2>
                <p><strong>Denominación:</strong> {producto.denominacion}</p>
                <p><strong>Precio de Venta:</strong> {producto.precioVenta}</p>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p><strong>Código:</strong> {producto.codigo}</p>
                <Button className={styles.VerButton} onClick={onClose}>Cerrar</Button>
            </div>
        </Modal>
    );
};

export default VerProducto;
