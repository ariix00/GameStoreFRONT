import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/card";
import Navbar from "../components/navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filters from "../components/filters";
import { useState } from "react";
import PlatformChoice from "../components/plarformChoice";

const ConsoleGames = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const openFiltersMenu = () => {
    setIsFilterActive(true);
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
            <button className="rounded-xl px-2 border-2 border-stone-500">
              All
            </button>
            <button className="rounded-xl px-2 border-2 border-stone-500">
              PS5
            </button>
            <button className="rounded-xl px-2 border-2 border-stone-500">
              PS4
            </button>
          </div>
          <div className="flex w-full flex-wrap gap-5 justify-center">
            <Card carrouselCard={false} />
            <Card carrouselCard={false} />
            <Card carrouselCard={false} />
            <Card carrouselCard={false} />
          </div>
        </div>
      </div>
      <Filters
        setIsFilterActive={setIsFilterActive}
        isFilterActive={isFilterActive}
      />
    </>
  );
};

export default ConsoleGames;
