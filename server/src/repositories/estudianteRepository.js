// src/repositories/estudianteRepository.js

import { supabase } from '../config/supabaseClient.js';
const TABLA_ESTUDIANTES = 'estudiantes';

export const EstudianteRepository = {
    
    create: async (estudianteData) => {
        estudianteData.actualizado_en = new Date().toISOString(); 
        
        const { data, error } = await supabase
            .from(TABLA_ESTUDIANTES)
            .insert([estudianteData])
            .select() 
            .single();

        if (error) {
            console.error("Error al registrar estudiante:", error);
            throw new Error(`Error en repositorio al crear: ${error.message}`);
        }
        return data;
    },

    findAndFilter: async (id_carrera, semestre) => {
        // Usamos 'carrera:id_carrera(nombre_carrera)' para realizar un JOIN y obtener el nombre
        let query = supabase.from(TABLA_ESTUDIANTES).select('*, carrera:id_carrera(nombre_carrera)');

        if (id_carrera) {
            query = query.eq('id_carrera', id_carrera);
        }
        if (semestre) {
            query = query.eq('semestre', semestre);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error al filtrar estudiantes:", error);
            throw new Error(`Error en repositorio al filtrar: ${error.message}`);
        }
        
        return data;
    },

    update: async (id, updateData) => {
        updateData.actualizado_en = new Date().toISOString(); 
        
        const { data, error } = await supabase
            .from(TABLA_ESTUDIANTES)
            .update(updateData)
            .eq('id_estudiante', id)
            .select()
            .single();

        if (error) {
            console.error(`Error al actualizar estudiante ${id}:`, error);
            throw new Error(`Error en repositorio al actualizar: ${error.message}`);
        }
        return data;
    },
    
    delete: async (id) => {
        const { error } = await supabase
            .from(TABLA_ESTUDIANTES)
            .delete()
            .eq('id_estudiante', id);

        if (error) {
            console.error(`Error al eliminar estudiante ${id}:`, error);
            throw new Error(`Error en repositorio al eliminar: ${error.message}`);
        }
        return true; 
    }
};