	// src/components/Revamp/context/PageContext.js
import { createContext, useContext, useState } from "react";

// ✅ Create Context
const PageContext = createContext(null); 


// ✅ Provider Component
export const PageProvider = ({ children }) => {
  const [pageLabelName, setPageLabelName] = useState("home");
  const [deviceType, setDeviceType] = useState("desktop");
  const [windowType, setWindowType] = useState("large");
  const [prerequisiteData, setPrerequisiteData] = useState('');
  const [isPrerequisiteLoaded, setIsPrerequisiteLoaded] = useState(false);

  return (
    <PageContext.Provider value={{ 
      pageLabelName, setPageLabelName, 
      deviceType, setDeviceType, 
      prerequisiteData, setPrerequisiteData,
      isPrerequisiteLoaded,
      setIsPrerequisiteLoaded,
      windowType, 
      setWindowType,
      }}>
      {children}
    </PageContext.Provider>
  );
};


// ✅ Hook to use context safely
export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

