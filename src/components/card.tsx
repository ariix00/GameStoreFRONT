import { NavLink } from "react-router-dom";
import { clx } from "../utils/clx";
interface CardProps {
  carrouselCard: boolean;
}
const Card = ({ carrouselCard }: CardProps) => {
  return (
    <NavLink
      to="/Game"
      className={clx(
        "text-sm flex  items-center gap-2 pb-5 rounded-2xl  hover:bg-gray-600/25 duration-300",
        carrouselCard ? "w-52 min-w-52 flex-col" : "w-11/12 justify-between"
      )}
    >
      <img
        src="/src/assets/persona5.webp"
        className={clx(
          " rounded-2xl h-auto",
          carrouselCard ? "w-48 min-w-48" : "w-32 min-w-32"
        )}
        alt=""
      />
      <div className="w-11/12 flex flex-col items-start justify-start rounded-2xl h-full font-bold text-lg grow">
        <h2 className="">Persona 5 Standard Edition PS4</h2>
        <h2 className="">$40.000</h2>
      </div>
      <button className="font-bold text-stone-950 bg-stone-100 rounded-xl p-2">
        Agregar al Carrito
      </button>
    </NavLink>
  );
};
export default Card;
