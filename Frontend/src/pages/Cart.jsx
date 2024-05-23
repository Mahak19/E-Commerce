import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing hooks from react-redux for managing state
import { Link, useNavigate } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title
import { addToCart, orderSummary, removeCartItem } from "../actions/Cart"; // Importing actions related to cart management

// Component for displaying the cart items
const Cart = () => {
  // Extracting cart items from Redux store
  const { cartItems } = useSelector((state) => state.cart);

  // Dispatcher for dispatching actions
  const dispatch = useDispatch();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (quantity >= stock) return;
    dispatch(addToCart(id, newQuantity));
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addToCart(id, newQuantity));
  };

  // Function to remove an item from the cart
  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  // Calculating subtotal, taxes, and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const taxes = subtotal * 0.18;

  const total = (subtotal + taxes).toFixed(2);

  // Function to handle checkout process
  const handleCheckout = () => {
    const orderData = {
      subtotal: subtotal,
      taxes: taxes,
      total: total,
    };
    dispatch(orderSummary(orderData));
    navigate("/login?redirect=/shipping"); // Redirecting to login page with redirection to shipping page
  };

  return (
    <>
      {/* Setting metadata title */}
      <Metadata title={"Cart"} />
      <div className="container pb-5 mb-5">
        <div className="row d-flex justify-content-center my-5">
          <div className="col-lg-11">
            <h1 className="fw-bold cart-heading">
              {cartItems && cartItems.length === 0
                ? "Your bag is empty."
                : "Review your bag."}
            </h1>
            <p>
              {/* Displaying message based on cart items */}
              {cartItems && cartItems.length === 0 ? (
                <span className="">
                  Add your favorite one now{" "}
                  <Link to={"/store"} className="text-decoration-none">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </Link>
                </span>
              ) : (
                "Free delivery and free returns."
              )}
            </p>
            {/* Iterating over cart items */}
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div key={item.product}>
                    <div className="row d-flex justify-content-center gy-5 my-5">
                      <div className="col-10">
                        <div className="row gy-5">
                          <div className="col-lg-3 d-flex justify-content-center">
                            {/* Displaying item image */}
                            <img
                              src={item.image}
                              style={{ maxWidth: "203px", maxHeight: "203px" }}
                              alt=""
                            />
                          </div>
                          <div className="col-lg-5">
                            <div>
                              {/* Link to product page */}
                              <Link
                                to={`/product/${item.product}`}
                                className="text-decoration-none text-dark"
                              >
                                <h2 className="cart-product-name">
                                  {item.name}
                                </h2>
                              </Link>
                              <p>{item.description}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {/* Buttons to increase/decrease quantity */}
                            <div className="d-flex justify-content-center align-items-center gap-2">
                              <button
                                className="btn btn-sm btn-dark"
                                onClick={() =>
                                  decreaseQuantity(item.product, item.quantity)
                                }
                              >
                                -
                              </button>
                              <span
                                className="d-flex justify-content-center"
                                style={{ width: "25px" }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-sm btn-dark"
                                onClick={() =>
                                  increaseQuantity(
                                    item.product,
                                    item.quantity,
                                    item.stock
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center">
                        <div>
                          <p className="mb-0 cart-item-price">
                            ₹{item.price * item.quantity}
                          </p>
                          <button
                            className="btn text-primary mt-5 cart-remove-btn"
                            onClick={() => handleRemoveCartItem(item.product)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
        {cartItems && cartItems.length >= 1 && (
          <div className="row d-flex justify-content-center">
            <div className="col-lg-11">
              <div className="row d-flex justify-content-end">
                <div className="col-lg-10">
                  <div className="d-flex justify-content-between px-5 align-items-center">
                    <div className="summary-text">
                      <p className="my-2 d-flex justify-content-start">
                        Subtotal
                      </p>
                      <p className="my-2 d-flex justify-content-start">
                        Shipping
                      </p>
                      <p className="my-2 d-flex justify-content-start">
                        GST<span className="fw-light mx-2">18%</span>
                      </p>
                    </div>
                    <div>
                      <p className="my-2 d-flex justify-content-end">
                        ₹{subtotal}
                      </p>
                      <p className="my-2 d-flex justify-content-end">FREE</p>
                      <p className="my-2 d-flex justify-content-end">
                        ₹{taxes}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between px-5">
                    <div className="total-summary-text my-2 d-flex justify-content-start">
                      Total
                    </div>
                    <div className="total-summary-text my-2 d-flex justify-content-end">
                      ₹{total}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-end my-5">
                    <div className="col-lg-4">
                      {/* Button to initiate checkout */}
                      <button className="checkout-btn" onClick={handleCheckout}>
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
