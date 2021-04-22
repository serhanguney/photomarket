import React, { useState, useEffect } from "react";
import { useAppContext } from "../Context";
import FilterOptions from "./FilterOptions";
import GalleryHeader from "./GalleryHeader";
import Pagination from "./Pagination";

export default function ProductList({ products }) {
  const { cart, setCart } = useAppContext();

  //STATES FOR FILTER AND SORT

  //list is the state we use to filter, sort, and paginate the products
  const [list, setList] = useState({
    products: products,
    ascending: true,
    sortBy: "",
  });

  //STATES FOR PAGINATION

  //current page is used to define current posts
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  //currentPosts is used to render paginated posts in the DOM
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState(
    list.products.slice(indexOfFirst, indexOfLast)
  );

  //FILTERING

  //to control filtering parameters
  //the multiple choice nature of category filter works with an array (category) that contains the chosen filters
  const [filters, setFilters] = useState({
    category: [],
    minPrice: 0,
    maxPrice: Infinity,
  });

  //what happens when user selects filter options
  useEffect(() => {
    const { category, maxPrice, minPrice } = filters;
    //if no category is chosen then just look at the price here
    if (category.length === 0) {
      const filteredList = products.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
      setList({ ...list, products: filteredList });
      setCurrentPage(1);
    } else {
      //else look at both
      const filteredList = products.filter(
        (item) =>
          item.price <= maxPrice &&
          item.price >= minPrice &&
          category.includes(item.category)
      );
      setList({ ...list, products: filteredList });
      setCurrentPage(1);
    }
  }, [filters]);

  //PAGINATION

  //pagination and sort settings
  //add list to the dependencies so every sort action is present on the current page
  useEffect(() => {
    setCurrentPosts(list.products.slice(indexOfFirst, indexOfLast));
  }, [currentPage, list]);

  //CART

  //adding an item to the cart will trigger the cart list to appear.
  function addToCart(_, product) {
    setCart({
      ...cart,
      cartItems: [...cart.cartItems, product],
      seeCart: true,
      fromMenu: false,
    });
  }

  return (
    <section id="product-list">
      <GalleryHeader list={list} setList={setList} />
      <FilterOptions
        filterState={{ filters, setFilters }}
        products={products}
      />
      <div className="product-gallery">
        <div className="products">
          {currentPosts.map((product, index) => (
            <div key={index} className="product-card">
              <div className="image-container">
                {product.bestseller ? (
                  <div className="best-seller">Best Seller</div>
                ) : null}
                <img
                  className="card-image"
                  src={product.image.src}
                  srcSet={`${product.image.src} 1200w,${product.image.src}?w=200 200w,${product.image.src}?w=400 400w,${product.image.src}?w=800 800w,${product.image.src}?w=1024 1024w`}
                />
                <button
                  className="primary-button"
                  onClick={(e) => addToCart(e, product)}
                >
                  ADD TO CART
                </button>
              </div>

              <h3>{product.category}</h3>
              <h1>{product.name}</h1>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
        <Pagination
          totalPosts={list.products.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
