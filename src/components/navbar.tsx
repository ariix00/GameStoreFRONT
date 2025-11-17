import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { clx } from "../utils/clx";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
interface NavBarProps {
  retroceso: boolean;
}
const Navbar = ({ retroceso }: NavBarProps) => {
  const { cartCount, cartItem, setCartCount, cartCountFunction } =
    useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    setCartCount(() => cartCountFunction(cartItem, 0));
  }, [cartItem]);
  return (
    <div className="w-full sticky m-0 flex justify-between z-20 bg-stone-950 p-3 pt-5">
      <button
        className={clx("", retroceso ? "block" : "hidden")}
        onClick={() => navigate("/")}
      >
        <Icon path={mdiArrowLeft} size={1} />
      </button>
      <div className="w-10/12 bg-stone-800 px-2 rounded-2xl flex flex-col justify-center">
        <input
          type="text"
          placeholder="Busca cualquier juego"
          className="text-stone-100 text-sm outline-0 px-2"
        />
      </div>
      <div>
        <div className="rounded-full bg-red-400 text-white">{cartCount}</div>
        <button onClick={() => navigate("/Cart")}>
          <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
