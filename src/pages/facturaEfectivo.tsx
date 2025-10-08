import { mdiDownload } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

const FacturaEfectivo = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center text-black bg-white">
      <h1 className="w-11/12 text-center text-xl font-black">
        ¡Compra realizada con éxito!
      </h1>
      <p className="w-11/12 text-center text-sm">
        Gracias por comprar en XXXX_XXXX. Para retirar su compra concurra al
        local con sus datos y la factura correspondiente, ya sea impresa o desde
        su celular.
      </p>
      <button className="bg-stone-950 text-white font-bold p-2 px-5 rounded-xl m-2 flex">
        <Icon path={mdiDownload} size={1} />
        Descargar Factura
      </button>
      <div className="flex flex-col w-11/12">
        <p className="w-full font-bold">Nro de Compra:</p>
        <p>42V64863M9838052X</p>
      </div>
      <div className="flex flex-col w-11/12">
        <p className="w-full font-bold">Fecha de Compra:</p>
        <p>03/10/2025</p>
      </div>
      <div className="h-2"></div>
      <div className="flex flex-col w-11/12">
        <p className="w-full font-bold">Compra de</p>
        <p>Pedro Ferraioli</p>
      </div>
      <div className="flex flex-col w-11/12 border-b-1 border-stone-500">
        <p className="w-full font-bold">Nro de DNI:</p>
        <p>45326088</p>
      </div>
      <div className="w-11/12 flex border-b-1 border-stone-400">
        <div className="flex flex-col gap-2 w-1/2 py-5 text-stone-500">
          <div className="flex flex-col w-full">
            <p className="w-full  text-wrap">
              X5 Persona 5 Standard Edition PS4
            </p>
            <p>$40.000</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="w-full  text-wrap">
              X5 Persona 5 Standard Edition PS4
            </p>
            <p>$40.000</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="w-full  text-wrap">
              X5 Persona 5 Standard Edition PS4
            </p>
            <p>$40.000</p>
          </div>
        </div>
        <div className="font-bold flex flex-col w-1/2 py-5 items-end justify-start">
          <h1>Total</h1>
          <p>$200.000</p>
        </div>
      </div>
      <button
        className="w-11/12 bg-stone-950 text-white font-bold p-2 rounded-xl"
        onClick={() => navigate("/")}
      >
        Cerrar
      </button>
    </div>
  );
};

export default FacturaEfectivo;
