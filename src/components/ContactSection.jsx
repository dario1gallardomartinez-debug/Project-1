import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from 'lucide-react';

export default function ContactSection({ 
  numerosWhatsapp,
  numerowhatsapp = "59163173406"
}) {
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
    direccion: "La Paz, Bolivia",
    // ENLACE A GOOGLE MAPS (puedes cambiarlo por el enlace exacto de tu tienda si tienes uno)
    googleMaps: "https://maps.google.com/?q=La+Paz,+Bolivia"
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
              {/* Correo Electrónico */}
              <a 
                href={`mailto:${redesSociales.email}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition"
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{redesSociales.email}</span>
              </a>

              {/* Ubicación con enlace directo a Google Maps */}
              <a 
                href={redesSociales.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition group"
                title="Ver ubicación en Google Maps"
              >
                <div className="p-2 bg-zinc-800 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 rounded-lg text-zinc-400 transition">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="group-hover:underline underline-offset-4">
                  {redesSociales.direccion}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition ml-auto" />
              </a>
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
              {/* Facebook */}
              <a
                href={redesSociales.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-sm font-medium transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span>Facebook</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
              </a>

              {/* Instagram */}
              <a
                href={redesSociales.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-sm font-medium transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-pink-600/20 text-pink-400 rounded-lg">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span>Instagram</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
              </a>

              {/* TikTok */}
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
          © {new Date().getFullYear()} IMPORTADORA LAPTOPS GAMERS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}