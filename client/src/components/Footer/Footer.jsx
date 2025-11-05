import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-[#0F172A] text-white relative overflow-hidden">
      {/* Elementos decorativos suaves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 left-6 w-24 h-24 bg-[#FACC15] rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 right-6 w-20 h-20 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-7 h-7 text-[#FACC15]" />
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Saeko 2
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Formando líderes con excelencia académica y valores.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white relative">
              Contáctanos
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#FACC15]"></div>
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#FACC15]" />
                <p>Calle 45a por 30c<br />Uman, Yucatán, México</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#FACC15]" />
                <p>informes@institucion.edu.mx</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#FACC15]" />
                <p>+52 999 4567878</p>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white relative">
              Enlaces Rápidos
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#FACC15]"></div>
            </h3>
            <ul className="space-y-1.5">
              {['Oferta Académica', 'Admisiones', 'Campus Virtual', 'Biblioteca', 'Becas', 'Investigación'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 text-sm hover:text-[#FACC15] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white relative">
              Síguenos
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#FACC15]"></div>
            </h3>
            <div className="flex space-x-2 mb-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-[#FACC15] hover:text-[#1E3A8A] transition-all duration-300"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-xs">
              Mantente informado sobre eventos y logros.
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
          <div>&copy; {new Date().getFullYear()} Institución Académica. Todos los derechos reservados.</div>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-[#FACC15] transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-[#FACC15] transition-colors">Reglamento</a>
            <a href="#" className="hover:text-[#FACC15] transition-colors">Acreditaciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
