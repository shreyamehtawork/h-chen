import react from "react";
import { Route, Routes } from "react-router-dom";
import UserHistory from "../pages/user/UserHistory";
import { useSelector } from "react-redux";
import Wishlist from "../pages/user/Wishlist";

import Cart from "../pages/user/Cart";

const UserRoute = () => {
  const { userData } = useSelector((state) => state.auth); //fore checking user
  console.log("USER..", userData);

  return userData && userData.token ? (
    <div>
      <Routes>
        <Route path="cart" element={<Cart />} />
        <Route path="userhistory" element={<UserHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  ) : null;
};

export default UserRoute;
