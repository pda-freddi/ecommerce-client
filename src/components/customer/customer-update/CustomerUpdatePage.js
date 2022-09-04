import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCustomerInfo } from "../../../features/customer/customerSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import BackButton from "../../utils/back-button/BackButton.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import CustomerUpdateForm from "./CustomerUpdateForm.js";
import checkIcon from "../../../icons/check.png";
import styles from "./CustomerUpdatePage.module.css";

const CustomerUpdatePage = () => {

  const dispatch = useDispatch();

  // Get customer state from the store
  const { customer, status, error } = useFeatureState("customer");

  // Local state variable to track update success
  const [ updateSuccess, setUpdateSuccess ] = useState(false);

  // Populate customer state if it's not already there
  useEffect(() => {
    if (!customer) {
      dispatch(getCustomerInfo());
    }
  }, [dispatch, customer]);

  // Render message on successful update
  if (updateSuccess) {
    return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <p className={styles.successMessage}>
          <img src={checkIcon} alt="" className={styles.icon} />
          Update successful!
        </p>
        <BackButton destination="/my-account">Back</BackButton>
      </section>
    </EnsureAuthentication>
    );
  }

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Update Your Information</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { status === "failed" && <ErrorMessage message={error} /> }
        { customer && <CustomerUpdateForm customer={customer} onUpdateSuccess={setUpdateSuccess} /> }
      </section>
    </EnsureAuthentication>
  );
};

export default CustomerUpdatePage;