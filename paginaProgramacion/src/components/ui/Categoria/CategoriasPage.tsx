import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import {
    addCategoria,
    addSubcategoria,
    fetchCategorias,
    updateCategoria,
} from '../../../store/slices/categoriasSlice';
import { ICategorias } from '../../../types/dtos/categorias/ICategorias';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import CrearCategoria from './CrearCategoria/CrearCategoria';
import EditarCategoria from './EditarCategoria/EditarCategoria';
import EditarSubcategoria from './EditarCategoria/EditarSubcategoria';

export const CategoriasPage = () => {
    const [showCrearModal, setShowCrearModal] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<ICategorias | null>(null);
    const [selectedSubcategoria, setSelectedSubcategoria] = useState<ICategorias | null>(null);
    const [isAddingSubcategoria, setIsAddingSubcategoria] = useState(false);
    const [isEditingCategoria, setIsEditingCategoria] = useState(false);

    const categorias = useAppSelector((state) => state.categorias.categorias);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategorias());
    }, [dispatch]);

    if (status === 'loading') return <p>Cargando categorías...</p>;
    if (status === 'failed') return <p>Error al cargar categorías: {Error}</p>;

    // Función para agregar una categoría
    const handleAddCategoria = (categoria: ICategorias) => {
        dispatch(addCategoria(categoria)); // Agrega la categoría al estado global
    };

    // Función para agregar una subcategoría
    const handleAddSubcategoria = (categoriaId: number, subcategoria: ICategorias) => {
        dispatch(addSubcategoria({ categoriaId, subcategoria })); // Agrega la subcategoría a la categoría especificada
    };

    // Función para actualizar una categoría existente
    const handleUpdateCategoria = (categoria: ICategorias) => {
        dispatch(updateCategoria(categoria)); // Actualiza la categoría en el estado global
    };

    

    return (
        <div>
            <h2>Gestión de Categorías</h2>
            <Button onClick={() => setShowCrearModal(true)}>Agregar Categoría</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Subcategorías</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.denominacion}</td>
                            <td>
                                {categoria.subCategorias.map((sub) => (
                                    <div key={sub.id}>
                                        {sub.denominacion}{' '}
                                        <Button
                                            onClick={() => {
                                                setSelectedSubcategoria(sub);
                                            }}
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </Button>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <Button
                                    onClick={() => {
                                        setSelectedCategoria(categoria);
                                        setIsEditingCategoria(true);
                                    }}
                                >
                                    <span className="material-symbols-outlined">edit</span>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSelectedCategoria(categoria);
                                        setIsAddingSubcategoria(true);
                                    }}
                                >
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {showCrearModal && (
                <CrearCategoria
                    onAddCategoria={handleAddCategoria}
                    onClose={() => setShowCrearModal(false)}
                />
            )}
            {selectedCategoria && isEditingCategoria && (
                <EditarCategoria
                    categoria={selectedCategoria}
                    onSave={(categoria) => {
                        handleUpdateCategoria(categoria);
                        setSelectedCategoria(null);
                        setIsEditingCategoria(false);
                    }}
                    onClose={() => setIsEditingCategoria(false)}
                />
            )}
            {selectedCategoria && isAddingSubcategoria && (
                <CrearCategoria
                    onAddCategoria={(subcategoria) => {
                        handleAddSubcategoria(selectedCategoria.id, subcategoria);
                        setSelectedCategoria(null);
                        setIsAddingSubcategoria(false);
                    }}
                    onClose={() => setIsAddingSubcategoria(false)}
                />
            )}
            {selectedSubcategoria && (
                <EditarSubcategoria
                    subcategoria={selectedSubcategoria}
                    onSave={(subcategoria) => {
                        handleUpdateSubcategoria(subcategoria);
                        setSelectedSubcategoria(null);
                    }}
                    onClose={() => setSelectedSubcategoria(null)}
                />
            )}
        </div>
    );
};
