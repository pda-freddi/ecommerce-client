import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCustomerInfo } from "../../../features/customer/customerSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import CustomerUpdateForm from "./CustomerUpdateForm.js";
import styles from "./CustomerUpdatePage.module.css";

const CustomerUpdatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customer, status, error } = useFeatureState("customer");
  const [ updateSuccess, setUpdateSuccess ] = useState(false);

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
        <p className={styles.successMessage}>Update successful!</p>
        <button className={styles.button} onClick={() => navigate("/my-account")}>Back</button>
      </section>
    </EnsureAuthentication>
    );
  }

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Update Your Information</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { status === "failed" && <p className={styles.errorMessage}>{error}</p> }
        { customer && <CustomerUpdateForm customer={customer} onUpdateSuccess={setUpdateSuccess} /> }
      </section>
    </EnsureAuthentication>
  );
};

export default CustomerUpdatePage;