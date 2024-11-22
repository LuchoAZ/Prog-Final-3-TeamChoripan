import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './EditarCategoria.module.css'
import { ICategorias } from '../../../../types/dtos/categorias/ICategorias';
import Modal from '../../Modal/Modal';

interface EditarCategoriaProps {
    categoria: ICategorias;
    onSave: (categoria: ICategorias) => void;
    onClose: () => void;
}

const EditarCategoria: React.FC<EditarCategoriaProps> = ({ categoria, onSave, onClose }) => {
    const [editedCategoria, setEditedCategoria] = useState<ICategorias>({ ...categoria });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCategoria({ ...editedCategoria, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedCategoria);
        onClose();
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Editar Categoría</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        name="denominacion"
                        value={editedCategoria.denominacion}
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

export default EditarCategoria;
