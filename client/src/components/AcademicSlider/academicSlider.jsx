import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Award, Users, Pause, Play } from 'lucide-react';

const AcademicSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Bienvenidos a la Institución",
      subtitle: "Donde la excelencia académica cobra vida",
      description: "Descubre un mundo de oportunidades educativas con los mejores programas académicos y profesores calificados.",
      icon: GraduationCap,
      gradient: "from-slate-50 via-blue-50 to-slate-100",
      accent: "blue-600",
      buttonText: "Conoce Más",
      stats: [
        { label: "Estudiantes", value: "2,500+" },
        { label: "Programas", value: "15+" },
        { label: "Años", value: "20+" }
      ]
    },
    {
      id: 2,
      title: "Carreras Innovadoras",
      subtitle: "Tu futuro profesional comienza aquí",
      description: "Ofrecemos programas académicos actualizados y alineados con las demandas del mercado laboral del siglo XXI.",
      icon: BookOpen,
      gradient: "from-blue-50 via-slate-50 to-indigo-50",
      accent: "indigo-600",
      buttonText: "Ver Carreras",
      stats: [
        { label: "Carreras", value: "15" },
        { label: "Especialidades", value: "30+" },
        { label: "Certificaciones", value: "25+" }
      ]
    },
    {
      id: 3,
      title: "Excelencia Reconocida",
      subtitle: "Premios y acreditaciones internacionales",
      description: "Somos una institución reconocida por nuestra calidad educativa y compromiso con el desarrollo integral de nuestros estudiantes.",
      icon: Award,
      gradient: "from-indigo-50 via-blue-50 to-slate-50",
      accent: "violet-600",
      buttonText: "Nuestros Logros",
      stats: [
        { label: "Premios", value: "15+" },
        { label: "Acreditaciones", value: "8" },
        { label: "Rankings Top", value: "#3" }
      ]
    },
    {
      id: 4,
      title: "Comunidad Estudiantil",
      subtitle: "Más que una institución, una familia",
      description: "Únete a una comunidad vibrante de estudiantes, profesores y alumni comprometidos con la excelencia.",
      icon: Users,
      gradient: "from-slate-50 via-indigo-50 to-blue-50",
      accent: "blue-600",
      buttonText: "Únete a Nosotros",
      stats: [
        { label: "Alumni", value: "10,000+" },
        { label: "Clubes", value: "25+" },
        { label: "Eventos", value: "100+/año" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-white border-b border-slate-200">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Fondo con gradiente sutil */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
              {/* Patrón decorativo minimalista */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-20 right-20 w-64 h-64 bg-slate-800 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-800 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Contenido */}
            <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Texto */}
                <div className="space-y-6">
                  {/* Icono */}
                  <div className={`inline-flex p-3 bg-${slide.accent}/5 rounded-lg border border-${slide.accent}/10`}>
                    <Icon className={`w-8 h-8 text-${slide.accent}`} />
                  </div>

                  <div>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-2 leading-tight text-slate-800">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 font-normal">
                      {slide.subtitle}
                    </p>
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {slide.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <div className={`text-2xl md:text-3xl font-semibold text-${slide.accent}`}>{stat.value}</div>
                        <div className="text-xs text-slate-500 font-medium mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Botón CTA */}
                  <button className={`px-6 py-3 bg-${slide.accent} hover:bg-${slide.accent} text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow`}>
                    {slide.buttonText}
                  </button>
                </div>

                {/* Ilustración minimalista */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className={`w-80 h-80 rounded-full bg-${slide.accent}/5 border border-${slide.accent}/10 flex items-center justify-center`}>
                    <Icon className={`w-40 h-40 text-${slide.accent}/20`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación minimalistas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm border border-slate-200"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicadores de puntos */}
        <div className="flex gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-200 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-blue-600'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón play/pause */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm border border-slate-200"
          aria-label={isAutoPlaying ? "Pausar" : "Reproducir"}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm border border-slate-200"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contador de slides minimalista */}
      <div className="absolute top-8 right-8 px-3 py-2 bg-white rounded-lg shadow-sm text-slate-600 text-sm font-medium z-20 border border-slate-200">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default AcademicSlider;