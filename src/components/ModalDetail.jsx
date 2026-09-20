import React from 'react';
import { X, CheckCircle2, Shield, MessageCircle, Cpu, HardDrive, Monitor, Zap } from 'lucide-react';

export default function ModalDetail({ laptop, moneda, onClose, numerowhatsapp }) {
  if (!laptop) return null;

  const precio = moneda === 'USD' ? `$${laptop.precioUSD}` : `Bs. ${laptop.precioBOB}`;
  const mensajeWS = encodeURIComponent(
    `Hola! Quisiera realizar la compra de la laptop *${laptop.marca} ${laptop.modelo}* (${precio}). ¿Me pueden brindar detalles sobre el envío o ubicación?`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-zinc-950/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Imagen y Garantía */}
          <div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img src={laptop.imagen} alt={laptop.modelo} className="w-full h-full object-cover" />
            </div>
            
            <div className="mt-4 p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/60 text-xs space-y-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Garantía: <strong>{laptop.garantia}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Estado: <strong>{laptop.stock}</strong></span>
              </div>
            </div>
          </div>

          {/* Detalles del Producto */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                {laptop.marca}
              </span>
              <h2 className="text-xl font-bold text-zinc-100 mb-2">{laptop.modelo}</h2>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{laptop.descripcion}</p>

              {/* Especificaciones completas */}
              <div className="space-y-2 text-xs bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 mb-6">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Procesador: <strong className="text-zinc-100">{laptop.specs?.cpu}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>RAM: <strong className="text-zinc-100">{laptop.specs?.ram}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span>Almacenamiento: <strong className="text-zinc-100">{laptop.specs?.storage}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Gráficos: <strong className="text-zinc-100">{laptop.specs?.gpu}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Pantalla: <strong className="text-zinc-100">{laptop.specs?.pantalla}</strong></span>
                </div>
              </div>
            </div>

            {/* Pie del modal con Precio y Botón de WhatsApp */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">Precio Final</span>
                <span className="text-2xl font-black text-cyan-400">{precio}</span>
              </div>

              <a
                href={`https://wa.me/${numerowhatsapp}?text=${mensajeWS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" /> Comprar por WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}