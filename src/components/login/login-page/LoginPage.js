import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import LoginForm from "../login-form/LoginForm.js";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Get user's authentication status from the store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Get the path of the page the user was before coming to the login page
  const from = `${location.state?.from?.pathname || "/"}${location.state?.from?.search || ""}`;

  // Set up effect to redirect after 2 seconds when successfully authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const timerId = setTimeout(() => {
        navigate(from, { replace: true })
      }, 2000);
      return () => clearTimeout(timerId);
    }
  });

  // Render message for a successful authentication
  if (isAuthenticated) {
    return (
    <section className={styles.section}>
      <p className={styles.successMessage}>Login successful!</p>
      <p className={styles.redirectMessage}>Redirecting...</p>
      <ClipLoader />
    </section>
    );
  }

  // Render login form if not authenticated
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Log in to your account</h2>
      <LoginForm />
      <p className={styles.registerMessage}>
        Don't have an account? <Link to="/register" className={styles.link}>Register here.</Link>
      </p>
    </section>
  );
};

export default LoginPage;