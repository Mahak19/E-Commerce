import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for accessing Redux state and dispatching actions
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title
import { format } from "date-fns"; // Importing format function from date-fns for date formatting
import { Navigate, useParams } from "react-router-dom"; // Importing useParams hook for accessing URL parameters
import { getOrderDetails } from "../actions/MyOrders"; // Importing action for fetching order details
import { updateOrderStatus } from "../actions/UpdateOrderStatus"; // Importing action for updating order status
import Loading from "../pages/Loading";

// Component for processing an order in the admin dashboard
const ProcessOrder = () => {
  // State for holding order status
  const [status, setStatus] = useState("");

  // Retrieving order details from Redux store
  const { isLoading, orderDetails } = useSelector(
    (state) => state.orderDetails
  );

  // Retrieving isAuthenticated and user state from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Initializing dispatch function
  const dispatch = useDispatch();

  // Extracting order ID from URL parameters
  const { id } = useParams();

  // Function to handle order status update
  const handleUpdateOrderStatus = async (e) => {
    e.preventDefault();
    await dispatch(updateOrderStatus(id, status));
    dispatch(getOrderDetails(id));
  };

  // Redirecting user if not authorized
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Fetching order details when component mounts
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch]);

  return (
    <div className="container">
      <Metadata title={"Process Order - Admin"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row d-flex justify-content-center my-5 pb-5">
          <div className="col-lg-11">
            <div>
              <h2>Process Order</h2>
            </div>
            <div className="card my-4">
              <div className="card-body bg-secondary-subtle">
                <div className="row gy-3">
                  {/* Displaying order details */}
                  <div className="col-lg-3">
                    <div>
                      <small className="d-block text-uppercase">
                        Order Placed
                      </small>
                      <small>
                        {orderDetails &&
                          format(
                            new Date(orderDetails && orderDetails.createdAt),
                            "dd MMMM yyyy"
                          )}
                      </small>
                    </div>
                  </div>
                  {/* Displaying total amount */}
                  <div className="col-lg-3">
                    <div>
                      <small className="d-block text-uppercase">Total</small>
                      <small>₹{orderDetails && orderDetails.totalPrice}</small>
                    </div>
                  </div>
                  {/* Displaying order status */}
                  <div className="col-lg-6 d-flex justify-content-end">
                    <div>
                      <small className="d-block text-secondary">
                        ORDER # {orderDetails && orderDetails._id}
                      </small>
                      <small className="d-flex justify-content-end">
                        Status:
                        <span
                          className={
                            orderDetails &&
                            orderDetails.orderStatus === "Processing"
                              ? "text-danger mx-2"
                              : orderDetails &&
                                orderDetails.orderStatus === "Shipped"
                              ? "text-warning mx-2"
                              : "text-success mx-2"
                          }
                        >
                          {orderDetails && orderDetails.orderStatus}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              {/* Displaying order items */}
              <div className="card-body">
                <div>
                  <h4 className="mb-0 fw-bold">Successful</h4>
                  <small className="">
                    Paid on:{" "}
                    {orderDetails &&
                      format(
                        new Date(orderDetails && orderDetails.paidAt),
                        "dd MMMM yyyy"
                      )}
                  </small>
                </div>
                {orderDetails &&
                  orderDetails.orderItems &&
                  orderDetails.orderItems.map((item) => {
                    return (
                      <div key={item._id} className="row gy-4 my-5">
                        <div className="col-lg-3 d-flex justify-content-center">
                          <img
                            style={{ maxHeight: "200px", maxWidth: "200px" }}
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="col-lg-5">
                          <p className="mb-2 text-secondary"># {item._id}</p>
                          <p className="mb-2 fw-bold">{item.name}</p>
                          <p className="mb-2">₹ {item.price}</p>
                        </div>
                        <div className="col-lg-3">
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr />
              {/* Displaying payment and shipping information */}
              <div className="card-body">
                <h4 className="text-center">
                  Payment And Shipping Information
                </h4>
                <div className="row gy-4 my-5">
                  {/* Displaying payment details */}
                  <div className="col-lg-6 d-flex">
                    <div>
                      <p className="">
                        Payment Id:{" "}
                        {orderDetails &&
                          orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.id}
                      </p>
                      <p className="">
                        Payment Status:{" "}
                        {orderDetails &&
                          orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.status}
                      </p>
                    </div>
                  </div>
                  {/* Displaying shipping details */}
                  <div className="col-lg-6 d-flex">
                    <div>
                      <p>
                        Address:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.address}
                      </p>
                      <p>
                        City:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.city}
                      </p>
                      <p>
                        Pin Code:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.pinCode}
                      </p>
                      <p>
                        State:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.state}
                      </p>
                      <p>
                        Country:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.country}
                      </p>
                      <p>
                        Phone Number:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.phoneNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {/* Displaying order subtotal, tax, and total */}
              <div className="card-body">
                <div className="row d-flex justify-content-end">
                  <div className="col-lg-6">
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <p className="mb-0">Subtotal</p>
                      </div>
                      <div>
                        <span>₹ {orderDetails && orderDetails.itemsPrice}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <p className="mb-0">Tax</p>
                      </div>
                      <div>
                        <span>₹ {orderDetails && orderDetails.taxPrice}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <p className="mb-0 fs-4 fw-semibold">Total</p>
                      </div>
                      <div>
                        <span className="fs-4 fw-semibold">
                          ₹ {orderDetails && orderDetails.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {/* Displaying order status update form */}
              {orderDetails && orderDetails.orderStatus === "Delivered" ? (
                <div className="card-body">
                  <h2 className="fw-bold text-center mb-3 text-success">
                    Order Delivered Successfully
                  </h2>
                </div>
              ) : (
                <div className="card-body">
                  <h4 className="text-center">Add Order Status</h4>
                  <div className="row d-flex justify-content-center my-4">
                    <div className="col-lg-6">
                      <Form onSubmit={handleUpdateOrderStatus}>
                        <div className="mb-3">
                          <Form.Select
                            className="bg-secondary-subtle py-2 px-3"
                            aria-label="Default select example"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                          >
                            <option value="">Choose Status</option>
                            {/* Allowing specific status updates based on current order status */}
                            {orderDetails &&
                              orderDetails.orderStatus === "Processing" && (
                                <option value="Shipped">Shipped</option>
                              )}
                            {orderDetails &&
                              orderDetails.orderStatus === "Shipped" && (
                                <option value="Delivered">Delivered</option>
                              )}
                          </Form.Select>
                        </div>
                        <div className="mb-3">
                          <button
                            disabled={status === ""}
                            className="checkout-btn"
                          >
                            Proceed
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessOrder;
