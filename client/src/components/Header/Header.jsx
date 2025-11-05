import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap, Users, BookOpen, Calendar, Award, Bell } from 'lucide-react';

// ===========================================
// 🔷 NAVEGACIÓN INSTITUCIONAL
// ===========================================
const SimpleNavigation = ({ isMobile, onLinkClick }) => {
  const baseClasses = isMobile ? "flex flex-col space-y-2" : "flex space-x-8";
  const linkClasses = isMobile
    ? "text-base text-slate-700 font-medium hover:text-blue-600 transition-colors duration-200 p-3 rounded-lg flex items-center gap-3 hover:bg-slate-50"
    : "text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-blue-600";

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
// 🎓 LOGO INSTITUCIONAL PREMIUM
// ===========================================
const SaekoLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Escudo base */}
    <path d="M32 8 L48 16 L48 32 C48 42 40 50 32 56 C24 50 16 42 16 32 L16 16 Z" 
          fill="url(#gradient)" stroke="#1E293B" strokeWidth="2"/>
    
    {/* Gradiente premium */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    
    {/* Birrete académico */}
    <path d="M22 26 L42 26 L32 16 Z" fill="#1E293B" opacity="0.9"/>
    <rect x="20" y="26" width="24" height="2" fill="#1E293B" opacity="0.9"/>
    
    {/* Número 2 estilizado */}
    <text x="32" y="44" textAnchor="middle" fontSize="16" fill="white" fontWeight="600" fontFamily="system-ui">2</text>
  </svg>
);

// ===========================================
// 🏛️ HEADER INSTITUCIONAL PREMIUM
// ===========================================
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm border-b border-slate-200'
      }`}>
        {/* Barra superior institucional */}
        <div className="bg-white">
          <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
            {/* Logo y nombre premium */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <SaekoLogo className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" />
                <div className="absolute -inset-1 bg-blue-600/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-none">
                  Saeko<span className="text-blue-600 font-bold ml-1">2</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium hidden md:block mt-0.5 tracking-wide">
                  EXCELENCIA ACADÉMICA
                </p>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <div className="hidden lg:block">
              <SimpleNavigation />
            </div>

            {/* Botones lado derecho */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2.5 rounded-lg hover:bg-slate-100 transition-all text-slate-600 relative group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                Portal Alumno
              </button>
            </div>

            {/* Móvil: menú + notificaciones */}
            <div className="flex items-center gap-2 lg:hidden">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-all text-slate-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-all text-slate-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Línea decorativa premium */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
      </header>

      {/* Menú móvil premium */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 bg-white w-80 max-w-[85vw] shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-white to-slate-50 p-5 border-b border-slate-200 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SaekoLogo className="w-11 h-11 drop-shadow-sm" />
                  <div>
                    <span className="text-slate-800 font-bold text-xl block">Saeko 2</span>
                    <span className="text-slate-500 text-xs tracking-wide">MENÚ PRINCIPAL</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all duration-200 active:scale-95"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <SimpleNavigation isMobile onLinkClick={() => setIsMenuOpen(false)} />
              <div className="mt-6 pt-6 border-t border-slate-200">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Portal Alumno
                </button>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 text-center">
                <p className="text-slate-600 text-sm font-semibold">Excelencia Académica</p>
                <p className="text-slate-400 text-xs mt-1 tracking-wide">Saeko 2 © {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;