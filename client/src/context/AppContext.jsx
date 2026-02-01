import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <AppContext.Provider value={{ menuItems, setMenuItems, orders, setOrders }}>
      {children}
    </AppContext.Provider>
  );
};
