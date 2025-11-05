// src/components/QuotationManager.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    fetchQuotations, 
    createQuotation, 
    deleteQuotation,
    // 🚨 startRealtimeSubscription HA SIDO ELIMINADO
} from '../../features/quotations/quotationSlice'; 
import QuotationsListPage from './QuotationsListPage'; 

import useNotification from '../../hooks/Notify/useNotification'; 

const QuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { 
        list: quotations, 
        loading, 
        error 
    } = useSelector(state => state.quotation); 

    const { notify } = useNotification(); 
    
    // 1. Cargar datos iniciales (La suscripción Socket.IO se gestiona en un nivel superior)
    useEffect(() => {
        
        // 🚨 LOG DE MONTAJE
        console.log("🔄 [Manager] Montando componente y cargando datos iniciales.");
        
        dispatch(fetchQuotations());

        // 🚨 Eliminada toda la lógica de startRealtimeSubscription y limpieza (cleanupFunction).
        // 🚨 Ahora, el Custom Hook (useSocketIO) maneja el Realtime en App.jsx.

    }, [dispatch]); 

    // 2. Handler para generar nueva cotización
    const handleCreate = () => {
        dispatch(createQuotation())
            .unwrap()
            .then((newQuotation) => {
                // NOTA: El nuevo dato se añadirá al estado por dos vías:
                // 1. Este .then (actualización instantánea)
                // 2. El evento Socket.IO (confirmación en tiempo real)
                notify(`Cotización #${newQuotation.id.substring(0, 8)} generada con éxito!`, 'success');
                navigate(`/cotizaciones/${newQuotation.id}`);
            })
            .catch((err) => {
                const errorMessage = err.message || err.error || 'Verifica tu carrito';
                notify(`Fallo al generar cotización: ${errorMessage}`, 'error');
            });
    };

    // 3. Handler para eliminar/cancelar 
    const handleDelete = (id) => {
        if (window.confirm("¿Confirmas la cancelación de esta cotización? Esta acción no se puede revertir fácilmente.")) {
            dispatch(deleteQuotation(id))
                .unwrap()
                .then(() => {
                    notify(`Cotización ${id.substring(0, 8)} cancelada.`, 'warning');
                })
                .catch((err) => {
                    const errorMessage = err.message || err.error || 'No se pudo cancelar la cotización';
                    notify(`Error de permiso: ${errorMessage}`, 'error');
                });
        }
    };

    // 4. Handler para ver detalle (usa react-router-dom)
    const handleViewDetails = (id) => {
        navigate(`/cotizaciones/${id}`); 
    };

    // 5. Notificación de error
    useEffect(() => {
        if (error) {
            notify(`Error de carga: ${error.message || error}`, 'error');
        }
    }, [error, notify]);


    return (
        <QuotationsListPage
            quotations={quotations}
            isLoading={loading}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
        />
    );
};

export default QuotationManager;