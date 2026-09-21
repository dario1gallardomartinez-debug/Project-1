import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, ExternalLink } from 'lucide-react';

export default function ContactSection({ 
  numerosWhatsapp,
  numerowhatsapp = "59163173406"
}) {
  // Si no recibe un arreglo, usa por defecto los 3 números
  const listaNumeros = Array.isArray(numerosWhatsapp) ? numerosWhatsapp : [
    { numero: numerowhatsapp || "59163173406", etiqueta: "Ventas y Consultas 1" },
    { numero: "59170000000", etiqueta: "Ventas y Consultas 2" },
    { numero: "59171111111", etiqueta: "Soporte y Pedidos" }
  ];

  const redesSociales = {
    facebook: "https://facebook.com/tu-pagina",
    instagram: "https://instagram.com/tu-usuario",
    tiktok: "https://tiktok.com/@tu-usuario",
    email: "contacto@techstore.com",
    direccion: "La Paz, Bolivia"
  };

  const crearEnlaceWa = (num) => 
    `https://wa.me/${num}?text=${encodeURIComponent('Hola, quisiera realizar una consulta sobre sus laptops.')}`;

  return (
    <footer id="contacto" className="bg-zinc-900/80 border-t border-zinc-800 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* COLUMNA 1: Información General */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Contáctanos
            </h3>
            <p className="text-sm text-zinc-400">
              Estamos listos para asesorarte y ayudarte a elegir la laptop ideal.
            </p>
            <div className="space-y-3 text-sm">
              <a 
                href={`mailto:${redesSociales.email}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition"
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{redesSociales.email}</span>
              </a>

              <div className="flex items-center gap-3 text-zinc-300">
                <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{redesSociales.direccion}</span>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: Los 3 Números de WhatsApp */}
          <div className="bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
            <div>
              <h4 className="text-base font-semibold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" /> WhatsApp Directo
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Escríbenos a cualquiera de nuestras líneas de atención:
              </p>
            </div>

            <div className="space-y-2.5">
              {listaNumeros.map((item, index) => (
                <a
                  key={index}
                  href={crearEnlaceWa(item.numero)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 hover:text-emerald-200 transition text-xs font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.etiqueta}:</span>
                  </div>
                  <span className="font-mono text-white">+{item.numero}</span>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 3: Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Síguenos
            </h3>
            <p className="text-sm text-zinc-400">
              Conoce nuestras ofertas y nuevos ingresos en redes sociales:
            </p>
            
            <div className="flex flex-col gap-2.5">
              <a
                href={redesSociales.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-sm font-medium transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <span>Facebook</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
              </a>

              <a
                href={redesSociales.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-sm font-medium transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-pink-600/20 text-pink-400 rounded-lg">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span>Instagram</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
              </a>

              <a
                href={redesSociales.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-sm font-medium transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-5.2-1.74 2.89 2.89 0 012.31-1.29h.1v-3.5a6.37 6.37 0 106.19 6.37V9.75a8.28 8.28 0 004.82 1.55V7.8a4.85 4.85 0 01-1-.11z"/>
                    </svg>
                  </div>
                  <span>TikTok</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800/80 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} TECHSTORE LAPTOPS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}