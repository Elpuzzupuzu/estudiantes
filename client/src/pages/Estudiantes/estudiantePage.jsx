import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaGraduationCap, FaUserPlus } from 'react-icons/fa';

// Thunks y Selectores de Estudiantes
import {
    fetchEstudiantes,
    deleteEstudiante,
    selectAllEstudiantes,
    selectEstudiantesStatus,
    selectEstudiantesError
} from '../../features/estudiantes/estudiantesSlice';

// Selectores de Carreras
import { 
    fetchCarreras,
    selectAllCarreras,
    selectCarrerasStatus
} from '../../features/carreras/carrerasSlice'; 

// Componentes Modulares
import EstudianteFiltros from './components/estudianteFiltros';
import EstudianteFormModal from './components/estudianteFormModal';
import EstudianteTabla from './components/estudianteTabla';

const estudiantePage = () => {
    const dispatch = useDispatch();
    const estudiantes = useSelector(selectAllEstudiantes);
    const status = useSelector(selectEstudiantesStatus);
    const error = useSelector(selectEstudiantesError);
    
    const carreras = useSelector(selectAllCarreras);
    const carrerasStatus = useSelector(selectCarrerasStatus);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null); 
    const [filtros, setFiltros] = useState({});

    // Carga inicial de estudiantes (con filtros) y carreras
    useEffect(() => {
        dispatch(fetchEstudiantes(filtros));
        
        if (carrerasStatus === 'idle') {
            dispatch(fetchCarreras());
        }
    }, [dispatch, filtros, carrerasStatus]);

    // --- Handlers de UI ---

    const handleOpenCreate = () => {
        setEditData(null); // Asegura que está en modo "crear"
        setIsModalOpen(true);
    };

    const handleOpenEdit = (estudiante) => {
        setEditData(estudiante);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditData(null); // Limpiar datos de edición al cerrar
    };

    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al estudiante: ${nombre}? Esta acción es irreversible.`)) {
            try {
                // El .unwrap() es importante para manejar errores en thunks de createAsyncThunk
                await dispatch(deleteEstudiante(id)).unwrap(); 
                toast.success(`🗑️ Estudiante ${nombre} eliminado.`);
            } catch (error) {
                toast.error(`❌ Error al eliminar: ${error?.message || 'Desconocido'}`);
            }
        }
    };
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'clear') {
            setFiltros({});
        } else {
            setFiltros(prev => ({ 
                ...prev, 
                // Convierte el valor a número si es semestre o id_carrera, o lo deja como cadena
                [name]: value ? (name === 'semestre' || name === 'id_carrera' ? value : value) : undefined
            }));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header de la página */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <FaGraduationCap className="text-white text-xl" />
                            </div>
                            Gestión de Estudiantes
                        </h1>
                        <p className="text-gray-600 mt-2">Administración de registros académicos.</p>
                    </div>
                    <button
                        onClick={handleOpenCreate}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <FaUserPlus /> Nuevo Estudiante
                    </button>
                </div>
            </div>
            
            {/* Componente de Filtros */}
            <EstudianteFiltros 
                onFilterChange={handleFilterChange} 
                selectedFiltros={filtros} 
                carreras={carreras}
                carrerasStatus={carrerasStatus}
            />

            {/* Contador de resultados */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 font-medium">
                    {estudiantes.length} {estudiantes.length === 1 ? 'estudiante encontrado' : 'estudiantes encontrados'}
                </p>
            </div>
            
            {/* Componente de la Tabla (Maneja la visualización de la lista y sus estados) */}
            <EstudianteTabla
                estudiantes={estudiantes}
                status={status}
                error={error}
                handleOpenEdit={handleOpenEdit}
                handleDelete={handleDelete}
            />

            {/* Modal de Creación/Edición */}
            <EstudianteFormModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editData}
                carreras={carreras}
            />
        </div>
    );
};

export default estudiantePage;