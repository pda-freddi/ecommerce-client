import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import errorIcon from "../../../icons/error.png";
import logoutIcon from "../../../icons/logout.png";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state variable
  const [ status, setStatus ] = useState("idle");

  // Click handler
  const handleLogout = () => {
    setStatus("loading");
    dispatch(logout())
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        navigate("/");
      })
      .catch(error => {
        setStatus("failed");
      });
  };

  // Render different elements depending on the value of the "state" variable
  let element;
  switch (status) {
    case "loading":
      element = <LoadingSpinner size="6px" margin="0px 10px 0 0" />;
      break;
    case "failed":
      element = (
        <p className={styles.message}>
          <img src={errorIcon} alt="" className={styles.statusIcon} />
          Error
        </p>
      );
      break;
    default:
      element = (
        <button className={styles.logout} onClick={handleLogout}>
          <img src={logoutIcon} alt="Logout" className={styles.icon} />
          Logout
        </button>
      );
  }

  return (
    <>
      { element }
    </>
  );
};

export default LogoutButton;