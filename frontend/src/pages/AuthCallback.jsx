import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      console.log("Logged in user:", user);
      localStorage.setItem("h-chen-auth-token", token);
      dispatch(loginUser(user));

      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging in...</p>;
}
