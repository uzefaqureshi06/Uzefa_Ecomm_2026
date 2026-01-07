import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import CategoryProducts from "./components/products/CategoryProducts";
import Auth from "./components/auth/Auth";
import useAuthenticated from "./hooks/useAuthenticate";
import "./App.css";
import Home from "./components/Home";
import Checkout from "./components/payment/Checkout";
import Success from "./components/payment/Success";

function App() {
  const { isAuthenticated } = useAuthenticated();
  return (
    <>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />

        {/* CATEGORY PRODUCTS */}
        <Route path="/category/:categoryId" element={<CategoryProducts />} />

        {/* AUTH PAGE (JUST UI) */}
        <Route
          path="/auth"
          element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </>
  );
}

export default App;
