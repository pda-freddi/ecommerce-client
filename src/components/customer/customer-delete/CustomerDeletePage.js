import React from "react";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import CustomerDeleteForm from "./CustomerDeleteForm.js";
import warningIcon from "../../../icons/warning.png";
import styles from "./CustomerDeletePage.module.css";

const CustomerDeletePage = () => {
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
        { <CustomerDeleteForm /> }
      </section>
    </EnsureAuthentication>
  );
};

export default CustomerDeletePage;