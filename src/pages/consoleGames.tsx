import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/card";
import Navbar from "../components/navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filters from "../components/filters";
import { useEffect, useState } from "react";
import PlatformChoice from "../components/plarformChoice";
import { useParams, useSearchParams } from "react-router-dom";
import { type GamesByConsole } from "../types";
import { api } from "../config";

export interface Filter {
  genres: string[];
  prices: string[];
  console?: string;
}

const ConsoleGames = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { platformValue } = useParams<{ platformValue: string }>();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    genres: searchParams.getAll("genresQuery") || [],
    prices: searchParams.getAll("pricesQuery") || [],
    console: searchParams.get("consoleQuery") || "",
  });

  const [tempFilters, setTempFilters] = useState<Filter>({
    ...filters,
  });

  const [data, setData] = useState<GamesByConsole[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (params: Filter) => {
    setLoading(true);

    const query = new URLSearchParams();

    if (params.console) query.append("consoleQuery", params.console);
    if (params.prices.length != 0)
      query.append("pricesQuery", String(params.prices));
    if (params.genres.length != 0)
      query.append("genresQuery", String(params.genres));

    const res = await fetch(`${api}getGamesByPlatform?${query.toString()}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(filters);

    const query = new URLSearchParams();

    if (filters.console) query.set("consoleQuery", filters.console);
    if (filters.prices) {
      filters.prices.forEach((price) => {
        query.set("pricesQuery", price);
      });
    }
    if (filters.genres) {
      filters.genres.forEach((genre) => {
        query.set("genresQuery", genre);
      });
    }
    console.log(query);
    setSearchParams(query);
  }, [filters]);

  const handleGenresChange = (selectedGenres: string[]) => {
    setTempFilters((prev) => ({ ...prev, genres: selectedGenres }));
  };

  const applyFilters = () => {
    setFilters((prev) => ({ ...prev, ...tempFilters }));
  };
  // const data = await fetch(`${api}getPlatformNames`);

  // if (platforms === null) return <p>Cargando...</p>;

  // const query = `${api}getGamesByPlatform/${platformValue}?${consolesQuery}${pricesQuery}${genresQuery}${searchQuery}`;

  const openFiltersMenu = () => {
    setIsFilterActive(true);
  };
  return (
    <>
      <div className="w-screen relative text-sm">
        <Navbar retroceso={true} />
        <div className="w-full flex flex-col text-xl gap-5 items-center ">
          <div className="w-full border-b-1 border-stone-500 flex">
            <button
              className="w-full h-full p-2 flex items-center gap-1 text-sm font-bold"
              onClick={() => openFiltersMenu()}
            >
              <FontAwesomeIcon icon={faSliders} />
              Filtros
            </button>
          </div>
          <PlatformChoice />

          <h1 className="text-white font-bold w-11/12 text-lg">
            ¿PlayStation Games
          </h1>
          <div className="flex gap-2 text-sm w-11/12 justify-start">
            <button className="rounded-xl px-2 border-2 border-stone-500">
              All
            </button>
            {data.map((c, index) => (
              <button
                key={index}
                className="rounded-xl px-2 border-2 border-stone-500"
              >
                {c.consoleName}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center">
            {data ? (
              data?.map((c) =>
                c.games.map((game, index) => (
                  <Card
                    id={game.id}
                    carrouselCard={false}
                    name={game.name}
                    imageUrl={game.imageUrl}
                    price={game.price}
                    key={index}
                  />
                ))
              )
            ) : (
              <h3>No hay juegos epte</h3>
            )}
            {}
          </div>
        </div>
      </div>
      <Filters
        setIsFilterActive={setIsFilterActive}
        isFilterActive={isFilterActive}
        handleGenresChange={handleGenresChange}
        applyFilters={applyFilters}
        setTempFilters={setTempFilters}
        tempFilters={tempFilters}
      />
    </>
  );
};

export default ConsoleGames;
