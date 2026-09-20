import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LaptopCard from './components/LaptopCard';
import ModalDetail from './components/ModalDetail';
import { RefreshCw, AlertCircle, Search, SlidersHorizontal } from 'lucide-react';

// 1. TU ENLACE PUBLICADO DE GOOGLE SHEETS
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTIHz14NQCIQ05KcKdquvghva0nCU-eQIHm2F3WQ6DhFcVdI-UlFQGXaAPDjPGh0aYu2UUgNNYACh_N/pub?gid=0&single=true&output=csv";

// 2. CONFIGURACIÓN DEL TIPO DE CAMBIO (Ajusta este valor si deseas cálculo automático)
const TIPO_CAMBIO_BOB = 9.5; // 1 USD = 9.5 BOB (o el valor del mercado actual)

// Parser para procesar el formato CSV
function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  const parseLine = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { result.push(cur.trim()); cur = ''; }
      else { cur += char; }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseLine(lines[0]).map(h => h.replace(/^"|"$/g, '').toLowerCase());

  return lines.slice(1).map(line => {
    const values = parseLine(line).map(v => v.replace(/^"|"$/g, ''));
    const row = {};
    headers.forEach((header, index) => { row[header] = values[index] || ''; });
    return row;
  });
}

export default function App() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [moneda, setMoneda] = useState('BOB');
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Número de WhatsApp para recibir consultas
  const numerowhatsapp = "59163173406";

  const fetchLaptops = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(GOOGLE_SHEET_CSV_URL);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo consultar la hoja publicada.`);
      }
      const csvText = await response.text();
      const data = parseCSV(csvText);

      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item, index) => {
          const rawUSD = Number(item.preciousd) || 0;
          const rawBOB = Number(item.preciobob) || 0;

          // Si falta el precio en BOB, lo calcula con el Tipo de Cambio
          const finalUSD = rawUSD || (rawBOB > 0 ? Number((rawBOB / TIPO_CAMBIO_BOB).toFixed(2)) : 0);
          const finalBOB = rawBOB || (rawUSD > 0 ? Math.round(rawUSD * TIPO_CAMBIO_BOB) : 0);

          return {
            id: item.id || `LAP-${index + 1}`,
            marca: item.marca || '',
            modelo: item.modelo || '',
            uso: item.uso || 'General',
            precioUSD: finalUSD,
            precioBOB: finalBOB,
            stock: item.stock || 'Disponible',
            destacado: String(item.destacado).toLowerCase() === 'true',
            imagen: item.imagen || 'https://via.placeholder.com/400x250?text=Sin+Imagen',
            specs: {
              cpu: item.cpu || 'N/A',
              ram: item.ram || 'N/A',
              storage: item.storage || item.ssd || 'N/A',
              gpu: item.gpu || 'N/A',
              pantalla: item.pantalla || 'N/A'
            },
            garantia: item.garantia || 'Sin garantía',
            descripcion: item.descripcion || ''
          };
        });
        setLaptops(formatted);
      } else {
        throw new Error("No se encontraron registros en la hoja.");
      }
    } catch (err) {
      console.error("Error al cargar laptops:", err);
      setError(err.message || "Error al conectar con Google Sheets.");
      setLaptops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  // Obtener la lista única de categorías de los datos cargados
  const categorias = ['Todos', ...new Set(laptops.map(l => l.uso).filter(Boolean))];

  // Lógica del buscador y filtros por categoría
  const filteredLaptops = laptops.filter((laptop) => {
    const term = searchTerm.toLowerCase().trim();
    
    const coincideBusqueda = 
      laptop.marca.toLowerCase().includes(term) ||
      laptop.modelo.toLowerCase().includes(term) ||
      laptop.uso.toLowerCase().includes(term) ||
      laptop.specs.cpu.toLowerCase().includes(term) ||
      laptop.specs.gpu.toLowerCase().includes(term);

    const coincideCategoria = 
      categoriaSeleccionada === 'Todos' || 
      laptop.uso.toLowerCase() === categoriaSeleccionada.toLowerCase();

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
      <Navbar 
        moneda={moneda} 
        setMoneda={setMoneda} 
        numerowhatsapp={numerowhatsapp} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Barra de Búsqueda y Filtros de Categoría */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Buscador */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por marca, modelo, procesador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Categorías (Botones de Filtro) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0 mr-1 hidden sm:block" />
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaSeleccionada(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    categoriaSeleccionada === cat
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-400">
            <RefreshCw className="h-8 w-8 animate-spin text-cyan-500" />
            <p>Cargando catálogo desde Google Sheets...</p>
          </div>
        )}

        {/* Mensaje de Error */}
        {!loading && error && (
          <div className="bg-red-950/40 border border-red-800 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-200 mb-1">Error de Conexión</h3>
            <p className="text-sm text-red-300 mb-4">{error}</p>
            <button
              onClick={fetchLaptops}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Sin resultados de búsqueda */}
        {!loading && !error && filteredLaptops.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800/60">
            <p className="text-zinc-400 text-sm">No se encontraron laptops que coincidan con la búsqueda.</p>
          </div>
        )}

        {/* Grid de Productos */}
        {!loading && !error && filteredLaptops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                moneda={moneda}
                onVerDetalle={() => setSelectedLaptop(laptop)}
                numerowhatsapp={numerowhatsapp}
              />
            ))}
          </div>
        )}
      </main>

      {selectedLaptop && (
        <ModalDetail
          laptop={selectedLaptop}
          moneda={moneda}
          onClose={() => setSelectedLaptop(null)}
          numerowhatsapp={numerowhatsapp}
        />
      )}
    </div>
  );
}