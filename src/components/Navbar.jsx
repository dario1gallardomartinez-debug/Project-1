import React from 'react';
import { Laptop, ShieldCheck, PhoneCall } from 'lucide-react';

export default function Navbar({ moneda, setMoneda, numerowhatsapp }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO Y NOMBRE DE LA TIENDA */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <Laptop className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              TECHSTORE <span className="text-cyan-400">LAPTOPS</span>
            </h1>
            <p className="text-[10px] text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Equipos 100% Garantizados
            </p>
          </div>
        </div>

        {/* BOTÓN CONTACTO Y MONEDA */}
        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
            Cont&aacute;ctanos
          </a>

          <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-lg flex text-xs font-semibold">
            <button
              onClick={() => setMoneda('USD')}
              className={`px-2.5 py-1 rounded-md transition ${
                moneda === 'USD' 
                  ? 'bg-cyan-500 text-black font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setMoneda('BOB')}
              className={`px-2.5 py-1 rounded-md transition ${
                moneda === 'BOB' 
                  ? 'bg-cyan-500 text-black font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              BOB (Bs.)
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}