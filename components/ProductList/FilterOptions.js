import React, { useEffect, useRef } from "react";
import { useAppContext } from "../Context";

export default function FilterOptions({ filterState, products }) {
  const { filters, setFilters } = filterState;
  const {
    cart: { seeFilter },
    cart,
    setCart,
  } = useAppContext();

  let refCategories = useRef(null);
  let refPrices = useRef(null);
  //define options to choose for filtering
  const priceOptions = [
    { value: [0, 20], text: "Lower than $20" },
    { value: [20, 100], text: "$20 - $100" },
    { value: [100, 200], text: "$100 - $200" },
    { value: [200, Infinity], text: "More than $200" },
  ];
  let categoryOptions = products.map((item) => item.category);
  categoryOptions = [...new Set(categoryOptions)];

  function handleCategory(e) {
    const value = e.target.value;
    console.log(e.target.checked);
    if (filters.category.includes(value)) {
      const array = filters.category.filter((item) => item !== value);
      setFilters({ ...filters, category: array });
    } else {
      setFilters({
        ...filters,
        category: [...filters.category, value],
      });
    }
  }

  function handlePrice(e) {
    //checkboxes that will behave as radio buttons

    //get all the inputs
    const array = Array.from(refPrices.children);
    const newArray = array
      .map((item) => item.children[0])
      .map((item) => item.children[0]);
    //prevent multiple checking
    newArray.forEach((input) => {
      // console.log(input.checked);
      if (input.value !== e.target.value) {
        input.checked = false;
      }
    });
    //apply filtering
    const value = +e.target.value;
    const min = priceOptions[value].value[0];
    const max = priceOptions[value].value[1];
    //check if all clear
    if (e.target.checked) {
      setFilters({ ...filters, minPrice: min, maxPrice: max });
    } else {
      setFilters({ ...filters, minPrice: 0, maxPrice: Infinity });
    }
  }

  //for mobile use
  function handleFilterAction(e) {
    if (e.target.name === "clear") {
      setFilters({
        category: [],
        minPrice: 0,
        maxPrice: Infinity,
      });
    } else {
      setCart({ ...cart, seeFilter: false });
    }
  }

  //make sure that checkboxes are consistent with filters
  useEffect(() => {
    const { category } = filters;
    const array = Array.from(refCategories.children);
    const newArray = array
      .map((item) => item.children[0])
      .map((item) => item.children[0]);
    if (category.length === 0) {
      newArray.forEach((child) => (child.checked = false));
    }
    //clear price filters when necessary
    if (filters.minPrice === 0 && filters.maxPrice === Infinity) {
      const priceArray = Array.from(refPrices.children);
      const newPriceArray = priceArray
        .map((item) => item.children[0])
        .map((item) => item.children[0]);
      newPriceArray.forEach((input) => (input.checked = false));
    }
  }, [filters]);
  return (
    <>
      <div className={`filter-section ${seeFilter ? "filter-reveal" : ""}`}>
        <div className="filter-type">
          <div className="title-container">
            <h2>Category</h2>
            <button
              className="remove-button"
              onClick={() => setCart({ ...cart, seeFilter: false })}
            >
              <img src="/remove.svg" alt="remove" />
            </button>
          </div>
          <ul ref={(node) => (refCategories = node)}>
            {categoryOptions.map((option, index) => (
              <li key={index}>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    name="category"
                    id={option}
                    value={option}
                    onChange={(e) => handleCategory(e)}
                  />
                  <label htmlFor={option}></label>
                </div>
                <p>{option}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter-type">
          <h2>Price range</h2>
          <ul ref={(node) => (refPrices = node)}>
            {priceOptions.map((price, index) => (
              <li key={index}>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    name="priceIndex"
                    id={index}
                    value={index}
                    onChange={(e) => handlePrice(e)}
                  />
                  <label htmlFor={index}></label>
                </div>
                <p>{price.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`action-container ${
          seeFilter ? "action-container-reveal" : ""
        }`}
      >
        <button
          className="secondary-button"
          name="clear"
          onClick={(e) => handleFilterAction(e)}
        >
          Clear
        </button>
        <button
          className="primary-button"
          name="save"
          onClick={(e) => handleFilterAction(e)}
        >
          Save
        </button>
      </div>
    </>
  );
}
