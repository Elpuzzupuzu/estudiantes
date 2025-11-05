import React from 'react';
import { FaFilter, FaTimes, FaGraduationCap } from 'react-icons/fa';

const estudianteFiltros = ({ onFilterChange, selectedFiltros, carreras, carrerasStatus }) => {
    const isCarrerasLoading = carrerasStatus === 'loading';
    const hasActiveFilters = !!(selectedFiltros.id_carrera || selectedFiltros.semestre);

    // ✅ Evita enviar undefined cuando se limpian los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        // Si el usuario selecciona "Todas las Carreras" => limpiar filtro
        if (name === 'id_carrera' && (value === '' || value === undefined)) {
            onFilterChange({ target: { name, value: null } });
            return;
        }

        // Si semestre está vacío => limpiar
        if (name === 'semestre' && (value === '' || value === undefined)) {
            onFilterChange({ target: { name, value: null } });
            return;
        }

        onFilterChange(e);
    };

    // ✅ Botón limpiar filtros (llama a onFilterChange con valores vacíos)
    const handleClearFilters = () => {
        onFilterChange({ target: { name: 'clear', value: '' } });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            {/* Header del filtro */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaFilter className="text-blue-600" /> 
                    Filtros de Búsqueda
                </h3>
            </div>
            
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtro por Carrera */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <FaGraduationCap className="inline mr-1 text-blue-600" /> Carrera
                        </label>
                        <select
                            name="id_carrera"
                            value={selectedFiltros.id_carrera || ''}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            disabled={isCarrerasLoading}
                        >
                            <option value="">Todas las Carreras</option>
                            {isCarrerasLoading ? (
                                <option disabled>Cargando carreras...</option>
                            ) : (
                                carreras.map((carrera) => (
                                    <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                        {carrera.nombre_carrera}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    {/* Filtro por Semestre */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📚 Semestre
                        </label>
                        <input
                            type="number"
                            name="semestre"
                            value={selectedFiltros.semestre || ''}
                            onChange={handleFilterChange}
                            placeholder="Ej. 5"
                            min="1"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Botón de Limpiar Filtros */}
                    <div className="flex items-end">
                        {hasActiveFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <FaTimes /> Limpiar Filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Indicador de filtros activos */}
                {hasActiveFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Filtros activos:</span>
                            {selectedFiltros.id_carrera && 
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                    Carrera: {carreras.find(c => c.id_carrera === selectedFiltros.id_carrera)?.nombre_carrera || 'Cargando...'}
                                </span>}
                            {selectedFiltros.semestre && 
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                    Semestre: {selectedFiltros.semestre}
                                </span>}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default estudianteFiltros;
