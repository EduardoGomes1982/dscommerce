import { useEffect, useState } from "react";
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/auth";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import ClientHome from "./routes/ClientHome";
import Cart from "./routes/ClientHome/Cart";
import Catalog from "./routes/ClientHome/Catalog";
import Login from "./routes/ClientHome/Login";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import * as authService from "./services/auth-service";
import * as cartService from "./services/cart-service";
import { ContextCartCount } from "./utils/context-cart";
import { ContextToken } from "./utils/context-token";
import { history } from './utils/history';

export default function App(): JSX.Element {
  const [contextCartCount, setContextCartCount] = useState<number>(0);
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    setContextCartCount(cartService.getCart().items.length);
    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product-details/:productId" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/admin" element={<PrivateRoute children={<Admin />} roles={["ROLE_ADMIN"]} />}>
              <Route index element={<AdminHome />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}
