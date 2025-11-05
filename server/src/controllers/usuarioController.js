// src/controllers/usuarioController.js
import { UsuarioService } from '../services/usuarioService.js'; 

export const UsuarioController = {

    // --- REGISTRO ---
    register: async (req, res) => {
        const { correo, contraseña, nombre, apellido, direccion, celular, rol, foto_perfil } = req.body;

        try {
            const nuevoUsuario = await UsuarioService.registerUser(req.body); 
            return res.status(201).json({
                message: "Usuario registrado exitosamente.",
                usuario: nuevoUsuario
            }); 

        } catch (error) {
            console.error("Error en el controlador al registrar usuario:", error);
            
            let statusCode = 500;
            if (
                error.message.includes('inválido') ||
                error.message.includes('incompleto') ||
                error.message.includes('contraseña') ||
                error.message.includes('registrado')
            ) {
                statusCode = 400;
            }

            return res.status(statusCode).json({ message: error.message });
        }
    },

    // --- LOGIN ---
    login: async (req, res) => {
        const { correo, contraseña } = req.body;

        try {
            const { user, token } = await UsuarioService.loginUser(correo, contraseña);

            return res.status(200).json({
                message: "Inicio de sesión exitoso.",
                usuario: user,
                token,
            });

        } catch (error) {
            console.error("Error en el controlador al iniciar sesión:", error);
            let statusCode = 500;

            if (error.message.includes("no encontrado")) statusCode = 404;
            else if (error.message.includes("incorrecta") || error.message.includes("incompletas")) statusCode = 400;

            return res.status(statusCode).json({ message: error.message });
        }
    },

    // --- NUEVO: LOGOUT ---
    logout: async (req, res) => {
        try {
            // 🔹 Si más adelante implementas tokens JWT con listas negras,
            // aquí podrías invalidar el token recibido desde headers.
            return res.status(200).json({ message: "Sesión cerrada correctamente." });
        } catch (error) {
            console.error("Error en el controlador al cerrar sesión:", error);
            return res.status(500).json({ message: "Error al cerrar sesión." });
        }
    },
};
