import React from "react";
import errorIcon from "../../../icons/error.png";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
      <p className={styles.errorMessage}>
        <img src={errorIcon} alt="Error" className={styles.icon} />
        {message}
      </p>
  );
};

export default ErrorMessage;