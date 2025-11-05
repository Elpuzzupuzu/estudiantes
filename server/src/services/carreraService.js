// src/services/carreraService.js

import { CarreraRepository } from '../repositories/carreraRepository.js'; 

export const CarreraService = {
    
    getAllCarreras: async () => {
        const carreras = await CarreraRepository.findAll();
        return carreras || [];
    },

    createCarrera: async (nombreCarrera) => {
        if (!nombreCarrera || typeof nombreCarrera !== 'string' || nombreCarrera.trim().length < 3) {
            throw new Error("El nombre de la carrera es inválido o demasiado corto.");
        }
        
        const nombreLimpio = nombreCarrera.trim();
        const nuevaCarrera = await CarreraRepository.create(nombreLimpio);
        
        return nuevaCarrera;
    }
};