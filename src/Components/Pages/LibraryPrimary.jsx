import React from "react";
import HomeIcon from '../../assets/images/icons/Home.svg';
import LibraryIcon from '../../assets/images/icons/Library.svg';
import LogoutIcon from '../../assets/images/icons/Logout.png';
import HexImage from '../../assets/images/hexadiv/hexaorange.png';
import { NavLink } from "react-router-dom";

const LibraryPrimary = () => {
  return (
      <>
        <div className="home-page">
          <div className="container-fluid main-container">
            <div className="row library-row">
              <div className="col-lg-3 cols-main border-right-custom order-1 order-lg-1">
                <div className="side-links-div">
                  <NavLink to="/get-started" className="text-decoration-none">
                    <h1 className="text-color-secondary side-links-div-logo">
                      Curie Library
                    </h1>
                  </NavLink>
                  <ul className="list-group list-group-horizontal list-group-vertical-custom">
                    <li className="list-group-item background-color-primary border-color-primary list-group-item-library">
                    <NavLink to="/get-started" className="text-decoration-none">
                        <div className="side-icon-div">
                          <img
                            src={HomeIcon}
                            alt="home-icon"
                            className="home-icon-image me-1"
                          />
                          <span className="text-color-secondary">Home</span>
                        </div>
                      </NavLink>
                    </li>
                    <li className="list-group-item background-color-primary border-color-primary list-group-item-library">
                    <NavLink to="/library-primary" className="text-decoration-none">
                      <div className="side-icon-div">
                        <img
                          src={LibraryIcon}
                          alt="library-icon"
                          className="library-icon-image me-1"
                        />
                        <span className="text-color-secondary">Library</span>
                      </div>
                      </NavLink>
                    </li>
                  </ul>
                  <ul className="list-group list-group-horizontal list-group-logout">
                    <li className="list-group-item background-color-primary border-color-primary list-group-item-library align-self-end">
                    <NavLink to="/login" className="text-decoration-none">
                      <div className="side-icon-div">
                        <img
                          src={LogoutIcon}
                          alt="logout-icon"
                          className="logout-icon-image me-1"
                        />
                        <span className="text-color-orange fw-bold">
                          Logout
                        </span>
                      </div>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 cols-main cols-main-pt-0 border-right-custom order-3 order-lg-2 px-4">
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="search-feed-add-post-div">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        className="form-control custom-input-text-primary mb-0 me-3"
                      />
                      <button className="btn custom-button-secondary text-nowrap">
                        Add Media
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mb-4 align-items-center">
                  <div className="col-lg-6">
                    <h3 className="text-color-secondary gradient-border-bottom-before library-border-gradient d-inline-block mb-0">
                      Library
                    </h3>
                  </div>
                  <div className="col-lg-6 add-new-folder-column">
                    <button
                      className="btn custom-button-orange float-start float-lg-end"
                      data-bs-toggle="modal"
                      data-bs-target="#addNewFolderModal"
                    >
                      Add New folder
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="library-nav-tab-container">
                      <ul
                        className="nav nav-tabs mb-3"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="all-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#all-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="all-tab-pane"
                            aria-selected="true"
                          >
                            All
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="images-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#images-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="images-tab-pane"
                            aria-selected="false"
                          >
                            Images
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="videos-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#videos-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="videos-tab-pane"
                            aria-selected="false"
                          >
                            Videos
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="audios-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#audios-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="audios-tab-pane"
                            aria-selected="false"
                          >
                            Audios
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="notes-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#notes-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="notes-tab-pane"
                            aria-selected="false"
                          >
                            Notes
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="documents-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#documents-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="documents-tab-pane"
                            aria-selected="false"
                          >
                            Documents
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="flashcards-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#flashcards-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="flashcards-tab-pane"
                            aria-selected="false"
                          >
                            Flashcards
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="all-tab-pane"
                          role="tabpanel"
                          aria-labelledby="all-tab"
                          tabIndex={0}
                        >
                          <div className="row mb-4 gy-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                              <div className="folder-view p-3 d-flex flex-row justify-content-between align-items-center">
                                <NavLink
                                  to="/library-secondary"
                                  className="text-decoration-none text-color-secondary"
                                >
                                  <div className="d-inline-block">
                                    <i
                                      className="fa fa-folder-o me-1 folder-icon"
                                      aria-hidden="true"
                                    />
                                    <span>Artists</span>
                                  </div>
                                </NavLink>
                                <div className="d-inline-block">
                                  <i
                                    className="fa fa-ellipsis-v cursor-pointer"
                                    aria-hidden="true"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editFolderModal"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                              <div className="folder-view p-3 d-flex flex-row justify-content-between align-items-center">
                                <NavLink
                                  to="/library-secondary"
                                  className="text-decoration-none text-color-secondary"
                                >
                                  <div className="d-inline-block">
                                    <i
                                      className="fa fa-folder-o me-1 folder-icon"
                                      aria-hidden="true"
                                    />
                                    <span>Makeup</span>
                                  </div>
                                </NavLink>
                                <div className="d-inline-block">
                                  <i
                                    className="fa fa-ellipsis-v cursor-pointer"
                                    aria-hidden="true"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editFolderModal"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                              <div className="folder-view p-3 d-flex flex-row justify-content-between align-items-center">
                                <NavLink
                                  to="/library-secondary"
                                  className="text-decoration-none text-color-secondary"
                                >
                                  <div className="d-inline-block">
                                    <i
                                      className="fa fa-folder-o me-1 folder-icon"
                                      aria-hidden="true"
                                    />
                                    <span>Paintings</span>
                                  </div>
                                </NavLink>
                                <div className="d-inline-block">
                                  <i
                                    className="fa fa-ellipsis-v cursor-pointer"
                                    aria-hidden="true"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editFolderModal"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                              <div className="post-view"></div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                              <div className="post-view"></div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                              <div className="post-view"></div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="images-tab-pane"
                          role="tabpanel"
                          aria-labelledby="images-tab"
                          tabIndex={0}
                        >
                          <h3 className="text-color-secondary">images tab</h3>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="videos-tab-pane"
                          role="tabpanel"
                          aria-labelledby="videos-tab"
                          tabIndex={0}
                        >
                          <h3 className="text-color-secondary">videos tab</h3>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="audios-tab-pane"
                          role="tabpanel"
                          aria-labelledby="audios-tab"
                          tabIndex={0}
                        >
                          <h3 className="text-color-secondary">audios tab</h3>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="notes-tab-pane"
                          role="tabpanel"
                          aria-labelledby="notes-tab"
                          tabIndex={0}
                        >
                          <h3 className="text-color-secondary">notes tab</h3>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="documents-tab-pane"
                          role="tabpanel"
                          aria-labelledby="documents-tab"
                          tabIndex={0}
                        >
                          <h3 className="text-color-secondary">notes tab</h3>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="flashcards-tab-pane"
                          role="tabpanel"
                          aria-labelledby="flashcards-tab"
                          tabIndex={0}
                        >
                          <h3 className="text-color-secondary">
                            flashcards tab
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 cols-main order-2 order-lg-3 cols-main-pt-0">
                <div className="user-i-card">
                  <div className="user-i-card-image-div me-2">
                    <div
                      className="hexagon-image-div ms-auto"
                      style={{
                        backgroundImage:
                          'url("https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg")',
                      }}
                    >
                      <div
                        className="hexagon-status-div"
                        style={{
                          backgroundImage:
                            `url(${HexImage})`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="user-i-card-info-div">
                      <h3 className="text-color-secondary mb-1">
                        Ankita Jaiswal
                      </h3>
                    <p className="text-color-secondary small-text mb-0">
                      Ankijaiswal
                    </p>
                  </div>
                </div>
                <hr className="mx-2 text-white" />
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="addNewFolderModal"
          tabIndex={-1}
          aria-labelledby="addNewFolderModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content background-color-primary">
              <div className="modal-header border-bottom-0 pb-0">
                <h4
                  className="modal-title text-color-secondary fw-light"
                  id="addNewFolderModalLabel"
                >
                  New Folder
                </h4>
                
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder=""
                  className="form-control custom-input-text-primary mb-0"
                />
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <span
                  type="button"
                  className="text-color-secondary me-3 cursor-pointer fw-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </span>
                <span
                  type="button"
                  className="text-color-secondary cursor-pointer fw-light"
                  data-bs-dismiss="modal"
                >
                  Create
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="editFolderModal"
          tabIndex={-1}
          aria-labelledby="editFolderModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content background-color-primary">
              <div className="modal-body">
                <p
                  className="text-center text-color-secondary my-0 py-2 cursor-pointer"
                  data-bs-target="#renameFolderModal"
                  data-bs-toggle="modal"
                >
                  Rename
                </p>
                <p
                  className="text-center text-color-secondary my-0 py-2 cursor-pointer"
                  data-bs-dismiss="modal"
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="renameFolderModal"
          tabIndex={-1}
          aria-labelledby="renameFolderModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content background-color-primary">
              <div className="modal-header border-bottom-0 pb-0">
                <h4
                  className="modal-title text-color-secondary fw-light"
                  id="renameFolderModalLabel"
                >
                  Rename
                </h4>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder=""
                  className="form-control custom-input-text-primary mb-0"
                />
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <span
                  type="button"
                  className="text-color-secondary me-3 cursor-pointer fw-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </span>
                <span
                  type="button"
                  className="text-color-secondary cursor-pointer fw-light"
                  data-bs-dismiss="modal"
                >
                  Save
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default LibraryPrimary;
