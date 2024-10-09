import { useContext } from "react";
import { AuthContext } from "../auth/Context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    //pegar o token
    const { token } = useContext(AuthContext)
    //verificar o token
    if (!token) {
        return <Navigate to = "/login"/>
    }
    //redirecionar
    return <Outlet />
}

export default PrivateRoute;