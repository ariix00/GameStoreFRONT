import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../config";
interface Platforms {
  name: string;
  url: string;
}
interface PlatformsChoiceProps {
  setPlatform: (x: string) => void;

  setConsoles: (x: string) => void;
}
const PlatformChoice = ({
  setPlatform,

  setConsoles,
}: PlatformsChoiceProps) => {
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
  // const consoleReset = (x: string) => {
  //   if (x != consoles) {
  //     setConsoles("");
  //   }
  // };
  return (
    <div className="flex gap-10 w-11/12 text-sm justify-center overflow-x-scroll">
      {platforms.map((platform, index) => (
        <NavLink to={`/ConsoleGames?platform=${platform.name}`} key={index}>
          <div className=" flex flex-col gap-2 items-center">
            <button
              onClick={() => (setPlatform(platform.name), setConsoles(""))}
              className="rounded-4xl bg-white h-16 w-16 flex justify-center items-center p-2"
            >
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
