import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import warningIcon from "../../../icons/warning.png";
import { ClipLoader } from "react-spinners";
import styles from "./EnsureAuthentication.module.css";

const EnsureAuthentication = ({ children, showMessage }) => {
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get authentication status from the store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Set up a redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && showMessage) {
      const timerId = setTimeout(() => {
        navigate("/login", { state: { from: location }, replace: true })
      }, 3000);
      return () => clearTimeout(timerId);
    }
  });

  // Render the error message if showMessage prop is true
  if (!isAuthenticated && showMessage) {
    return (
      <section className={styles.container}>
        <p className={styles.errorMessage}>
          <img src={warningIcon} alt="Warning" className={styles.icon} />
          You must be authenticated to access this page.
        </p>
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