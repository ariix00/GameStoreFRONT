import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import ConsoleGames from "./pages/consoleGames";
import Cart from "./pages/cart";
import MetodoDePago from "./pages/metodoDePago";
import FacturaEfectivo from "./pages/facturaEfectivo";
import GamePage from "./pages/gamePage";
import { GamesProvider } from "./context/GamesProvider";

function App() {
  return (
    <GamesProvider>
      <Router>
        <div className="w-full min-h-screen m-0 p-0 bg-stone-950 flex flex-col items-start text-white relative">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/ConsoleGames/:platformValue"
              element={<ConsoleGames />}
            />
            <Route path="/Game/:id" element={<GamePage />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/MetodoPago" element={<MetodoDePago />} />
            <Route path="/FacturaEfectivo" element={<FacturaEfectivo />} />
          </Routes>
        </div>
      </Router>
    </GamesProvider>
  );
}

export default App;
