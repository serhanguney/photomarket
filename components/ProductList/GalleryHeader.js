import React, { memo } from "react";
import { useAppContext } from "../Context";

function GalleryHeader({ list, setList }) {
  const { cart, setCart } = useAppContext();
  // console.log("header");
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
      setList({ ...list, products: newList });
    } else {
      //if not reverse the order of sort
      const newList = list.products.reverse().slice();
      setList({ products: newList, ascending: !list.ascending });
    }
  };

  return (
    <div className="gallery-header">
      <div className="title">
        <h1>Photography&nbsp;&nbsp;/</h1>
        <p>&nbsp;&nbsp;Premium Photos</p>
      </div>
      <div className="gallery-sort">
        <button onClick={() => handleSort()}>
          <img src="/sort.svg" />
        </button>
        <p>Sort by</p>
        <div className="dropdown">
          <select onChange={(e) => handleSort(e)}>
            <option selected disabled>
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
