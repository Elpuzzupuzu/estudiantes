import React from 'react';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

// Función de utilidad importada
import { getPromedioColor } from '../Utils/estudianteUtilities'; 

const estudianteTabla = ({ estudiantes, status, error, handleOpenEdit, handleDelete }) => {
    
    // Contenido condicional (Loading, Error, Vacío, Datos)
    let content;

    if (status === 'loading') {
        content = (
            <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-medium">Cargando estudiantes...</p>
            </div>
        );
    } else if (status === 'failed') {
        content = (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-700 font-medium">❌ Error al cargar: {error}</p>
            </div>
        );
    } else if (status === 'succeeded' && estudiantes.length === 0) {
        content = (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <FaSearch className="mx-auto text-5xl text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg font-medium">No se encontraron estudiantes</p>
                <p className="text-gray-500 text-sm mt-2">Intenta ajustar los filtros o registra un nuevo estudiante</p>
            </div>
        );
    } else if (status === 'succeeded') {
        content = (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Carrera</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Semestre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Promedio</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {estudiantes.map((e) => (
                                <tr key={e.id_estudiante} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                                                {e.nombre.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{e.nombre}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-700">{e.carrera?.nombre_carrera || 'N/A'}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{e.semestre}° Semestre</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPromedioColor(e.promedio)}`}>
                                            {e.promedio.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleOpenEdit(e)} 
                                                className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(e.id_estudiante, e.nombre)} 
                                                className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Eliminar"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return <div>{content}</div>;
};

export default estudianteTabla;