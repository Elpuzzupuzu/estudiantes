// client/src/hooks/useSocketIO.js

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

// 🚨 Asegúrate de que esta URL coincida con la URL de tu backend
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'; 

/**
 * Hook personalizado para manejar la conexión y los eventos de Socket.IO.
 * @param {string} eventName - El nombre del evento de Socket.IO a escuchar (ej: 'nueva_cotizacion').
 * @param {function} handler - La función que se ejecuta cuando se recibe el evento.
 * @param {boolean} shouldConnect - Controla si la conexión debe estar activa.
 */
export const useSocketIO = (eventName, handler, shouldConnect = true) => {
    // Usamos useRef para mantener la instancia del socket a través de renders
    const socketRef = useRef(null);

    useEffect(() => {
        if (!shouldConnect) {
            // Si shouldConnect es falso, nos aseguramos de desconectar si ya lo está
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        // 1. Conectar solo si no hay una instancia activa
        if (!socketRef.current) {
            socketRef.current = io(SOCKET_SERVER_URL, {
                // Si usas cookies o JWT para autenticar el socket, se añadiría aquí
                withCredentials: true,
            });

            socketRef.current.on('connect', () => {
                console.log(`📡 Cliente Socket.IO conectado con ID: ${socketRef.current.id}`);
            });
            
            socketRef.current.on('disconnect', () => {
                console.log('❌ Cliente Socket.IO desconectado.');
            });
        }

        // 2. Suscribirse al evento específico
        if (eventName && handler) {
            socketRef.current.on(eventName, handler);
        }

        // 3. Función de limpieza (Cleanup)
        return () => {
            if (socketRef.current) {
                // Limpiar el manejador de eventos para evitar duplicados
                if (eventName && handler) {
                    socketRef.current.off(eventName, handler);
                }
                
                // Opcional: Desconectar el socket si quieres que la conexión se cierre completamente
                // socketRef.current.disconnect(); 
                // socketRef.current = null;
            }
        };
    // El efecto se ejecuta cuando cambia el evento, el manejador o el estado de conexión
    }, [eventName, handler, shouldConnect]); 
    
    // Retornar la instancia del socket si necesitas emitir eventos desde el frontend
    return socketRef.current;
};