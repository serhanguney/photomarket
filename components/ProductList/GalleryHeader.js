import React, { memo } from "react";
import { useAppContext } from "../Context";

function GalleryHeader({ list, setList }) {
  const { cart, setCart } = useAppContext();

  //handle the sorting based on selection
  //toggle sort order
  const handleSort = (e) => {
    if (e) {
      //if e is defined sort based on property
      const property = e.target.value.toLowerCase();
      console.log(property);
      const newList = list.ascending
        ? list.products
            .sort((a, b) => (a[property] < b[property] ? -1 : 1))
            .slice()
        : list.products
            .sort((a, b) => (a[property] < b[property] ? -1 : 1))
            .reverse()
            .slice();
      setList({ ...list, products: newList, sortBy: e.target.value });
    } else {
      //if not toggle the order of sort
      if (list.sortBy !== "") {
        const newList = list.products.reverse().slice();
        setList({ products: newList, ascending: !list.ascending });
      }
    }
  };

  return (
    <div className="gallery-header">
      <div className="title">
        <h1>Photography&nbsp;&nbsp;/</h1>
        <p>&nbsp;&nbsp;Premium Photos</p>
      </div>
      <div className="gallery-sort">
        <button
          id="sort-button"
          className={list.sortBy === "" ? "button-inactive" : ""}
          onClick={() => handleSort()}
        ></button>
        <p>Sort by</p>
        <div className="dropdown">
          <select onChange={(e) => handleSort(e)}>
            <option disabled selected>
              Select
            </option>
            <option>Price</option>
            <option>Name</option>
          </select>
        </div>
      </div>
      <div
        className="filter-icon"
        onClick={() => setCart({ ...cart, seeFilter: true })}
      >
        <img src="/filters.svg" alt="filter" />
      </div>
    </div>
  );
}
export default memo(GalleryHeader);
