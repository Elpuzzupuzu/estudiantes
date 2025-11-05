// client/src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import carrerasReducer from "../features/carreras/carrerasSlice.js";
// ✅ Importar el nuevo reducer
import estudiantesReducer from "../features/estudiantes/estudiantesSlice.js"; 


export const store = configureStore({
    reducer: {
        carreras: carrerasReducer,
        // ✅ Integrando el slice de Estudiantes
        estudiantes: estudiantesReducer,
    },
});