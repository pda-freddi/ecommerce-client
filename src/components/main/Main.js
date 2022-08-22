import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "../login/Login.js";
import CategoryList from "../../features/categories/CategoryList.js";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.container}>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};

export default Main;