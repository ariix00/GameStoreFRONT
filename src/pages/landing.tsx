/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import PlatformChoice from "../components/plarformChoice";
import { api } from "../config";
import { useNavigate } from "react-router-dom";
import type { UUID } from "../types";
interface LatestGame {
  description: string;
  images: LatestGameImages[];
  name: string;
  id: UUID;
}
interface LatestGameImages {
  type: string;
  url: string;
}
const Landing = () => {
  const [latestGame, setLatestGame] = useState<LatestGame>();
  const [platform, setPlatform] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(`${api}getLatestGame`);
        const response = await data.json();
        setLatestGame(response);
        console.log(response);
      } catch (error) {
        console.log("error fetching data", error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar retroceso={false} />
      <div className="w-full h-fit relative text-sm">
        <div className="absolute z-10 flex flex-col justify-end items-center w-full h-full">
          <div className="flex flex-col gap-5 p-14 items-center">
            <img
              src={
                latestGame
                  ? latestGame.images.find((image) => {
                      return image.type == "title";
                    })?.url
                  : ""
              }
              alt=""
              className="w-11/12"
            />
            <h1 className="text-white font-semibold text-justify">
              {latestGame?.description}
            </h1>
            <button
              className="font-bold bg-white text-black py-3 px-10 rounded-xl"
              onClick={() => navigate(`/Game/${latestGame?.id}`)}
            >
              Compra Ya!
            </button>
            <button className="font-bold text-white">Añadir al carrito</button>
          </div>
        </div>
        <img
          src={
            latestGame
              ? latestGame.images.find((image) => {
                  return image.type == "secondary";
                })?.url
              : ""
          }
          alt=""
          className="h-screen w-full brightness-50 object-cover"
        />
      </div>
      <h1 className="text-white font-bold w-11/12 text-lg text-center m-0">
        Selecciona tu Plataforma
      </h1>
      <PlatformChoice setPlatform={setPlatform} />
      <div className="w-full flex flex-col text-xl gap-5 items-center">
        <h1 className="text-white font-bold w-11/12 text-lg m-0">
          Podría interesarte
        </h1>
        <div className="flex gap-5 w-11/12 pb-10">aguante mitsuri</div>
      </div>
    </>
  );
};

export default Landing;
