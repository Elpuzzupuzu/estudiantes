// client/src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import carrerasReducer from "../features/carreras/carrerasSlice.js";
// ✅ Importar el slice de Estudiantes que ya existía
import estudiantesReducer from "../features/estudiantes/estudiantesSlice.js"; 
// 🆕 Importar el nuevo reducer de Usuarios
import usuariosReducer from "../features/usuarios/usuariosSlice.js"; 


export const store = configureStore({
    reducer: {
        carreras: carrerasReducer,
        // ✅ Integrando el slice de Estudiantes
        estudiantes: estudiantesReducer,
        // 🆕 Integrando el slice de Usuarios
        usuarios: usuariosReducer, 
    },
});