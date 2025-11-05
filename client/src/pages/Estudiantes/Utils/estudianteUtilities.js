// Lógica pura de presentación (no requiere hooks de React)

/**
 * Determina las clases CSS de color para el badge de promedio.
 * @param {number} promedio - El promedio del estudiante.
 * @returns {string} Clases CSS de Tailwind para el badge.
 */
export const getPromedioColor = (promedio) => {
    if (promedio >= 9.0) return 'bg-green-100 text-green-800 border-green-200';
    if (promedio >= 8.0) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (promedio >= 7.0) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
};