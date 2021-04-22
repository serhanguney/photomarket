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

  //this is used to hide the cartList on blur
  //unfortunately this can't be handled with event listeners so I had to go at the top level to listen for clicks
  //see https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
  function handleBlur(e) {
    console.log("trigger");
    const cartList = document.getElementById("cart");
    if (!cartList.contains(e.target) && cart.seeCart) {
      setCart({ ...cart, seeCart: false });
    }
  }
  return (
    <AppContext.Provider value={{ cart, setCart }}>
      <div onClick={(e) => handleBlur(e)}>{children}</div>
    </AppContext.Provider>
  );
}
