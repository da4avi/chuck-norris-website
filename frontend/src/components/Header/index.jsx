import { Link } from "react-router-dom";
import "./styles.css";
import { useState, useRef, useEffect, useContext } from "react";
import chuckNorrisIcon from "../../assets/chuckNorrisIcon.webp";
import { useTranslation } from "react-i18next";
import Logout from "../General/Logout";
import { AuthContext } from "../../auth/Context";
import englishFlag from "../../assets/english.webp";
import brFlag from "../../assets/br.webp";

function Nav() {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef(null);
  const { role } = useContext(AuthContext);
  const [t, i18n] = useTranslation("global");

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    document.body.style.overflow = isActive ? "hidden" : "auto";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isActive]);

  return (
    <>
      <div
        className={`overlay ${isActive ? "overlayActive" : ""}`}
        onClick={removeActive}
      ></div>

      <nav ref={navRef} className="nav">
        <figure className="imgBox">
          <img
            className="chuck-norris-icon"
            src={chuckNorrisIcon}
            alt="Who was Chuck Norris"
            width={49}
            height="auto"
          />
        </figure>
        <ul className={`navLinksGroup ${isActive ? "navActive" : ""}`}>
          <li onClick={removeActive} className="navLink">
            <Link to="/">{t("navhome")}</Link>
          </li>
          <li onClick={removeActive} className="navLink">
            <Link to="/jokes">{t("navjokes")}</Link>
          </li>
          <li onClick={removeActive} className="navLink">
            <Link to="/aboutchucknorris">{t("navabtcn")}</Link>
          </li>
          <li onClick={removeActive} className="navLink">
            <Link to="/aboutthecreators">{t("navabttc")}</Link>
          </li>
          {role === "admin" ? (
            <li onClick={removeActive} className="navLink">
              <Link to="/admin">Admin</Link>
            </li>
          ) : (
            <li onClick={removeActive} className="navLink">
              <Link to="/yoursjokes">{t("navmakeyour")}</Link>
            </li>
          )}
          <li>
            <img
              src={englishFlag}
              width={25}
              height={25}
              loading="lazy"
              onClick={() => changeLang("en")}
              className="headerFlag"
            />
          </li>
          <li>
            <img
              src={brFlag}
              width={25}
              height={25}
              loading="lazy"
              onClick={() => changeLang("pt")}
              className="headerFlag"
            />
          </li>
        </ul>
        <div
          className={`hamburger ${isActive ? "navActive" : ""}`}
          onClick={toggleActiveClass}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <Logout />
      </nav>
    </>
  );
}

export default Nav;
