import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./EnsureAuthentication.module.css";

const EnsureAuthentication = ({ children, showMessage }) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && showMessage) {
      const timerId = setTimeout(() => {
        navigate("/login", { state: { from: location }, replace: true })
      }, 3000);
      return () => clearTimeout(timerId);
    }
  });

  if (!isAuthenticated && showMessage) {
    return (
      <section className={styles.container}>
        <p className={styles.errorMessage}>You must be authenticated to access this page.</p>
        <p>Redirecting to login...</p>
        <ClipLoader />
      </section>
    );
  } else if (!isAuthenticated) {
    return navigate("/login", { state: { from: location }, replace: true });
  }

  return children;
};

export default EnsureAuthentication;