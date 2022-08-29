import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundIcon from "../../icons/not-found.png";
import styles from "./NotFound.module.css";

const NotFound = () => {

  const navigate = useNavigate();
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Found</h2>
      <img src={notFoundIcon} alt="404 error icon" className={styles.icon} />
      <p className={styles.message}>Sorry, can't find the requested page.</p>
      <button className={styles.button} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default NotFound;