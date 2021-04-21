import React from "react";
import { useAppContext } from "./Context";

export default function Featured({ products }) {
  const { cart, setCart } = useAppContext();
  const featured = products.filter((item) => item.featured === true)[0];
  console.log(featured.image);
  function addToCart() {
    setCart({
      ...cart,
      cartItems: [...cart.cartItems, featured],
      seeCart: true,
    });
  }
  return (
    <section id="featured-product">
      <div className="title-container">
        <h1>{featured.name}</h1>
      </div>
      <button className="primary-button" onClick={addToCart}>
        ADD TO CART
      </button>
      <div className="image-container">
        <img src={featured.image.src} />
        <div className="image-title">Photo of the day</div>
      </div>
      <div className="product-details">
        <h2>About {featured.name}</h2>
        <h3>{featured.category}</h3>
        <p>{featured.details.description}</p>
      </div>
      <div className="other-products">
        <h2>People also buy</h2>
        <ul className="other-images">
          {featured.details.recommendations.map((image, index) => (
            <li key={index} className="other-image-container">
              <img src={image.src} />
            </li>
          ))}
        </ul>
        <div className="other-details">
          <h2>Details</h2>
          <p>
            Dimensions: {featured.details.dimmentions.width} x{" "}
            {featured.details.dimmentions.height}
          </p>
          <p>Size: {featured.details.size}</p>
        </div>
      </div>
    </section>
  );
}
