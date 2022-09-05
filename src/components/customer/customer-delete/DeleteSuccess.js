import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./DeleteSuccess.module.css";

const DeleteSuccess = () => {

  const navigate = useNavigate();

  // Redirect user to homepage after 3 seconds
  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate("/", { replace: true })
    }, 3000);
    return () => clearTimeout(timerId);
  });

  return (
    <section className={styles.container}>
      <p className={styles.successMessage}>Your account was successfully deleted!</p>
      <p className={styles.redirectMessage}>Redirecting to homepage...</p>
      <ClipLoader />
    </section>
  );
};

export default DeleteSuccess;