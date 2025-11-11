import { mdiMinus, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export interface CartItemProps {
  name: string | undefined;
  image: string | undefined;
  price: number | undefined;
  count: number;
}
const CartItem = ({ name, image, price, count }: CartItemProps) => {
  return (
    <div className="flex gap-5 w-full h-20 items-center justify-between bg-stone-800 p-2 rounded-xl">
      <div className="flex gap-5 h-11/12">
        <img src={image} alt="" className="h-full rounded-xl" />
        <h2 className="text-sm font-bold">{name}</h2>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex h-fit bg-stone-500 rounded-xl items-center p-1 gap-2">
          <button>
            <Icon path={mdiMinus} size={1} />
          </button>
          <p>{count}</p>
          <button>
            <Icon path={mdiPlus} size={1} />
          </button>
        </div>
        <button
        // onClick={() => setCartItem((prev: CartItem[]) =>
        //   removeCartItemFromCart(name, cartItem)
        // )}
        >
          <Icon path={mdiTrashCan} size={1} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
