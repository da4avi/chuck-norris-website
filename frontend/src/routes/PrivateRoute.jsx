import { useContext } from "react";
import { AuthContext } from "../auth/Context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
