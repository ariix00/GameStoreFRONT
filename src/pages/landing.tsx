/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import PlatformChoice from "../components/plarformChoice";
import { api } from "../config";
import { useNavigate } from "react-router-dom";
import type { UUID } from "../types";
import Card from "../components/card";
import { getImageUrl } from "../utils/getImageUrl";

interface LatestGameData {
  latestGame: LatestGame;
  latestGames: LatestGames[];
}
interface LatestGame {
  description: string;
  images: LatestGameImages[];
  name: string;
  id: UUID;
}
interface LatestGames {
  description: string;
  imageUrl: string;
  name: string;
  id: UUID;
  price: number;
}
interface LatestGameImages {
  type: string;
  url: string;
}
const Landing = () => {
  const [latestGame, setLatestGame] = useState<LatestGameData | null>(null);

  const [platform, setPlatform] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(`${api}getLatestGame`);
        const response: LatestGameData = await data.json();
        setLatestGame(response);
      } catch (error) {
        console.log("error fetching data", error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar retroceso={false} />
      {latestGame && (
        <div className="gap-10 flex flex-col w-full">
          <div className="w-full h-fit relative text-sm">
            <div className="absolute z-10 flex flex-col justify-end items-center w-full h-full">
              <div className="flex flex-col gap-5 p-14 items-center">
                <img
                  src={getImageUrl(latestGame.latestGame.images, "title")}
                  className=" max-h-40"
                />

                <h1 className="text-white font-semibold text-justify">
                  {latestGame.latestGame.description}
                </h1>
                <button
                  className="font-bold bg-white text-black py-3 px-10 rounded-xl cursor-pointer hover:bg-black hover:text-white duration-300"
                  onClick={() => navigate(`/Game/${latestGame.latestGame.id}`)}
                >
                  Compra Ya!
                </button>
                <button className="font-bold text-white cursor-pointer hover:text-yellow-300 duration-300">
                  Agregar al carrito
                </button>
              </div>
            </div>
            <img
              src={getImageUrl(latestGame.latestGame.images, "secondary")}
              alt=""
              className="h-[70vh] w-full brightness-50 object-cover"
            />
          </div>
          <h1 className="text-white font-bold w-11/12 text-lg text-center m-0">
            Selecciona tu Plataforma
          </h1>
          <PlatformChoice />
          <div className="w-full flex flex-col text-xl gap-5 items-center overflow-x-scroll">
            <h1 className="text-white font-bold w-11/12 text-lg m-0">
              Podría interesarte
            </h1>
            <div className="flex gap-5 w-11/12 pb-10">
              {latestGame.latestGames ? (
                latestGame.latestGames.map((game, index) => (
                  <Card
                    id={game.id}
                    carrouselCard={true}
                    name={game.name}
                    imageUrl={game.imageUrl}
                    price={game.price}
                    key={index}
                  />
                ))
              ) : (
                <h3>No hay juegos epte</h3>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
