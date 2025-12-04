import { clx } from "../utils/clx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  // type ChangeEvent,
} from "react";
import { api } from "../config";
import type { Genres } from "../types";
import { useSearchParams } from "react-router-dom";
import type { Filter } from "../pages/consoleGames";

interface FiltersProps {
  setIsFilterActive: (x: boolean) => void;
  isFilterActive: boolean;
  // handleGenresChange: (x: string[]) => void;
  applyFilters: () => void;
  tempFilters: Filter;
  setTempFilters: (x: Filter | ((prev: Filter) => Filter)) => void;
}

const Filters = ({
  setIsFilterActive,
  isFilterActive,
  // handleGenresChange,
  applyFilters,
  tempFilters,
  setTempFilters,
}: FiltersProps) => {
  const closeFilters = () => {
    setIsFilterActive(false);
  };
  const [searchParams, setSearchParams] = useSearchParams();

  // const [arrayGenres, setArrayGenres] = useState<string[]>([]);
  const [arrayPrices, setArrayPrices] = useState<string[]>();

  const [genreActive, setGenreActive] = useState(false);
  const [priceActive, setPriceActive] = useState<number>();
  const handleGenreActive = () => {
    if (genreActive == true) {
      setGenreActive(false);
    } else {
      setGenreActive(true);
    }
  };

  const handlePriceActive = () => {};

  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    (async function () {
      const data = await fetch(`${api}getGenres`);
      const response = await data.json();
      setGenres(response);
    })();
  }, []);

  // useEffect(() => {
  //   handleGenresChange(arrayGenres);
  // }, [arrayGenres]);

  console.log(tempFilters);
  return (
    <>
      <div
        className={clx(
          "z-30 fixed h-screen w-screen bg-black/50",
          isFilterActive ? "block" : "hidden"
        )}
      ></div>
      <div
        className={clx(
          "fixed bg-stone-800 h-1/2 w-full flex z-40  flex-col transition-all duration-300",
          isFilterActive ? "top-1/2" : "top-full"
        )}
      >
        <div className="w-full flex justify-end">
          <button className="" onClick={() => closeFilters()}>
            <Icon path={mdiClose} size={1} />
          </button>
        </div>

        <div className="w-full flex h-full text-xs">
          <div className="flex flex-col h-full overflow-y-scroll max-w-28 min-w-28">
            <button className="w-full text-start p-4 border-b-1 border-stone-950 bg-stone-900">
              Géneros
            </button>
            <button className="w-full text-start p-4 border-b-1 border-stone-950 bg-stone-900">
              Precio
            </button>
          </div>
          <div className="flex flex-col items-start justify-start overflow-y-scroll">
            <div className="w-full flex flex-col full">
              <h1 className="text-lg font-semibold w-full p-2 text-start">
                Géneros
              </h1>
              <div className="flex flex-wrap gap-1 p-2">
                {genres
                  ? genres.map((genre, index) => (
                      <button
                        key={index}
                        className={clx(
                          "rounded-2xl border-2 p-1 px-3 border-stone-700 cursor-pointer",
                          tempFilters.genres?.includes(genre.name) &&
                            "bg-stone-500"
                        )}
                        onClick={() => (
                          setTempFilters((prev) => {
                            if (prev.genres?.includes(genre.name)) {
                              return {
                                ...prev,
                                genres:
                                  prev.genres.filter((g) => g !== genre.name) ||
                                  [],
                              };
                            } else {
                              return {
                                ...prev,
                                genres: [...prev.genres, genre.name],
                              };
                            }
                          }),
                          handleGenreActive()
                        )}
                      >
                        {genre.name}
                      </button>
                    ))
                  : ""}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-semibold w-full p-2 text-start">
                Precio
              </h1>
              <div className="flex flex-col gap-1 p-2">
                <button
                  className={clx(
                    "rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit cursor-pointer",
                    priceActive === 1 && "bg-stone-500"
                  )}
                  onClick={() => (
                    setTempFilters((prev) => {
                      return { ...prev, prices: ["20000", "30000"] };
                    }),
                    setPriceActive(1)
                  )}
                >
                  de $20.000 a $30.000
                </button>
                <button
                  className={clx(
                    "rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit cursor-pointer",
                    priceActive === 2 && "bg-stone-500"
                  )}
                  onClick={() => (
                    setTempFilters((prev) => {
                      return { ...prev, prices: ["30000", "40000"] };
                    }),
                    setPriceActive(2)
                  )}
                >
                  de $30.000 a $40.000
                </button>
                <button
                  className={clx(
                    "rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit cursor-pointer",
                    priceActive === 3 && "bg-stone-500"
                  )}
                  onClick={() => (
                    setTempFilters((prev) => {
                      return { ...prev, prices: ["40000", "50000"] };
                    }),
                    setPriceActive(3)
                  )}
                >
                  de $40.000 a $50.000
                </button>
              </div>
            </div>
          </div>
          <div
            className={clx(
              "fixed w-full  left-0 p-2 flex justify-center text-center pb-2 bg-stone-800 gap-5 font-bold duration-300 transition-all",
              isFilterActive ? "bottom-0" : "top-[100%]"
            )}
          >
            <button
              className="w-3/12 p-1 text-yellow-300 cursor-pointer border-2 rounded-sm"
              onClick={() => (
                setSearchParams(),
                setTempFilters((prev) => {
                  return { ...prev, genres: [], prices: [] };
                })
              )}
            >
              Limpiar Filtros
            </button>
            <button
              className="w-6/12 bg-yellow-300 text-stone-950 rounded-sm p-1 cursor-pointer"
              onClick={() => applyFilters()}
            >
              Ver Resultados
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
