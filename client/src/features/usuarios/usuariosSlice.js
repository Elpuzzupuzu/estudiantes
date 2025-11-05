import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // Cliente Axios configurado

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null, // Inicializar desde localStorage para persistencia básica
    registrationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loginStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// =======================================================
// 📦 THUNKS ASÍNCRONOS
// =======================================================

/**
 * @description Registra un nuevo usuario en el backend. (Mantenido)
 * @param {object} userData - { correo, contraseña, nombre, apellido, ... }
 */
export const registerUser = createAsyncThunk(
    'usuarios/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/usuarios/register', userData);
            return response.data.usuario; 
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

/**
 * @description Inicia sesión de un usuario existente.
 * @param {object} credentials - { correo: string, contraseña: string }
 */
export const loginUser = createAsyncThunk(
    'usuarios/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            // Asumimos un endpoint POST /usuarios/login para la autenticación
            const response = await api.post('/usuarios/login', credentials);
            
            // Suponemos que la respuesta exitosa devuelve el objeto del usuario (sin contraseña)
            const user = response.data.usuario;
            
            // Persistencia básica del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(user));
            
            return user; 
        } catch (err) {
            // Manejar errores de credenciales inválidas (400/401)
            const errorMessage = err.response?.data?.message || "Credenciales inválidas o error de conexión.";
            return rejectWithValue(errorMessage);
        }
    }
);

/**
 * @description Cierra la sesión del usuario.
 */
export const logoutUser = createAsyncThunk(
    'usuarios/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            // Opcional: Llamar a un endpoint de logout si es necesario (ej. para invalidar tokens en el server)
            // await api.post('/usuarios/logout'); 
            
            localStorage.removeItem('user');
            return null;
        } catch (err) {
            // Si el servidor falla al hacer logout, forzamos el logout local.
            localStorage.removeItem('user');
            return rejectWithValue("Error al cerrar sesión en el servidor.");
        }
    }
);


// =======================================================
// ✂️ SLICE
// =======================================================

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            // --- REGISTER USER --- (Mantenido)
            .addCase(registerUser.pending, (state) => {
                state.registrationStatus = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registrationStatus = 'succeeded';
                state.user = action.payload; 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registrationStatus = 'failed';
                state.error = action.payload; 
                state.user = null;
            })
            
            // --- LOGIN USER --- (NUEVO)
            .addCase(loginUser.pending, (state) => {
                state.loginStatus = 'loading';
                state.error = null; 
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.user = action.payload; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.error = action.payload; // Mensaje de error de credenciales
                state.user = null;
            })
            
            // --- LOGOUT USER --- (NUEVO)
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loginStatus = 'idle';
                state.registrationStatus = 'idle';
                state.error = null;
            })
            // El caso rejected para logout puede ser el mismo que fulfilled (forzar el estado local)
            .addCase(logoutUser.rejected, (state) => {
                 state.user = null;
                 state.loginStatus = 'idle';
                 state.registrationStatus = 'idle';
                 state.error = "Sesión cerrada localmente, pero el servidor reportó un problema.";
            });
    }
});

// Exporta el action creator para el reducer síncrono
export const { clearError } = usuariosSlice.actions;

// Exporta el reducer por defecto para el store
export default usuariosSlice.reducer;

// Selectores
export const selectUser = (state) => state.usuarios.user;
export const selectRegistrationStatus = (state) => state.usuarios.registrationStatus;
export const selectLoginStatus = (state) => state.usuarios.loginStatus; // Nuevo Selector
export const selectUserError = (state) => state.usuarios.error;