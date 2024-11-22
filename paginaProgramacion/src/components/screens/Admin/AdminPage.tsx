import { useState } from 'react';
import styles from './AdminPage.module.css';
import { Button } from 'react-bootstrap';
import { ProductosPage } from '../../ui/Producto/ProductosPage';
import { AlergenosPage } from '../../ui/Alergeno/AlargenosPage';
import { CategoriasPage } from '../../ui/Categoria/CategoriasPage';

export const AdminPage = () => {
    // Estado local que controla la sección activa en la página de administración
    const [activeSection, setActiveSection] = useState<'Productos' | 'Alergenos' | 'Categorias'>('Productos');

    // Función para renderizar dinámicamente la sección activa según el estado
    const renderSection = () => {
        switch (activeSection) {
            case 'Productos':
                return <ProductosPage />;
            case 'Alergenos':
                return <AlergenosPage />;
            case 'Categorias':
                return <CategoriasPage />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.containerView}>
            <aside className={styles.asideContainer}>
                <div className={styles.adminContainer}>
                    <h2>Administración</h2>
                    <div className={styles.asideButtonsContainer}>
                        <Button onClick={() => setActiveSection('Productos')}>Productos</Button>
                        <Button onClick={() => setActiveSection('Alergenos')}>Alergenos</Button>
                        <Button onClick={() => setActiveSection('Categorias')}>Categorías</Button>
                    </div>
                </div>
            </aside>
            <div className={styles.mainContainer}>
                {renderSection()}
            </div>
        </div>
    );
};