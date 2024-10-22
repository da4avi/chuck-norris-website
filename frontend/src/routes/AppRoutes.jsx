import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/index"
import AboutChuckNorris from "../pages/AboutChuckNorris/index"
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutTheCreators from "../pages/AboutTheCreators";
import Jokes from "../pages/Jokes";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../auth/Context";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />

                        <Route element={<PrivateRoute />}>
                            <Route path='/aboutchucknorris' element={<AboutChuckNorris />} />
                            <Route path='/jokes' element={<Jokes />} />
                            <Route path='/aboutthecreators' element={<AboutTheCreators />} />
                        </Route>

                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
                    <Footer />
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}