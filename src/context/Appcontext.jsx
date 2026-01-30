import React, { createContext,useContext,useState,useEffect } from "react";
import { environment } from "../environments/environment";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const BASE_URL = environment.API_BASE_URL;
  const [token, setToken] = useState(null);

  //let token = localStorage.getItem("token");
   useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('token');
      setToken(data);
    }
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        BASE_URL,
        token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Hook to use context safely
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

