import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/card";
import Navbar from "../components/navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filters from "../components/filters";
import { useEffect, useState } from "react";
import PlatformChoice from "../components/plarformChoice";
import { api } from "../config";
import type { GamesByConsole } from "../types";
import { useLocation } from "react-router-dom";
const ConsoleGames = () => {
  const location = useLocation();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [gamesByPlatform, setGameByPlatform] = useState<GamesByConsole[]>([]);
  const [platform, setPlatform] = useState<string | null>(null);
  const openFiltersMenu = () => {
    setIsFilterActive(true);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const platformParam = queryParams.get("platform");
    if (!platformParam) return;
    setPlatform(platformParam);
  }, [location.search]);

  const [arrayGenres, setArrayGenres] = useState<string[]>([]);

  let GenresQuery = "";
  if (arrayGenres.length > 0) {
    arrayGenres.forEach((genre) => {
      GenresQuery = GenresQuery + `&genre=${genre}`;
    });
  }

  useEffect(() => {
    if (!platform) return;
    //
    const query = `${api}getGamesByPlatform?platformQuery=${platform}${GenresQuery}`;
    (async function () {
      try {
        const data = await fetch(query);
        const response = await data.json();
        console.log(response);
        setGameByPlatform(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [platform]);

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
          <PlatformChoice setPlatform={setPlatform} />

          <h1 className="text-white font-bold w-11/12 text-lg">
            PlayStation Games
          </h1>
          <div className="flex gap-2 text-sm w-11/12 justify-start">
            <button
              className="rounded-xl px-2 border-2 border-stone-500"
              onClick={() =>
                console.log(
                  `${api}getGamesByPlatform?platformQuery=${platform}${GenresQuery}`
                )
              }
            >
              All
            </button>
            <button className="rounded-xl px-2 border-2 border-stone-500">
              PS5
            </button>
            <button className="rounded-xl px-2 border-2 border-stone-500">
              PS4
            </button>
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
        setIsFilterActive={setIsFilterActive}
        isFilterActive={isFilterActive}
        setArrayGenres={setArrayGenres}
      />
    </>
  );
};

export default ConsoleGames;
