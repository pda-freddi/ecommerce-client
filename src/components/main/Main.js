import React from "react";
import { Routes, Route } from 'react-router-dom';
import CategoryList from "../category/category-list/CategoryList.js";
import ProductList from "../product/product-list/ProductList.js";
import ProductPage from "../product/product-page/ProductPage.js";
import CustomerIndex from "../customer/customer-index/CustomerIndex.js";
import CustomerUpdatePage from "../customer/customer-update/CustomerUpdatePage.js";
import CustomerDeletePage from "../customer/customer-delete/CustomerDeletePage.js";
import LoginPage from "../login/login-page/LoginPage.js";
import RegisterPage from "../register/register-page/RegisterPage.js";
import CartPage from "../cart/cart-page/CartPage.js";
import styles from "./Main.module.css";


const Main = () => {
  return (
    <main className={styles.container}>
      <Routes>
        <Route path="/" element={<CategoryList />}>
          <Route index element={<ProductList />} />
          <Route path="categories/:categoryName" element={<ProductList />}/ >
          <Route path="products" element={<ProductList />} />
          <Route path="products/:productName" element={<ProductPage />} />
        </Route>
        <Route path="/my-account" element={<CustomerIndex />} />
        <Route path="/my-account/update" element={<CustomerUpdatePage />} />
        <Route path="/my-account/delete" element={<CustomerDeletePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </main>
  );
};

export default Main;