import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, BookOpen, GraduationCap } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/1B48PDtHZD/' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-[#0F172A] text-white relative overflow-hidden">
      {/* Elementos decorativos suaves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FACC15] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-8 h-8 text-[#FACC15]" />
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                INSTITUCIÓN
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Formando líderes con excelencia académica y valores. Comprometidos con una educación de calidad.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative">
              Contáctanos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#FACC15]"></div>
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FACC15]" />
                <p>Calle 26a entre 47 y 51, Col. El Roble<br />Mérida, Yucatán, México C.P 97256</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#FACC15]" />
                <p>informes@institucion.edu.mx</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#FACC15]" />
                <p>+52 999 363 2630</p>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative">
              Enlaces Rápidos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#FACC15]"></div>
            </h3>
            <ul className="space-y-2">
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
            <h3 className="text-lg font-semibold mb-4 text-white relative">
              Síguenos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#FACC15]"></div>
            </h3>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#FACC15] hover:text-[#1E3A8A] transition-all duration-300"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-xs">
              Mantente informado sobre eventos académicos y logros institucionales.
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>&copy; {new Date().getFullYear()} Institución Académica. Todos los derechos reservados.</div>
          <div className="flex space-x-4">
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
