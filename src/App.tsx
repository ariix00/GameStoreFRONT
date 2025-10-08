import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import ConsoleGames from "./pages/consoleGames";
import Game from "./pages/game";
import Cart from "./pages/cart";
import MetodoDePago from "./pages/metodoDePago";
import FacturaEfectivo from "./pages/facturaEfectivo";

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen m-0 p-0 bg-stone-950 flex flex-col items-center gap-10 text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ConsoleGames" element={<ConsoleGames />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/MetodoPago" element={<MetodoDePago />} />
          <Route path="/FacturaEfectivo" element={<FacturaEfectivo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
