import React, { useState } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaClock, FaMapMarkerAlt, FaUsers, FaFilter, FaDownload, FaPrint, FaGraduationCap, FaBook, FaClipboardCheck } from 'react-icons/fa';

// Mock de datos de eventos del calendario
const eventosAcademicos = [
  {
    id: 1,
    titulo: 'Inicio de Semestre',
    fecha: '2025-01-15',
    tipo: 'academico',
    descripcion: 'Inicio del periodo académico Enero-Mayo 2025',
    hora: '08:00',
    ubicacion: 'Campus Central'
  },
  {
    id: 2,
    titulo: 'Registro de Materias',
    fecha: '2025-01-10',
    tipo: 'administrativo',
    descripcion: 'Periodo de inscripción y registro de materias',
    hora: '09:00 - 18:00',
    ubicacion: 'En línea'
  },
  {
    id: 3,
    titulo: 'Primer Examen Parcial',
    fecha: '2025-03-01',
    tipo: 'evaluacion',
    descripcion: 'Evaluación del primer periodo',
    hora: '10:00',
    ubicacion: 'Aulas designadas'
  },
  {
    id: 4,
    titulo: 'Semana de Receso',
    fecha: '2025-03-15',
    tipo: 'vacaciones',
    descripcion: 'Periodo vacacional de primavera',
    hora: 'Todo el día',
    ubicacion: 'N/A'
  },
  {
    id: 5,
    titulo: 'Segundo Examen Parcial',
    fecha: '2025-04-15',
    tipo: 'evaluacion',
    descripcion: 'Evaluación del segundo periodo',
    hora: '10:00',
    ubicacion: 'Aulas designadas'
  },
  {
    id: 6,
    titulo: 'Entrega de Proyectos Finales',
    fecha: '2025-05-10',
    tipo: 'academico',
    descripcion: 'Fecha límite para entrega de proyectos',
    hora: '23:59',
    ubicacion: 'Plataforma en línea'
  },
  {
    id: 7,
    titulo: 'Exámenes Finales',
    fecha: '2025-05-20',
    tipo: 'evaluacion',
    descripcion: 'Periodo de evaluaciones finales',
    hora: '08:00 - 18:00',
    ubicacion: 'Aulas designadas'
  },
  {
    id: 8,
    titulo: 'Fin de Semestre',
    fecha: '2025-05-30',
    tipo: 'academico',
    descripcion: 'Conclusión del periodo académico',
    hora: 'Todo el día',
    ubicacion: 'Campus Central'
  },
  {
    id: 9,
    titulo: 'Ceremonia de Graduación',
    fecha: '2025-06-15',
    tipo: 'evento',
    descripcion: 'Ceremonia de entrega de títulos',
    hora: '18:00',
    ubicacion: 'Auditorio Principal'
  }
];

const tiposEvento = {
  academico: { color: 'bg-blue-900', label: 'Académico', icon: FaGraduationCap },
  administrativo: { color: 'bg-slate-600', label: 'Administrativo', icon: FaClipboardCheck },
  evaluacion: { color: 'bg-red-600', label: 'Evaluación', icon: FaBook },
  vacaciones: { color: 'bg-green-600', label: 'Vacaciones', icon: FaCalendarAlt },
  evento: { color: 'bg-purple-600', label: 'Evento', icon: FaUsers }
};

// Componente de tarjeta de evento
const EventoCard = ({ evento }) => {
  const tipoConfig = tiposEvento[evento.tipo];
  const Icon = tipoConfig.icon;
  const fecha = new Date(evento.fecha + 'T00:00:00');
  const mes = fecha.toLocaleDateString('es-MX', { month: 'short' }).toUpperCase();
  const dia = fecha.getDate();

  return (
    <div className="group bg-white p-5 rounded-lg border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all duration-200">
      <div className="flex gap-4">
        {/* Fecha destacada */}
        <div className={`${tipoConfig.color} text-white p-4 rounded-lg text-center min-w-[70px] h-[70px] flex flex-col items-center justify-center shadow-sm`}>
          <span className="text-xs font-light opacity-90">{mes}</span>
          <span className="text-2xl font-semibold leading-none">{dia}</span>
        </div>

        {/* Información del evento */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-lg font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
              {evento.titulo}
            </h4>
            <span className={`${tipoConfig.color} text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1`}>
              <Icon className="text-xs" />
              {tipoConfig.label}
            </span>
          </div>
          
          <p className="text-slate-600 text-sm mb-3 font-light">{evento.descripcion}</p>
          
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <FaClock className="text-slate-400" />
              <span className="font-light">{evento.hora}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-slate-400" />
              <span className="font-light">{evento.ubicacion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de vista de calendario mensual simplificado
const VistaCalendario = ({ eventos, mesActual }) => {
  const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
  const ultimoDia = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);
  const diasEnMes = ultimoDia.getDate();
  const primerDiaSemana = primerDia.getDay();

  const eventosDelMes = eventos.filter(evento => {
    const fechaEvento = new Date(evento.fecha + 'T00:00:00');
    return fechaEvento.getMonth() === mesActual.getMonth() && 
           fechaEvento.getFullYear() === mesActual.getFullYear();
  });

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dias = [];

  // Agregar días vacíos antes del primer día del mes
  for (let i = 0; i < primerDiaSemana; i++) {
    dias.push(null);
  }

  // Agregar todos los días del mes
  for (let dia = 1; dia <= diasEnMes; dia++) {
    dias.push(dia);
  }

  const tieneEvento = (dia) => {
    if (!dia) return null;
    const fecha = `${mesActual.getFullYear()}-${String(mesActual.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    return eventosDelMes.find(e => e.fecha === fecha);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      {/* Encabezado de días */}
      <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
        {diasSemana.map(dia => (
          <div key={dia} className="p-3 text-center text-sm font-semibold text-slate-700">
            {dia}
          </div>
        ))}
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7">
        {dias.map((dia, index) => {
          const evento = tieneEvento(dia);
          return (
            <div 
              key={index}
              className={`min-h-[80px] p-2 border-b border-r border-slate-100 ${
                !dia ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'
              } transition-colors`}
            >
              {dia && (
                <>
                  <div className="text-sm font-medium text-slate-700 mb-1">{dia}</div>
                  {evento && (
                    <div className={`${tiposEvento[evento.tipo].color} text-white text-xs px-2 py-1 rounded font-light truncate`}>
                      {evento.titulo}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente principal
const CalendarioPage = () => {
  const [mesActual, setMesActual] = useState(new Date());
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [vistaActiva, setVistaActiva] = useState('lista'); // 'lista' o 'calendario'

  const cambiarMes = (direccion) => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + direccion, 1));
  };

  const eventosFiltrados = filtroTipo === 'todos' 
    ? eventosAcademicos 
    : eventosAcademicos.filter(e => e.tipo === filtroTipo);

  const mesNombre = mesActual.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-1 bg-blue-900 rounded-full"></div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
              Calendario Académico
            </h1>
          </div>
          <p className="text-slate-600 ml-6 text-lg font-light">
            Planificación y eventos del ciclo escolar 2025
          </p>
        </div>

        {/* Panel de control */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Navegación de mes */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => cambiarMes(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaChevronLeft className="text-slate-600" />
              </button>
              <div className="text-xl font-semibold text-slate-900 min-w-[200px] text-center capitalize">
                {mesNombre}
              </div>
              <button
                onClick={() => cambiarMes(1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaChevronRight className="text-slate-600" />
              </button>
            </div>

            {/* Controles */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Selector de vista */}
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setVistaActiva('lista')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    vistaActiva === 'lista' 
                      ? 'bg-white text-blue-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lista
                </button>
                <button
                  onClick={() => setVistaActiva('calendario')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    vistaActiva === 'calendario' 
                      ? 'bg-white text-blue-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Calendario
                </button>
              </div>

              {/* Filtro */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-slate-400 text-sm" />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                >
                  <option value="todos">Todos los eventos</option>
                  {Object.entries(tiposEvento).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>

              {/* Acciones */}
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Descargar">
                <FaDownload className="text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Imprimir">
                <FaPrint className="text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Sección de leyenda */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
            Tipos de Eventos
          </h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(tiposEvento).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`${config.color} w-4 h-4 rounded`}></div>
                  <Icon className={`${config.color.replace('bg-', 'text-')} text-sm`} />
                  <span className="text-sm font-light text-slate-600">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contenido principal */}
        {vistaActiva === 'lista' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                Próximos Eventos
              </h2>
              <div className="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg text-sm shadow-sm">
                {eventosFiltrados.length} {eventosFiltrados.length === 1 ? 'evento' : 'eventos'}
              </div>
            </div>

            <div className="space-y-4">
              {eventosFiltrados.length > 0 ? (
                eventosFiltrados.map(evento => (
                  <EventoCard key={evento.id} evento={evento} />
                ))
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-12 rounded-lg text-center">
                  <FaCalendarAlt className="text-4xl text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-700 text-lg font-medium">No hay eventos programados</p>
                  <p className="text-slate-500 text-sm mt-2 font-light">
                    No se encontraron eventos para los filtros seleccionados
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-6">
              Vista de Calendario
            </h2>
            <VistaCalendario eventos={eventosAcademicos} mesActual={mesActual} />
          </div>
        )}

        {/* Sección de estadísticas */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Semestre Actual</h3>
              <FaGraduationCap className="text-blue-900 text-2xl" />
            </div>
            <p className="text-3xl font-semibold text-blue-900 mb-2">Enero - Mayo</p>
            <p className="text-sm text-slate-600 font-light">Periodo académico 2025</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Días Laborales</h3>
              <FaCalendarAlt className="text-slate-600 text-2xl" />
            </div>
            <p className="text-3xl font-semibold text-slate-900 mb-2">105 días</p>
            <p className="text-sm text-slate-600 font-light">Del semestre actual</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Próximo Evento</h3>
              <FaClock className="text-red-600 text-2xl" />
            </div>
            <p className="text-lg font-semibold text-slate-900 mb-2">Registro de Materias</p>
            <p className="text-sm text-slate-600 font-light">10 de Enero, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioPage;