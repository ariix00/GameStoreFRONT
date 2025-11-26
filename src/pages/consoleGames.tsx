import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/card";
import Navbar from "../components/navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filters from "../components/filters";
import { useEffect, useState } from "react";
import PlatformChoice from "../components/plarformChoice";
import { api } from "../config";
import type { GamesByConsole } from "../types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ConsoleGames = () => {
  console.log("hola");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [gamesByPlatform, setGameByPlatform] = useState<GamesByConsole[]>([]);
  const [search, setSearch] = useState<string | null>(null);

  const [platforms, setPlatforms] = useState<string[] | null>(null);
  const openFiltersMenu = () => {
    setIsFilterActive(true);
  };

  //     if (!platformParam) return;
  //     setPlatform(platformParam);
  const [arrayGenres, setArrayGenres] = useState<string[]>([]);

  const [arrayPrices, setArrayPrices] = useState<string[]>([]);
  const [consoles, setConsoles] = useState<string | null>();

  const { platformValue } = useParams<{ platformValue: string | undefined }>();

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const genresParams = queryParams.getAll("genresQuery");
  //   if (!genresParams) return;
  //   setArrayGenres(genresParams);
  // }, []);

  useEffect(() => {
    (async function () {
      try {
        const pricesParams = searchParams.getAll("pricesQuery");
        if (pricesParams.length != 0) {
          setArrayPrices(pricesParams);
        }
        const genresParams = searchParams.getAll("genresQuery");
        if (genresParams.length != 0) {
          setArrayGenres(genresParams);
        }
        const searchParam = searchParams.get("searchQuery");
        setSearch(searchParam);
        const consolesParams = searchParams.get("consolesQuery");
        setConsoles(consolesParams);
        const data = await fetch(`${api}getPlatformNames`);
        const response = await data.json();
        setPlatforms(response);
      } catch (error) {
        console.log("error fetching databro", error);
      }
    })();
  }, [searchParams]);
  // if (platforms === null) return <p>Cargando...</p>;

  useEffect(() => {
    if (!platformValue) return;
    if (platforms == null) return;
    if (!platformValue || !platforms.includes(platformValue)) {
      navigate("/404");
    }
    fetchData();
    // setPlatform(platformValue);
  }, [platformValue, platforms]);

  let pricesQuery = "";
  if (arrayPrices.length > 0) {
    arrayPrices.forEach((price) => {
      pricesQuery = pricesQuery + `&pricesQuery=${price}`;
    });
  }
  let genresQuery = "";
  if (arrayGenres.length > 0) {
    arrayGenres.forEach((genre) => {
      genresQuery = genresQuery + `&genresQuery=${genre}`;
    });
  }
  let searchQuery = "";
  if (search) {
    searchQuery = searchQuery + `&searchQuery=${search}`;
  }
  let consolesQuery = "";
  if (consoles) {
    consolesQuery = consolesQuery + `&consolesQuery=${consoles}`;
  }

  const fetchData = async (consoleName: string | null = null) => {
    const query = `${api}getGamesByPlatform/${platformValue}?${consolesQuery}${pricesQuery}${genresQuery}${searchQuery}`;
    console.log(query);
    const params = new URLSearchParams();

    arrayPrices.forEach((price) => {
      params.append("pricesQuery", `${price}`);
    });
    arrayGenres.forEach((genre) => {
      params.append("genresQuery", genre);
    });
    if (search) {
      params.append("searchQuery", search);
    }
    if (consoleName != null) {
      params.append("consolesQuery", consoleName);
    } else {
      if (consoles != null) {
        params.append("consolesQuery", consoles);
      } else {
        params.delete("consolesQuery");
        setConsoles(null);
      }
    }
    setSearchParams(params);

    try {
      const data = await fetch(query);
      const response = await data.json();
      setGameByPlatform(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(consoles);
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
            {platformValue} Games
          </h1>
          <div className="flex gap-2 text-sm w-11/12 justify-start">
            <button
              className="rounded-xl px-2 border-2 border-stone-500"
              onClick={() => fetchData()}
            >
              All
            </button>
            {gamesByPlatform.map((c, index) => (
              <button
                key={index}
                className="rounded-xl px-2 border-2 border-stone-500"
                onClick={() => fetchData(c.consoleName)}
              >
                {c.consoleName}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center">
            {gamesByPlatform ? (
              gamesByPlatform?.map((c) =>
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
        fetchData={fetchData}
        setIsFilterActive={setIsFilterActive}
        isFilterActive={isFilterActive}
        setArrayGenres={setArrayGenres}
        arrayGenres={arrayGenres}
        setPricesArray={setArrayPrices}
        pricesArray={arrayPrices}
      />
    </>
  );
};

export default ConsoleGames;
