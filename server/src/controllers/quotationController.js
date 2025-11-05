//quotationController.js
import * as QuotationService from '../services/quotationService.js';

// ==========================================================
// 1. CREATE
// ==========================================================

async function createQuotation(req, res) {
    //  ID del usuario viene de req.user.id proporcionado por el middleware
    const usuarioId = req.user.id; 

    try {
        const cotizacion = await QuotationService.generateQuotation(usuarioId);
        
        //  CAMBIO CLAVE: Emisión del evento Socket.IO
        // Usamos req.io, que fue inyectado en index.js
        req.io.emit('nueva_cotizacion', { 
            cotizacion,
            usuarioId: cotizacion.usuario_id // Opcional: para el filtrado en el frontend
        });
        console.log(`📡 Socket.IO: Evento 'nueva_cotizacion' emitido para el usuario ${usuarioId}`);
        // ---------------------------------------------
        
        res.status(201).json({ 
            message: "Cotización generada con éxito.", 
            cotizacion 
        });

    } catch (error) {
        console.error("Error en createQuotation:", error.message);
        
        if (error.message.includes("vacío") || error.message.includes("no válido")) {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno al procesar la cotización." });
    }
}

// ==========================================================
// 2. READ (Detalle por ID)
// ==========================================================

async function getQuotationDetails(req, res) {
    const { id } = req.params;
    // 💡 Aquí se debería añadir la verificación de propiedad si fuera necesario
    // Para simplificar, asumimos que el servicio de arriba maneja la autorización.
    
    try {
        const cotizacion = await QuotationService.getQuotationDetails(id);

        if (!cotizacion) {
            return res.status(404).json({ message: "Cotización no encontrada." });
        }

        res.status(200).json(cotizacion);
    } catch (error) {
        console.error("Error en getQuotationDetails:", error.message);
        res.status(500).json({ message: "Error al obtener la cotización." });
    }
}

// ==========================================================
// 2B. READ (Listar por Usuario o Admin) <----- ESTE ESE EL IMPORTANTE 
// ==========================================================

async function getQuotationsByUser(req, res) {
    const usuarioId = req.user.id;
    const rolUsuario = req.user.rol;
    
    try {
        // El Servicio decide si lista todas (admin) o solo las del usuario (user)
        const cotizaciones = await QuotationService.getQuotations(usuarioId, rolUsuario); 

        res.status(200).json(cotizaciones);
    } catch (error) {
        console.error("Error en getQuotationsByUser:", error.message);
        res.status(500).json({ message: "Error al listar las cotizaciones." });
    }
}

// ==========================================================
// 3. UPDATE (Actualizar Estado)
// ==========================================================

async function updateQuotationStatus(req, res) {
    const { id } = req.params;
    const { estado } = req.body; 
    // 💡 También deberías pasar req.user.rol aquí si solo el admin puede cambiar ciertos estados

    if (!estado) {
        return res.status(400).json({ message: "El campo 'estado' es requerido." });
    }

    try {
        const cotizacionActualizada = await QuotationService.updateQuotationStatus(id, estado);

        if (!cotizacionActualizada) {
            return res.status(404).json({ message: "Cotización no encontrada para actualizar." });
        }
        
        res.status(200).json({ 
            message: `Estado de cotización ${id} actualizado a ${estado}.`, 
            cotizacion: cotizacionActualizada 
        });
    } catch (error) {
        console.error("Error en updateQuotationStatus:", error.message);
        res.status(500).json({ message: "Error al actualizar el estado de la cotización." });
    }
}


// ==========================================================
// 4. DELETE (Eliminar/Cancelar)
// ==========================================================

async function deleteQuotation(req, res) {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const rolUsuario = req.user.rol;

    try {
        // El servicio maneja la lógica de rol
        await QuotationService.deleteOrCancelQuotation(id, usuarioId, rolUsuario);
        
        res.status(204).send(); 
    } catch (error) {
        console.error("Error en deleteQuotation:", error.message);
        
        // Manejo de errores de negocio y permisos
        if (error.message.includes("no encontrada")) {
             return res.status(404).json({ message: error.message });
        }
        if (error.message.includes("permiso") || error.message.includes("cancelar")) {
             return res.status(403).json({ message: error.message }); // 403 Prohibido
        }
        
        res.status(500).json({ message: "Error al eliminar la cotización." });
    }
}


export {
    createQuotation,
    getQuotationDetails,
    getQuotationsByUser,
    updateQuotationStatus,
    deleteQuotation
};