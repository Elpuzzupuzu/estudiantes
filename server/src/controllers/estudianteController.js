// src/controllers/estudianteController.js

import { EstudianteService } from '../services/estudianteService.js'; 

export const EstudianteController = {

    /**
     * POST /api/estudiantes - Registrar nuevo estudiante.
     */
    create: async (req, res) => {
        try {
            const nuevoEstudiante = await EstudianteService.createEstudiante(req.body);
            return res.status(201).json(nuevoEstudiante); 
        } catch (error) {
            console.error("Error al registrar estudiante:", error.message);
            return res.status(400).json({ // 400 Bad Request para validación/carrera inexistente
                message: error.message 
            });
        }
    },

    /**
     * GET /api/estudiantes?id_carrera=UUID&semestre=N - Consultar y Filtrar.
     */
    findAllAndFilter: async (req, res) => {
        try {
            const estudiantes = await EstudianteService.getEstudiantes(req.query);
            return res.status(200).json(estudiantes); 
        } catch (error) {
            console.error("Error al consultar/filtrar estudiantes:", error);
            return res.status(500).json({ 
                message: "Error interno del servidor al consultar estudiantes." 
            });
        }
    },

    /**
     * PUT /api/estudiantes/:id - Editar registro.
     */
    update: async (req, res) => {
        const { id } = req.params; 
        
        try {
            const estudianteActualizado = await EstudianteService.updateEstudiante(id, req.body);
            return res.status(200).json(estudianteActualizado);
        } catch (error) {
            console.error(`Error al actualizar estudiante ${id}:`, error.message);
            
            let statusCode = 400; 
            if (error.message.includes('no encontrado')) {
                statusCode = 404;
            }

            return res.status(statusCode).json({ 
                message: error.message 
            });
        }
    },
    
    /**
     * DELETE /api/estudiantes/:id - Eliminar registro.
     */
    delete: async (req, res) => {
        const { id } = req.params; 
        
        try {
            await EstudianteService.deleteEstudiante(id);
            return res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error(`Error al eliminar estudiante ${id}:`, error.message);
            return res.status(500).json({ 
                message: `Error al eliminar estudiante: ${error.message}` 
            });
        }
    }
};