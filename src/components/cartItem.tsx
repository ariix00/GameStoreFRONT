import { mdiMinus, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext } from "react";
import { GamesContext } from "../context/GamesContext";
export interface CartItemProps {
  name: string;
  image: string;
  price: number;
  count: number;
  totalPrice: number;
}
const CartItem = ({ name, image, price, count, totalPrice }: CartItemProps) => {
  const {
    increaseCartItemFromCart,
    decreaseCartItemFromCart,
    setCartItem,
    removeCartItemFromCart,
  } = useContext(GamesContext);
  return (
    <div className="flex flex-col  bg-stone-800 p-2 rounded-xl w-full">
      <div className="flex gap-5 w-full h-20 items-center justify-between">
        <div className="flex gap-5 h-11/12">
          <img src={image} alt="" className="h-full rounded-xl" />
          <h2 className="text-sm font-bold">{name}</h2>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex h-fit bg-stone-500 rounded-xl items-center p-1 gap-2">
            <button
              onClick={() =>
                setCartItem((prev) => decreaseCartItemFromCart(name, prev))
              }
            >
              <Icon path={mdiMinus} size={1} />
            </button>
            <p>{count}</p>
            <button
              onClick={() =>
                setCartItem((prev) => increaseCartItemFromCart(name, prev))
              }
            >
              <Icon path={mdiPlus} size={1} />
            </button>
          </div>
          <button
            onClick={() =>
              setCartItem((prev) => removeCartItemFromCart(name, prev))
            }
          >
            <Icon path={mdiTrashCan} size={1} />
          </button>
        </div>
      </div>
      <span className="font-bold">Total: ${totalPrice}</span>
    </div>
  );
};

export default CartItem;
