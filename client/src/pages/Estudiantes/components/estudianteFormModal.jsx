import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTimes, FaUserPlus, FaGraduationCap, FaStar } from 'react-icons/fa';

// Thunks de Estudiantes
import {
    createEstudiante,
    updateEstudiante,
    fetchEstudiantes, // ✅ Importado para refrescar lista
} from '../../../features/estudiantes/estudiantesSlice';

const estudianteFormModal = ({ isOpen, onClose, initialData = null, carreras }) => {
    const dispatch = useDispatch();
    const isEditMode = !!initialData;

    // ✅ Usa id_carrera en lugar del nombre
    const initialFormData = {
        nombre: initialData?.nombre || '',
        carrera: initialData?.id_carrera || '',
        semestre: initialData?.semestre || 1,
        promedio: initialData?.promedio || 0.0,
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sincroniza datos si se edita
    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre || '',
                carrera: initialData.id_carrera || '',
                semestre: initialData.semestre || 1,
                promedio: initialData.promedio || 0.0,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const dataToSend = {
            nombre: formData.nombre.trim(),
            id_carrera: formData.carrera, // ✅ Enviamos el UUID real
            semestre: parseInt(formData.semestre),
            promedio: parseFloat(formData.promedio),
        };

        if (!dataToSend.nombre || !dataToSend.id_carrera || !dataToSend.semestre || !dataToSend.promedio) {
            toast.error("❌ Faltan campos obligatorios: nombre, carrera, semestre o promedio.");
            setIsSubmitting(false);
            return;
        }

        try {
            if (isEditMode) {
                await dispatch(updateEstudiante({ id_estudiante: initialData.id_estudiante, updateData: dataToSend })).unwrap();
                toast.success(`✅ Estudiante ${dataToSend.nombre} actualizado.`);
            } else {
                await dispatch(createEstudiante(dataToSend)).unwrap();
                toast.success(`✅ Estudiante ${dataToSend.nombre} registrado.`);
                setFormData(initialFormData); 
            }

            // 🔄 Refrescar lista de estudiantes
            await dispatch(fetchEstudiantes());

            onClose(); 
        } catch (error) {
            toast.error(`❌ Error al guardar: ${error?.message || 'Error desconocido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                
                {/* Header del modal */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <FaUserPlus className="text-white text-lg" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {isEditMode ? 'Editar Estudiante' : 'Registrar Estudiante'}
                            </h2>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
                
                {/* Contenido del modal */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            👤 Nombre Completo
                        </label>
                        <input 
                            type="text" 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                            placeholder="Ej. Juan Pérez García"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        />
                    </div>

                    {/* Carrera */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <FaGraduationCap className="inline mr-1 text-blue-600" /> Carrera
                        </label>
                        <select
                            name="carrera"
                            value={formData.carrera}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white"
                        >
                            <option value="" disabled>Seleccione una carrera</option>
                            {carreras.map((carrera) => (
                                <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                    {carrera.nombre_carrera}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Semestre y Promedio */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                📚 Semestre
                            </label>
                            <input 
                                type="number" 
                                name="semestre" 
                                value={formData.semestre} 
                                onChange={handleChange} 
                                required 
                                min="1" 
                                max="15"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <FaStar className="inline mr-1 text-yellow-500" /> Promedio
                            </label>
                            <input 
                                type="number" 
                                name="promedio" 
                                value={formData.promedio} 
                                onChange={handleChange} 
                                required 
                                step="0.1" 
                                min="0.0" 
                                max="10.0"
                                placeholder="0.0 - 10.0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Registrar Estudiante')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default estudianteFormModal;
