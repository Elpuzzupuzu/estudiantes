import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaGraduationCap, FaSave } from 'react-icons/fa';
import {
    fetchCarreras,
    createCarrera,
    selectAllCarreras,
    selectCarrerasStatus,
    selectCarrerasError
} from '../../features/carreras/carrerasSlice'; 

// =======================================================
// COMPONENTE: Formulario de Creación de Carrera
// =======================================================
const CarreraForm = ({ isSubmitting }) => {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            toast.warn('El nombre de la carrera es obligatorio.');
            return;
        }

        try {
            // Llama al thunk para crear la carrera
            await dispatch(createCarrera({ nombre_carrera: nombre })).unwrap();
            toast.success(`✅ Carrera "${nombre}" creada exitosamente.`);
            setNombre('');
        } catch (error) {
            // Maneja el error devuelto por rejectWithValue (ej. "La carrera ya existe.")
            const errorMessage = error.data?.message || error.message || 'Desconocido';
            toast.error(`❌ Error al crear carrera: ${errorMessage}`);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-indigo-100">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                <FaGraduationCap /> Registrar Nueva Carrera
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Ingeniería de Software"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    disabled={isSubmitting}
                    required
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                >
                    <FaSave /> {isSubmitting ? 'Guardando...' : 'Añadir Carrera'}
                </button>
            </form>
        </div>
    );
};


// =======================================================
// PÁGINA PRINCIPAL
// =======================================================
const carreraPage = () => {
    const dispatch = useDispatch();
    const carreras = useSelector(selectAllCarreras);
    const status = useSelector(selectCarrerasStatus);
    const error = useSelector(selectCarrerasError);
    
    // Aquí puedes usar el status 'loading' de Redux directamente para deshabilitar el formulario
    const isSubmitting = status === 'loading'; 

    // Cargar datos al montar el componente (solo si el estado es 'idle')
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCarreras());
        }
    }, [status, dispatch]);
    
    // --- Renderizado de la lista ---
    let content;

    if (status === 'loading' && carreras.length === 0) {
        content = <div className="text-center py-8 text-indigo-500 font-medium">Cargando lista de carreras...</div>;
    } else if (status === 'failed') {
        content = <div className="text-center py-8 text-red-600 font-medium">Error al cargar: {error}</div>;
    } else { // 'succeeded' o 'loading' con datos precargados
        if (carreras.length === 0 && status !== 'loading') {
            content = <div className="text-center py-8 text-gray-500 italic">No hay carreras registradas aún. ¡Usa el formulario de arriba!</div>
        } else {
            content = (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {carreras.map((carrera) => (
                        <div 
                            key={carrera.id_carrera} 
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200 border-l-4 border-indigo-500"
                        >
                            <h4 className="text-lg font-semibold text-gray-800">{carrera.nombre_carrera}</h4>
                            <p className="text-xs text-gray-500 mt-1">ID: {carrera.id_carrera.substring(0, 8)}...</p>
                            {/* Aquí se podrían agregar estadísticas o acciones adicionales */}
                        </div>
                    ))}
                    {status === 'loading' && carreras.length > 0 && 
                        <div className="p-4 text-center text-sm text-indigo-500">Actualizando lista...</div>
                    }
                </div>
            );
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">Gestión de Carreras</h1>
            
            <div className="mb-8">
                <CarreraForm isSubmitting={isSubmitting} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Carreras Registradas ({carreras.length})</h2>
            
            {content}
        </div>
    );
};

export default carreraPage;