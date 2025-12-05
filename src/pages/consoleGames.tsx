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
import { clx } from "../utils/clx";

export interface Filter {
  genres: string[];
  prices: string[];
  console?: string;
  search?: string;
}

const ConsoleGames = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { platformValue } = useParams<{ platformValue: string }>();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    genres: searchParams.getAll("genresQuery") || [],
    prices: searchParams.getAll("pricesQuery") || [],
    console: searchParams.get("consoleQuery") || "",
    search: searchParams.get("searchQuery") || "",
  });

  const [tempFilters, setTempFilters] = useState<Filter>({
    ...filters,
  });

  const [data, setData] = useState<GamesByConsole[]>([]);

  const fetchData = async (params: Filter) => {
    if (!platformValue) {
      return;
    }

    const query = new URLSearchParams();

    if (params.console) query.append("consoleQuery", params.console);
    if (params.prices.length != 0) {
      params.prices.forEach((price) => {
        query.append("pricesQuery", String(price));
      });
    }
    if (params.genres.length != 0) {
      params.genres.forEach((genre) => {
        query.append("genresQuery", String(genre));
      });
    }
    if (params.search) query.append("searchQuery", params.search);

    const auxQuery = `${api}getGamesByPlatform/${platformValue}?${query}`;
    const res = await fetch(auxQuery);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData(filters);

    const query = new URLSearchParams();

    if (filters.console) query.set("consoleQuery", filters.console);
    if (filters.prices) {
      filters.prices.forEach((price) => {
        query.append("pricesQuery", price);
      });
    }
    if (filters.genres) {
      filters.genres.forEach((genre) => {
        query.append("genresQuery", genre);
      });
    }
    if (filters.search) query.set("searchQuery", filters.search);
    setSearchParams(query);
    console.log(query);
  }, [filters, platformValue]);

  const applyFilters = () => {
    setFilters((prev) => ({ ...prev, ...tempFilters }));
  };

  const openFiltersMenu = () => {
    setIsFilterActive(true);
  };
  return (
    <>
      <div className="w-screen relative text-sm">
        <Navbar retroceso={true} filters={filters} setFilters={setFilters} />
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
            {platformValue} Games
          </h1>
          <div className="flex gap-2 text-sm w-11/12 justify-start">
            <button
              className={clx(
                "rounded-xl px-2 border-2 border-stone-500",
                filters.console === "" && "bg-stone-500"
              )}
              onClick={() => {
                setFilters((prev) => {
                  return { ...prev, console: "" };
                });
              }}
            >
              All
            </button>
            {data.map((c) => (
              <button
                key={c.consoleId}
                className={clx(
                  "rounded-xl px-2 border-2 border-stone-500",
                  filters.console === c.consoleName && "bg-stone-500"
                )}
                onClick={() => {
                  setFilters((prev) => {
                    return { ...prev, console: c.consoleName };
                  });
                }}
              >
                {c.consoleName}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center">
            {data ? (
              data?.map((c) =>
                c.games.map((game) => (
                  <Card
                    id={game.id}
                    carrouselCard={false}
                    name={game.name}
                    imageUrl={game.imageUrl}
                    price={game.price}
                    key={game.id}
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
        // handleGenresChange={handleGenresChange}
        applyFilters={applyFilters}
        setTempFilters={setTempFilters}
        tempFilters={tempFilters}
      />
    </>
  );
};

export default ConsoleGames;
