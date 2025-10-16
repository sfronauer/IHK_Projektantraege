"use client"
import { createContext } from 'react';
import { useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState({
      username: "",
      authenticated: false,
      role: "",
      session: ""
    });
  
    return (
      <LoginContext.Provider value={{ login, setLogin }}>
        {children}
      </LoginContext.Provider>
    );
};