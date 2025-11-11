import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/card";
import Navbar from "../components/navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filters from "../components/filters";
import { useEffect, useState } from "react";
import PlatformChoice from "../components/plarformChoice";
import { api } from "../config";
import type { GamesByConsole } from "../types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
const ConsoleGames = () => {
  const navigate = useNavigate();

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [gamesByPlatform, setGameByPlatform] = useState<GamesByConsole[]>([]);
  const { platform } = useParams<{ platform: string }>();
  const [platforms, setPlatforms] = useState<string[] | null>(null);
  const openFiltersMenu = () => {
    setIsFilterActive(true);
  };
  //  const queryParams = new URLSearchParams(location.search);
  //     const platformParam = queryParams.get("platform");
  //     if (!platformParam) return;
  //     setPlatform(platformParam);
  const [arrayGenres, setArrayGenres] = useState<string[]>([]);

  const [arrayPrices, setArrayPrices] = useState<number[]>([0, 0]);
  const [consoles, setConsoles] = useState("");
  let consolesQuery = "";
  if (consoles) {
    consolesQuery = consolesQuery + `&consolesQuery=${consoles}`;
  }
  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(`${api}getPlatformNames`);
        const response = await data.json();
        setPlatforms(response);

        console.log(response);
      } catch (error) {
        console.log("error fetching databro", error);
      }
    })();
  }, []);
  // if (platforms === null) return <p>Cargando...</p>;

  useEffect(() => {
    if (!platform) return;
    if (platforms == null) return;
    console.log(platform, platforms);
    console.log(platforms.includes(platform));
    if (!platform || !platforms.includes(platform)) {
      navigate("/404");
    }
    fetchData();
  }, [platform, platforms]);

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

  const fetchData = async () => {
    const query = `${api}getGamesByPlatform/${platform}?${consolesQuery}${pricesQuery}${genresQuery}`;
    console.log(query);

    try {
      const data = await fetch(query);
      const response = await data.json();
      console.log(response);
      setGameByPlatform(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-screen relative text-sm">
        <Navbar retroceso={true} />
        <div className="h-15"></div>
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
            PlayStation Games
          </h1>
          <div className="flex gap-2 text-sm w-11/12 justify-start">
            <button
              className="rounded-xl px-2 border-2 border-stone-500"
              onClick={() => setConsoles("")}
            >
              All
            </button>
            {gamesByPlatform.map((c, index) => (
              <button
                key={index}
                className="rounded-xl px-2 border-2 border-stone-500"
                onClick={() => (
                  setConsoles(c.consoleName), console.log(consoles)
                )}
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
