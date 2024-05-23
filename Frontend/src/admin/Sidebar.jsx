import {
  AddBox,
  AddBoxOutlined,
  HomeOutlined,
  Home,
  Inventory2,
  Inventory2Outlined,
  People,
  PeopleOutlineOutlined,
  ReviewsOutlined,
  ShoppingCartCheckoutOutlined,
  ShoppingCart,
  Reviews,
} from "@mui/icons-material"; // Importing Material-UI icons
import React, { useState } from "react"; // Importing React and useState hook
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

// Sidebar component
const Sidebar = () => {
  // State variable for active tab
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className=" sidebar">
      <div>
        <div>
          <h4 className="px-3">Apple</h4>
        </div>
        {/* Links to different sections */}
        <div className="my-4">
          <Link
            to={"/admin/dashboard"}
            className="text-decoration-none rounded-3 text-dark py-1 d-flex sidebar-link mb-1"
            onClick={() => setTab("/admin/dashboard")}
          >
            <div className="d-inline-flex links align-items-center p-2 pe-4 gap-4">
              {tab === "/admin/dashboard" ? (
                <div>
                  <Home className="" />
                </div>
              ) : (
                <div>
                  <HomeOutlined className="" />
                </div>
              )}
              <div className="sidebar-link-text">Dashboard</div>
            </div>
          </Link>
          <Link
            to={"/admin/dashboard/allproducts"}
            className="text-decoration-none rounded-3 text-dark py-1 d-flex sidebar-link mb-1"
            onClick={() => setTab("/admin/dashboard/allproducts")}
          >
            <div className="d-inline-flex links align-items-center p-2 pe-4 gap-4">
              {tab === "/admin/dashboard/allproducts" ? (
                <div>
                  <Inventory2 />
                </div>
              ) : (
                <div>
                  <Inventory2Outlined />
                </div>
              )}
              <div className="sidebar-link-text">All Products</div>
            </div>
          </Link>
          <Link
            to={"/admin/dashboard/product/new"}
            className="text-decoration-none rounded-3 text-dark py-1 d-flex sidebar-link mb-1"
            onClick={() => setTab("/admin/dashboard/product/new")}
          >
            <div className="d-inline-flex links align-items-center p-2 pe-4 gap-4">
              {tab === "/admin/dashboard/product/new" ? (
                <div>
                  <AddBox />
                </div>
              ) : (
                <div>
                  <AddBoxOutlined />
                </div>
              )}
              <div className="sidebar-link-text">Add Product</div>
            </div>
          </Link>
          <Link
            to={"/admin/dashboard/orders"}
            className="text-decoration-none rounded-3 text-dark py-1 d-flex sidebar-link mb-1"
            onClick={() => setTab("/admin/dashboard/orders")}
          >
            <div className="d-inline-flex links align-items-center p-2 pe-4 gap-4">
              {tab === "/admin/dashboard/orders" ? (
                <div>
                  <ShoppingCart />
                </div>
              ) : (
                <div>
                  <ShoppingCartCheckoutOutlined className="" />
                </div>
              )}
              <div className="sidebar-link-text">Orders</div>
            </div>
          </Link>
          <Link
            to={"/admin/dashboard/users"}
            className="text-decoration-none rounded-3 text-dark py-1 d-flex sidebar-link mb-1"
            onClick={() => setTab("/admin/dashboard/users")}
          >
            <div className="d-inline-flex links align-items-center p-2 pe-4 gap-4">
              {tab === "/admin/dashboard/users" ? (
                <div>
                  <People />
                </div>
              ) : (
                <div>
                  <PeopleOutlineOutlined />
                </div>
              )}
              <div className="sidebar-link-text">Users</div>
            </div>
          </Link>
          <Link
            to={"/admin/dashboard/reviews"}
            className="text-decoration-none rounded-3 text-dark py-1 d-flex sidebar-link mb-1"
            onClick={() => setTab("/admin/dashboard/reviews")}
          >
            <div className="d-inline-flex links align-items-center p-2 pe-4 gap-4">
              <div>
                {tab === "/admin/dashboard/reviews" ? (
                  <Reviews />
                ) : (
                  <ReviewsOutlined />
                )}
              </div>
              <div className="sidebar-link-text">Reviews</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Exporting Sidebar component
export default Sidebar;
