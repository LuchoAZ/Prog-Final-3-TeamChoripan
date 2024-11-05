import { useState } from 'react';
import styles from './Home.module.css';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';
import { Button } from 'react-bootstrap';
import Modal from '../../ui/Modal/Modal';
import { ModalEditarEmpresa } from '../../ui/EditarEmpresa/ModalEditarEmpresa';
import { ModalSucursal } from '../../ui/CrearSucursal/CrearSucursal';
import { ModalEditarSucursal } from '../../ui/EditarSucursal/ModalEditarSucursal';
import { ModalVerEmpresa } from '../../ui/VerEmpresa/ModalVerEmpresa';
import { ModalVerSucursal } from '../../ui/VerSucursales/ModalVerSucursal';
import { ModalEmpresa } from '../../ui/CrearEmpresa/CrearEmpresa';

export const Home = () => {
    const [empresas, setEmpresa] = useState<IEmpresa[]>([]);
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState<IEmpresa | null>(null);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);
    const [openModalEditEmpresa, setOpenModalEditEmpresa] = useState(false);
    const [openModalVerEmpresa, setOpenModalVerEmpresa] = useState(false);
    const [openModalAddEmpresa, setOpenModalAddEmpresa] = useState(false);
    const [openModalVerSucursal, setOpenModalVerSucursal] = useState(false);
    const [openModalAddSucursal, setOpenModalAddSucursal] = useState(false);
    const [openModalEditSucursal, setOpenModalEditSucursal] = useState(false);

    const handleAddEmpresa = (newEmpresa: IEmpresa) => {
        setEmpresa((prev) => [...prev, newEmpresa]);
        setOpenModalAddEmpresa(false);
    };

    const handleAddSucursal = (newSucursal: ISucursal) => {
        setSucursales((prev) => [...prev, newSucursal]);
        setOpenModalAddSucursal(false);
    };

    const handleEditEmpresa = (editedEmpresa: IEmpresa) => {
        setEmpresa((prev) =>
            prev.map((emp) => (emp.id === editedEmpresa.id ? editedEmpresa : emp))
        );
        handleCloseModalEditEmpresa();
    };

    const handleEditSucursal = (editedSucursal: ISucursal) => {
        setSucursales((prev) =>
            prev.map((suc) => (suc.id === editedSucursal.id ? editedSucursal : suc))
        );
        handleCloseModalEditSucursal();
    };

    const handleOpenModalVerEmpresa = (empresa: IEmpresa) => {
        setSelectedEmpresa(empresa);
        setOpenModalVerEmpresa(true);
    };

    const handleOpenModalEditEmpresa = (empresa: IEmpresa) => {
        setSelectedEmpresa(empresa);
        setOpenModalEditEmpresa(true);
    };

    const handleOpenModalVerSucursal = (sucursal: ISucursal) => {
        setSelectedSucursal(sucursal);
        setOpenModalVerSucursal(true);
    };

    const handleOpenModalAddEmpresa = () => {
        setSelectedEmpresa(null);
        setOpenModalAddEmpresa(true);
    };

    const handleOpenModalAddSucursal = () => {
        setSelectedSucursal(null);
        setOpenModalAddSucursal(true);
    };

    const handleOpenModalEditSucursal = (sucursal: ISucursal) => {
        setSelectedSucursal(sucursal);
        setOpenModalEditSucursal(true);
    };

    const handleCloseModalEditEmpresa = () => {
        setOpenModalEditEmpresa(false);
        setSelectedEmpresa(null);
    };

    const handleCloseModalVerEmpresa = () => {
        setOpenModalVerEmpresa(false);
        setSelectedEmpresa(null);
    };

    const handleCloseModalAddEmpresa = () => {
        setOpenModalAddEmpresa(false);
    };

    const handleCloseModalVerSucursal = () => {
        setOpenModalVerSucursal(false);
        setSelectedSucursal(null);
    };

    const handleCloseModalAddSucursal = () => {
        setOpenModalAddSucursal(false);
    };

    const handleCloseModalEditSucursal = () => {
        setOpenModalEditSucursal(false);
        setSelectedSucursal(null);
    };

    return (
        <>
            <div className={styles.containerView}>
                <aside className={styles.asideContainer}>
                    <h1>Empresas</h1>
                    <Button onClick={handleOpenModalAddEmpresa}>Agregar Empresa</Button>
                    <div className={styles.modalContainerEmpresas}>
                        {empresas.map((empresa) => (
                            <div key={empresa.id} className={styles.ModalEmpresaContainer}>
                                <h3>{empresa.nombre}</h3>
                                <div className={styles.ModalEmpresaButtons}>
                                    <Button onClick={() => handleOpenModalVerEmpresa(empresa)}>
                                        <span className="material-symbols-outlined">visibility</span>
                                    </Button>
                                    <Button onClick={() => handleOpenModalEditEmpresa(empresa)}>
                                        <span className="material-symbols-outlined">edit</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                <div className={styles.mainContainer}>
                    <Button className={styles.agregarSucursalButton} onClick={handleOpenModalAddSucursal}>Agregar Sucursal</Button>
                    <div className={styles.containerSucursales}>
                        {sucursales.map((sucursal) => (
                            <div key={sucursal.id} className={styles.ModalSucursalContainer}>
                                <h3>{sucursal.nombre}</h3>
                                <div className={styles.ModalSucursalButtons}>
                                    <Button onClick={() => handleOpenModalVerSucursal(sucursal)}>
                                        <span className="material-symbols-outlined">visibility</span>
                                    </Button>
                                    <Button onClick={() => handleOpenModalEditSucursal(sucursal)}>
                                        <span className="material-symbols-outlined">edit</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {openModalAddEmpresa && (
                <Modal>
                    <ModalEmpresa handleAddEmpresa={handleAddEmpresa} handleCloseModalEmpresa={handleCloseModalAddEmpresa} />
                </Modal>
            )}
            {openModalEditEmpresa && selectedEmpresa && (
                <Modal>
                    <ModalEditarEmpresa empresa={selectedEmpresa} onClose={handleCloseModalEditEmpresa} onSave={handleEditEmpresa} />
                </Modal>
            )}
            {openModalVerEmpresa && selectedEmpresa && (
                <Modal>
                    <ModalVerEmpresa empresa={selectedEmpresa} onClose={handleCloseModalVerEmpresa} />
                </Modal>
            )}
            {openModalAddSucursal && (
                <Modal>
                    <ModalSucursal handleAddSucursal={handleAddSucursal} handleCloseModalSucursal={handleCloseModalAddSucursal} />
                </Modal>
            )}
            {openModalEditSucursal && selectedSucursal && (
                <Modal>
                    <ModalEditarSucursal sucursal={selectedSucursal} onClose={handleCloseModalEditSucursal} onSave={handleEditSucursal} />
                </Modal>
            )}
            {openModalVerSucursal && selectedSucursal && (
                <Modal>
                    <ModalVerSucursal sucursal={selectedSucursal} onClose={handleCloseModalVerSucursal} />
                </Modal>
            )}
        </>
    );
};
