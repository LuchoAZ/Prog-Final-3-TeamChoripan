import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    children: ReactNode;
}

//Componente genérico de Modal para envolver los PopUps
const Modal: React.FC<ModalProps> = ({ children }) => (
    <div className={styles.styleModal}>
        <div>{children}</div>
    </div>
);

export default Modal;
