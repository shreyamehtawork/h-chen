import react from "react";
import { Route, Routes } from "react-router-dom";
import UserHistory from "../pages/user/UserHistory";
import { useSelector } from "react-redux";
import Wishlist from "../pages/user/Wishlist";
import Cart from "../pages/user/Cart";
import CheckoutPage from "../pages/Checkout";

const UserRoute = () => {
  const { userData } = useSelector((state) => state.auth); //fore checking user
  // console.log("USER..", userData);

  return userData ? (
    <div>
      <Routes>
        <Route path="cart" element={<Cart />} />
        <Route path="userhistory" element={<UserHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  ) : null;
};

export default UserRoute;
