import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './ModalEditarSucursal.module.css'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';

interface ModalEditarSucursalProps {
    sucursal: ISucursal;
    onClose: () => void;
    onSave: (editedSucursal: ISucursal) => void;
}

export const ModalEditarSucursal: React.FC<ModalEditarSucursalProps> = ({ sucursal, onClose, onSave }) => {
    const [editedSucursal, setEditedSucursal] = useState<ISucursal>(sucursal);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(sucursal.logo || null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedSucursal({ ...editedSucursal, [name]: value });
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
        onSave(editedSucursal);
        
        setSelectedImage(null);
        setImagePreviewUrl(null);
    };

    return (
        <Form className={styles.modalContainer}>
            <h2>Editar Sucursal</h2>
            <div className={styles.modalData}>
                <div className={styles.order}>
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Ingrese un nombre"
                        value={editedSucursal.nombre}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="time"
                        name="apertura"
                        className={styles.smallInput}
                        value={editedSucursal.apertura}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="time"
                        name="cierre"
                        className={styles.smallInput}
                        value={editedSucursal.cierre}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.order}>
                    <Form.Control
                        type="text"
                        name="pais"
                        placeholder="Ingrese su País"
                        value={editedSucursal.pais}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="text"
                        name="provincia"
                        placeholder='Ingrese su Provincia'
                        value={editedSucursal.provincia}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="text"
                        name="localidad"
                        placeholder='Ingrese su Localidad'
                        value={editedSucursal.localidad}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="latitud"
                        placeholder="Latitud"
                        value={editedSucursal.latitud}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="longitud"
                        placeholder="Longitud"
                        value={editedSucursal.longitud}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.order}>
                    <Form.Control
                        type="text"
                        name="calle"
                        placeholder="Nombre de la calle"
                        value={editedSucursal.calle}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="numeroCalle"
                        placeholder="Número de la calle"
                        value={editedSucursal.numeroCalle}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="text"
                        name="codigoPostal"
                        placeholder='Código postal'
                        value={editedSucursal.codigoPostal}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="numeroPiso"
                        placeholder='Ingresa un número de piso'
                        value={editedSucursal.numeroPiso}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="numeroDepartamento"
                        placeholder='Ingresa un número de departamento'
                        value={editedSucursal.numeroDepartamento}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.imagenModal}>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
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
                            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'cover' }}
                        />
                    ) : (
                        <span className="material-symbols-outlined" style={{ scale: '2.8' }}>no_photography</span>
                    )}
                </div>
            </div>
            <div className={styles.containerButton}>
                <Button onClick={onClose} className={styles.cancelButton}>Cancelar</Button>
                <Button onClick={handleSave} className={styles.confirmButton}>Confirmar</Button>
            </div>
        </Form>
    );
};
