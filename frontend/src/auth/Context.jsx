/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const isValidToken = (token) => {
  try {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decode.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const getRole = (token) => {
  try {
    const decode = jwtDecode(token);
    console.log("jwtDecode", decode);
    return decode.role;
  } catch (error) {
    return false;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    setRole(getRole(newToken)); //funçao p pegar a role do token
    localStorage.setItem("token", newToken);
  };
  const logout = () => {
    setToken(null);
    setRole(null); //funçao p pegar a role do token
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage && isValidToken(storage)) {
      setToken(storage);
      setRole(getRole(storage));
    } else {
      setToken(null);
      setRole(null);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
