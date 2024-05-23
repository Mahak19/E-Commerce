import { DataGrid } from "@mui/x-data-grid"; // Importing DataGrid component for displaying orders in a table format
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for accessing Redux state and dispatching actions
import { Link, Navigate } from "react-router-dom"; // Importing Link component for navigation
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title
import { getAllOrders } from "../actions/AllOrders"; // Importing action for fetching all orders
import { deleteOrders } from "../actions/DeleteOrder"; // Importing action for deleting orders

// Component for displaying all orders in the admin dashboard
const Orders = () => {
  // Initializing dispatch function
  const dispatch = useDispatch();

  // Retrieving orders and loading state from Redux store
  const { adminOrders } = useSelector((state) => state.allOrders);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Function to handle order deletion
  const handleDeleteOrder = async (id) => {
    await dispatch(deleteOrders(id));
    dispatch(getAllOrders());
  };

  // Configuration for columns in the DataGrid
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      cellClassName: (params) => {
        let colorClass = "";
        switch (params.row.status) {
          case "Delivered":
            colorClass = "text-success";
            break;
          case "Shipped":
            colorClass = "text-warning";
            break;
          case "Processing":
            colorClass = "text-danger";
            break;
          default:
            colorClass = "";
        }
        return colorClass;
      },
    },
    {
      field: "qty",
      headerName: "Items QTY",
      type: "number",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      type: "number",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "number",
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center gap-2">
            <Link to={`/admin/dashboard/process/order/${params.row.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </Link>
            <button
              className="btn btn-sm"
              onClick={() => handleDeleteOrder(params.row.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  // Mapping order data to rows for DataGrid
  const rows = [];

  adminOrders &&
    adminOrders.map((order) => {
      return rows.push({
        id: order._id,
        status: order.orderStatus,
        qty: order.orderItems.length,
        totalAmount: order.totalPrice,
      });
    });

  // Redirecting user based on authentication and role
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Fetching orders on component mount
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Rendering the orders component
  return (
    <div className="container">
      {/* Setting page metadata */}
      <Metadata title={"All Orders - Admin"} />
      <div className="row">
        <h2 className="mb-3 fw-bold text-center">All Orders</h2>
        <div className="col-lg-12">
          {/* Displaying loading state or DataGrid based on loading status */}
          <DataGrid
            columns={columns}
            rows={rows}
            disableRowSelectionOnClick
            autoHeight
            pageSizeOptions={[5, 10, 25, 100]}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
