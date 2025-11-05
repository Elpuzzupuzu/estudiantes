import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaGraduationCap, FaSave, FaBook, FaPlus, FaCheckCircle } from 'react-icons/fa';
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
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            toast.warn('El nombre de la carrera es obligatorio.');
            return;
        }

        try {
            await dispatch(createCarrera({ nombre_carrera: nombre })).unwrap();
            toast.success(`✅ Carrera "${nombre}" creada exitosamente.`);
            setNombre('');
        } catch (error) {
            const errorMessage = error.data?.message || error.message || 'Desconocido';
            toast.error(`❌ Error al crear carrera: ${errorMessage}`);
        }
    };

    return (
        <div className="relative overflow-hidden bg-white p-8 rounded-lg shadow-sm border-2 border-slate-200">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 rounded-full -ml-16 -mb-16 opacity-40"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-900 rounded-lg shadow-sm">
                        <FaGraduationCap className="text-white text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Nueva Carrera</h3>
                        <p className="text-sm text-slate-600 font-light">Registrar programa académico</p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Nombre de la carrera"
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 text-slate-900 placeholder-slate-400 bg-white font-light ${
                                isFocused ? 'shadow-md border-blue-900' : 'border-slate-300 shadow-sm'
                            }`}
                            disabled={isSubmitting}
                            required
                        />
                        <FaBook className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                            isFocused ? 'text-blue-900' : 'text-slate-300'
                        }`} />
                    </div>
                    
                    <button
                        type="submit"
                        className="group px-8 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 tracking-wide"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Guardando...</span>
                            </>
                        ) : (
                            <>
                                <FaPlus className="text-sm" />
                                <span>Añadir Carrera</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
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
    
    const isSubmitting = status === 'loading'; 

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCarreras());
        }
    }, [status, dispatch]);
    
    // --- Renderizado de la lista ---
    let content;

    if (status === 'loading' && carreras.length === 0) {
        content = (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-900 rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-slate-600 font-light">Cargando carreras...</p>
            </div>
        );
    } else if (status === 'failed') {
        content = (
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">!</div>
                    <div>
                        <h3 className="text-red-900 font-semibold text-lg">Error al cargar</h3>
                        <p className="text-red-700 font-light">{error}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        if (carreras.length === 0 && status !== 'loading') {
            content = (
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-12 rounded-lg text-center">
                    <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                        <FaGraduationCap className="text-4xl text-slate-400" />
                    </div>
                    <p className="text-slate-700 text-lg font-medium">No hay carreras registradas</p>
                    <p className="text-slate-500 text-sm mt-2 font-light">Utilice el formulario superior para agregar programas académicos</p>
                </div>
            );
        } else {
            content = (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {carreras.map((carrera, index) => (
                        <div 
                            key={carrera.id_carrera} 
                            className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 hover:border-blue-900 overflow-hidden"
                            style={{
                                animationDelay: `${index * 50}ms`
                            }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2.5 bg-blue-900 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
                                        <FaGraduationCap className="text-white text-xl" />
                                    </div>
                                    <FaCheckCircle className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                                
                                <h4 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors duration-200 leading-snug">
                                    {carrera.nombre_carrera}
                                </h4>
                                
                                <div className="flex items-center gap-2 text-xs text-slate-400 font-light">
                                    <span className="px-2 py-1 bg-slate-50 rounded font-mono text-[10px]">
                                        ID: {carrera.id_carrera.substring(0, 8)}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                        </div>
                    ))}
                    
                    {status === 'loading' && carreras.length > 0 && (
                        <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                            <div className="text-center">
                                <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-2"></div>
                                <p className="text-sm text-blue-900 font-medium">Actualizando...</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-12 w-1 bg-blue-900 rounded-full"></div>
                        <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
                            Gestión de Carreras
                        </h1>
                    </div>
                    <p className="text-slate-600 ml-6 text-lg font-light">Sistema de administración de programas académicos</p>
                </div>
                
                {/* Formulario */}
                <div className="mb-12">
                    <CarreraForm isSubmitting={isSubmitting} />
                </div>

                {/* Lista de carreras */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                            Carreras Registradas
                        </h2>
                        <div className="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg text-sm shadow-sm">
                            {carreras.length} {carreras.length === 1 ? 'carrera' : 'carreras'}
                        </div>
                    </div>
                    
                    {content}
                </div>
            </div>
        </div>
    );
};

export default carreraPage;