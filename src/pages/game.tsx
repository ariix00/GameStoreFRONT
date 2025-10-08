import Icon from "@mdi/react";
import AgregarProducto from "../components/agregarProducto";
import { mdiArrowLeft } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative bg-[url('/public/persona5main.webp')] bg-cover bg-no-repeat bg-fixed">
        <button
          className="absolute top-2 left-2 z-40"
          onClick={() => navigate(-1)}
        >
          <Icon path={mdiArrowLeft} size={1} />
        </button>
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex flex-col items-center gap-5 h-screen w-screen text-sm backdrop-blur-xs">
          <div className="flex w-full justify-center h-72 p-2">
            <img
              src="/src/assets/persona5.webp"
              alt=""
              className="w-7/12 text-sm rounded-2xl"
            />
          </div>
          <div className="w-11/12 flex flex-col">
            <h1 className="text-lg font-bold">Persona 5 Standar Edition PS4</h1>
            <h2 className="text-lg font-bold">$40.000</h2>
          </div>
          <div className="w-11/12">
            Vive la doble vida de un estudiante y un justiciero enmascarado.
            Explora Tokio, forja lazos y roba los corazones corruptos en esta
            inolvidable aventura JRPG.
          </div>
          <div className="w-11/12 flex flex-col gap-2">
            <h1 className=" font-bold">Géneros:</h1>
            <div className="flex flex-wrap text-stone-950 gap-1">
              <div className="rounded-2xl px-2 bg-stone-50">Acción</div>
              <div className="rounded-2xl px-2 bg-stone-50">Anime</div>
              <div className="rounded-2xl px-2 bg-stone-50">RPG</div>
            </div>
          </div>
          <AgregarProducto />
        </div>
      </div>
    </>
  );
};

export default Game;
