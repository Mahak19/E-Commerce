import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogoutUser } from "../actions/User";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  // State to manage the visibility of the offcanvas menu
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const handleCartShow = () => setShowCart(true);
  const handleCartClose = () => setShowCart(false);
  const handleSearchShow = () => setShowSearch(true);
  const handleSearchClose = () => setShowSearch(false);

  const navigate = useNavigate();

  const handleSearchProduct = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/store/${keyword}`);
      handleSearchClose();
      setKeyword("");
    } else {
      navigate("/store");
      handleSearchClose();
    }
  };

  // Function to handle offcanvas menu item click and close the offcanvas
  const handleNavClick = () => {
    setShowOffcanvas(false);
  };

  const handleLogout = async () => {
    await dispatch(LogoutUser());
    handleCartClose();
  };

  return (
    <div>
      <div className="container-fluid d-none d-md-block px-0">
        <Nav className="justify-content-center py-1 nav shadow-sm align-items-center mb-3">
          <Nav.Item>
            <Link to={"/"} className="nav-link text-dark fw-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-apple"
                viewBox="0 0 16 16"
              >
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
              </svg>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/store"} className="nav-link text-dark">
              Store
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/mac"} className="nav-link text-dark">
              Mac
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/ipad"} className="nav-link text-dark">
              iPad
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/iphone"} className="nav-link text-dark">
              iPhone
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/watch"} className="nav-link text-dark">
              Watch
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/airpods"} className="nav-link text-dark">
              AirPods
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/tv"} className="nav-link text-dark">
              TV & Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/vision"} className="nav-link text-dark">
              Vision Pro
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/accessories"} className="nav-link text-dark">
              Accessories
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/about"} className="nav-link text-dark">
              About us
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-link text-dark" onClick={handleSearchShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              // to={"/cart"}
              className="nav-link text-dark"
              onClick={handleCartShow}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-bag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
            </Link>
          </Nav.Item>
          <Nav.Item className="cart-count" onClick={handleCartShow}>
            <div style={{ width: "14px" }}>
              {cartItems && cartItems.length !== 0 ? (
                <small className="bg-dark text-light cart-count-text">
                  {cartItems && cartItems.length}
                </small>
              ) : null}
            </div>
          </Nav.Item>
        </Nav>
      </div>
      {/* Offcanvas for Cart */}
      <Offcanvas
        className="offcanvas-nav"
        show={showCart}
        onHide={handleCartClose}
        placement="top"
      >
        <div className="container offcanvas-content px-5">
          <div className="my-5">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-semibold">Bag</h4>
              </div>
              <div>
                <Link
                  to={"/cart"}
                  className="review-button text-decoration-none"
                  onClick={handleCartClose}
                >
                  Review Bag
                </Link>
              </div>
            </div>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <div
                    key={item.product}
                    className="d-flex align-items-center gap-5 my-4"
                  >
                    <div style={{ width: "60px" }}>
                      <img src={item.image} className="w-100" alt="product" />
                    </div>
                    <div>
                      <p className="mb-0">{item.name}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2 className="mb-0 fw-bold mt-2 empty-bag-heading">
                  Your bag is empty.
                </h2>
              </div>
            )}
          </div>
          <div className="mb-5">
            <ul className="my-profile-lists">
              <small className="text-secondary">My Profile</small>
              <li className="d-flex align-items-center gap-1">
                <div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      className="bi bi-box-seam"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <small className="fw-semibold">
                    <Link
                      onClick={handleCartClose}
                      to={"/orders"}
                      className="text-decoration-none text-dark"
                    >
                      Orders
                    </Link>
                  </small>
                </div>
              </li>
              <li className="d-flex align-items-center gap-1">
                <div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      className="bi bi-bookmark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <small className="fw-semibold">Saves</small>
                </div>
              </li>
              <li className="d-flex align-items-center gap-1">
                <div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      className="bi bi-gear-wide-connected"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <small className="fw-semibold">
                    <Link
                      onClick={handleCartClose}
                      to={"/account"}
                      className="text-decoration-none text-dark"
                    >
                      Account
                    </Link>{" "}
                    {isAuthenticated && user && user.role === "admin" && (
                      <Link
                        onClick={handleCartClose}
                        className="text-decoration-none text-dark"
                        to={"/admin/dashboard"}
                      >
                        / Dashboard
                      </Link>
                    )}
                  </small>
                </div>
              </li>
              {isAuthenticated ? (
                <li>
                  <button
                    className="btn btn-sm sign-out-btn"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li className="d-flex align-items-center gap-1">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <small className="fw-semibold">
                      <Link
                        onClick={handleCartClose}
                        to={"/login"}
                        className="text-decoration-none text-dark"
                      >
                        Sign in
                      </Link>
                    </small>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Offcanvas>
      {/* Offcanvas for Search */}
      <Offcanvas
        className="offcanvas-nav"
        show={showSearch}
        onHide={handleSearchClose}
        placement="top"
      >
        <div className="container offcanvas-content my-5 px-5">
          <div className="">
            <div className="d-flex align-items-center gap-1">
              <div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </span>
              </div>
              <form className="w-100" onSubmit={handleSearchProduct}>
                <div className="d-flex align-items-center">
                  <input
                    type="search"
                    className="form-control search py-3 border-0 fs-4 text-secondary fw-semibold"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                  />
                  <button className="btn">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="my-4">
              <ul className="quick-links">
                <small className="text-secondary">Quick Links</small>
                <li className="d-flex align-items-center gap-1">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <small>
                      <Link
                        to={"/store"}
                        className="text-dark text-decoration-none"
                        onClick={() => handleSearchClose()}
                      >
                        Find a store
                      </Link>
                    </small>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-1">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <small>
                      <Link
                        to={"/accessories"}
                        className="text-dark text-decoration-none"
                        onClick={() => handleSearchClose()}
                      >
                        Accessories
                      </Link>
                    </small>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-1">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <small>
                      <Link
                        to={"/airpods"}
                        className="text-dark text-decoration-none"
                        onClick={() => handleSearchClose()}
                      >
                        Airpods
                      </Link>
                    </small>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-1">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <small>
                      <Link
                        to={"/ipad"}
                        className="text-dark text-decoration-none"
                        onClick={() => handleSearchClose()}
                      >
                        iPad
                      </Link>
                    </small>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-1">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <small>
                      <Link
                        to={"/iphone"}
                        className="text-dark text-decoration-none"
                        onClick={() => handleSearchClose()}
                      >
                        iPhone
                      </Link>
                    </small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Offcanvas>
      <div className="d-block d-md-none">
        <>
          {["md"].map((expand) => (
            <Navbar
              key={expand}
              expand={expand}
              className="bg-body-tertiary py-1 mb-1 nav"
            >
              <Container fluid className="ms-1">
                <Navbar.Brand>
                  <div>
                    <Link className="text-decoration-none text-dark" to={"/"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-apple"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                      </svg>
                    </Link>
                  </div>
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  onClick={() => setShowOffcanvas(!showOffcanvas)}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  show={showOffcanvas}
                  onHide={() => setShowOffcanvas(false)}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    ></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="ms-4">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <div className="my-1">
                        <Link
                          to={"/store"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h1 className="fw-semibold">Store</h1>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/mac"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Mac</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/ipad"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">iPad</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/iphone"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">iPhone</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/watch"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Watch</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/airpods"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">AirPods</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/tv"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">TV & Home</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/vision"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Vision Pro</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/accessories"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Accessorise</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/about"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">About us</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/orders"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Orders</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/cart"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Cart</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        <Link
                          to={"/account"}
                          className="text-decoration-none text-dark"
                          onClick={handleNavClick}
                        >
                          <h2 className="fw-semibold">Account</h2>
                        </Link>
                      </div>
                      <div className="my-1">
                        {isAuthenticated && user && user.role === "admin" && (
                          <Link
                            onClick={handleNavClick}
                            className="text-decoration-none text-dark"
                            to={"/admin/dashboard"}
                          >
                            <h2 className="fw-semibold">Admin Dashboard</h2>
                          </Link>
                        )}
                      </div>
                      <div className="my-1">
                        {isAuthenticated ? (
                          <button className="btn p-0 text-dark">
                            <h2 className="fw-semibold">Logout</h2>
                          </button>
                        ) : (
                          <Link
                            to={"/login"}
                            className="text-decoration-none text-dark"
                            onClick={handleNavClick}
                          >
                            <h2 className="fw-semibold">Login</h2>
                          </Link>
                        )}
                      </div>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
      </div>
    </div>
  );
};

export default Header;
