"use client"
import { createContext } from 'react';
import { useState } from "react";

export const CombinedAntragContext = createContext();

export const CombinedAntragProvider = ({ children }) => {
    const [combinedAntrag, setCombinedAntrag] = useState([]);

    return (
        <CombinedAntragContext.Provider value={{ combinedAntrag, setCombinedAntrag }}>
            {children}
        </CombinedAntragContext.Provider>
    )
}