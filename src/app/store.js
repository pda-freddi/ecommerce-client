import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "../features/categories/categoriesSlice.js";
import productsReducer from "../features/products/productsSlice.js";
import authReducer from "../features/auth/authSlice.js";
import customerReducer from "../features/customer/customerSlice.js";
import ordersReducer from "../features/orders/ordersSlice.js";
import cartReducer from "../features/cart/cartSlice.js";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    auth: authReducer,
    customer: customerReducer,
    orders: ordersReducer,
    cart: cartReducer
  },
});
