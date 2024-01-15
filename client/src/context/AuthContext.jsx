import React, { createContext, useContext, useEffect, useState } from "react";
import { Style, logs } from "../utils/logs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (data) => {
    logs("AuthContext: login", [data], Style.code);
    setUser(data);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
