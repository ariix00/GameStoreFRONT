import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clx } from "../utils/clx";
import { useContext, useEffect, useState } from "react";
import { GamesContext } from "../context/GamesContext";
interface NavBarProps {
  retroceso: boolean;
}
const Navbar = ({ retroceso }: NavBarProps) => {
  const { cartCount, cartItem, setCartCount, cartCountFunction, platform } =
    useContext(GamesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const searchParam = searchParams.get("searchQuery");
    if (!searchParam) return;
    setSearch(searchParam);
  }, []);
  const navigate = useNavigate();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setCartCount(() => cartCountFunction(cartItem, 0));
  }, [cartItem]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/consoleGames/${platform}?searchQuery=${search}`);
    }
  };

  return (
    <div className="w-full sticky top-0 m-0 flex justify-between z-20 bg-stone-950 p-3 pt-5">
      <button
        className={clx("", retroceso ? "block" : "hidden")}
        onClick={() => navigate(-1)}
      >
        <Icon path={mdiArrowLeft} size={1} />
      </button>
      <div className="w-10/12 bg-stone-800 px-2 rounded-2xl flex flex-col justify-center">
        <input
          type="text"
          // defaultValue={search}
          value={search}
          placeholder="Busca cualquier juego"
          className="text-stone-100 text-sm outline-0 px-2"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex">
        <div
          className={clx(
            "flex rounded-full bg-red-400 text-white text-center h-6 w-6 items-center justify-center",
            cartCount < 1 ? "hidden" : ""
          )}
        >
          {cartCount}
        </div>
        <button onClick={() => navigate("/Cart")}>
          <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
