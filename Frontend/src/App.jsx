import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile } from "./actions/User";
import { Toaster } from "react-hot-toast";
import { getStripeApiKey } from "./actions/StripeApiKey";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./pages/Loading";

// Lazy-loaded components for code splitting
const Accessories = lazy(() => import("./pages/Accessories"));
const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const Mac = lazy(() => import("./pages/Mac"));
const IPad = lazy(() => import("./pages/IPad"));
const IPhone = lazy(() => import("./pages/IPhone"));
const Watch = lazy(() => import("./pages/Watch"));
const AirPods = lazy(() => import("./pages/AirPods"));
const TVHome = lazy(() => import("./pages/TVHome"));
const VisionPro = lazy(() => import("./pages/VisionPro"));
const Support = lazy(() => import("./pages/Support"));
const Cart = lazy(() => import("./pages/Cart"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Account = lazy(() => import("./pages/Account"));
const Orders = lazy(() => import("./pages/Orders"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const Shipping = lazy(() => import("./pages/Shipping"));
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const Payment = lazy(() => import("./pages/Payment"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const AllProducts = lazy(() => import("./admin/AllProducts"));
const User = lazy(() => import("./admin/User"));
const Revenue = lazy(() => import("./admin/Revenue"));
const Reviews = lazy(() => import("./admin/Reviews"));
const AdminOrders = lazy(() => import("./admin/Orders"));
const CreateProduct = lazy(() => import("./admin/CreateProduct"));
const UpdateProduct = lazy(() => import("./admin/UpdateProduct"));
const ProcessOrder = lazy(() => import("./admin/ProcessOrder"));
const UserProfiles = lazy(() => import("./admin/UserProfile"));
const UpdateUserRole = lazy(() => import("./admin/UpdateUserRole"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

function App() {
  const dispatch = useDispatch();
  const { apiKey } = useSelector((state) => state.stripeApiKey);

  // Fetch user profile and Stripe API key on component mount
  useEffect(() => {
    dispatch(UserProfile());
    dispatch(getStripeApiKey());
  }, [dispatch]);

  return (
    <div>
      {/* Header component */}
      <div className="header">
        <Header />
      </div>
      <div>
        {/* Suspense for lazy-loaded routes with loading fallback */}
        <Suspense fallback={<Loading />}>
          {/* React Router Routes */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:keyword" element={<Store />} />
            <Route path="/mac" element={<Mac />} />
            <Route path="/ipad" element={<IPad />} />
            <Route path="/iphone" element={<IPhone />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/airpods" element={<AirPods />} />
            <Route path="/tv" element={<TVHome />} />
            <Route path="/vision" element={<VisionPro />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/new" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/reset/password/:token" element={<ResetPassword />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* Private routes */}
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/update/password" element={<UpdatePassword />} />
            <Route path="/update/profile" element={<UpdateProfile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route
              path="/process/payment"
              element={
                apiKey ? (
                  <Elements stripe={loadStripe(apiKey)}>
                    <Payment />
                  </Elements>
                ) : (
                  <div>Error: Stripe API key is missing or invalid.</div>
                )
              }
            />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/order_details/:id" element={<OrderDetails />} />
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<Dashboard />}>
              <Route path="" element={<Revenue />} />
              <Route path="allproducts" element={<AllProducts />} />
              <Route path="users" element={<User />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="product/new" element={<CreateProduct />} />
              <Route path="product/:id" element={<UpdateProduct />} />
              <Route path="process/order/:id" element={<ProcessOrder />} />
              <Route path="user/profile/:id" element={<UserProfiles />} />
              <Route path="update/user/role/:id" element={<UpdateUserRole />} />
            </Route>
            {/* 404 route */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Suspense>
      </div>
      {/* Footer component */}
      <Footer />
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

// Exporting the App component as the default export
export default App;
