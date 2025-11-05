// src/routes/estudianteRoutes.js

import express from 'express';
import { EstudianteController } from '../controllers/estudianteController.js'; 

const router = express.Router();

// Rutas base: GET (Consultar/Filtrar) y POST (Registrar)
router.route('/')
    .get(EstudianteController.findAllAndFilter) 
    .post(EstudianteController.create);        

// Rutas de detalle por ID: PUT (Editar) y DELETE (Eliminar)
router.route('/:id')
    .put(EstudianteController.update)          
    .delete(EstudianteController.delete);      

// Exportación por defecto para usar en server.js
export default router;