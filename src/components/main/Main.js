import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../LoginPage.js"
import CategoryList from "../../features/categories/CategoryList.js";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.container}>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default Main;