import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './CrearSucursal.module.css'
import { useForm } from '../../../hooks/useForm/UseForm';
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';

interface ModalSucursalProps {
    handleAddSucursal: (newSucursal: ISucursal) => void;
    handleCloseModalSucursal: () => void;
}

export const ModalSucursal: FC<ModalSucursalProps> = ({ handleAddSucursal, handleCloseModalSucursal }) => {
    const { values, handleChange, resetForm } = useForm<ISucursal>({
        id: 0,
        nombre: '',
        empresa: { id: 0, nombre: '', razonSocial: '', cuit: 0, logo: null, sucursales: [], pais: { id: 0, nombre: '' } },
        domicilio: { id: 0, calle: '', numero: 0, cp: 0, piso: 0, nroDpto: 0, localidad: { id: 0, nombre: '', provincia: { id: 0, nombre: '', pais: { id: 0, nombre: '' } } } },
        latitud: 0,
        longitud: 0,
        categorias: [],
        esCasaMatriz: false,
        horarioApertura: '',
        horarioCierre: '',
        eliminado: false
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
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleAddSucursal(values);
        resetForm();
        setSelectedImage(null);
        setImagePreviewUrl(null);
        handleCloseModalSucursal();
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.modalContainer}>
            <h2>Crear Sucursal</h2>
            <div className={styles.modalData}>
                <div className={styles.order}>
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Ingrese un nombre"
                        value={values.nombre}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="time"
                        name="apertura"
                        className={styles.smallInput}
                        value={values.apertura}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="time"
                        name="cierre"
                        className={styles.smallInput}
                        value={values.cierre}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.order}>
                    <Form.Control
                        type="text"
                        name="pais"
                        placeholder="Ingrese su País"
                        value={values.pais}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="text"
                        name="provincia"
                        placeholder='Ingrese su Provincia'
                        value={values.provincia}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="text"
                        name="localidad"
                        placeholder='Ingrese su Localidad'
                        value={values.localidad}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="latitud"
                        placeholder="Latitud"
                        value={values.latitud}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="longitud"
                        placeholder="Longitud"
                        value={values.longitud}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.order}>
                    <Form.Control
                        type="text"
                        name="calle"
                        placeholder="Nombre de la calle"
                        value={values.calle}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="numeroCalle"
                        placeholder="Número de la calle"
                        value={values.numeroCalle}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="text"
                        name="codigoPostal"
                        placeholder='Código postal'
                        value={values.codigoPostal}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="numeroPiso"
                        placeholder='Ingresa un número de piso'
                        value={values.numeroPiso}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="numeroDepartamento"
                        placeholder='Ingresa un número de departamento'
                        value={values.numeroDepartamento}
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
                            style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'cover' }}
                        />
                    ) : (
                        <span className="material-symbols-outlined" style={{ scale: '2.8' }}>no_photography</span>
                    )}
                </div>
            </div>
            <div className={styles.containerButton}>
                <Button onClick={handleCloseModalSucursal} className={styles.cancelButton}>Cancelar</Button>
                <Button type="submit" className={styles.confirmButton}>Confirmar</Button>
            </div>
        </Form>
    );
};
