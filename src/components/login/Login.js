import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import LoginForm from "../../features/auth/LoginForm.js";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const LoginPage = () => {

  // Define variables used in the component
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set up effect for redirect when successfully authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 2000);
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