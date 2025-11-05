// src/controllers/carreraController.js

import { CarreraService } from '../services/carreraService.js'; 

export const CarreraController = {

    findAll: async (req, res) => {
        try {
            const carreras = await CarreraService.getAllCarreras();
            return res.status(200).json(carreras); 

        } catch (error) {
            console.error("Error en el controlador al listar carreras:", error);
            return res.status(500).json({ 
                message: "Error interno del servidor al obtener las carreras." 
            });
        }
    },

    create: async (req, res) => {
        const { nombre_carrera } = req.body;

        try {
            const nuevaCarrera = await CarreraService.createCarrera(nombre_carrera);
            return res.status(201).json(nuevaCarrera); 

        } catch (error) {
            console.error("Error en el controlador al crear carrera:", error);
            let statusCode = 500;
            
            if (error.message.includes('inválido') || error.message.includes('existe')) {
                statusCode = 400; // Bad Request para errores de validación/duplicados
            }

            return res.status(statusCode).json({ 
                message: error.message 
            });
        }
    }
};