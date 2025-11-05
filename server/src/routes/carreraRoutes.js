// src/routes/carreraRoutes.js

import express from 'express';
// Importación nombrada
import { CarreraController } from '../controllers/carreraController.js'; 

const router = express.Router();

router.get('/', CarreraController.findAll);
router.post('/', CarreraController.create);

// 🚨 Usamos export default para integrarlo fácilmente en server.js
export default router;