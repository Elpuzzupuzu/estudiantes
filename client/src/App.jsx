import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectLoginStatus,
  logoutUser,
} from "./features/usuarios/usuariosSlice";

import Header from "./components/Header/Header";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import AcademicSlider from "./components/AcademicSlider/academicSlider";
import ScrollToTop from "./hooks/Scrolltop";

import CarrerasPage from "./pages/Carreras/carreraPage";
import EstudiantesPage from "./pages/Estudiantes/estudiantePage";
import CalendarioPage from "./pages/CalendarioPage/calendarioPage";
import LoginPage from "./pages/Login/loginPage";
import RegisterPage from "./pages/Registro/registerPage";
import MateriasPage from "./pages/Materias/materiasPage";
import CalificacionPage from "./pages/Calificaciones/CalificacionPage"
import LoadingSpinner from "./components/LoginSpinner/loginSpinner"

import ToastNotification from "./components/ToastComponent/ToastNotification";
import ReduxToast from "./components/ReduxToast/ReduxToast";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loginStatus = useSelector(selectLoginStatus);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // 🌀 Mostrar pantalla de carga si el login está procesándose
  if (loginStatus === "loading" && !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <LoadingSpinner />
        <p className="text-xl text-indigo-500 mt-4">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        {user ? (
          // ✅ Usuario autenticado → rutas privadas
          <>
            <TopBar />
            <Header onLogout={handleLogout} user={user} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<EstudiantesPage />} />
                <Route path="/estudiantes" element={<EstudiantesPage />} />
                <Route path="/carreras" element={<CarrerasPage />} />
                <Route path="/calendario" element={<CalendarioPage />} />
                <Route path="/materias" element={<MateriasPage />} />
                <Route path="/calificaciones" element={<CalificacionPage />} />

                {/* Si intenta entrar a /login o /register estando logueado → redirige */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                <Route
                  path="*"
                  element={
                    <h1 className="text-3xl text-red-600 p-8 text-center">
                      404 - Recurso de Gestión No Encontrado
                    </h1>
                  }
                />
              </Routes>
            </main>

            <AcademicSlider />
            <Footer />
          </>
        ) : (
          // 🚪 Usuario NO autenticado → rutas públicas
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Si intenta acceder a cualquier ruta privada sin login → redirige */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}

        <ToastNotification />
        <ReduxToast />
      </div>
    </BrowserRouter>
  );
}

export default App;
