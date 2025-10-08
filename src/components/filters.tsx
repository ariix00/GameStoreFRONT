import { clx } from "../utils/clx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

interface FiltersProps {
  setIsFilterActive: (x: boolean) => void;
  isFilterActive: boolean;
}

const Filters = ({ setIsFilterActive, isFilterActive }: FiltersProps) => {
  const closeFilters = () => {
    setIsFilterActive(false);
  };
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
          "fixed bg-stone-700 h-1/2 w-full flex z-40  flex-col transition-all duration-300",
          isFilterActive ? "top-[50%]" : "top-[100%]"
        )}
      >
        <div className="w-full flex justify-end">
          <button className="" onClick={() => closeFilters()}>
            <Icon path={mdiClose} size={2} />
          </button>
        </div>
        <h1 className="text-bold text-lg">Consola</h1>
        <h1 className="text-bold text-lg">Género</h1>
        <h1 className="text-bold text-lg">Precio</h1>
      </div>
    </>
  );
};

export default Filters;
