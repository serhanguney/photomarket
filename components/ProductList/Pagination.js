import React, { memo } from "react";

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.max(1, Math.ceil(totalPosts / postsPerPage)); i++) {
    pageNumbers.push(i);
  }

  function paginate(page) {
    if (!page.number) {
      setCurrentPage((prev) =>
        Math.min(pageNumbers.length, Math.max(1, prev + page.direction))
      );
    } else {
      setCurrentPage(page.number);
    }
  }
  return (
    <nav className="pagination">
      <a
        onClick={() => paginate({ direction: -1 })}
        style={{
          visibility: pageNumbers[0] !== currentPage ? "visible" : "hidden",
        }}
      >
        <img src="/left.svg" />
      </a>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate({ number })}
            className={`page-number ${
              currentPage === number ? "active-number" : ""
            }`}
          >
            {number}
          </li>
        ))}
      </ul>

      <a
        onClick={() => paginate({ direction: 1 })}
        style={{
          visibility:
            pageNumbers[pageNumbers.length - 1] !== currentPage
              ? "visible"
              : "hidden",
        }}
      >
        <img src="/right.svg" />
      </a>
    </nav>
  );
}
export default memo(Pagination);
