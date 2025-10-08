import { clx } from "../utils/clx";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MetodoDePago = () => {
  const navigate = useNavigate();

  const [efectivo, setEfectivo] = useState(true);
  const pagarEnEfectivo = () => {
    setEfectivo(true);
  };
  const pagarConTarjeta = () => {
    setEfectivo(false);
  };
  return (
    <div className="fixed top-0 left-0 w-full items-center h-full flex flex-col bg-stone-800 text-sm gap-5">
      <div className="w-full">
        <button className="p-2" onClick={() => navigate(-1)}>
          <Icon path={mdiArrowLeft} size={1} />
        </button>
      </div>
      <div className="flex w-full">
        <button
          className={clx(
            "w-11/12 text-center border-2 text-lg font-bold rounded-xl m-2 border-stone-500",
            efectivo ? "bg-green-500" : ""
          )}
          onClick={() => pagarEnEfectivo()}
        >
          Efectivo
        </button>
        <button
          className={clx(
            "w-11/12 text-center border-2 text-lg font-bold rounded-xl m-2 border-stone-500",
            efectivo ? "" : "bg-blue-500"
          )}
          onClick={() => pagarConTarjeta()}
        >
          Mercado Pago
        </button>
      </div>
      <form
        className={clx(
          "w-full flex flex-col items-center gap-2 pt-2",
          efectivo ? "" : "hidden"
        )}
      >
        <p className="w-11/12 text-start text-stone-500">
          Retirar en local: Artigas 2685, CABA
          <br />
          Horarios: Lunes a Sábado de 9:00hs a 20:00hs
        </p>
        <label htmlFor="nombre" className="w-11/12">
          Tu Nombre
        </label>
        <input
          type="text"
          name="nombre"
          className="w-11/12 border-stone-500 border-2 rounded-lg outline-0 p-2"
          placeholder="Pedro"
        />
        <label htmlFor="dni" className="w-11/12 ">
          Tu DNI
        </label>
        <input
          type="text"
          name="dni"
          className="w-11/12 border-stone-500 border-2 rounded-lg outline-0 p-2"
          placeholder="45326088"
        />
        <h1 className="w-11/12 mt-5">Monto a pagar: $40.000</h1>
        <button
          className="w-11/12 p-2 bg-blue-400 text-slate-50 rounded-xl"
          onClick={() => navigate("/FacturaEfectivo")}
        >
          Finalizar Compra
        </button>
      </form>
      <div
        className={clx(
          "w-full flex flex-col items-center gap-2 pt-2",
          efectivo ? "hidden" : ""
        )}
      >
        <button className="w-11/12 p-2 bg-blue-400 text-slate-50 rounded-xl">
          Pagar con Mercado Pago
        </button>
      </div>
    </div>
  );
};

export default MetodoDePago;
