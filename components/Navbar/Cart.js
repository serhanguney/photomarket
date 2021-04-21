import React from "react";
import { useAppContext } from "../Context";
export default function Cart() {
  const {
    cart,
    cart: { cartItems },
    setCart,
  } = useAppContext();
  function handleClear() {
    setCart({ ...cart, cartItems: [], seeCart: false });
  }
  function removeItem(_, index) {
    const filteredItems = cartItems.filter((_, i) => i !== index);
    setCart({ ...cart, cartItems: filteredItems });
  }
  return (
    <>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="item-container">
            <button
              className="remove-button"
              onClick={(e) => removeItem(e, index)}
            >
              <img src="remove.svg" />
            </button>
            <div className="item-details">
              <div className="info-container">
                <h2>{item.name}</h2>
                <p>${item.price}</p>
              </div>
              <div className="image-container">
                <img src={item.image.src} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="secondary-button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </>
  );
}
