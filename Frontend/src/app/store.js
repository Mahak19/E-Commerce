// Importing necessary dependencies
import { configureStore } from "@reduxjs/toolkit";
// Importing reducers from various features
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import updateProfileReducer from "../features/updateProfile/updateProfileSlice";
import updatePasswordReducer from "../features/updatePassword/updatePasswordSlice";
import cartReducer from "../features/cart/cartSlice";
import stripeApiKeyReducer from "../features/stripeApiKey/stripeApiKeySlice";
import orderReducer from "../features/orders/orderSlice";
import myOrdersReducer from "../features/myOrders/myOrdersSlice";
import orderDetailsReducer from "../features/orderDetails/orderDetailsSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import getReviewsReducer from "../features/getReviews/getReviewSlice";
import adminProductsReducer from "../features/adminProducts/adminProductsSlice";
import deleteProductReducer from "../features/deleteProducts/deleteProductSlice";
import createProductReducer from "../features/createProduct/createProductSlice";
import updateProductReducer from "../features/updateProduct/updateProductSlice";
import ordersAdminReducer from "../features/ordersAdmin/ordersAdminSlice";
import deleteOrderReducer from "../features/deleteOrders/deleteOrderSlice";
import updateOrderReducer from "../features/updateOrderStatus/updateOrderSlice";
import AllUsersReducer from "../features/AllUsers/AllUsersSlice";
import deleteUsersReducer from "../features/deleteUser/deleteUsersSlice";
import userRoleReducer from "../features/updateUserRole/userRoleSlice";
import userDetailsReducer from "../features/userDetails/userDetailsSlice";
import adminReviewsReducer from "../features/adminReviews/adminReviewsSlice";
import deleteReviewsReducer from "../features/adminDeleteReviews/deleteReviewsSlice";

// Creating the Redux store
const store = configureStore({
  reducer: {
    products: productReducer,
    user: authReducer,
    updateProfile: updateProfileReducer,
    updatePassword: updatePasswordReducer,
    cart: cartReducer,
    stripeApiKey: stripeApiKeyReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    addReview: reviewReducer,
    getReviews: getReviewsReducer,
    adminProducts: adminProductsReducer,
    deleteProduct: deleteProductReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    allOrders: ordersAdminReducer,
    deleteOrder: deleteOrderReducer,
    updateOrder: updateOrderReducer,
    allUsers: AllUsersReducer,
    deleteUsers: deleteUsersReducer,
    userRole: userRoleReducer,
    userDetails: userDetailsReducer,
    adminReviews: adminReviewsReducer,
    deleteReviews: deleteReviewsReducer,
  },
});

// Exporting the configured Redux store
export default store;
