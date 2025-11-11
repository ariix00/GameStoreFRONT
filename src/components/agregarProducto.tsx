import { mdiMinus, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { CartContext } from "../context/CartContext";
import { useContext, useState } from "react";
import { clx } from "../utils/clx";

interface AgregarProductoProps {
  price: number | undefined;
  name: string | undefined;
  image: string | undefined;
  stock: number | undefined;
}
const AgregarProducto = ({
  name,
  image,
  price,
  stock,
}: AgregarProductoProps) => {
  const [count, setCount] = useState<number>(1);
  const { handleCartItem, cartItem, addCartNotAvailable } =
    useContext(CartContext);

  return (
    <div className="fixed flex bottom-0 flex-col w-full items-center gap-2 py-5 bg-stone-950">
      <h1
        className={clx(
          "text-red-400",
          addCartNotAvailable ? "block" : "hidden"
        )}
      >
        Límite de stock
      </h1>
      <h1 className="font-bold w-11/12 text-lg">${price}</h1>
      <div className="flex justify-around w-11/12 gap-2 h-8">
        <div className="flex justify-around p-2 1/2 border-1 border-stone-500 h-full w-5/12 items-center rounded-2xl">
          <button
            onClick={() => {
              if (count >= 2) {
                setCount(count - 1);
              }
            }}
          >
            <Icon path={mdiMinus} size={1} />
          </button>
          <p className="p-2">{count}</p>
          <button
            onClick={() => {
              if (stock) {
                if (count < stock) {
                  setCount(count + 1);
                }
              }
            }}
          >
            <Icon path={mdiPlus} size={1} />
          </button>
        </div>
        <button
          className="rounded-2xl bg-orange-500 p-2 w-7/12 text-white font-bold flex justify-center items-center"
          onClick={() =>
            handleCartItem(
              {
                name: name,
                image: image,
                price: price,
                count: count,
                stock: stock,
              },
              cartItem
            )
          }
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default AgregarProducto;
