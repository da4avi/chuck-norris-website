import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/index"
import About from "../pages/About/index"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}