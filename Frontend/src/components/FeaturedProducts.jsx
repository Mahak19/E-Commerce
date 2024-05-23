import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { addToCart, removeCartItem } from "../actions/Cart";
import Loading from "../pages/Loading";

// Component to display featured products with a swiper
const FeaturedProducts = () => {
  // Retrieve product data and loading state from Redux store
  const { isLoading, products } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  // Initialize dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Function to handle adding a product to the cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  // Function to remove an item from the cart
  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="container-fluid px-0 mt-5 mb-3">
      <div className="container">
        <h3 className="fw-bold featured-heading">Featured Products.</h3>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Swiper component to display featured products */}
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              freeMode={true}
              className="mySwiper featured-swiper py-4"
              breakpoints={{
                // Define breakpoints here
                0: {
                  slidesPerView: 1,
                },
                520: {
                  slidesPerView: 2,
                },
                950: {
                  slidesPerView: 3,
                },
              }}
            >
              {/* Map through products to display each product */}
              {products && products.length > 0 ? (
                products.map((product) => {
                  const isProductAdded = cartItems.some(
                    (item) => item.product === product._id
                  );
                  return (
                    <SwiperSlide
                      key={product._id}
                      className="featured-slide rounded-5"
                    >
                      {/* Individual product card */}
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
                            {/* Product name with link to product details */}
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
                          <div className="mt-5 d-flex align-items-center justify-content-between">
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
                          <div>
                            {/* Display product ratings */}
                            <Rating
                              className="d-flex justify-content-start"
                              name="size-small"
                              readOnly
                              // value={calculateAverageRating(product.reviews)}
                              value={product.ratings}
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center mb-5 pt-5">
                  <h1 className="fw-bold no-products-heading">
                    No Featured Products
                  </h1>
                </div>
              )}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
