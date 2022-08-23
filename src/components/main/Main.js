import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../login/login-page/LoginPage.js";
import CategoryList from "../category/category-list/CategoryList.js";
import ProductList from "../product/product-list/ProductList.js";
import ProductPage from "../product/product-page/ProductPage.js";
import CustomerPage from "../customer/customer-page/CustomerPage.js";
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
        <Route path="/my-account" element={<CustomerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </main>
  );
};

export default Main;