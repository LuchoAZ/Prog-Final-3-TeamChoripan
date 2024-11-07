import { Button, Form } from 'react-bootstrap';
import React from 'react';
import styles from './ModalVerSucursal.module.css';
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';

interface ModalVerSucursalProps {
    sucursal: ISucursal | null;
    onClose: () => void;
}

export const ModalVerSucursal: React.FC<ModalVerSucursalProps> = ({ sucursal, onClose }) => {
    if (!sucursal) return null;

    return (
        <Form className={styles.modalContainer}>
            <h2>Sucursal</h2>
            <div>
                <p>Nombre: {sucursal.nombre} </p>
                <p>Empresa: {sucursal.empresa.nombre}</p>
                <p>Domicilio: {sucursal.domicilio.calle}</p>
                <p>Casa Matriz: {sucursal.esCasaMatriz ? "Si" : "No"}</p>
                <p>Horario Apertura {sucursal.horarioApertura}</p>
                <p>Horario Cierre {sucursal.horarioCierre}</p>
            </div>
            {sucursal.logo ? 
            <img src={sucursal.logo} alt="fotoDeSucursal" /> : 
            <img src={"imgNotFound.jpg"} alt="fotoDeSucursal" /> }
            <Button className={styles.VerButton} onClick={onClose}>Cerrar</Button>
        </Form>
    );
};
