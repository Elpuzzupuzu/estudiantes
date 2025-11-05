// src/repositories/usuarioRepository.js

import { supabase } from '../config/supabaseClient.js';
const TABLA_USUARIOS = 'usuarios';

export const UsuarioRepository = {
    
    // Función para encontrar un usuario por su ID
    findById: async (id) => {
        const { data, error } = await supabase
            .from(TABLA_USUARIOS)
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error(`Error al obtener usuario por ID ${id}:`, error);
            throw new Error(`Error en el repositorio al buscar usuario: ${error.message}`);
        }
        return data;
    },

    // Función para encontrar un usuario por su correo
    findByEmail: async (correo) => {
        const { data, error } = await supabase
            .from(TABLA_USUARIOS)
            .select('*')
            .eq('correo', correo)
            .maybeSingle();

        if (error) {
            console.error(`Error al obtener usuario por correo ${correo}:`, error);
            throw new Error(`Error en el repositorio al buscar usuario: ${error.message}`);
        }
        return data;
    },

    // Función para crear un nuevo usuario (sin el hash de contraseña, que suele hacerse en el Servicio/Auth)
    create: async (usuarioData) => {
        // usuarioData debe contener: { id, correo, contraseña (hash), nombre, apellido, ... }
        const { data, error } = await supabase
            .from(TABLA_USUARIOS)
            .insert([usuarioData])
            .select() 
            .single();

        if (error) {
            if (error.code === '23505') { 
                throw new Error('El correo electrónico ya está registrado.');
            }
            console.error("Error al crear usuario:", error);
            throw new Error(`Error en el repositorio al crear usuario: ${error.message}`);
        }
        return data;
    }
};