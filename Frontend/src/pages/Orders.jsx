import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Metadata from "../../Metadata";
import { getMyOrders } from "../actions/MyOrders";

// Orders component to display user's orders
const Orders = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Redux state variables for user authentication and orders
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.myOrders);

  // Columns configuration for DataGrid
  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
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
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order_details/${params.row.id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-up-right text-dark"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
              />
              <path
                fillRule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
              />
            </svg>
          </Link>
        );
      },
    },
  ];

  // Rows data for DataGrid
  const rows = [];

  // Mapping orders data to rows array
  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  // Fetching user's orders on component mount
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the Orders component
  return (
    <div className="container">
      <Metadata title={`${user.firstName} –– Orders`} />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-11">
          <div className="my-3 pb-5">
            <h1 className="text-center fw-bold">My Orders</h1>
            <div className="my-4">
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
                pageSizeOptions={[5, 10, 25, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
