import React from "react";
import { Routes, Route } from 'react-router-dom';
import CategoryList from "../category/category-list/CategoryList.js";
import ProductList from "../product/product-list/ProductList.js";
import ProductPage from "../product/product-page/ProductPage.js";
import CustomerNavMenu from "../customer/customer-nav-menu/CustomerNavMenu.js";
import CustomerIndex from "../customer/customer-index/CustomerIndex.js";
import CustomerUpdatePage from "../customer/customer-update/CustomerUpdatePage.js";
import CustomerDeletePage from "../customer/customer-delete/CustomerDeletePage.js";
import OrderHistoryPage from "../order/order-history-page/OrderHistoryPage.js";
import OrderPage from "../order/order-page/OrderPage.js";
import LoginPage from "../login/login-page/LoginPage.js";
import RegisterPage from "../register/register-page/RegisterPage.js";
import CartPage from "../cart/cart-page/CartPage.js";
import CheckoutPage from "../checkout/checkout-page/CheckoutPage.js";
import NotFound from "../not-found/NotFound.js";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />}>
        <Route index element={<ProductList />} />
        <Route path="categories/:categoryName" element={<ProductList />}/ >
        <Route path="products" element={<ProductList />} />
        <Route path="products/:productName" element={<ProductPage />} />
      </Route>
      <Route path="/my-account" element={<CustomerNavMenu />}>
        <Route index element={<CustomerIndex />} />
        <Route path="update" element={<CustomerUpdatePage />} />
        <Route path="delete" element={<CustomerDeletePage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="orders/:orderId" element={<OrderPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cart/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;