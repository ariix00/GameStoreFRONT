import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../config";

type Filters = {
  platform?: string;
  price?: number;
  console?: string;
};

const FilterableView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializar filtros desde la URL
  const [filters, setFilters] = useState<Filters>({
    platform: searchParams.get("platform") || "",
    price: searchParams.get("price")
      ? Number(searchParams.get("price"))
      : undefined,
    console: searchParams.get("console") || "",
  });

  // Estado para filtros que aplican solo al presionar botón
  const [tempFilters, setTempFilters] = useState<Filters>({ ...filters });

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Función para hacer fetch al backend
  const fetchData = async (params: Filters) => {
    setLoading(true);

    const query = new URLSearchParams();
    if (params.platform) query.append("platform", params.platform);
    if (params.price) query.append("price", String(params.price));
    if (params.console) query.append("console", params.console);

    const res = await fetch(`${api}getGamesByPlatform?${query.toString()}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  // 🔹 Auto-fetch cuando ciertos filtros cambian (ej: filtros automáticos)
  useEffect(() => {
    fetchData(filters);
    // Actualiza URL
    const query = new URLSearchParams();
    if (filters.platform) query.set("platform", filters.platform);
    if (filters.price !== undefined) query.set("price", String(filters.price));
    if (filters.console) query.set("console", filters.console);
    setSearchParams(query);
  }, [filters]);

  // 🔹 Handlers
  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, platform: e.target.value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempFilters((prev) => ({ ...prev, price: Number(e.target.value) }));
  };

  const handleConsoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempFilters((prev) => ({ ...prev, console: e.target.value }));
  };

  const applyTempFilters = () => {
    setFilters({ ...filters, ...tempFilters });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Filtrable View</h1>

      {/* Filtros automáticos */}
      <div className="mb-4">
        <label className="mr-2">Plataforma:</label>
        <select
          value={filters.platform}
          onChange={handlePlatformChange}
          className="border p-1"
        >
          <option value="">Todos</option>
          <option value="playstation">PlayStation</option>
          <option value="xbox">Xbox</option>
        </select>
      </div>

      {/* Filtros que aplican al botón */}
      <div className="mb-4">
        <label className="mr-2">Precio máximo:</label>
        <input
          type="number"
          value={tempFilters.price || ""}
          onChange={handlePriceChange}
          className="border p-1"
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">Consola:</label>
        <select
          value={tempFilters.console}
          onChange={handleConsoleChange}
          className="border p-1"
        >
          <option value="">Todas</option>
          <option value="ps4">PS4</option>
          <option value="ps5">PS5</option>
        </select>
      </div>

      <button
        onClick={applyTempFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Aplicar filtros
      </button>

      {/* Resultados */}
      <div className="mt-6">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          data.map((item) => <div key={item.id}>{item.name}</div>)
        )}
      </div>
    </div>
  );
};

export default FilterableView;
