import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/index"
import AboutChuckNorris from "../pages/AboutChuckNorris/index"
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutTheCreators from "../pages/AboutTheCreators";
import Jokes from "../pages/Jokes";
import Register from "../pages/Register";
import Login from "../pages/Login";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/aboutchucknorris' element={<AboutChuckNorris />} />
                    <Route path='/jokes' element={<Jokes />} />
                    <Route path='/aboutthecreators' element={<AboutTheCreators />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}