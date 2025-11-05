import axios from "axios";

// 🚨 Ya no necesitamos importar slices de Redux o el store,
//    porque la autenticación y el manejo de tokens han sido eliminados.
// import { store } from "../app/store";
// import { logoutUser, setNotificationMessage, setAccessToken } from "../features/user/usersSlice";

// Define la URL base de tu servidor Express
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    // Mantenemos withCredentials por si el servidor usa cookies para alguna otra cosa,
    // aunque la lógica de interceptores de token se elimina.
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===============================
// INTERCEPTOR DE SOLICITUDES (Simplificado)
// ===============================
// 🚨 Eliminamos la inyección del Authorization: Bearer Token.
api.interceptors.request.use(
    (config) => {
        // En un contexto sin tokens de acceso, simplemente devolvemos la configuración.
        // Si usas tokens basados en cookies HTTPOnly, el navegador los manejará automáticamente.
        return config;
    },
    (error) => Promise.reject(error)
);

// ===============================
// INTERCEPTOR DE RESPUESTAS (Eliminado el manejo de Refresh Token)
// ===============================
// 🚨 Eliminamos toda la lógica de refresh token (isRefreshing, failedQueue, processQueue).
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Solo para debug: si recibimos un error, lo registramos.
        // if (error.response?.status) {
        //     console.error("Error de API:", error.response.status, error.response.data);
        // }
        
        // Devolvemos el error para que el createAsyncThunk lo capture
        return Promise.reject(error);
    }
);

export default api;