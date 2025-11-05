import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/usuarioRepository.js';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET || 'clave-super-secreta';

export const UsuarioService = {

    // --- REGISTRO (ya existente) ---
    registerUser: async (userData) => {
        const { correo, contraseña, nombre, apellido, rol } = userData;
        if (!correo || !contraseña || !nombre || !apellido) {
            throw new Error("Datos de usuario incompletos.");
        }

        const existingUser = await UsuarioRepository.findByEmail(correo);
        if (existingUser) throw new Error("El correo electrónico ya está registrado.");

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const newUserProfile = {
            correo: correo.trim(),
            contraseña: hashedPassword,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            rol: rol || 'user',
        };

        const createdUser = await UsuarioRepository.create(newUserProfile);
        delete createdUser.contraseña;
        return createdUser;
    },

    // --- NUEVO: LOGIN ---
    loginUser: async (correo, contraseña) => {
        if (!correo || !contraseña) throw new Error("Credenciales incompletas.");

        const user = await UsuarioRepository.findByEmail(correo);
        if (!user) throw new Error("Usuario no encontrado.");

        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) throw new Error("Contraseña incorrecta.");

        // Crear token JWT (opcional, pero recomendable)
        const token = jwt.sign(
            { id: user.id, correo: user.correo, rol: user.rol },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        delete user.contraseña;

        return { user, token };
    },
};
