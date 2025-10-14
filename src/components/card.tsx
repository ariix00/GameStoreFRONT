import { NavLink } from "react-router-dom";
import { clx } from "../utils/clx";
interface CardProps {
  carrouselCard: boolean;
  name: string;
  price: number;
  imageUrl: string;
}
const Card = ({
  carrouselCard,

  name,
  price,

  imageUrl,
}: CardProps) => {
  return (
    <NavLink
      to="/Game/id?console=PS4"
      className={clx(
        "text-sm flex  items-center gap-2 pb-5 rounded-2xl  hover:bg-gray-600/25 duration-300",
        carrouselCard ? "w-52 min-w-52 flex-col" : "w-11/12 justify-between"
      )}
    >
      <img
        src={imageUrl}
        className={clx(
          " rounded-2xl h-auto",
          carrouselCard ? "w-48 min-w-48" : "w-32 min-w-32"
        )}
        alt=""
      />
      <div className="w-11/12 flex flex-col items-start justify-start rounded-2xl h-full font-bold text-lg grow">
        <h2 className="">{name}</h2>
        <h2 className="">{price}</h2>
      </div>
      <button className="font-bold text-stone-950 bg-stone-100 rounded-xl p-2">
        Agregar al Carrito
      </button>
    </NavLink>
  );
};
export default Card;
