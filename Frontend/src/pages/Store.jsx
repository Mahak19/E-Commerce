import { Pagination, Rating } from "@mui/material"; // Importing Pagination and Rating components from Material-UI
import Slider from "@mui/material/Slider"; // Importing Slider component from Material-UI
import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap for form handling
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux for managing state
import { Link, useParams } from "react-router-dom"; // Importing Link and useParams from react-router-dom for routing
import Metadata from "../../Metadata"; // Importing Metadata component for managing page metadata
import { addToCart, removeCartItem } from "../actions/Cart"; // Importing addToCart action for adding items to the cart
import { getProducts } from "../actions/Products"; // Importing getProducts action for fetching products

// Define available categories for filtering
const categories = [
  "Mobile",
  "Laptop",
  "Tablet",
  "AirPods",
  "Watch",
  "Vision",
  "Homes",
  "Accessories",
];

// Define the Store component
const Store = () => {
  // Extracting necessary states from the Redux store
  const {
    isLoading,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  // Initializing local state variables
  const [currentPage, setCurrentPage] = useState(1); // For managing current page number

  const [price, setPrice] = useState([0, 1000000]); // For managing price range filter

  const [category, setCategory] = useState(""); // For managing category filter

  const [ratings, setRatings] = useState(0); // For managing ratings filter

  // Calculating total pages for pagination
  const count =
    productCount && resultPerPage
      ? Math.ceil(filteredProductsCount / resultPerPage)
      : 0;

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Extracting keyword from URL params
  const { keyword } = useParams();

  // Event handler for changing page number
  const handleChange = (e, page) => {
    setCurrentPage(page);
  };

  // Event handler for changing price range filter
  const handlePrice = (e, newPrice) => {
    setPrice(newPrice);
  };

  // Event handler for changing category filter
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Event handler for changing ratings filter
  const handleRatings = (e, newRating) => {
    setRatings(newRating);
  };

  // Event handler for adding a product to cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  // Function to remove an item from the cart
  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  // Resetting current page when keyword changes
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  // Fetching products when any filter changes
  useEffect(() => {
    const selectedRatings = ratings === null ? 0 : ratings;

    dispatch(
      getProducts(keyword, currentPage, price, category, selectedRatings)
    );
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  // Rendering the component
  return (
    <div>
      <div>
        {/* Metadata for page */}
        <Metadata title={"Store"} />
        {/* Promo information */}
        <small className="d-flex justify-content-center my-3">
          Get upto 20% off using HDFC credit card.{" "}
          <Link to={"/store"} className="text-decoration-none ms-1">
            Shop now
          </Link>
        </small>
        {/* Main content area */}
        <div className="container-fluid bg-body-tertiary">
          <div className="row gy-5 my-3">
            {/* Filter section */}
            <div className="col-lg-2">
              <div className="border shadow-sm p-2">
                <div>
                  <h5 className="mb-0 filter-heading fw-bold">Filters</h5>
                </div>
                <hr className="text-secondary mt-2 mb-3" />
                <div>
                  {/* Price filter */}
                  <div className="my-1">
                    <h6 className="mb-0  filter-heading">Price</h6>
                    <Slider
                      value={price}
                      onChange={handlePrice}
                      size="small"
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={1000000}
                      className="my-0 py-0"
                    />
                  </div>
                  {/* Category filter */}
                  <div className="my-3">
                    <h6 className=" filter-heading">Categories</h6>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleCategoryChange}
                      value={category}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  {/* Ratings filter */}
                  <div className="my-3">
                    <h6 className="filter-heading">Ratings</h6>
                    <Rating
                      name="half-rating"
                      size="medium"
                      precision={0.5}
                      onChange={handleRatings}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Product display section */}
            <div className="col-lg-10">
              {/* Title for product section */}
              {products && products.length > 0 && (
                <div>
                  <h1 className="fw-bold text-center mb-4 allProduct-heading">
                    All Products
                  </h1>
                </div>
              )}
              {/* Loading indicator */}
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <div className="row gy-4 mb-4">
                  {products && products.length > 0 ? (
                    products.map((product) => {
                      const isProductAdded = cartItems.some(
                        (item) => item.product === product._id
                      );
                      return (
                        <div key={product._id} className="col-lg-3">
                          <div className="card rounded-4 border-0 shadow-sm">
                            {/* Product image */}
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
                            {/* Product details */}
                            <div className="card-body">
                              <div className="">
                                {/* Product name */}
                                <Link
                                  to={`/product/${product._id}`}
                                  className="text-decoration-none text-dark"
                                >
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
                                      onClick={() =>
                                        handleAddToCart(product._id)
                                      }
                                    >
                                      Add to cart
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div>
                                {/* Product ratings */}
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
                    <div className="d-flex justify-content-center pt-5">
                      <h1 className="fw-bold no-products-heading">
                        No Products
                      </h1>
                    </div>
                  )}
                  {/* Pagination */}
                  {resultPerPage < filteredProductsCount && (
                    <div className="d-flex justify-content-center">
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
        {/* Promo information */}
        <small className="d-flex justify-content-center my-3">
          Get upto 20% off using HDFC credit card.{" "}
          <Link to={"/store"} className="text-decoration-none ms-1">
            Shop now
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Store;
