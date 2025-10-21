import { NavLink } from "react-router-dom";
import { clx } from "../utils/clx";
import type { UUID } from "../types";
interface CardProps {
  carrouselCard: boolean;
  name: string;
  price: number;
  imageUrl: string;
  id: UUID;
}
const Card = ({ carrouselCard, name, price, imageUrl, id }: CardProps) => {
  return (
    <NavLink
      to={`/Game/${id}`}
      className={clx(
        "text-sm flex items-center bg-gray-600/25 hover:bg-gray-500/25 duration-300",
        carrouselCard
          ? "w-52 min-w-52 flex-col rounded-2xl gap-2 pb-5"
          : "w-full border-b-1 border-slate-400/25"
      )}
    >
      <img
        src={imageUrl}
        className={clx(
          "h-auto",
          carrouselCard ? "my-5 min-h-52 max-h-52" : "m-2 min-h-32 max-h-32"
        )}
        alt=""
      />
      <div
        className={clx(
          "flex flex-col w-full  items-start h-11/12",
          carrouselCard ? "justify-start" : "justify-between"
        )}
      >
        <div className="w-10/12 flex flex-col items-start justify-start rounded-2xl font-bold text-lg gap-4">
          <h2 className="font-normal text-sm">{name}</h2>
          <h2 className="font-semibold text-xl">${price}</h2>
        </div>
        <div
          className={clx(
            "w-full flex",
            carrouselCard ? "justify-start" : "justify-end"
          )}
        >
          <button className="font-black text-orange-400 rounded-xl cursor-pointer hover:text-orange-100 duration-200 mr-2">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </NavLink>
  );
};
export default Card;
