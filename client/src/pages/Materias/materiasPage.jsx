import React, { useState } from 'react';
import { FaBook, FaPlus, FaSearch, FaFilter, FaLayerGroup, FaStar, FaClock, FaChalkboardTeacher, FaEdit, FaTrash, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

// Mock de datos de materias
const materiasData = [
  // Tronco Común
  {
    id: 1,
    codigo: 'MAT-101',
    nombre: 'Matemáticas I',
    creditos: 8,
    horas_semana: 6,
    semestre: 1,
    tipo: 'tronco_comun',
    descripcion: 'Fundamentos de álgebra y trigonometría',
    prerequisitos: 'Ninguno'
  },
  {
    id: 2,
    codigo: 'FIS-101',
    nombre: 'Física I',
    creditos: 8,
    horas_semana: 6,
    semestre: 1,
    tipo: 'tronco_comun',
    descripcion: 'Mecánica clásica y cinemática',
    prerequisitos: 'Ninguno'
  },
  {
    id: 3,
    codigo: 'PRG-101',
    nombre: 'Programación I',
    creditos: 8,
    horas_semana: 8,
    semestre: 1,
    tipo: 'tronco_comun',
    descripcion: 'Fundamentos de programación estructurada',
    prerequisitos: 'Ninguno'
  },
  {
    id: 4,
    codigo: 'COM-101',
    nombre: 'Comunicación Oral y Escrita',
    creditos: 6,
    horas_semana: 4,
    semestre: 1,
    tipo: 'tronco_comun',
    descripcion: 'Técnicas de comunicación efectiva',
    prerequisitos: 'Ninguno'
  },
  {
    id: 5,
    codigo: 'MAT-102',
    nombre: 'Matemáticas II',
    creditos: 8,
    horas_semana: 6,
    semestre: 2,
    tipo: 'tronco_comun',
    descripcion: 'Cálculo diferencial e integral',
    prerequisitos: 'MAT-101'
  },
  {
    id: 6,
    codigo: 'EST-101',
    nombre: 'Estadística',
    creditos: 6,
    horas_semana: 5,
    semestre: 2,
    tipo: 'tronco_comun',
    descripcion: 'Estadística descriptiva e inferencial',
    prerequisitos: 'MAT-101'
  },
  
  // Especialización - Desarrollo de Software
  {
    id: 7,
    codigo: 'SW-301',
    nombre: 'Ingeniería de Software',
    creditos: 8,
    horas_semana: 6,
    semestre: 5,
    tipo: 'especializacion',
    area: 'Desarrollo de Software',
    descripcion: 'Metodologías y procesos de desarrollo',
    prerequisitos: 'PRG-101'
  },
  {
    id: 8,
    codigo: 'SW-302',
    nombre: 'Desarrollo Web Avanzado',
    creditos: 8,
    horas_semana: 8,
    semestre: 6,
    tipo: 'especializacion',
    area: 'Desarrollo de Software',
    descripcion: 'Frameworks modernos y arquitecturas web',
    prerequisitos: 'SW-301'
  },
  {
    id: 9,
    codigo: 'SW-303',
    nombre: 'Desarrollo Móvil',
    creditos: 8,
    horas_semana: 8,
    semestre: 6,
    tipo: 'especializacion',
    area: 'Desarrollo de Software',
    descripcion: 'Aplicaciones nativas y multiplataforma',
    prerequisitos: 'SW-301'
  },
  
  // Especialización - Ciencia de Datos
  {
    id: 10,
    codigo: 'CD-301',
    nombre: 'Minería de Datos',
    creditos: 8,
    horas_semana: 6,
    semestre: 5,
    tipo: 'especializacion',
    area: 'Ciencia de Datos',
    descripcion: 'Técnicas de extracción de conocimiento',
    prerequisitos: 'EST-101'
  },
  {
    id: 11,
    codigo: 'CD-302',
    nombre: 'Machine Learning',
    creditos: 8,
    horas_semana: 8,
    semestre: 6,
    tipo: 'especializacion',
    area: 'Ciencia de Datos',
    descripcion: 'Algoritmos de aprendizaje automático',
    prerequisitos: 'CD-301'
  },
  {
    id: 12,
    codigo: 'CD-303',
    nombre: 'Big Data',
    creditos: 8,
    horas_semana: 8,
    semestre: 7,
    tipo: 'especializacion',
    area: 'Ciencia de Datos',
    descripcion: 'Procesamiento de grandes volúmenes de datos',
    prerequisitos: 'CD-302'
  },
  
  // Especialización - Ciberseguridad
  {
    id: 13,
    codigo: 'CS-301',
    nombre: 'Seguridad Informática',
    creditos: 8,
    horas_semana: 6,
    semestre: 5,
    tipo: 'especializacion',
    area: 'Ciberseguridad',
    descripcion: 'Fundamentos de seguridad de la información',
    prerequisitos: 'PRG-101'
  },
  {
    id: 14,
    codigo: 'CS-302',
    nombre: 'Hacking Ético',
    creditos: 8,
    horas_semana: 8,
    semestre: 6,
    tipo: 'especializacion',
    area: 'Ciberseguridad',
    descripcion: 'Pruebas de penetración y vulnerabilidades',
    prerequisitos: 'CS-301'
  },
  {
    id: 15,
    codigo: 'CS-303',
    nombre: 'Criptografía',
    creditos: 6,
    horas_semana: 6,
    semestre: 7,
    tipo: 'especializacion',
    area: 'Ciberseguridad',
    descripcion: 'Algoritmos criptográficos y seguridad',
    prerequisitos: 'CS-301'
  }
];

// Componente de tarjeta de materia
const MateriaCard = ({ materia, onEdit, onDelete }) => {
  const esTroncoComun = materia.tipo === 'tronco_comun';
  
  return (
    <div className="group bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all duration-200">
      {/* Header con código y acciones */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 ${esTroncoComun ? 'bg-blue-900' : 'bg-purple-600'} rounded-lg shadow-sm`}>
            {esTroncoComun ? (
              <FaLayerGroup className="text-white text-lg" />
            ) : (
              <FaStar className="text-white text-lg" />
            )}
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {materia.codigo}
            </span>
            <h4 className="text-lg font-semibold text-slate-900 mt-1 group-hover:text-blue-900 transition-colors">
              {materia.nombre}
            </h4>
          </div>
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(materia)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <FaEdit className="text-blue-900 text-sm" />
          </button>
          <button
            onClick={() => onDelete(materia)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <FaTrash className="text-red-600 text-sm" />
          </button>
        </div>
      </div>

      {/* Tipo y área */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`${esTroncoComun ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'} text-xs px-3 py-1 rounded-full font-medium`}>
          {esTroncoComun ? 'Tronco Común' : materia.area}
        </span>
        <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
          Semestre {materia.semestre}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-sm text-slate-600 font-light mb-4 line-clamp-2">
        {materia.descripcion}
      </p>

      {/* Información adicional */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <FaBookOpen className="text-slate-400" />
          <span className="font-light">{materia.creditos} créditos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaClock className="text-slate-400" />
          <span className="font-light">{materia.horas_semana} hrs/semana</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaChalkboardTeacher className="text-slate-400" />
          <span className="font-light">{materia.prerequisitos}</span>
        </div>
      </div>
    </div>
  );
};

// Componente de estadísticas
const EstadisticaCard = ({ icon: Icon, titulo, valor, subtitulo, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{titulo}</h3>
      <Icon className={`text-2xl ${color}`} />
    </div>
    <p className={`text-3xl font-semibold ${color} mb-2`}>{valor}</p>
    <p className="text-sm text-slate-600 font-light">{subtitulo}</p>
  </div>
);

// Componente principal
const MateriasPage = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroSemestre, setFiltroSemestre] = useState('todos');
  const [vistaActiva, setVistaActiva] = useState('tronco_comun');

  // Filtrar materias
  const materiasFiltradas = materiasData.filter(materia => {
    const coincideBusqueda = materia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            materia.codigo.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideTipo = filtroTipo === 'todos' || materia.tipo === filtroTipo;
    const coincideSemestre = filtroSemestre === 'todos' || materia.semestre.toString() === filtroSemestre;
    const coincideVista = vistaActiva === 'todas' || materia.tipo === vistaActiva;

    return coincideBusqueda && coincideTipo && coincideSemestre && coincideVista;
  });

  // Agrupar especializaciones por área
  const especializaciones = {};
  materiasData
    .filter(m => m.tipo === 'especializacion')
    .forEach(materia => {
      if (!especializaciones[materia.area]) {
        especializaciones[materia.area] = [];
      }
      especializaciones[materia.area].push(materia);
    });

  const handleEdit = (materia) => {
    console.log('Editar materia:', materia);
    // Aquí iría la lógica de edición
  };

  const handleDelete = (materia) => {
    console.log('Eliminar materia:', materia);
    // Aquí iría la lógica de eliminación
  };

  // Calcular estadísticas
  const totalMaterias = materiasData.length;
  const materiasTronco = materiasData.filter(m => m.type === 'tronco_comun').length;
  const totalCreditos = materiasData.reduce((sum, m) => sum + m.creditos, 0);
  const areasEspecializacion = Object.keys(especializaciones).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-1 bg-blue-900 rounded-full"></div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
              Gestión de Materias
            </h1>
          </div>
          <p className="text-slate-600 ml-6 text-lg font-light">
            Catálogo de materias del tronco común y especializaciones
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <EstadisticaCard
            icon={FaBook}
            titulo="Total Materias"
            valor={totalMaterias}
            subtitulo="En el catálogo"
            color="text-blue-900"
          />
          <EstadisticaCard
            icon={FaLayerGroup}
            titulo="Tronco Común"
            valor={materiasData.filter(m => m.tipo === 'tronco_comun').length}
            subtitulo="Materias básicas"
            color="text-slate-700"
          />
          <EstadisticaCard
            icon={FaStar}
            titulo="Especializaciones"
            valor={areasEspecializacion}
            subtitulo="Áreas disponibles"
            color="text-purple-600"
          />
          <EstadisticaCard
            icon={FaGraduationCap}
            titulo="Total Créditos"
            valor={totalCreditos}
            subtitulo="Del plan de estudios"
            color="text-green-600"
          />
        </div>

        {/* Panel de control */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Buscador */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o código..."
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-light"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filtroSemestre}
                onChange={(e) => setFiltroSemestre(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
              >
                <option value="todos">Todos los semestres</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semestre {sem}</option>
                ))}
              </select>

              <button className="px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-all shadow-sm flex items-center gap-2">
                <FaPlus />
                Nueva Materia
              </button>
            </div>
          </div>
        </div>

        {/* Selector de vista */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setVistaActiva('todas')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              vistaActiva === 'todas'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-900'
            }`}
          >
            Todas las Materias
          </button>
          <button
            onClick={() => setVistaActiva('tronco_comun')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              vistaActiva === 'tronco_comun'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-900'
            }`}
          >
            <FaLayerGroup />
            Tronco Común
          </button>
          <button
            onClick={() => setVistaActiva('especializacion')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              vistaActiva === 'especializacion'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-600'
            }`}
          >
            <FaStar />
            Especializaciones
          </button>
        </div>

        {/* Contenido según vista */}
        {vistaActiva === 'especializacion' ? (
          <div className="space-y-8">
            {Object.entries(especializaciones).map(([area, materias]) => (
              <div key={area}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 bg-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-semibold text-slate-900">{area}</h2>
                  <span className="px-3 py-1 bg-purple-100 text-purple-900 text-sm rounded-full font-medium">
                    {materias.length} materias
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {materias
                    .filter(m => 
                      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                      m.codigo.toLowerCase().includes(busqueda.toLowerCase())
                    )
                    .filter(m => filtroSemestre === 'todos' || m.semestre.toString() === filtroSemestre)
                    .map(materia => (
                      <MateriaCard
                        key={materia.id}
                        materia={materia}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                {vistaActiva === 'todas' ? 'Todas las Materias' : 'Tronco Común'}
              </h2>
              <div className="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg text-sm shadow-sm">
                {materiasFiltradas.length} {materiasFiltradas.length === 1 ? 'materia' : 'materias'}
              </div>
            </div>

            {materiasFiltradas.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {materiasFiltradas.map(materia => (
                  <MateriaCard
                    key={materia.id}
                    materia={materia}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-12 rounded-lg text-center">
                <FaBook className="text-4xl text-slate-400 mx-auto mb-4" />
                <p className="text-slate-700 text-lg font-medium">No se encontraron materias</p>
                <p className="text-slate-500 text-sm mt-2 font-light">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MateriasPage;