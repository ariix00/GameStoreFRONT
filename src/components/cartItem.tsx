import { mdiMinus, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";

const CartItem = () => {
  return (
    <div className="flex gap-5 w-full h-20 items-center bg-stone-800 p-2 rounded-xl">
      <div className="flex gap-5 h-11/12">
        <img
          src="/src/assets/persona5.webp"
          alt=""
          className="h-full rounded-xl"
        />
        <h2 className="text-sm font-bold">Persona 5 Standard Edition PS4</h2>
      </div>
      <div className="flex p-2 bg-stone-500 h-1/3 items-center rounded-xl   ">
        <button>
          <Icon path={mdiMinus} size={1} />
        </button>
        <p className="p-2">2</p>
        <button>
          <Icon path={mdiPlus} size={1} />
        </button>
      </div>
      <Icon path={mdiTrashCan} size={1} />
    </div>
  );
};

export default CartItem;
