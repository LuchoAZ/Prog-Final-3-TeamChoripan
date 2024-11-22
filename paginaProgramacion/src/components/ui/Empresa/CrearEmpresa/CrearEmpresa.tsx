import { Button, Form } from 'react-bootstrap';
import { FC, useState } from 'react';
import styles from './CrearEmpresa.module.css'
import { IEmpresa } from '../../../../types/dtos/empresa/IEmpresa';

interface ModalEmpresaProps {
    handleAddEmpresa: (newEmpresa: IEmpresa) => void;
    handleCloseModalEmpresa: () => void;
}

export const CrearEmpresa: FC<ModalEmpresaProps> = ({ handleAddEmpresa, handleCloseModalEmpresa }) => {
    const [newEmpresa, setNewEmpresa] = useState<IEmpresa>({
        id: Date.now(), // Genera un ID único para cada empresa
        nombre: '',
        razonSocial: '',
        cuit: 0,
        logo: '',
        sucursales: [],
        pais: { id: 0, nombre: '' }
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEmpresa({ ...newEmpresa, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleAddEmpresa(newEmpresa);
        setSelectedImage(null);
        setImagePreviewUrl(null);
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.modalContainer}>
            <h2>Crear Empresa</h2>
            <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese nombre"
                value={newEmpresa.nombre}
                onChange={handleChange}
            />
            <Form.Control
                type="text"
                name="razonSocial"
                placeholder="Ingrese razón social"
                value={newEmpresa.razonSocial}
                onChange={handleChange}
            />
            <Form.Control
                type="text"
                name="cuit"
                placeholder="Ingrese CUIT"
                value={newEmpresa.cuit}
                onChange={handleChange}
            />
            <div className={styles.imagenModal}>
                <Form.Control
                    type="file"
                    accept="image/*"
                    name="logo"
                    onChange={handleImageChange}
                    value={newEmpresa.logo}
                    style={{ display: 'none' }}
                    id="imagen"
                />
                <Button>
                    <label htmlFor="imagen">
                        Ingrese una imagen
                    </label>
                </Button>
                {selectedImage ? (
                    <img
                        src={imagePreviewUrl!}
                        alt="Vista previa"
                        style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'cover' }}
                    />
                ) : (
                    <span style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'cover', fontSize: '4rem' }} className="material-symbols-outlined">
                        photo_camera
                    </span>
                )}
            </div>
            <div className={styles.containerButton}>
                <Button onClick={handleCloseModalEmpresa} className={styles.cancelButton}>Cancelar</Button>
                <Button type="submit" className={styles.confirmButton}>Confirmar</Button>
            </div>
        </Form>
    );
};
