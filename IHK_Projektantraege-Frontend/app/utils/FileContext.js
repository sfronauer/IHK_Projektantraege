import { createContext } from 'react';
import { useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);


    return (
        <FileContext.Provider value={{ files, setFiles }}>
            {children}
        </FileContext.Provider>
    )
}