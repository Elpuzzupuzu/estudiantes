// client/src/features/estudiantes/estudiantesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; 
// Importamos el api de axios que tiene la baseURL: 'http://localhost:4000/api'

const initialState = {
    estudiantes: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// =======================================================
// 📦 THUNKS ASÍNCRONOS
// =======================================================

/**
 * @description Obtiene y filtra estudiantes.
 * @param {object} filtros - { id_carrera?: string, semestre?: number }
 */
export const fetchEstudiantes = createAsyncThunk(
  'estudiantes/fetchEstudiantes',
  async (filtros = {}) => {
    // 🧹 Limpiar los filtros vacíos o undefined
    const params = new URLSearchParams();
    
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    const url = queryString
      ? `http://localhost:4000/api/estudiantes?${queryString}`
      : `http://localhost:4000/api/estudiantes`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener estudiantes');
    const data = await response.json();
    return data;
  }
);


/**
 * @description Crea un nuevo estudiante.
 * @param {object} estudianteData - { nombre, carrera, semestre, promedio }
 */
export const createEstudiante = createAsyncThunk(
    'estudiantes/createEstudiante',
    async (estudianteData, { rejectWithValue }) => {
        try {
            const response = await api.post('/estudiantes', estudianteData);
            return response.data; 
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

/**
 * @description Actualiza un estudiante existente.
 * @param {object} payload - { id_estudiante: string, updateData: object }
 */
export const updateEstudiante = createAsyncThunk(
    'estudiantes/updateEstudiante',
    async ({ id_estudiante, updateData }, { rejectWithValue }) => {
        try {
            // PUT /api/estudiantes/:id
            const response = await api.put(`/estudiantes/${id_estudiante}`, updateData);
            return response.data; 
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

/**
 * @description Elimina un estudiante por ID.
 * @param {string} id_estudiante
 */
export const deleteEstudiante = createAsyncThunk(
    'estudiantes/deleteEstudiante',
    async (id_estudiante, { rejectWithValue }) => {
        try {
            // DELETE /api/estudiantes/:id (esperamos 204 No Content)
            await api.delete(`/estudiantes/${id_estudiante}`);
            // Devolvemos el ID para saber qué eliminar del estado local
            return id_estudiante; 
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

// =======================================================
// ✂️ SLICE
// =======================================================

const estudiantesSlice = createSlice({
    name: 'estudiantes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // --- FETCH / FILTRAR ESTUDIANTES ---
            .addCase(fetchEstudiantes.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEstudiantes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.estudiantes = action.payload; // Sobrescribe con los resultados del fetch/filtro
            })
            .addCase(fetchEstudiantes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.estudiantes = [];
            })
            
            // --- CREATE ESTUDIANTE ---
            .addCase(createEstudiante.fulfilled, (state, action) => {
                // Añade el nuevo estudiante al estado
                state.estudiantes.push(action.payload);
            })

            // --- UPDATE ESTUDIANTE ---
            .addCase(updateEstudiante.fulfilled, (state, action) => {
                const updatedEstudiante = action.payload;
                // Busca el índice del estudiante a actualizar
                const index = state.estudiantes.findIndex(e => e.id_estudiante === updatedEstudiante.id_estudiante);
                if (index !== -1) {
                    // Reemplaza el objeto antiguo con el actualizado
                    state.estudiantes[index] = updatedEstudiante;
                }
            })
            
            // --- DELETE ESTUDIANTE ---
            .addCase(deleteEstudiante.fulfilled, (state, action) => {
                const idToDelete = action.payload;
                // Filtra la lista para remover el estudiante eliminado
                state.estudiantes = state.estudiantes.filter(e => e.id_estudiante !== idToDelete);
            });
    }
});

export default estudiantesSlice.reducer;

// Selectores
export const selectAllEstudiantes = (state) => state.estudiantes.estudiantes;
export const selectEstudiantesStatus = (state) => state.estudiantes.status;
export const selectEstudiantesError = (state) => state.estudiantes.error;