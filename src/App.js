import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "swiper/css";
import { CartProvider } from "react-use-cart";
// ** Redux Imports

import ScrollToTop from "./component/layout/ScrollToTop";
import ErrorPage from "./page/404";

import Produit from "./page/prduit";

import Externat from "./page/services/Etudiant-Externat";
import Cours from "./page/services/Cours";
import Page from "./page/admin/Page";
import Ipopage from "./page/Ipopage";
import Cart from "./page/cart";
import "./index.scss";
import LoginPage from "./page/login";
import SignupPage from "./page/singin";
import Commande from "./page/admin/commandePage";
import AdminLayout from "./component/layout/AdminLayout";
import Products from "./page/admin/products";
import ProduitFac from "./page/admin/produitFac";
import Prix from "./page/admin/Prix";
import { useDispatch } from "react-redux"; // ** Utils

import { attemptGetUser } from "./redux/thunks/user";
import CommandeList from "./page/CommandeList";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);
  return (
    <BrowserRouter>
      {!loading && (
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* partie client */}
            <Route path="/" element={<Ipopage />} />

            <Route path="Produit" element={<Produit />} />
            <Route path="Etudiant-Externat" element={<Externat />} />
            <Route path="Cours" element={<Cours />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="profile" element={<CommandeList />} />
            <Route path="signup" element={<SignupPage />} />
            {/* fin  partie client */}
            <Route path="*" element={<ErrorPage />} />

            {/* partie admin */}
            <React.Fragment>
              <Route path="/commande" element={<Commande />} />
            </React.Fragment>

            <Route path="/Prix" element={<Prix />} />
            <Route path="/admin" element={<Page />} />
            <Route
              path="/Ouvrages Medicaux"
              element={<Products name="Ouvrages Medicaux" />}
            />
            <Route
              path="/Concours ECN Tunisie"
              element={<Products name="Concours ECN Tunisie" />}
            />
            <Route path="/Sfax" element={<ProduitFac name="Sfax" />} />
            <Route path="/Sousse" element={<ProduitFac name="Sousse" />} />
            <Route path="/Monastir" element={<ProduitFac name="Monastir" />} />
            <Route path="/Tunis" element={<ProduitFac name="Tunis" />} />
            {/*fin partie admin */}
          </Routes>
        </CartProvider>
      )}
    </BrowserRouter>
  );
}

export default App;
