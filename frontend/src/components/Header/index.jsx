import { Link } from 'react-router-dom';
import './styles.css';
import { useState, useRef, useEffect, useContext } from 'react';
import chuckNorrisIcon from "../../assets/chuckNorrisIcon.webp"
import { useTranslation } from 'react-i18next'
import Logout from '../General/Logout';
import { AuthContext } from '../../auth/Context';

function Nav() {
    const [isActive, setIsActive] = useState(false);
    const navRef = useRef(null);
    const { role } = useContext(AuthContext);
    const [t, i18n] = useTranslation("global")

    const changeLang = (lang) => {
        i18n.changeLanguage(lang)
    }

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
        document.addEventListener('mousedown', handleClickOutside);

        document.body.style.overflow = isActive ? 'hidden' : 'auto';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isActive]);

    return (
        <>
            <div
                className={`overlay ${isActive ? "overlayActive" : ''}`}
                onClick={removeActive}
            ></div>

            <nav ref={navRef} className="nav">
                <figure className="imgBox">
                    <img className='chuck-norris-icon' src={chuckNorrisIcon} alt="Who was Chuck Norris" width={49} height="auto" />
                </figure>
                <ul className={`navLinksGroup ${isActive ? "navActive" : ""}`}>
                    <li onClick={removeActive} className="navLink"><Link to="/">Home</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/jokes">Jokes</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/aboutchucknorris">About Chuck Norris</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/aboutthecreators">About the creators</Link></li>
                    {role === "admin" ? (
                        <li onClick={removeActive} className="navLink"><Link to="/admin">Admin</Link></li>
                    ) : (
                        <li onClick={removeActive} className="navLink"><Link to="/yoursjokes">Make your own jokes</Link></li>
                    )}
                    <li><button onClick={() => changeLang("en")} className='m-2'>en</button></li>
                    <li><button onClick={() => changeLang("pt")} className='m-2'>pt</button></li>
                </ul>
                <div className={`hamburger ${isActive ? "navActive" : ""}`} onClick={toggleActiveClass}>
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