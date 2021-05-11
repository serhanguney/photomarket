import React, { useEffect } from "react";
import Image from "next/image";
import Cart from "./Cart";
import { useAppContext } from "../Context";

export default function Navbar() {
  const {
    cart,
    cart: { seeCart, fromMenu, cartItems },
    setCart,
  } = useAppContext();

  //this function will trigger the cart list to disappear after some time
  function setTimer() {
    setTimeout(() => {
      setCart({ ...cart, seeCart: false });
    }, 1000);
  }

  useEffect(() => {
    //hide cart list after some time.
    if (seeCart && !fromMenu) {
      setTimer();
    }
  }, [cart]);

  return (
    <nav id="navbar">
      <div className="navbar-container">
        <div
          className="cart-icon-container"
          onClick={() => setCart({ ...cart, seeCart: true, fromMenu: true })}
        >
          <Image src="/cart.svg" width={54} height={38} />
          {cartItems.length > 0 ? (
            <div className="cart-counter">{cartItems.length}</div>
          ) : null}
        </div>
        <div id="cart" className={`cart ${seeCart ? "reveal" : ""}`}>
          <Cart />
        </div>
      </div>
    </nav>
  );
}
