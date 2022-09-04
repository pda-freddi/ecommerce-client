import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import CustomerDeleteForm from "./CustomerDeleteForm.js";
import { ClipLoader } from "react-spinners";
import warningIcon from "../../../icons/warning.png";
import styles from "./CustomerDeletePage.module.css";

const CustomerDeletePage = () => {

  const navigate = useNavigate();

  // Local state variable to track deletion success
  const [ deleteSuccess, setDeleteSuccess ] = useState(false);

  // If account delete was successful, render a confirmation message and
  // redirect to homepage after 3 seconds
  useEffect(() => {
    if (deleteSuccess) {
      const timerId = setTimeout(() => {
        navigate("/", { replace: true })
      }, 3000);
      return () => clearTimeout(timerId);
    }
  });

  if (deleteSuccess) {
    return (
      <section className={styles.container}>
        <p className={styles.successMessage}>Your account was successfully deleted!</p>
        <p className={styles.redirectMessage}>Redirecting to homepage...</p>
        <ClipLoader />
       </section>
    );
  }

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Delete Account</h2>
        <p className={styles.message}>
          All your information, including orders, will be permanently deleted.
        </p>
        <p className={styles.message}>
        <img src={warningIcon} alt="Warning" className={styles.icon} />
          This action is irreversible.
        </p>
        <p className={styles.confirmationMessage}>Are you sure you want to proceed?</p>
        { <CustomerDeleteForm onDeleteSuccess={setDeleteSuccess} /> }
      </section>
    </EnsureAuthentication>
  );
};

export default CustomerDeletePage;