import AgregarProducto from "../components/agregarProducto";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../config";
import type { GameById } from "../types";
import Navbar from "../components/navbar";
import { getImageUrl } from "../utils/getImageUrl";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const query = `${api}getGameById/${id}`;
  const [gameById, setGameById] = useState<GameById | null>(null);
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
  return (
    <>
      <Navbar retroceso={true} />
      {gameById ? (
        <div
          className="relative bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(
              gameById.images,
              "secondary"
            )})`,
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 flex flex-col items-center gap-5 h-screen w-screen text-sm backdrop-blur-xl pt-20">
            <div className="flex w-full justify-center h-72 p-2">
              <img
                src={getImageUrl(gameById.images, "primary")}
                alt=""
                className="h-72 text-sm rounded-2xl"
              />
            </div>
            <div className="w-11/12 flex flex-col">
              <h1 className="w-full text-end font-medium text-stone-500">
                Restantes: {gameById.stock}
              </h1>
              <h1 className="text-lg font-bold">{gameById.name}</h1>
              <h2 className="text-lg font-regular">${gameById.price}</h2>
            </div>
            <div className="w-11/12">{gameById.description}</div>
            <div className="w-11/12 flex flex-col gap-2">
              <h1 className=" font-bold">Géneros:</h1>
              <div className="flex flex-wrap text-stone-950 gap-1">
                {gameById.genres.map((genre, index) => (
                  <div className="rounded-2xl px-2 bg-stone-50" key={index}>
                    {genre}
                  </div>
                ))}
              </div>
            </div>

            <AgregarProducto
              stock={gameById.stock}
              price={gameById.price}
              image={getImageUrl(gameById.images, "primary")}
              name={gameById.name}
            />
          </div>
        </div>
      ) : (
        <h2 className="w-full">Cargando página...</h2>
      )}
    </>
  );
};

export default GamePage;
