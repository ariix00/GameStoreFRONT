import Icon from "@mdi/react";
import AgregarProducto from "../components/agregarProducto";
import { mdiArrowLeft } from "@mdi/js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../config";
import type { GameById } from "../types";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const query = `${api}getGameById/${id}`;
  const [gameById, setGameById] = useState<GameById>();
  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(query);
        const response = await data.json();
        console.log(response);
        setGameById(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query]);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`relative bg-[url("${
          gameById?.images.find((image) => image.type == "secondary")?.url
        }")] bg-cover bg-no-repeat bg-fixed`}
      >
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
              src={
                gameById?.images.find((image) => image.type == "primary")?.url
              }
              alt=""
              className="h-72 text-sm rounded-2xl"
            />
          </div>
          <div className="w-11/12 flex flex-col">
            <h1 className="text-lg font-bold">{gameById?.name}</h1>
            <h2 className="text-lg font-bold">${gameById?.price}</h2>
          </div>
          <div className="w-11/12">{gameById?.description}</div>
          <div className="w-11/12 flex flex-col gap-2">
            <h1 className=" font-bold">Géneros:</h1>
            <div className="flex flex-wrap text-stone-950 gap-1">
              {gameById?.genres.map((genre, index) => (
                <div className="rounded-2xl px-2 bg-stone-50" key={index}>
                  {genre}
                </div>
              ))}
            </div>
          </div>
          <AgregarProducto price={gameById?.price} />
        </div>
      </div>
    </>
  );
};

export default GamePage;
