import { Pagination, Rating } from "@mui/material"; // Importing Pagination and Rating components from Material-UI
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title
import { addToCart, removeCartItem } from "../actions/Cart"; // Importing action for adding products to the cart
import { getProducts } from "../actions/Products"; // Importing action for fetching products
import Loading from "./Loading";

// IPad component for displaying iPad products
const IPad = () => {
  const {
    isLoading,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products); // Retrieving products state from Redux store using useSelector hook
  const { cartItems } = useSelector((state) => state.cart);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculating total number of pages based on product count and products per page
  const count =
    productCount && resultPerPage
      ? Math.ceil(filteredProductsCount / resultPerPage)
      : 0;

  // Creating a dispatch function
  const dispatch = useDispatch();

  // Function to handle page change in pagination
  const handleChange = (e, page) => {
    setCurrentPage(page); // Setting the current page state
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id)); // Dispatching addToCart action with product ID
  };

  // Function to remove an item from the cart
  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  // Fetching products when component mounts or currentPage state changes
  useEffect(() => {
    dispatch(getProducts("", currentPage, [0, 1000000], "Tablet", 0));
  }, [dispatch, currentPage]);

  return (
    <>
      <Metadata title={"IPad"} />
      {/* Promotional message */}
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
      <div className="container-fluid bg-body-tertiary">
        <div className="row py-3">
          <div className="col">
            {/* Displaying iPad products */}
            {products && products.length > 0 && (
              <div>
                <h1 className="fw-bold text-center mb-4 allProduct-heading">
                  iPad
                </h1>
              </div>
            )}
            {/* Displaying loading message if products are still loading */}
            {isLoading ? (
              <Loading />
            ) : (
              <div className="row gy-4 mb-4">
                {/* Mapping through products and displaying each product */}
                {products && products.length > 0 ? (
                  products.map((product) => {
                    const isProductAdded = cartItems.some(
                      (item) => item.product === product._id
                    );
                    return (
                      <div key={product._id} className="col-lg-3">
                        <div className="card rounded-4 border-0 shadow-sm">
                          <img
                            src={product.image[0].url}
                            className="card-img-top rounded-4"
                            style={{
                              height: "300px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            alt=""
                          />
                          <div className="card-body">
                            <div className="">
                              {/* Link to individual product page */}
                              <Link
                                to={`/product/${product._id}`}
                                className="text-decoration-none text-dark"
                              >
                                {/* Product title */}
                                <span className="card-title mb-0 featured-product-title d-flex justify-content-start d-block px-4">
                                  {product.name}
                                </span>
                              </Link>
                              {/* Product description */}
                              <small
                                className="description"
                                style={{ height: "45px" }}
                              >
                                {product.description}
                              </small>
                            </div>
                            <div className="mt-4 d-flex align-items-center justify-content-between">
                              <div>
                                {/* Product price */}
                                <span className="d-flex justify-content-start featured-product-price">
                                  ₹{product.price}
                                </span>
                              </div>
                              <div>
                                {product.stock <= 0 ? (
                                  <small className="text-danger btn btn-sm">
                                    Out Of Stock
                                  </small>
                                ) : isProductAdded ? (
                                  <button
                                    onClick={() =>
                                      handleRemoveCartItem(product._id)
                                    }
                                    className="btn add-to-cart-btn btn-sm px-3"
                                  >
                                    Remove
                                  </button>
                                ) : (
                                  <button
                                    className="btn add-to-cart-btn btn-sm px-3"
                                    onClick={() => handleAddToCart(product._id)}
                                  >
                                    Add to cart
                                  </button>
                                )}
                              </div>
                            </div>
                            {/* Product rating */}
                            <div>
                              <Rating
                                className="d-flex justify-content-start"
                                name="size-small"
                                readOnly
                                value={product.ratings}
                                size="small"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Displaying message when there are no products
                  <div className="d-flex justify-content-center pt-4">
                    <h1 className="fw-bold no-products-heading">No Products</h1>
                  </div>
                )}
                {/* Displaying pagination if there are more products than the resultPerPage */}
                {resultPerPage < filteredProductsCount && (
                  <div className="d-flex justify-content-center">
                    {/* Pagination */}
                    <Pagination
                      color="primary"
                      count={count}
                      size="large"
                      page={currentPage}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Promotional message */}
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
    </>
  );
};

export default IPad;
