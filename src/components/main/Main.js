import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "../login/Login.js";
import CategoryList from "../../features/categories/CategoryList.js";
import ProductsList from "../../features/products/ProductsList.js";
import ProductPage from "../../features/products/ProductPage.js";
import CustomerPage from "../customer/customer-page/CustomerPage.js";
import styles from "./Main.module.css";


const Main = () => {
  return (
    <main className={styles.container}>
      <Routes>
        <Route path="/" element={<CategoryList />}>
          <Route index element={<ProductsList />} />
          <Route path="categories/:categoryName" element={<ProductsList />}/ >
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:productName" element={<ProductPage />} />
        </Route>
        <Route path="/my-account" element={<CustomerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </main>
  );
};

export default Main;