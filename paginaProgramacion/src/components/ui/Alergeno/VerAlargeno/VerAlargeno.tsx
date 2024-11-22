import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './VerAlargeno.module.css'
import { IAlergenos } from '../../../../types/dtos/alergenos/IAlergenos';
import Modal from '../../Modal/Modal';

interface VerAlergenoProps {
    alergeno: IAlergenos;
    onClose: () => void;
}

const VerAlergeno: React.FC<VerAlergenoProps> = ({ alergeno, onClose }) => {
    return (
        <Modal>
            <div className={styles.VerContainer}>
                <h2>Ver Alérgeno</h2>
                <p><strong>Nombre:</strong> {alergeno.denominacion}</p>
                <Button className={styles.VerButton} onClick={onClose}>Cerrar</Button>
            </div>
        </Modal>
    );
};

export default VerAlergeno;
