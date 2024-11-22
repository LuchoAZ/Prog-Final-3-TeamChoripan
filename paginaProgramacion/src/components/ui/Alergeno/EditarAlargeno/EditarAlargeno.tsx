import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './EditarAlargeno.module.css'
import { IAlergenos } from '../../../../types/dtos/alergenos/IAlergenos';
import Modal from '../../Modal/Modal';

interface EditarAlergenoProps {
    alergeno: IAlergenos;
    onSave: (alergeno: IAlergenos) => void;
    onClose: () => void;
}

const EditarAlergeno: React.FC<EditarAlergenoProps> = ({ alergeno, onSave, onClose }) => {
    const [editedAlergeno, setEditedAlergeno] = useState<IAlergenos>({ ...alergeno });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedAlergeno({ ...editedAlergeno, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedAlergeno);
        onClose();
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Editar Alérgeno</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        name="denominacion"
                        value={editedAlergeno.denominacion}
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

export default EditarAlergeno;
