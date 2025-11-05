import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap, Users, BookOpen, Calendar, Award, Bell } from 'lucide-react';

// ===========================================
// 🔷 NAVEGACIÓN INSTITUCIONAL
// ===========================================
const SimpleNavigation = ({ isMobile, onLinkClick }) => {
  const baseClasses = isMobile ? "flex flex-col space-y-3" : "flex space-x-6";
  const linkClasses = isMobile
    ? "text-lg text-white font-medium hover:text-[#FACC15] transition-colors duration-150 p-3 rounded-lg flex items-center gap-3 hover:bg-white/10"
    : "text-sm font-semibold text-white/90 hover:text-[#FACC15] transition-colors duration-150 py-2 border-b-2 border-transparent hover:border-[#FACC15]";

  const items = [
    { name: 'Estudiantes', path: '/estudiantes', icon: Users },
    { name: 'Carreras', path: '/carreras', icon: GraduationCap },
    { name: 'Materias', path: '/materias', icon: BookOpen },
    { name: 'Calendario', path: '/calendario', icon: Calendar },
    { name: 'Calificaciones', path: '/calificaciones', icon: Award },
  ];

  return (
    <nav className={baseClasses}>
      {items.map(item => (
        <Link
          key={item.name}
          to={item.path}
          className={linkClasses}
          onClick={onLinkClick}
        >
          {isMobile && <item.icon className="w-5 h-5" />}
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

// ===========================================
// 🎓 LOGO INSTITUCIONAL SIMPLIFICADO
// ===========================================
const CatLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="18" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
    <path d="M22 24 L42 24 L32 10 Z" fill="#1E3A8A" />
    <text x="32" y="40" textAnchor="middle" fontSize="14" fill="#0F172A" fontWeight="bold">IA</text>
  </svg>
);

// ===========================================
// 🏛️ HEADER INSTITUCIONAL
// ===========================================
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 shadow-lg z-50">
        {/* Barra superior institucional */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]">
          <div className="max-w-[1500px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
            {/* Logo y nombre */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <CatLogo className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute inset-0 rounded-full bg-[#FACC15]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none">
                  Institución<span className="text-[#FACC15]">Académica</span>
                </h1>
                <p className="text-xs text-blue-100 font-medium hidden md:block">
                  Formación con excelencia y valores
                </p>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <div className="hidden lg:block">
              <SimpleNavigation />
            </div>

            {/* Botones lado derecho */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-all text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FACC15] rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-[#FACC15] hover:bg-yellow-400 text-[#1E3A8A] font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
                Portal Alumno
              </button>
            </div>

            {/* Móvil: menú + notificaciones */}
            <div className="flex items-center gap-2 lg:hidden">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-all text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FACC15] rounded-full"></span>
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15]"></div>
      </header>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#1E3A8A] to-[#0F172A] w-80 max-w-[85vw] shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] p-5 border-b border-blue-300/10 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CatLogo className="w-10 h-10" />
                  <div>
                    <span className="text-white font-bold text-lg block">Institución</span>
                    <span className="text-blue-200 text-xs">Menú de Navegación</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <SimpleNavigation isMobile onLinkClick={() => setIsMenuOpen(false)} />
              <div className="mt-6 pt-6 border-t border-white/10">
                <button className="w-full px-4 py-3 bg-[#FACC15] hover:bg-yellow-400 text-[#1E3A8A] font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Portal Alumno
                </button>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <p className="text-white/70 text-sm">Excelencia Académica</p>
                <p className="text-blue-200 text-xs mt-1">Institución © {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
