import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UpdateJoke from "../components/MakeYoursJokes/update/UpdateJoke";
import AboutChuckNorris from "../pages/AboutChuckNorris/index";
import AboutTheCreators from "../pages/AboutTheCreators";
import Admin from "../pages/Admin";
import Home from "../pages/Home/index";
import Jokes from "../pages/Jokes";
import Login from "../pages/Login";
import MakeYoursJokes from "../pages/MakeYoursJokes";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../components/UserProfile";
import AdminCategories from "../pages/Admin/Categories";
import AdminUsers from "../pages/Admin/Users";
import AccessCode from "../pages/AcessCode";

export default function AppRoutes() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/access-code" element={<AccessCode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/aboutchucknorris" element={<AboutChuckNorris />} />
            <Route path="/jokes" element={<Jokes />} />
            <Route path="/aboutthecreators" element={<AboutTheCreators />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/yoursjokes" element={<MakeYoursJokes />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-joke/:jokeId" element={<UpdateJoke />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}
