import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/Context";
import "./styles/logout.css";
import { useContext, useState, useEffect } from "react";

export default function Logout() {
  const { logout, token } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (isOpen && !event.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="logout-container">
      {token ? (
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={toggleDropdown}
            aria-label="Menu"
          >
            Menu
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Link to="/yoursjokes">My Jokes</Link>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      ) : (
        <button className="logout-button" aria-label="Login">
          <Link onClick={logout} to="/login" aria-label="Login">
            Login
          </Link>
        </button>
      )}
    </div>
  );
}
