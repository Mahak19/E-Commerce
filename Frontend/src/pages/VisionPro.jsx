import { Pagination, Rating } from "@mui/material"; // Import Pagination and Rating components from Material-UI
import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks from react-redux
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import Metadata from "../../Metadata"; // Import Metadata component
import { addToCart, removeCartItem } from "../actions/Cart"; // Import action to add items to the cart
import { getProducts } from "../actions/Products"; // Import action to fetch products
import Loading from "./Loading";

// Define the VisionPro component
const VisionPro = () => {
  // Extracting necessary states from the Redux store
  const {
    isLoading,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  // Local state variables
  const [currentPage, setCurrentPage] = useState(1);

  const count =
    productCount && resultPerPage
      ? Math.ceil(filteredProductsCount / resultPerPage)
      : 0;

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Event handler for changing pagination page
  const handleChange = (e, page) => {
    setCurrentPage(page);
  };

  // Event handler for adding a product to the cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  // Function to remove an item from the cart
  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  // Fetch products when the component mounts or currentPage changes
  useEffect(() => {
    dispatch(getProducts("", currentPage, [0, 1000000], "Vision", 0));
  }, [dispatch, currentPage]);

  // Rendering the component
  return (
    <>
      <Metadata title={"Vision Pro"} />
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
      <div className="container-fluid bg-body-tertiary">
        <div className="row py-3">
          <div className="col">
            {/* Displaying product heading if products exist */}
            {products && products.length > 0 && (
              <div>
                <h1 className="fw-bold text-center mb-4 allProduct-heading">
                  Vision Pro
                </h1>
              </div>
            )}
            {/* Display loading message or products */}
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
                              <Link
                                to={`/product/${product._id}`}
                                className="text-decoration-none text-dark"
                              >
                                <span className="card-title mb-0 featured-product-title d-flex justify-content-start d-block px-4">
                                  {product.name}
                                </span>
                              </Link>
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
                                    onClick={() => handleAddToCart(product._id)}
                                  >
                                    Add to cart
                                  </button>
                                )}
                              </div>
                            </div>
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
                  <div className="d-flex justify-content-center pt-4">
                    <h1 className="fw-bold no-products-heading">No Products</h1>
                  </div>
                )}
                {/* Pagination component */}
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
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
    </>
  );
};

// Export the VisionPro component
export default VisionPro;
