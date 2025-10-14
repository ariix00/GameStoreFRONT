interface AgregarProductoProps {
  price: number | undefined;
}
const AgregarProducto = ({ price }: AgregarProductoProps) => {
  return (
    <div className="fixed flex bottom-0 flex-col w-full items-center gap-2 py-5 bg-stone-950">
      <h1 className="font-bold w-11/12 text-lg">${price}</h1>
      <div className="flex justify-around w-11/12 gap-2 h-8">
        <button className="rounded-xl bg-red-500 text-white font-bold flex grow justify-center items-center">
          Comprar Ahora
        </button>
        <button className="rounded-xl  text-white font-bold flex grow justify-center items-center">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default AgregarProducto;
