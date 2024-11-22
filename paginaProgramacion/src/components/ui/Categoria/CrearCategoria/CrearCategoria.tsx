import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './CrearCategoria.module.css'
import { ICategorias } from '../../../../types/dtos/categorias/ICategorias';
import Modal from '../../Modal/Modal';

interface CrearCategoriaProps {
    onAddCategoria: (categoria: ICategorias) => void;
    onClose: () => void;
}

const CrearCategoria: React.FC<CrearCategoriaProps> = ({ onAddCategoria, onClose }) => {
    const [newCategoria, setNewCategoria] = useState<ICategorias>({
        id: Date.now(),
        denominacion: '',
        eliminado: false,
        sucursales: [],
        subCategorias: [],
        articulos: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCategoria({ ...newCategoria, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCategoria(newCategoria);
        onClose();
    };

    return (
        <Modal>
            <Form onSubmit={handleSubmit} className={styles.modalContainer}>
                <h2>Crear Categoría</h2>
                <Form.Group>
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        name="denominacion"
                        value={newCategoria.denominacion}
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

export default CrearCategoria;
