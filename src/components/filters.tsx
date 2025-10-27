import { clx } from "../utils/clx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { api } from "../config";
import type { Genres } from "../types";

interface FiltersProps {
  setIsFilterActive: (x: boolean) => void;
  isFilterActive: boolean;
  setArrayGenres: Dispatch<SetStateAction<string[]>>;
  setPricesArray: Dispatch<SetStateAction<number[]>>;
  pricesArray: number[];
}

const Filters = ({
  setIsFilterActive,
  isFilterActive,
  setArrayGenres,
  setPricesArray,
  pricesArray,
}: FiltersProps) => {
  const closeFilters = () => {
    setIsFilterActive(false);
  };
  const [customPrice, setCustomPrice] = useState(false);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "min": {
        const min = e.target.valueAsNumber;

        if (min < pricesArray[1]) {
          setPricesArray([min, pricesArray[1]]);
        }
        break;
      }

      case "max": {
        const max = e.target.valueAsNumber;
        if (max > pricesArray[0]) {
          setPricesArray([pricesArray[0], max]);
        }
        break;
      }

      default:
        break;
    }
    console.log(pricesArray);
  };
  const [genres, setGenres] = useState<Genres[]>([]);
  useEffect(() => {
    (async function () {
      const data = await fetch(`${api}getGenres`);
      const response = await data.json();
      setGenres(response);
    })();
  }, []);

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
          isFilterActive ? "top-[50%]" : "top-[100%]"
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
                        className="rounded-2xl border-2 p-1 px-3 border-stone-700"
                        onClick={() =>
                          setArrayGenres((prev) => {
                            if (prev.includes(genre.name)) {
                              return prev.filter((g) => g !== genre.name);
                            } else {
                              return [...prev, genre.name];
                            }
                          })
                        }
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
                  className="rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit"
                  onClick={() => setPricesArray([20000, 30000])}
                >
                  de $20.000 a $30.000
                </button>
                <button
                  className="rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit"
                  onClick={() => setPricesArray([30000, 40000])}
                >
                  de $30.000 a $40.000
                </button>
                <button
                  className="rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit"
                  onClick={() => setPricesArray([40000, 50000])}
                >
                  de $40.000 a $50.000
                </button>

                {/* <button
                  className="rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit"
                  onClick={() => setCustomPrice(true)}
                >
                  Elegir Precio
                </button>
                <div className="flex">
                  <input
                    type="number"
                    name="min"
                    placeholder="Min. Precio"
                    className="rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit"
                    onChange={handlePriceChange}
                    defaultValue={0}
                    disabled={!customPrice}
                  />
                  <input
                    type="number"
                    name="max"
                    placeholder="Máx. Precio"
                    className="rounded-2xl border-2 p-1 px-3 border-stone-700 w-fit"
                    onChange={handlePriceChange}
                    defaultValue={10000}
                    disabled={!customPrice}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
