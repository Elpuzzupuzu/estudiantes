import React, { useState } from 'react';
import { FaChartBar, FaSearch, FaDownload, FaPrint, FaFilter, FaTrophy, FaExclamationTriangle, FaCheckCircle, FaUser, FaBook, FaCalendarAlt, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mock de datos de estudiantes y calificaciones
const estudiantesData = [
  {
    id: 1,
    matricula: '2021001',
    nombre: 'Ana García Martínez',
    carrera: 'Ingeniería de Software',
    semestre: 5,
    foto: null,
    calificaciones: [
      { materia: 'Ingeniería de Software', codigo: 'SW-301', parcial1: 85, parcial2: 90, parcial3: 88, final: 87, promedio: 87.5, creditos: 8, estado: 'aprobado' },
      { materia: 'Base de Datos Avanzada', codigo: 'BD-301', parcial1: 92, parcial2: 88, parcial3: 90, final: 90, promedio: 90, creditos: 8, estado: 'aprobado' },
      { materia: 'Arquitectura de Software', codigo: 'SW-302', parcial1: 78, parcial2: 82, parcial3: 85, final: 81, promedio: 81.5, creditos: 6, estado: 'aprobado' },
      { materia: 'Redes de Computadoras', codigo: 'RED-301', parcial1: 88, parcial2: 85, parcial3: 87, final: 86, promedio: 86.5, creditos: 6, estado: 'aprobado' },
      { materia: 'Desarrollo Móvil', codigo: 'SW-303', parcial1: 95, parcial2: 92, parcial3: 94, final: 93, promedio: 93.5, creditos: 8, estado: 'aprobado' }
    ]
  },
  {
    id: 2,
    matricula: '2021002',
    nombre: 'Carlos Rodríguez López',
    carrera: 'Ciencia de Datos',
    semestre: 6,
    foto: null,
    calificaciones: [
      { materia: 'Machine Learning', codigo: 'CD-302', parcial1: 75, parcial2: 78, parcial3: 80, final: 77, promedio: 77.5, creditos: 8, estado: 'aprobado' },
      { materia: 'Minería de Datos', codigo: 'CD-301', parcial1: 82, parcial2: 85, parcial3: 88, final: 85, promedio: 85, creditos: 8, estado: 'aprobado' },
      { materia: 'Visualización de Datos', codigo: 'CD-304', parcial1: 90, parcial2: 88, parcial3: 92, final: 90, promedio: 90, creditos: 6, estado: 'aprobado' },
      { materia: 'Estadística Avanzada', codigo: 'EST-301', parcial1: 68, parcial2: 72, parcial3: 75, final: 71, promedio: 71.5, creditos: 6, estado: 'aprobado' },
      { materia: 'Python para Data Science', codigo: 'CD-305', parcial1: 85, parcial2: 87, parcial3: 89, final: 87, promedio: 87, creditos: 8, estado: 'aprobado' }
    ]
  },
  {
    id: 3,
    matricula: '2021003',
    nombre: 'María Fernández Sánchez',
    carrera: 'Ciberseguridad',
    semestre: 5,
    foto: null,
    calificaciones: [
      { materia: 'Seguridad Informática', codigo: 'CS-301', parcial1: 92, parcial2: 95, parcial3: 93, final: 93, promedio: 93.25, creditos: 8, estado: 'aprobado' },
      { materia: 'Hacking Ético', codigo: 'CS-302', parcial1: 88, parcial2: 90, parcial3: 91, final: 89, promedio: 89.5, creditos: 8, estado: 'aprobado' },
      { materia: 'Criptografía', codigo: 'CS-303', parcial1: 85, parcial2: 87, parcial3: 90, final: 87, promedio: 87.25, creditos: 6, estado: 'aprobado' },
      { materia: 'Forense Digital', codigo: 'CS-304', parcial1: 90, parcial2: 88, parcial3: 92, final: 90, promedio: 90, creditos: 6, estado: 'aprobado' },
      { materia: 'Seguridad en Redes', codigo: 'CS-305', parcial1: 94, parcial2: 92, parcial3: 95, final: 93, promedio: 93.5, creditos: 8, estado: 'aprobado' }
    ]
  },
  {
    id: 4,
    matricula: '2021004',
    nombre: 'Juan Pérez Hernández',
    carrera: 'Ingeniería de Software',
    semestre: 4,
    foto: null,
    calificaciones: [
      { materia: 'Programación Orientada a Objetos', codigo: 'PRG-301', parcial1: 65, parcial2: 68, parcial3: 70, final: 67, promedio: 67.5, creditos: 8, estado: 'aprobado' },
      { materia: 'Estructuras de Datos', codigo: 'PRG-302', parcial1: 58, parcial2: 62, parcial3: 65, final: 61, promedio: 61.5, creditos: 8, estado: 'reprobado' },
      { materia: 'Algoritmos', codigo: 'PRG-303', parcial1: 72, parcial2: 75, parcial3: 78, final: 75, promedio: 75, creditos: 6, estado: 'aprobado' },
      { materia: 'Base de Datos', codigo: 'BD-201', parcial1: 70, parcial2: 72, parcial3: 74, final: 72, promedio: 72, creditos: 6, estado: 'aprobado' },
      { materia: 'Matemáticas Discretas', codigo: 'MAT-301', parcial1: 68, parcial2: 70, parcial3: 72, final: 70, promedio: 70, creditos: 6, estado: 'aprobado' }
    ]
  }
];

// Componente de badge de calificación
const CalificacionBadge = ({ calificacion }) => {
  let colorClass = 'bg-slate-100 text-slate-700';
  
  if (calificacion >= 90) {
    colorClass = 'bg-green-100 text-green-800';
  } else if (calificacion >= 80) {
    colorClass = 'bg-blue-100 text-blue-800';
  } else if (calificacion >= 70) {
    colorClass = 'bg-yellow-100 text-yellow-800';
  } else if (calificacion >= 60) {
    colorClass = 'bg-orange-100 text-orange-800';
  } else {
    colorClass = 'bg-red-100 text-red-800';
  }
  
  return (
    <span className={`${colorClass} px-2 py-1 rounded font-semibold text-sm`}>
      {calificacion.toFixed(1)}
    </span>
  );
};

// Componente de tarjeta de estudiante expandible
const EstudianteCard = ({ estudiante }) => {
  const [expandido, setExpandido] = useState(false);
  
  const promedioGeneral = (
    estudiante.calificaciones.reduce((sum, cal) => sum + (cal.promedio * cal.creditos), 0) /
    estudiante.calificaciones.reduce((sum, cal) => sum + cal.creditos, 0)
  ).toFixed(2);
  
  const materiasAprobadas = estudiante.calificaciones.filter(c => c.estado === 'aprobado').length;
  const materiasReprobadas = estudiante.calificaciones.filter(c => c.estado === 'reprobado').length;
  const totalCreditos = estudiante.calificaciones.reduce((sum, cal) => sum + cal.creditos, 0);
  
  const obtenerColorPromedio = (promedio) => {
    if (promedio >= 90) return 'text-green-600';
    if (promedio >= 80) return 'text-blue-600';
    if (promedio >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-blue-900 transition-all duration-200">
      {/* Header - Información del estudiante */}
      <div 
        className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              {estudiante.nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            
            {/* Información básica */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{estudiante.nombre}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-slate-600 font-mono bg-slate-100 px-2 py-0.5 rounded">
                  {estudiante.matricula}
                </span>
                <span className="text-sm text-slate-600 font-light">{estudiante.carrera}</span>
                <span className="text-sm text-slate-600 font-light">• Semestre {estudiante.semestre}</span>
              </div>
            </div>
          </div>

          {/* Promedio y controles */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500 font-light mb-1">Promedio General</p>
              <p className={`text-3xl font-bold ${obtenerColorPromedio(promedioGeneral)}`}>
                {promedioGeneral}
              </p>
            </div>
            
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              {expandido ? <FaChevronUp className="text-slate-600" /> : <FaChevronDown className="text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            <span className="text-sm text-slate-700">
              <span className="font-semibold">{materiasAprobadas}</span> aprobadas
            </span>
          </div>
          {materiasReprobadas > 0 && (
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-red-600" />
              <span className="text-sm text-slate-700">
                <span className="font-semibold">{materiasReprobadas}</span> reprobadas
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaBook className="text-blue-900" />
            <span className="text-sm text-slate-700">
              <span className="font-semibold">{totalCreditos}</span> créditos
            </span>
          </div>
        </div>
      </div>

      {/* Detalle de calificaciones (expandible) */}
      {expandido && (
        <div className="border-t border-slate-200 bg-slate-50">
          <div className="p-6">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
              Calificaciones por Materia
            </h4>
            
            <div className="space-y-3">
              {estudiante.calificaciones.map((cal, index) => (
                <div 
                  key={index}
                  className={`bg-white p-4 rounded-lg border ${
                    cal.estado === 'reprobado' 
                      ? 'border-red-200 bg-red-50/50' 
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-slate-900">{cal.materia}</h5>
                        {cal.estado === 'reprobado' && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                            Reprobada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono">{cal.codigo} • {cal.creditos} créditos</p>
                    </div>
                    <CalificacionBadge calificacion={cal.promedio} />
                  </div>
                  
                  {/* Calificaciones por parcial */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-2 rounded text-center">
                      <p className="text-xs text-slate-500 font-light mb-1">Parcial 1</p>
                      <p className="font-semibold text-slate-900">{cal.parcial1}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-center">
                      <p className="text-xs text-slate-500 font-light mb-1">Parcial 2</p>
                      <p className="font-semibold text-slate-900">{cal.parcial2}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-center">
                      <p className="text-xs text-slate-500 font-light mb-1">Parcial 3</p>
                      <p className="font-semibold text-slate-900">{cal.parcial3}</p>
                    </div>
                    <div className="bg-blue-900 p-2 rounded text-center">
                      <p className="text-xs text-blue-200 font-light mb-1">Final</p>
                      <p className="font-semibold text-white">{cal.final}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de estadísticas generales
const EstadisticaCard = ({ icon: Icon, titulo, valor, subtitulo, color, bgColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{titulo}</h3>
      <div className={`p-3 ${bgColor} rounded-lg`}>
        <Icon className={`text-xl ${color}`} />
      </div>
    </div>
    <p className={`text-3xl font-bold ${color} mb-2`}>{valor}</p>
    <p className="text-sm text-slate-600 font-light">{subtitulo}</p>
  </div>
);

// Componente de filtro avanzado
const FiltrosAvanzados = ({ filtros, setFiltros }) => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FaFilter className="text-slate-600" />
          <span className="font-medium text-slate-900">Filtros Avanzados</span>
        </div>
        {mostrarFiltros ? <FaChevronUp className="text-slate-600" /> : <FaChevronDown className="text-slate-600" />}
      </button>

      {mostrarFiltros && (
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Carrera</label>
              <select
                value={filtros.carrera}
                onChange={(e) => setFiltros({ ...filtros, carrera: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-light"
              >
                <option value="">Todas las carreras</option>
                <option value="Ingeniería de Software">Ingeniería de Software</option>
                <option value="Ciencia de Datos">Ciencia de Datos</option>
                <option value="Ciberseguridad">Ciberseguridad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Semestre</label>
              <select
                value={filtros.semestre}
                onChange={(e) => setFiltros({ ...filtros, semestre: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-light"
              >
                <option value="">Todos los semestres</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semestre {s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estado</label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 font-light"
              >
                <option value="">Todos</option>
                <option value="excelente">Excelente (90-100)</option>
                <option value="bueno">Bueno (80-89)</option>
                <option value="regular">Regular (70-79)</option>
                <option value="riesgo">En riesgo (&lt;70)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal
const CalificacionesPage = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtros, setFiltros] = useState({
    carrera: '',
    semestre: '',
    estado: ''
  });

  // Filtrar estudiantes
  const estudiantesFiltrados = estudiantesData.filter(estudiante => {
    const coincideBusqueda = 
      estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.matricula.includes(busqueda);
    
    const coincideCarrera = !filtros.carrera || estudiante.carrera === filtros.carrera;
    const coincideSemestre = !filtros.semestre || estudiante.semestre.toString() === filtros.semestre;
    
    let coincideEstado = true;
    if (filtros.estado) {
      const promedio = estudiante.calificaciones.reduce((sum, cal) => sum + (cal.promedio * cal.creditos), 0) /
        estudiante.calificaciones.reduce((sum, cal) => sum + cal.creditos, 0);
      
      switch (filtros.estado) {
        case 'excelente':
          coincideEstado = promedio >= 90;
          break;
        case 'bueno':
          coincideEstado = promedio >= 80 && promedio < 90;
          break;
        case 'regular':
          coincideEstado = promedio >= 70 && promedio < 80;
          break;
        case 'riesgo':
          coincideEstado = promedio < 70;
          break;
      }
    }

    return coincideBusqueda && coincideCarrera && coincideSemestre && coincideEstado;
  });

  // Calcular estadísticas generales
  const promedioGeneral = (
    estudiantesData.reduce((sum, est) => {
      const promEst = est.calificaciones.reduce((s, cal) => s + (cal.promedio * cal.creditos), 0) /
        est.calificaciones.reduce((s, cal) => s + cal.creditos, 0);
      return sum + promEst;
    }, 0) / estudiantesData.length
  ).toFixed(2);

  const totalEstudiantes = estudiantesData.length;
  const estudiantesExcelencia = estudiantesData.filter(est => {
    const prom = est.calificaciones.reduce((s, cal) => s + (cal.promedio * cal.creditos), 0) /
      est.calificaciones.reduce((s, cal) => s + cal.creditos, 0);
    return prom >= 90;
  }).length;

  const materiasReprobadas = estudiantesData.reduce((sum, est) => 
    sum + est.calificaciones.filter(cal => cal.estado === 'reprobado').length, 0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-1 bg-blue-900 rounded-full"></div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
              Sistema de Calificaciones
            </h1>
          </div>
          <p className="text-slate-600 ml-6 text-lg font-light">
            Registro y seguimiento del desempeño académico
          </p>
        </div>

        {/* Estadísticas generales */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <EstadisticaCard
            icon={FaUser}
            titulo="Estudiantes"
            valor={totalEstudiantes}
            subtitulo="Registrados en el sistema"
            color="text-blue-900"
            bgColor="bg-blue-100"
          />
          <EstadisticaCard
            icon={FaChartBar}
            titulo="Promedio General"
            valor={promedioGeneral}
            subtitulo="De todos los estudiantes"
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <EstadisticaCard
            icon={FaTrophy}
            titulo="Excelencia"
            valor={estudiantesExcelencia}
            subtitulo="Promedio ≥ 90"
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <EstadisticaCard
            icon={FaExclamationTriangle}
            titulo="Reprobadas"
            valor={materiasReprobadas}
            subtitulo="Materias totales"
            color="text-red-600"
            bgColor="bg-red-100"
          />
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o matrícula..."
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-light"
              />
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-blue-900 hover:text-blue-900 transition-all flex items-center gap-2">
                <FaDownload />
                Exportar
              </button>
              <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-blue-900 hover:text-blue-900 transition-all flex items-center gap-2">
                <FaPrint />
                Imprimir
              </button>
            </div>
          </div>
        </div>

        {/* Filtros avanzados */}
        <div className="mb-6">
          <FiltrosAvanzados filtros={filtros} setFiltros={setFiltros} />
        </div>

        {/* Lista de estudiantes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Calificaciones de Estudiantes
            </h2>
            <div className="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg text-sm shadow-sm">
              {estudiantesFiltrados.length} {estudiantesFiltrados.length === 1 ? 'estudiante' : 'estudiantes'}
            </div>
          </div>

          {estudiantesFiltrados.length > 0 ? (
            <div className="space-y-4">
              {estudiantesFiltrados.map(estudiante => (
                <EstudianteCard key={estudiante.id} estudiante={estudiante} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-12 rounded-lg text-center">
              <FaChartBar className="text-4xl text-slate-400 mx-auto mb-4" />
              <p className="text-slate-700 text-lg font-medium">No se encontraron resultados</p>
              <p className="text-slate-500 text-sm mt-2 font-light">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalificacionesPage;