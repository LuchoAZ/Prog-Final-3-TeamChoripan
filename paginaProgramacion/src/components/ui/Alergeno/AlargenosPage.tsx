import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { addAlergeno, deleteAlergeno, fetchAlergenos, updateAlergeno } from '../../../store/slices/alargenosSlice';
import CrearAlergeno from './CrearAlargeno/CrearAlargeno';
import VerAlergeno from './VerAlargeno/VerAlargeno';
import EditarAlergeno from './EditarAlargeno/EditarAlargeno';

export const AlergenosPage = () => {
    const [showCrearModal, setShowCrearModal] = useState(false);
    const [showVerModal, setShowVerModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [selectedAlergeno, setSelectedAlergeno] = useState<IAlergenos | null>(null);

    const alergenos = useAppSelector((state) => state.alargenos.alergenos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAlergenos());
    }, [dispatch]);

    if (status === 'loading') return <p>Cargando alergenos...</p>;
    if (status === 'failed') return <p>Error al cargar alergenos: {Error}</p>;

    // Función para agregar un alérgeno
    const handleAddAlergeno = (alergeno: IAlergenos) => {
        dispatch(addAlergeno(alergeno)); // Agrega el alérgeno al estado global
    };

    // Función para actualizar un alérgeno existente
    const handleSaveAlergeno = (alergeno: IAlergenos) => {
        dispatch(updateAlergeno(alergeno)); // Actualiza el alérgeno en el estado global
    };

    return (
        <div>
            <h2>Gestión de Alérgenos</h2>
            <Button onClick={() => setShowCrearModal(true)}>Agregar Alérgeno</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alergenos.map((alergeno) => (
                        <tr key={alergeno.id}>
                            <td>{alergeno.denominacion}</td>
                            <td>
                                <Button onClick={() => { setSelectedAlergeno(alergeno); setShowVerModal(true); }}><span className="material-symbols-outlined">visibility</span></Button>
                                <Button onClick={() => { setSelectedAlergeno(alergeno); setShowEditarModal(true); }}><span className="material-symbols-outlined">edit</span></Button>
                                <Button variant="danger" onClick={() => dispatch(deleteAlergeno(alergeno.id))}><span className="material-symbols-outlined">delete</span></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {showCrearModal && <CrearAlergeno onAddAlergeno={handleAddAlergeno} onClose={() => setShowCrearModal(false)} />}
            {showVerModal && selectedAlergeno && <VerAlergeno alergeno={selectedAlergeno} onClose={() => setShowVerModal(false)} />}
            {showEditarModal && selectedAlergeno && <EditarAlergeno alergeno={selectedAlergeno} onSave={handleSaveAlergeno} onClose={() => setShowEditarModal(false)} />}
        </div>
    );
};
