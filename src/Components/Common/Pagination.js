/* eslint-disable */
import React, { useEffect, useState } from "react";

export default function Pagination({
  totalPagess,
  setTotalPage,
  totalItems,
  setTotalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) {
  // console.log("itemsPerPage", itemsPerPage);

  const [goToPage, setGoToPage] = useState(1);

  // Pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = totalPagess;

  const handleGoToPage = () => {
    if (goToPage >= 1 && goToPage <= totalPages) {
      setCurrentPage(goToPage);
      // setGoToPage(''); // Clear the input field after navigation
    }
  };

  const handleNextPage = () => {
    // if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
    // }
  };

  const handlePrevPage = () => {
    // if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    // }
  };

  useEffect(() => {
    if (itemsPerPage === 10 || itemsPerPage === 5 || itemsPerPage === 3) {
      setCurrentPage(1);
    }
  }, [itemsPerPage]);

  // useEffect(() => {
  //   const newTotalPages = Math.ceil(totalItems / itemsPerPage);

  //   if (currentPage > newTotalPages) {
  //     setCurrentPage(newTotalPages);
  //   }

  //   // Update the total pages state
  //   setTotalPage(newTotalPages);
  // }, [itemsPerPage, totalItems]);
  return (
    <div className="main-card p-3 ">
      <div className="row card-footer">
        <div className="col-6 card-footer-left">
          <span className="text-muted">
            <span className="pagination__desc d-flex align-items-center">
              Items Per Page
              <select
                className="form-select form-select-sm w-auto mx-2"
                aria-label="Per"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                <option value={3} aria-labelledby={3}>
                  3
                </option>
                <option value={5} aria-labelledby={5}>
                  5
                </option>
                <option value={10} aria-labelledby={10}>
                  10
                </option>
              </select>
              {/* {`${indexOfFirstItem} - ${indexOfLastItem}`} Of 
                     {totalItems} Items */}
            </span>
          </span>
        </div>
        <div className="col-6 card-footer-right">
          <nav aria-label="payments">
            <ul className="pagination m-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <span
                  role="button"
                  className="page-link"
                  tabIndex={-1}
                  aria-disabled="true"
                  aria-label="null page"
                  onClick={() => setCurrentPage(1)}
                >
                  <svg width="15.398" height="17.4" viewBox="0 0 15.398 17.4">
                    <g
                      id="Icon_feather-skip-back"
                      data-name="Icon feather-skip-back"
                      transform="translate(-6.801 -5.3)"
                    >
                      <path
                        id="Path_12430"
                        data-name="Path 12430"
                        d="M23.5,22l-10-8,10-8Z"
                        transform="translate(-2)"
                      />
                      <path
                        id="Path_12431"
                        data-name="Path 12431"
                        d="M7.5,21.5V7.5"
                        transform="translate(0 -0.5)"
                      />
                    </g>
                  </svg>
                </span>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <span
                  role="button"
                  className="page-link"
                  tabIndex={-1}
                  aria-disabled="true"
                  aria-label="First Page"
                  onClick={handlePrevPage}
                >
                  <svg
                    width="11.4"
                    height="17.4"
                    viewBox="0 0 11.4 17.4"
                    className="me-2"
                  >
                    <g
                      id="Icon_feather-skip-back"
                      data-name="Icon feather-skip-back"
                      transform="translate(-10.8 -5.3)"
                    >
                      <path
                        id="Path_12430"
                        data-name="Path 12430"
                        d="M23.5,22l-10-8,10-8Z"
                        transform="translate(-2)"
                      />
                    </g>
                  </svg>
                  Previous
                </span>
              </li>
              <li className="page-item">
                <span
                  role="button"
                  className="page-link py-0"
                  aria-label="2 page"
                >
                  <input
                    disabled
                    className="border-radius-5 p-1 border"
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => setGoToPage(e.target.value)}
                    // onClick={(e) => {
                    //   if (e.key === "Enter") {
                    //     handleGoToPage();
                    //   }
                    // }}
                    style={{ width: "40px" }}
                  />
                  {/* 1{" "} */}
                  {/* </span>{" "} */}
                  &nbsp;Of {totalPages}
                </span>
              </li>
              <li
                className={`page-item active ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <span
                  role="button"
                  className="page-link"
                  aria-label="... Page"
                  onClick={handleNextPage}
                >
                  Next
                  <svg
                    width="11.4"
                    height="17.4"
                    viewBox="0 0 11.4 17.4"
                    className="ms-2"
                  >
                    <path
                      id="Path_12430"
                      data-name="Path 12430"
                      d="M13.5,22l10-8-10-8Z"
                      transform="translate(-12.8 -5.3)"
                    />
                  </svg>
                </span>
              </li>
              <li
                className={`page-item  ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <span
                  role="button"
                  className="page-link"
                  aria-label="null page"
                  onClick={() => setCurrentPage(totalPages)}
                  //  disabled={currentPage === totalPages}
                >
                  <svg width="15.4" height="17.4" viewBox="0 0 15.4 17.4">
                    <g
                      id="Icon_feather-skip-back"
                      data-name="Icon feather-skip-back"
                      transform="translate(0.7 0.7)"
                    >
                      <path
                        id="Path_12430"
                        data-name="Path 12430"
                        d="M13.5,22l10-8-10-8Z"
                        transform="translate(-13.5 -6)"
                      />
                      <path
                        id="Path_12431"
                        data-name="Path 12431"
                        d="M7.5,21.5V7.5"
                        transform="translate(6.5 -6.5)"
                      />
                    </g>
                  </svg>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
