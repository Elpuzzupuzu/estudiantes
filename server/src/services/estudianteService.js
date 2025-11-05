// src/services/estudianteService.js

import { EstudianteRepository } from '../repositories/estudianteRepository.js';
import { CarreraRepository } from '../repositories/carreraRepository.js'; 

export const EstudianteService = {
    
    /**
     * @description Valida los campos y resuelve el id_carrera a partir del nombre (si se proporciona).
     */
   validateAndPrepare: async (datos) => {
    const { nombre, id_carrera, carrera, semestre, promedio } = datos;

    // Validación inicial flexible: acepta id_carrera o carrera
    if (!nombre || (!id_carrera && !carrera) || !semestre || promedio === undefined) {
        throw new Error("Faltan campos obligatorios: nombre, carrera, semestre, o promedio.");
    }

    // Validaciones numéricas
    if (semestre <= 0 || isNaN(semestre) || promedio < 0.0 || promedio > 10.0 || isNaN(promedio)) {
        throw new Error("Semestre o Promedio tienen valores inválidos o fuera de rango (0.0 a 10.0).");
    }

    let carreraFinal = id_carrera || carrera; // Usa id_carrera si existe

    // Si no parece un UUID (ej. es un nombre), busca el id real
    if (typeof carreraFinal === 'string' && carreraFinal.length < 36) {
        const carreraRecord = await CarreraRepository.findIdByNombre(carreraFinal);
        if (!carreraRecord) {
            throw new Error(`La carrera con nombre "${carreraFinal}" no existe.`);
        }
        carreraFinal = carreraRecord.id_carrera;
    }

    return { nombre, id_carrera: carreraFinal, semestre, promedio };
},



    /**
     * @description Registra un nuevo estudiante.
     */
    createEstudiante: async (datosEstudiante) => {
        const dataReady = await EstudianteService.validateAndPrepare(datosEstudiante);
        return await EstudianteRepository.create(dataReady);
    },
    
    /**
     * @description Obtiene y filtra estudiantes.
     */
    getEstudiantes: async (filtros) => {
        const { id_carrera, semestre } = filtros;
        return await EstudianteRepository.findAndFilter(id_carrera, semestre);
    },

    /**
     * @description Edita un registro de estudiante.
     */
    updateEstudiante: async (id_estudiante, updateData) => {
        delete updateData.id_estudiante; 
        
        const updateReady = await EstudianteService.validateAndPrepare(updateData);
        const result = await EstudianteRepository.update(id_estudiante, updateReady);

        if (!result) {
            throw new Error("Estudiante no encontrado para actualizar.");
        }
        return result;
    },

    /**
     * @description Elimina un registro por ID.
     */
    deleteEstudiante: async (id_estudiante) => {
        return await EstudianteRepository.delete(id_estudiante);
    }
};