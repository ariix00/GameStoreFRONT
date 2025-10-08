import { NavLink } from "react-router-dom";

const ViewsCommand = () => {
  return (
    <div className="flex flex-col gap-5 p-10 border-t-1 w-full">
      <NavLink to="/">
        <button>MAIN</button>
      </NavLink>
      <NavLink to="/ConsoleGames">
        <button>CONSOLE GAMES</button>
      </NavLink>
      <NavLink to="/Game">
        <button>GAME</button>
      </NavLink>
    </div>
  );
};

export default ViewsCommand;
