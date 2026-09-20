import React from 'react';
import { Cpu, HardDrive, Monitor, MessageCircle } from 'lucide-react';

export default function LaptopCard({ laptop, moneda, onVerDetalle, numerowhatsapp }) {
  const precio = moneda === 'USD' ? `$${laptop.precioUSD}` : `Bs. ${laptop.precioBOB}`;
  
  const mensajeWS = encodeURIComponent(
    `Hola! Quisiera consultar la disponibilidad de la laptop *${laptop.marca} ${laptop.modelo}* (${precio}).`
  );

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group">
      <div>
        {/* Imagen y Badges */}
        <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
          <img
            src={laptop.imagen}
            alt={`${laptop.marca} ${laptop.modelo}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 text-[11px] font-semibold bg-zinc-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 rounded-full">
              {laptop.uso}
            </span>
            {laptop.destacado && (
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/40 rounded-full">
                Destacado
              </span>
            )}
          </div>
        </div>

        {/* Información Principal */}
        <div className="p-5">
          <div className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
            {laptop.marca}
          </div>
          <h3 className="text-base font-bold text-zinc-100 line-clamp-1 mb-3">
            {laptop.modelo}
          </h3>

          {/* Especificaciones Clave */}
          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 mb-4 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/60">
            <div className="flex items-center gap-1.5 truncate">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{laptop.specs?.cpu}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{laptop.specs?.ram} | {laptop.specs?.storage}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate col-span-2">
              <Monitor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{laptop.specs?.gpu}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Precio y Botones de Acción */}
      <div className="px-5 pb-5 pt-2 border-t border-zinc-800/50 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-zinc-500 block">Precio</span>
          <span className="text-lg font-extrabold text-zinc-100">{precio}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onVerDetalle}
            className="px-3 py-2 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl transition"
          >
            Detalles
          </button>
          <a
            href={`https://wa.me/${numerowhatsapp}?text=${mensajeWS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition flex items-center justify-center"
            title="Consultar por WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}