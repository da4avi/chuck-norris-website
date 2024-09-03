import { Link } from 'react-router-dom';
import './styles.css';
import { useState, useRef, useEffect } from 'react';

function Nav() {
    const [isActive, setIsActive] = useState(false);
    const navRef = useRef(null);

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
                    <img src="#" alt="Who was Chuck Norris" width={80} height="auto" />
                </figure>
                <ul className={`navLinksGroup ${isActive ? "navActive" : ""}`}>
                    <li onClick={removeActive} className="navLink"><Link to="/">Home</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/jokes">Jokes</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/aboutthechucknorris">About Chuck Norris</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/aboutthecreators">About the creators</Link></li>
                    <li onClick={removeActive} className="navLink"><Link to="/login">Login</Link></li>
                </ul>
                <div className={`hamburger ${isActive ? "navActive" : ""}`} onClick={toggleActiveClass}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </nav>
        </>
    );
}

export default Nav;