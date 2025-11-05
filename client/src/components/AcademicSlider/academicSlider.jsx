import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Award, Users, Pause, Play } from 'lucide-react';

const academicSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Bienvenidos a MimitosAcademy",
      subtitle: "Donde la excelencia académica cobra vida",
      description: "Descubre un mundo de oportunidades educativas con los mejores programas académicos y profesores calificados.",
      icon: GraduationCap,
      gradient: "from-blue-900 via-blue-800 to-indigo-900",
      image: "🎓",
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
      gradient: "from-indigo-900 via-indigo-800 to-blue-900",
      image: "📚",
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
      gradient: "from-blue-800 via-indigo-900 to-purple-900",
      image: "🏆",
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
      gradient: "from-indigo-900 via-blue-900 to-blue-800",
      image: "🤝",
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
    <div className="relative w-full h-[600px] overflow-hidden bg-slate-900">
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
            {/* Fondo con gradiente profesional */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
              {/* Patrón decorativo sutil */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-20 text-9xl">{slide.image}</div>
                <div className="absolute bottom-20 left-20 text-8xl">{slide.image}</div>
              </div>
              
              {/* Efectos de luz suaves */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido */}
            <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Texto */}
                <div className="text-white space-y-6">
                  {/* Icono */}
                  <div className="inline-flex p-3 bg-yellow-400/20 backdrop-blur-sm rounded-lg border border-yellow-400/30">
                    <Icon className="w-10 h-10 text-yellow-400" />
                  </div>

                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-blue-200 font-medium">
                      {slide.subtitle}
                    </p>
                  </div>

                  <p className="text-base text-white/80 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {slide.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="text-xl md:text-2xl font-bold text-yellow-400">{stat.value}</div>
                        <div className="text-xs text-white/70 font-medium mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Botón CTA simple */}
                  <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-lg transition-colors duration-200">
                    {slide.buttonText}
                  </button>
                </div>

                {/* Imagen/Ilustración grande */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative">
                    <div className="text-[280px] leading-none opacity-15">
                      {slide.image}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación simples */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicadores de puntos */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-200 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-yellow-400'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón play/pause */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
          aria-label={isAutoPlaying ? "Pausar" : "Reproducir"}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contador de slides simple */}
      <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-white text-sm font-medium z-20">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default academicSlider;