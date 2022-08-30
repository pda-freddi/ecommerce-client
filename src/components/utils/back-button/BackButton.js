import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = ({ children, destination }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default BackButton;