import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../config";
interface Platforms {
  name: string;
  url: string;
}
const PlatformChoice = () => {
  const [platforms, setPlatforms] = useState<Platforms[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(`${api}getPlatforms`);
        const response = await data.json();
        setPlatforms(response);
        console.log(response);
      } catch (error) {
        console.log("error fetching databro", error);
      }
    })();
  }, []);
  return (
    <div className="flex gap-10 w-11/12 text-sm justify-center">
      {platforms.map((platform) => (
        <NavLink to="/ConsoleGames">
          <div className=" flex flex-col gap-2 items-center">
            <button className="rounded-4xl bg-white h-16 w-16 flex justify-center items-center p-2">
              <img alt="" className="w-full" src={platform.url}></img>
            </button>
            {platform.name}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default PlatformChoice;
