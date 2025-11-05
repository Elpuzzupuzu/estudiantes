import express from 'express';
import { UsuarioController } from '../controllers/usuarioController.js'; 

const router = express.Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);
router.post('/logout', UsuarioController.logout); // ✅ nuevo

export default router;
