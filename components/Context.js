import React, { useState, createContext, useContext } from "react";

const AppContext = createContext();
const initialState = {
  cartItems: [],
  seeCart: false,
  fromMenu: false,
  seeFilter: false,
};
export const useAppContext = () => useContext(AppContext);

export default function Context({ children }) {
  const [cart, setCart] = useState(initialState);
  return (
    <AppContext.Provider value={{ cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
}
