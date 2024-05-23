import {
  ArcElement,
  CategoryScale,
  Chart as Chartjs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"; // Importing necessary Chart.js components
import React, { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2"; // Importing Doughnut and Line component from react-chartjs-2
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../actions/AdminProducts"; // Importing action for fetching admin products
import { getAllOrders } from "../actions/AllOrders"; // Importing action for fetching all orders
import { getAllUsers } from "../actions/AllUsers"; // Importing action for fetching all users
import { Navigate } from "react-router-dom";

// Registering Chart.js components
Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

// Component for displaying revenue statistics
const Revenue = () => {
  const { adminProducts } = useSelector((state) => state.adminProducts);
  const { adminOrders, totalRevenue } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Variable to store the count of out-of-stock products
  let out_of_stock = 0;

  // Initializing dispatch function
  const dispatch = useDispatch();

  // Calculating the count of out-of-stock products
  adminProducts &&
    adminProducts.forEach((item) => {
      if (item.stock === "0") {
        out_of_stock = out_of_stock + 1;
      }
    });

  const labels = ["Initial Amount", "Amount Earned"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Yearly Revenue",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total Amount",
        data: [0, totalRevenue && totalRevenue],
        borderColor: "#0071e3",
        backgroundColor: "#0071e3",
        hoverBackgroundColor: "#0077ed",
      },
    ],
  };

  // Data for doughnut chart
  const doughnutData = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#440096", "#4870e0"],
        hoverBackgroundColor: ["#a10a05", "#056b47"],
        data: [
          out_of_stock,
          adminProducts && adminProducts.length - out_of_stock,
        ],
      },
    ],
  };

  // Redirecting user if not authorized
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    // Fetching data when component mounts
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-12">
          <h2 className="text-center py-3">Dashboard</h2>
          {/* Displaying total revenue */}
          <div className="row">
            <div className="col-lg-12">
              <div className="border bg-secondary-subtle py-3">
                <p className="mb-2 fs-4  d-flex justify-content-center">
                  Total Revenue
                </p>
                <small className="fs-5 d-flex justify-content-center">
                  ₹{totalRevenue && totalRevenue.toFixed(2)}
                </small>
              </div>
            </div>
          </div>
          {/* Displaying product, order, and user statistics */}
          <div className="row my-5 px-4">
            <div className="col-lg-4">
              <div className="card bg-info-subtle rounded-1">
                <div className="card-body">
                  <h4 className="text-center mb-0">Products</h4>
                  <p className="mb-0 d-flex justify-content-center my-2 fs-5">
                    {adminProducts && adminProducts.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card bg-success-subtle rounded-1">
                <div className="card-body">
                  <h4 className="text-center mb-0">Orders</h4>
                  <p className="mb-0 d-flex justify-content-center my-2 fs-5">
                    {adminOrders && adminOrders.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card bg-warning-subtle rounded-1">
                <div className="card-body">
                  <h4 className="text-center mb-0">Users</h4>
                  <p className="mb-0 d-flex justify-content-center my-2 fs-5">
                    {users && users.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <Line options={options} data={data} />
            </div>
          </div>
          {/* Displaying doughnut chart */}
          <div className="row my-5">
            <div
              className="col-lg-12"
              style={{ maxWidth: "500px", margin: "auto" }}
            >
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
