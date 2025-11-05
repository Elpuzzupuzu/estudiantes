import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Componentes base (Se mantienen)
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import AcademicSlider from './components/AcademicSlider/academicSlider';

import ScrollToTop from './hooks/Scrolltop';

// 🚩 Notificación (Se mantienen)
import ToastNotification from './components/ToastComponent/ToastNotification';
import ReduxToast from './components/ReduxToast/ReduxToast';
// import useNotification from './hooks/Notify/useNotification'; // Se elimina si no se usa

// 🚨 Páginas del nuevo contexto (Asumimos que existen estas páginas ahora)
import CarrerasPage from './pages/Carreras/carreraPage'; 
import EstudiantesPage from './pages/Estudiantes/estudiantePage';
import CalendarioPage from './pages/CalendarioPage/calendarioPage'


// 🚨 Se eliminan las importaciones de slices y lógica de Redux ajenas a este contexto.
// 🚨 Se eliminan todas las importaciones de componentes de E-commerce, Auth y Admin antiguos.

function App() {
    // Se mantiene useDispatch y useSelector aunque no se usen en el nivel superior,
    // ya que los componentes internos (Toast, Páginas) sí los usan.
    const dispatch = useDispatch();

    // 🚨 Se eliminan todos los estados y hooks relacionados con carrito, usuario y autenticación.
    const isReady = true; // Simula que el sistema está listo (no hay chequeo de auth)


    if (!isReady) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
                <p className="text-xl text-indigo-500">Iniciando sistema de gestión...</p>
            </div>
        );
    }

    // 🚨 Se eliminan las funciones addToCart, updateCartQuantity, removeFromCart, etc.

    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
                <TopBar />
                {/* 🚨 Header ajustado: Ya no recibe props de carrito */}
                <Header /> 

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Routes>
                        {/* ========================================================== */}
                        {/*  RUTAS DE GESTIÓN ACADÉMICA */}
                        {/* ========================================================== */}
                        
                        {/* HOME (Página por defecto) */}
                        <Route path="/" element={<EstudiantesPage />} /> 

                        {/* RUTA DE GESTIÓN DE ESTUDIANTES (Ruta explícita) */}
                        <Route path="/estudiantes" element={<EstudiantesPage />} /> 

                        {/* RUTA DE GESTIÓN DE CARRERAS */}
                        <Route path="/carreras" element={<CarrerasPage />} /> 

                        {/* RUTA DE GESTIÓN DE CARRERAS */}
                        <Route path="/calendario" element={<CalendarioPage />} /> 
                        
                        {/* 🚨 Se eliminan todas las rutas de Auth, Admin, Products, Services, Contact, Quotations, etc. */}
                        
                        {/* Fallback 404 */}
                        <Route path="*" element={<h1 className="text-3xl text-red-600 p-8 text-center">404 - Recurso de Gestión No Encontrado</h1>} />
                        
                    </Routes>
                </main>

                {/* 🚨 Se elimina el componente ShoppingCart y lógica de carrito */}

                {/* 🚩 COMPONENTE DE NOTIFICACIÓN GLOBAL */}
                <ToastNotification />
                <ReduxToast /> 
                
                <AcademicSlider/>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;