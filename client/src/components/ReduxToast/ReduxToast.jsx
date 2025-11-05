// client/src/components/ReduxToast/ReduxToast.jsx

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// 🚨 Se elimina la importación de cualquier acción de usersSlice.
// import { clearSuccessMessage } from "../../features/user/usersSlice"; 

const ReduxToast = () => {
  // 🚨 Eliminamos el uso de useDispatch y cualquier lógica de clearing
  //    hasta que implementemos un slice de UI dedicado para notificaciones.
  // const dispatch = useDispatch();

  // 🚨 Reemplazamos el selector de `state.user` por un selector placeholder
  //    o simplemente lo eliminamos, ya que no hay un campo definido para escuchar.
  
  // Opción simple: No hace nada, pero cumple con la importación en App.jsx
  // Si deseas agregar notificaciones a través de Redux en el futuro:
  /*
  const globalNotification = useSelector((state) => state.ui?.notification); 

  useEffect(() => {
    if (globalNotification) {
      // Asume que la notificación es un objeto { message: string, type: 'success' | 'error' }
      if (globalNotification.type === 'error') {
        toast.error(globalNotification.message);
      } else {
        toast.success(globalNotification.message);
      }
      // Aquí se necesitaría una acción global para limpiar el mensaje
      // dispatch(clearGlobalNotification());
    }
  }, [globalNotification]); 
  */

  // Por ahora, solo devolvemos null para que no cause errores.
  return null;
};

export default ReduxToast;