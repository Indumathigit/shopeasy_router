import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

function App() {

  const cart = useRef([]);

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<ProductsPage cart={cart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;