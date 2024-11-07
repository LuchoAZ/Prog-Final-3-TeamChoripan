import { Button, Form } from 'react-bootstrap';
import React from 'react';
import styles from './ModalVerEmpresa.module.css';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';

interface ModalVerEmpresaProps {
    empresa: IEmpresa | null;
    onClose: () => void;
}

export const ModalVerEmpresa: React.FC<ModalVerEmpresaProps> = ({ empresa, onClose }) => {
    if (!empresa) return null;

    return (
        <Form className={styles.modalContainer}>
            <h2>Empresa</h2>
            <div>
                <p>Nombre: {empresa.nombre}</p>
                <p>Razón Social: {empresa.razonSocial}</p>
                <p>CUIT: {empresa.cuit}</p>
            </div>
            {empresa.logo ? 
            <img src={empresa.logo} alt="fotoDeEmpresa" /> : 
            <img src={"imgNotFound.jpg"} alt="fotoDeEmpresa" /> }
            <Button className={styles.VerButton} onClick={onClose}>Cerrar</Button>
        </Form>
    );
};
