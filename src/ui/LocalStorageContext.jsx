import { createContext, useState, useEffect } from "react";

const LocalStorageContext = createContext();

const LocalStorageProvider = ({ children }) => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(value));
    }, [value]);

    return (
        <LocalStorageContext.Provider value={{ value, setValue }}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export { LocalStorageContext, LocalStorageProvider };
