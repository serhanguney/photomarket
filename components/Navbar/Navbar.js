import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Cart from "./Cart";
import { useAppContext } from "../Context";

export default function Navbar() {
  let refCart = useRef(null);
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

  // function handleBlur(e) {
  //   // console.log("trigger", cart);
  //   //careful here; this function will be triggered at every click which means cart could be set at every click!
  //   console.log("contains? / seecart", [
  //     refCart.current.contains(e.target),
  //     seeCart,
  //   ]);
  //   if (refCart.current && !refCart.current.contains(e.target) && seeCart) {
  //     // console.log("eventlistener" , cart);
  //     setCart((prev) => {
  //       console.log(prev);
  //       return { ...prev, seeCart: false };
  //     });
  //   }
  // }
  useEffect(() => {
    //hide cart list after some time.
    if (seeCart && !fromMenu) {
      setTimer();
    }
  }, [cart]);

  // useEffect(() => {
  //eventlistener to handle the closing of menu on blur
  // document.addEventListener("click", (e) => handleBlur(e));
  // return () => {
  //   document.removeEventListener("click", (e) => handleBlur(e));
  // };
  // }, []);
  return (
    <nav id="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Image src="/logo.svg" width={159} height={25} />
        </div>
        <div
          className="cart-icon-container"
          onClick={() => setCart({ ...cart, seeCart: true, fromMenu: true })}
        >
          <Image src="/cart.svg" width={54} height={38} />
          {cartItems.length > 0 ? (
            <div className="cart-counter">{cartItems.length}</div>
          ) : null}
        </div>
        <div className={`cart ${seeCart ? "reveal" : ""}`} ref={refCart}>
          <Cart />
        </div>
      </div>
    </nav>
  );
}
