import { useEffect, useState } from 'react';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal';
import styles from './Home.module.css';
import { Button } from 'react-bootstrap';
import Modal from '../../ui/Modal/Modal';
import { CrearEmpresa } from '../../ui/CrearEmpresa/CrearEmpresa';
import { ModalEditarEmpresa } from '../../ui/EditarEmpresa/ModalEditarEmpresa';
import { CrearSucursal } from '../../ui/CrearSucursal/CrearSucursal';
import { ModalEditarSucursal } from '../../ui/EditarSucursal/ModalEditarSucursal';
import { ModalVerEmpresa } from '../../ui/VerEmpresa/ModalVerEmpresa';
import { ModalVerSucursal } from '../../ui/VerSucursal/ModalVerSucursal';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { addEmpresa, fetchEmpresas } from '../../../store/slices/empresaSlice';
import { fetchSucursales } from '../../../store/slices/sucursalSlice';

export const Home = () => {
    const dispatch = useAppDispatch();
    const empresas = useAppSelector((state) => state.empresa.empresas);
    const sucursales = useAppSelector((state) => state.sucursal.sucursales);

    const [selectedEmpresa, setSelectedEmpresa] = useState<IEmpresa | null>(null);
    const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);
    const [openModalEditEmpresa, setOpenModalEditEmpresa] = useState(false);
    const [openModalVerEmpresa, setOpenModalVerEmpresa] = useState(false);
    const [openModalAddEmpresa, setOpenModalAddEmpresa] = useState(false);
    const [openModalVerSucursal, setOpenModalVerSucursal] = useState(false);
    const [openModalAddSucursal, setOpenModalAddSucursal] = useState(false);
    const [openModalEditSucursal, setOpenModalEditSucursal] = useState(false);

    useEffect(() => {
        dispatch(fetchEmpresas());
        dispatch(fetchSucursales(1)); //Cambia "1" al ID de la empresa deseada
    }, [dispatch]);

    const handleSelectEmpresa = (empresa: IEmpresa) => {
        setSelectedEmpresa(empresa);
        dispatch(fetchSucursales(empresa.id));
    };

    const handleAddEmpresa = (newEmpresa: IEmpresa) => {
        dispatch(addEmpresa(newEmpresa));
        setOpenModalAddEmpresa(false);
    };

    return (
        <>
            <div className={styles.containerView}>
                <aside className={styles.asideContainer}>
                    <h1>Empresas</h1>
                    <Button onClick={() => setOpenModalAddEmpresa(true)}>Agregar Empresa</Button>
                    <div className={styles.modalContainerEmpresas}>
                        {empresas.map((empresa) => (
                            <div
                                key={empresa.id}
                                className={styles.ModalEmpresaContainer}
                                onClick={() => handleSelectEmpresa(empresa)} //Actúa como botón para ver sucursales
                            >
                                <h3>{empresa.nombre}</h3>
                                <h4>{empresa.razonSocial}</h4>
                                <div className={styles.ModalEmpresaButtons}>
                                    <Button onClick={(e) => { e.stopPropagation(); setOpenModalVerEmpresa(true); setSelectedEmpresa(empresa); }}>
                                        <span className="material-symbols-outlined">visibility</span>
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); setOpenModalEditEmpresa(true); setSelectedEmpresa(empresa); }}>
                                        <span className="material-symbols-outlined">edit</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                <div className={styles.mainContainer}>
                    <Button className={styles.agregarSucursalButton} onClick={() => setOpenModalAddSucursal(true)}>Agregar Sucursal</Button>
                    <div className={styles.containerSucursales}>
                        {sucursales.map((sucursal) => (
                            <div key={sucursal.id} className={styles.ModalSucursalContainer}>
                                <img
                                    src={sucursal.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"}
                                    alt="Sucursal logo"
                                />
                                <h3>{sucursal.nombre}</h3>
                                <h4>{sucursal.horarioApertura} - {sucursal.horarioCierre}</h4>
                                <div className={styles.ModalSucursalButtons}>
                                    <Button onClick={() => { setSelectedSucursal(sucursal); setOpenModalVerSucursal(true); }}>
                                        <span className="material-symbols-outlined">visibility</span>
                                    </Button>
                                    <Button onClick={() => { setSelectedSucursal(sucursal); setOpenModalEditSucursal(true); }}>
                                        <span className="material-symbols-outlined">edit</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals para crear, ver y editar empresas y sucursales*/}
            {openModalAddEmpresa && (
                <Modal>
                    <CrearEmpresa handleAddEmpresa={handleAddEmpresa} handleCloseModalEmpresa={() => setOpenModalAddEmpresa(false)} />
                </Modal>
            )}
            {openModalEditEmpresa && selectedEmpresa && (
                <Modal>
                    <ModalEditarEmpresa empresa={selectedEmpresa} onClose={() => setOpenModalEditEmpresa(false)} onSave={() => { }} />
                </Modal>
            )}
            {openModalVerEmpresa && selectedEmpresa && (
                <Modal>
                    <ModalVerEmpresa empresa={selectedEmpresa} onClose={() => setOpenModalVerEmpresa(false)} />
                </Modal>
            )}
            {openModalAddSucursal && (
                <Modal>
                    <CrearSucursal handleAddSucursal={() => { }} handleCloseModalSucursal={() => setOpenModalAddSucursal(false)} />
                </Modal>
            )}
            {openModalEditSucursal && selectedSucursal && (
                <Modal>
                    <ModalEditarSucursal sucursal={selectedSucursal} onClose={() => setOpenModalEditSucursal(false)} onSave={() => { }} />
                </Modal>
            )}
            {openModalVerSucursal && selectedSucursal && (
                <Modal>
                    <ModalVerSucursal sucursal={selectedSucursal} onClose={() => setOpenModalVerSucursal(false)} />
                </Modal>
            )}
        </>
    );
};
