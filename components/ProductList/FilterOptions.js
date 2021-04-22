import React, { useEffect, useRef } from "react";

import { useAppContext } from "../Context";

export default function FilterOptions({ filterState, products }) {
  //filters state is defined in the parent component because it is used to adjust "list" state
  //this component is for the interactions made in the filter section only.
  //list state is then used to render filtered posts which are IN THE PARENT
  const { filters, setFilters } = filterState;
  const {
    cart: { seeFilter },
    cart,
    setCart,
  } = useAppContext();

  let refCategories = useRef(null);
  let refPrices = useRef(null);
  //define options to choose for filtering
  //an array for max min limitations of price filters
  const priceOptions = [
    { value: [0, 20], text: "Lower than $20" },
    { value: [20, 100], text: "$20 - $100" },
    { value: [100, 200], text: "$100 - $200" },
    { value: [200, Infinity], text: "More than $200" },
  ];

  //an array of unique values of available categories. (remove duplicates here)
  let categoryOptions = products.map((item) => item.category);
  categoryOptions = [...new Set(categoryOptions)];

  function handleCategory(e) {
    const value = e.target.value;
    //if chosen category value is in our filter array then remove it
    if (filters.category.includes(value)) {
      const array = filters.category.filter((item) => item !== value);
      setFilters({ ...filters, category: array });
    } else {
      //if not, add it
      setFilters({
        ...filters,
        category: [...filters.category, value],
      });
    }
  }

  function handlePrice(e) {
    //checkboxes will behave as radio buttons as required. For this we fetch dom elements

    //get all the input tags (checkboxes)
    const array = Array.from(refPrices.children);
    const newArray = array
      .map((item) => item.children[0])
      .map((item) => item.children[0]);

    //you can only select one checkbox at a time
    newArray.forEach((input) => {
      if (input.value !== e.target.value) {
        input.checked = false;
      }
    });
    //apply price filtering
    const value = +e.target.value;
    const min = priceOptions[value].value[0];
    const max = priceOptions[value].value[1];
    //check if no price filter is selected
    if (e.target.checked) {
      setFilters({ ...filters, minPrice: min, maxPrice: max });
    } else {
      setFilters({ ...filters, minPrice: 0, maxPrice: Infinity });
    }
  }

  //for mobile use there are additional features "clear" and "save"
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

  //make sure that checkboxes behave consistently with filter selections
  useEffect(() => {
    const { category } = filters;
    const array = Array.from(refCategories.children);
    const newArray = array
      .map((item) => item.children[0])
      .map((item) => item.children[0]);
    //On page refresh, and any other case, if array is empty make sure everything is unselected
    if (category.length === 0) {
      newArray.forEach((child) => (child.checked = false));
    }
    //Unselect all price filters when necessary
    // if (filters.minPrice === 0 && filters.maxPrice === Infinity) {
    //   const priceArray = Array.from(refPrices.children);
    //   const newPriceArray = priceArray
    //     .map((item) => item.children[0])
    //     .map((item) => item.children[0]);
    //   newPriceArray.forEach((input) => (input.checked = false));
    // }
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
