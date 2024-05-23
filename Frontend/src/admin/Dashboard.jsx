import React from "react";
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux
import { Navigate, Outlet } from "react-router-dom"; // Importing Navigate and Outlet components for routing
import Metadata from "../../Metadata"; // Importing Metadata component
import Sidebar from "./Sidebar"; // Importing Sidebar component

// Component for the admin dashboard
const Dashboard = () => {
  // Retrieving user authentication state from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Redirecting user if role is "User"
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the dashboard layout
  return (
    <div className="container-fluid my-4">
      {/* Metadata for dashboard title */}
      <Metadata title={"Dashboard - Admin"} />
      <div className="row">
        {/* Sidebar component */}
        <div className="col-lg-2 border-end">
          <Sidebar />
        </div>
        {/* Outlet for nested routes */}
        <div className="col-lg-10 px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
