import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/index"
import AboutChuckNorris from "../pages/AboutChuckNorris/index"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<AboutChuckNorris />} />
                    </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}