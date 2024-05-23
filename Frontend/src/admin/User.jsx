import React, { useEffect } from "react"; // Importing React and useEffect hook
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch hooks from react-redux
import { getAllUsers } from "../actions/AllUsers"; // Importing action to fetch all users
import { DataGrid } from "@mui/x-data-grid"; // Importing DataGrid component from MUI
import { Link, Navigate, useNavigate } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import Metadata from "../../Metadata"; // Importing Metadata component
import { deleteUsers } from "../actions/DeleteUsers"; // Importing action to delete users
import OverlayTrigger from "react-bootstrap/OverlayTrigger"; // Importing OverlayTrigger component from react-bootstrap
import Tooltip from "react-bootstrap/Tooltip"; // Importing Tooltip component from react-bootstrap
import { UserProfile } from "../actions/User";

// User component
const User = () => {
  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Selecting isAuthenticated, user, and users states from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);

  // Function to handle user deletion
  const handleDeleteUser = async (id) => {
    // Dispatch action to delete user by ID
    await dispatch(deleteUsers(id));

    // Check if the deleted user is not the currently logged-in user
    if (user._id !== id) {
      // If not, fetch updated list of all users
      dispatch(getAllUsers());
    } else if (user._id === id) {
      // If the deleted user is the currently logged-in user
      // Fetch user profile to clear any cached user data
      await dispatch(UserProfile());

      // Redirect to login page
      navigate("/login");
    }
  };

  // Column configuration for DataGrid
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 270, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      flex: 1,
      cellClassName: (params) => {
        return params.row.role === "user" ? "text-success" : "text-danger";
      },
    },
    {
      field: "action",
      headerName: "Actions",
      type: "number",
      width: "200",
      flex: 1,
      sortable: false,
      // Custom cell renderer for action buttons
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center gap-1">
            {/* Link to update user role */}
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Update Role
                </Tooltip>
              )}
            >
              <Link to={`/admin/dashboard/update/user/role/${params.row.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square text-dark mx-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </Link>
            </OverlayTrigger>

            {/* Link to view user profile */}
            {/* <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  View Profile
                </Tooltip>
              )}
            >
              <Link to={`/admin/dashboard/user/profile/${params.row.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-up-right-square text-dark"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"
                  />
                </svg>
              </Link>
            </OverlayTrigger> */}

            {/* Button to delete user */}
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Delete User
                </Tooltip>
              )}
            >
              <button
                className="btn btn-sm text-danger"
                onClick={() => handleDeleteUser(params.row.id)}
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
            </OverlayTrigger>
          </div>
        );
      },
    },
  ];

  // Array to hold user rows for DataGrid
  const rows = [];

  // Populating rows array with user data
  users &&
    users.map((user) => {
      rows.push({
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role,
      });
    });

  // Redirecting based on user authentication and role
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />; // Redirecting to homepage if user is not admin
  }

  // Redirecting to login page if user is not authenticated
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Effect hook to fetch all users
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <Metadata title={"All User - Admin"} />
      <div className="row">
        {/* Heading */}
        <h2 className="mb-3 fw-bold text-center">All Users</h2>
        <div className="col-lg-12">
          {/* DataGrid to display users */}
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

// Exporting User component
export default User;
