import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './CrearAlargeno.module.css'
import { IAlergenos } from '../../../../types/dtos/alergenos/IAlergenos';
import Modal from '../../Modal/Modal';

interface CrearAlergenoProps {
    onAddAlergeno: (alergeno: IAlergenos) => void;
    onClose: () => void;
}

const CrearAlergeno: React.FC<CrearAlergenoProps> = ({ onAddAlergeno, onClose }) => {
    const [newAlergeno, setNewAlergeno] = useState<IAlergenos>({
        id: Date.now(),
        denominacion: '',
        imagen: { id: Date.now(), name: '', url: '' },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAlergeno({ ...newAlergeno, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewAlergeno({
                ...newAlergeno,
                imagen: { ...newAlergeno.imagen, name: file.name, url: URL.createObjectURL(file) },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newAlergeno.denominacion.trim()) {
            onAddAlergeno(newAlergeno);
            onClose(); 
        } else {
            alert('Por favor, complete el campo de denominación.');
        }
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Crear Alérgeno</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        name="denominacion"
                        value={newAlergeno.denominacion}
                        onChange={handleChange}
                    />
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

export default CrearAlergeno;
