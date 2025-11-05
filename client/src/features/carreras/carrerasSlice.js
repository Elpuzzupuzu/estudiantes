// client/src/features/carreras/carrerasSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // 🚨 Asegúrate de que la ruta sea correcta

const initialState = {
    carreras: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// =======================================================
// 📦 THUNKS ASÍNCRONOS
// =======================================================

/**
 * @description Obtiene todas las carreras del backend.
 */
export const fetchCarreras = createAsyncThunk(
    'carreras/fetchCarreras',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/carreras');
            // La respuesta de tu API es directamente la lista de carreras
            return response.data; 
        } catch (err) {
            // El backend devuelve el error en err.response.data
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

/**
 * @description Crea una nueva carrera.
 * @param {object} carreraData - { nombre_carrera: string }
 */
export const createCarrera = createAsyncThunk(
    'carreras/createCarrera',
    async (carreraData, { rejectWithValue }) => {
        try {
            const response = await api.post('/carreras', carreraData);
            // El backend devuelve el objeto de la nueva carrera creada
            return response.data; 
        } catch (err) {
            // Error 400 (ej. carrera ya existe o nombre inválido)
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

// =======================================================
// ✂️ SLICE
// =======================================================

const carrerasSlice = createSlice({
    name: 'carreras',
    initialState,
    reducers: {
        // Reducers síncronos si fueran necesarios (ej. resetState)
    },
    extraReducers(builder) {
        builder
            // --- FETCH CARRERAS ---
            .addCase(fetchCarreras.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCarreras.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Reemplaza la lista con los datos obtenidos
                state.carreras = action.payload;
                state.error = null;
            })
            .addCase(fetchCarreras.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // El payload es el mensaje de error de rejectWithValue
                state.carreras = []; // Vacía la lista si falla
            })
            
            // --- CREATE CARRERA ---
            .addCase(createCarrera.pending, (state) => {
                // Podrías usar otro estado para la creación si es necesario, pero mantenemos 'idle' para la lista principal.
                // state.isCreating = true;
            })
            .addCase(createCarrera.fulfilled, (state, action) => {
                // Añade la nueva carrera al final de la lista.
                state.carreras.push(action.payload);
                // state.isCreating = false;
            })
            .addCase(createCarrera.rejected, (state, action) => {
                // Manejo del error de creación (puedes mostrarlo en un toast o UI)
                console.error("Error al crear carrera:", action.payload);
                // state.isCreating = false;
                // Puedes almacenar el error de creación en otro campo si quieres.
            });
    }
});

export const { /* exporta reducers síncronos aquí */ } = carrerasSlice.actions;

export default carrerasSlice.reducer;

// Selectores
export const selectAllCarreras = (state) => state.carreras.carreras;
export const selectCarrerasStatus = (state) => state.carreras.status;
export const selectCarrerasError = (state) => state.carreras.error;