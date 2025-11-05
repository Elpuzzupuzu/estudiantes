// src/repositories/carreraRepository.js

import { supabase } from '../config/supabaseClient.js';
const TABLA_CARRERAS = 'carreras';

export const CarreraRepository = {
    
    findAll: async () => {
        const { data, error } = await supabase
            .from(TABLA_CARRERAS)
            .select('*')
            .order('nombre_carrera', { ascending: true }); 

        if (error) {
            console.error("Error al obtener carreras:", error);
            throw new Error(`Error en el repositorio al buscar carreras: ${error.message}`);
        }
        return data;
    },

    findIdByNombre: async (nombre) => {
        const { data, error } = await supabase
            .from(TABLA_CARRERAS)
            .select('id_carrera, nombre_carrera')
            .eq('nombre_carrera', nombre)
            .maybeSingle(); 

        if (error) { 
            console.error(`Error al buscar carrera por nombre ${nombre}:`, error);
            throw new Error(`Error en el repositorio: ${error.message}`);
        }
        return data;
    },

    create: async (nombre) => {
        const { data, error } = await supabase
            .from(TABLA_CARRERAS)
            .insert([{ nombre_carrera: nombre }])
            .select() 
            .single();

        if (error) {
            if (error.code === '23505') { 
                throw new Error('La carrera ya existe.');
            }
            console.error("Error al crear carrera:", error);
            throw new Error(`Error en el repositorio al crear: ${error.message}`);
        }
        return data;
    }
};