import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './ModalEditarEmpresa.module.css';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';

interface ModalEditarEmpresaProps {
    empresa: IEmpresa;
    onClose: () => void;
    onSave: (editedEmpresa: IEmpresa) => void;
}

export const ModalEditarEmpresa: React.FC<ModalEditarEmpresaProps> = ({ empresa, onClose, onSave }) => {
    const [editedEmpresa, setEditedEmpresa] = useState<IEmpresa>(empresa);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(empresa.logo || null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEmpresa({ ...editedEmpresa, [name]: value });
    };

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        onSave(editedEmpresa);
        
        setSelectedImage(null);
        setImagePreviewUrl(null);
    };

    return (
        <Form className={styles.modalContainer}>
            <h2>Editar Empresa</h2>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={editedEmpresa.nombre}
                onChange={handleChange}
            />
            <Form.Group controlId="formRazonSocial">
                <Form.Label>Razón Social</Form.Label>
                <Form.Control
                    type="text"
                    name="razonSocial"
                    value={editedEmpresa.razonSocial}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formCuit">
                <Form.Label>CUIT</Form.Label>
                <Form.Control
                    type="text"
                    name="cuit"
                    value={editedEmpresa.cuit}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className={styles.imagenModal}>
            <Form.Group controlId="formLogo">
                <Form.Control
                    type="file"
                    accept="image/*"
                    name="logo"
                    onChange={handleImageChange}
                    value={editedEmpresa.logo}
                    style={{ display: 'none' }}
                    id="imagen"
                />
            </Form.Group>
                <Button>
                    <label htmlFor="imagen">
                        Ingrese una imagen
                    </label>
                </Button>
                {selectedImage ? (
                    <img
                        src={imagePreviewUrl!}
                        alt="Vista previa"
                        style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'cover' }}
                    />
                ) : (
                    <span className="material-symbols-outlined" style={{ scale: '2.8' }}>no_photography</span>
                )}
            </div>
            <div className={styles.containerButton}>
                <Button onClick={onClose} className={styles.cancelButton}>Cancelar</Button>
                <Button onClick={handleSave} className={styles.confirmButton}>Confirmar</Button>
            </div>
        </Form>
    );
};
