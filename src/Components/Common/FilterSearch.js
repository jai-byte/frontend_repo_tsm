/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function FilterSearch({
  FilterOptions,
  search,
  setSearch,
  setFilterSelect,
}) {
  const [placeholderLabel, setPlaceholderLabel] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleFilterSelect = (value) => {
    setFilterSelect(value?.value);
    setPlaceholderLabel(value?.label);
    setShowDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="col-6 d-flex align-items-center justify-content-end">
      <div className="me-3" id="filterBtn" ref={dropdownRef}>
        <Dropdown show={showDropdown} onSelect={() => setShowDropdown(false)}>
          <Dropdown.Toggle
            variant=""
            id="dropdown-basic"
            onClick={() => setShowDropdown(!showDropdown)}
            className="dropdown-toggle p-0 dayFilter mb-0"
          >
            <svg width="18.47" height="16.623" viewBox="0 0 18.47 16.623">
              <path
                id="Icon_feather-filter"
                data-name="Icon feather-filter"
                d="M21.47,4.5H3l7.388,8.736v6.04l3.694,1.847V13.236Z"
                transform="translate(-3 -4.5)"
                fill="#120e43"
              />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <ul className="px-2 border-0 mb-0">
              {FilterOptions &&
                FilterOptions?.map((ele, index) => {
                  return (
                    <li
                      key={index}
                      className="listdropdown"
                      value={ele?.value}
                      onClick={() => handleFilterSelect(ele)}
                    >
                      <span style={{ cursor: "pointer" }}>{ele?.label}</span>
                    </li>
                  );
                })}
              {/* <li className="listdropdown">
                <span style={{ cursor: "pointer" }}>All</span>
              </li>

              <li className="listdropdown">
                <span className="" style={{ cursor: "pointer" }}>
                  Category
                </span>
              </li>
              <li className="listdropdown">
                <span className="" style={{ cursor: "pointer" }}>
                  Sub Category
                </span>
              </li>
              <li className="listdropdown">
                <span className="" style={{ cursor: "pointer" }}>
                  Author
                </span>
              </li>
              <li className="listdropdown border-0">
                <span className="" style={{ cursor: "pointer" }}>
                  Format
                </span>
              </li> */}
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex align-items-center main-card p-0 bg-white mb-0">
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              id="button-addon2"
              // type="submit"
              className="btn btn-link text-secondary p-1 ms-1"
            >
              <i className="fa fa-search font-size-16"></i>
            </button>
          </div>
          <input
            type="search"
            placeholder={
              placeholderLabel ? `Search by ${placeholderLabel}` : "Search "
            }
            aria-describedby="button-addon2"
            className="form-control border-0 p-1 bg-transparent"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{width: "200px"}}
          />
        </div>
      </div>
    </div>
  );
}
