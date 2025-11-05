// server.js (o app.js)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors"; // Manejo de errores async
// import path from "path"; // No necesario si no servimos frontend
// import { fileURLToPath } from "url"; // No necesario si no servimos frontend

// =======================================================
// 🚨 RUTAS AJUSTADAS
// =======================================================
// Importación por defecto (sin llaves) y usando la nomenclatura en minúsculas
import CarreraRoutes from "./routes/carreraRoutes.js";
import EstudianteRoutes from "./routes/estudianteRoutes.js";


// =======================================================
// 🔧 CONFIGURACIÓN INICIAL
// =======================================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// =======================================================
// 🌐 CORS CONFIG
// =======================================================
const allowedOrigins = [
    "http://localhost:5173", // desarrollo local
    // Agrega aquí otros orígenes de producción si es necesario
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

// =======================================================
// 🧩 MIDDLEWARES GLOBALES
// =======================================================
app.use(express.json()); // Necesario para parsear el cuerpo JSON en POST/PUT

// =======================================================
// 🚀 RUTA DE PRUEBA RAÍZ
// =======================================================
app.get("/", (req, res) => {
    res.send("🚀 Servidor de Gestión de Estudiantes corriendo correctamente.");
});

// =======================================================
// 📦 RUTAS DE LA API (Integrando Estudiantes y Carreras)
// =======================================================
app.use("/api/carreras", CarreraRoutes);
app.use("/api/estudiantes", EstudianteRoutes);


// =======================================================
// ⚠️ MANEJO CENTRALIZADO DE ERRORES
// =======================================================
app.use((err, req, res, next) => {
    console.error("❌ Error interno:", err.message);
    res.status(500).json({ error: "Error interno del servidor", details: err.message });
});

// =======================================================
// 🚀 LEVANTAR SERVIDOR
// =======================================================
app.listen(PORT, () => {
    console.log(`✅ Servidor Express corriendo en el puerto ${PORT}`);
    console.log("🌐 Orígenes CORS permitidos:", allowedOrigins);
});