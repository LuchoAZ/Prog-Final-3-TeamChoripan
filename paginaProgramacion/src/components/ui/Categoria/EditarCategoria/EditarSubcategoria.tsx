import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './EditarSubcategoria.module.css'
import { ICategorias } from '../../../../types/dtos/categorias/ICategorias';
import Modal from '../../Modal/Modal';

interface EditarSubcategoriaProps {
    subcategoria: ICategorias;
    onSave: (subcategoria: ICategorias) => void;
    onClose: () => void;
}

const EditarSubcategoria: React.FC<EditarSubcategoriaProps> = ({ subcategoria, onSave, onClose }) => {
    const [editedSubcategoria, setEditedSubcategoria] = useState<ICategorias>({ ...subcategoria });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedSubcategoria({ ...editedSubcategoria, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedSubcategoria);
        onClose();
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Editar Subcategoría</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        name="denominacion"
                        value={editedSubcategoria.denominacion}
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

export default EditarSubcategoria;
