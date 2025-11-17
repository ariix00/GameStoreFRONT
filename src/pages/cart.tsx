import Icon from "@mdi/react";
import CartItem from "../components/cartItem";
import { useNavigate } from "react-router-dom";
import { mdiArrowLeft } from "@mdi/js";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItem } = useContext(CartContext);
  return (
    <>
      <div className="w-full flex flex-col items-center p-2">
        <div className="w-full">
          <button onClick={() => navigate(-1)}>
            <Icon path={mdiArrowLeft} size={1} />
          </button>
        </div>
        <h1 className="w-11/12 text-start font-bold text-lg p-2">Carrito</h1>
        <h2 className="w-11/12 text-start font-bold text-sm p-2">Productos</h2>
        <div className="w-11/12 flex flex-col gap-5 border-b-2 border-stone-500 pb-2">
          {cartItem ? (
            cartItem.map((item, index) => (
              <CartItem
                key={index}
                count={item.count}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <h1 className="text-white">No hay juegos agregados :p</h1>
          )}
        </div>
      </div>
      <div className="fixed flex bottom-0 flex-col w-full items-center gap-2 py-5 bg-stone-800">
        <h1 className="font-bold w-11/12 text-lg">Total: $40.000</h1>
        <div className="flex justify-around w-11/12 gap-2 h-8">
          <button
            className="rounded-xl bg-red-500 text-white font-bold flex grow justify-center items-center"
            onClick={() => navigate("/metodoPago")}
          >
            Ir a Pagar
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
