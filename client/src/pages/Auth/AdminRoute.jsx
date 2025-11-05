import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }) => {
  // 🚨 AÑADIMOS authChecked
  const { user, loading, authChecked } = useSelector((state) => state.user);
  const isLoggedIn = !!user;

  // console.log("🧩 AdminRoute state:", { user, loading, authChecked, isLoggedIn });

  // --- 1️⃣ CORREGIDO: Usamos `!authChecked` para esperar a que la verificación inicial termine. ---
  // Si la verificación inicial (`checkAuthStatus` en App.jsx) aún no ha finalizado, 
  // mostramos el loader. (Este era el origen del problema).
  if (!authChecked) { 
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p>Verificando rol de usuario...</p>
      </div>
    );
  }

  // Ahora que `authChecked` es TRUE, la sesión está completamente verificada (iniciada o no).

  // 2️⃣ Si no hay sesión iniciada después de la verificación
  if (!isLoggedIn) {
    console.warn("⚠️ Usuario no logueado. Redirigiendo a login.");
    // NOTA: Usas "/login" aquí. En el ProtectedRoute anterior sugerimos "/", 
    // pero mantendré tu lógica de AdminRoute de ir a login.
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // 3️⃣ Normalizar y verificar el rol
  const userRole = String(user.rol).toLowerCase().trim();

  // 4️⃣ Verificar si el usuario es admin
  if (userRole !== 'admin') {
    console.error(`🚫 Acceso denegado: El usuario ${user.correo} tiene rol '${userRole}'`);
    // Redirigir al home si no es admin
    return <Navigate to="/" replace />;
  }

  // 5️⃣ Acceso permitido
  // console.log("✅ Acceso permitido al panel admin");
  return children;
};

export default AdminRoute;
// 🚨 Nota: Eliminé la llave '}' extra que estaba al final del componente original.