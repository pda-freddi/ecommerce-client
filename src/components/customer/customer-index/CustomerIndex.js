import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCustomerInfo } from "../../../features/customer/customerSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import CustomerProfile from "../customer-profile/CustomerProfile.js"
import styles from "./CustomerIndex.module.css";

const CustomerIndex = () => {

  const dispatch = useDispatch();

  // Get customer state from the store
  const { customer, status, error } = useFeatureState("customer");
  const shouldRefresh = useSelector(state => state.customer.shouldRefresh);

  // Populate customer state if not already there or a refresh is required
  useEffect(() => {
    if (!customer || shouldRefresh) {
      dispatch(getCustomerInfo());
    }
  }, [dispatch, customer, shouldRefresh]);

  // Indicate loading and error states to the user
  if (status === "loading" || status === "failed") {
    return (
      <EnsureAuthentication showMessage={true}>
        <section className={styles.container}>
          <h2 className={styles.title}>Customer Profile</h2>
          { status === "loading" && <LoadingSpinner size="8px" /> }
          { status === "failed" && <ErrorMessage message={error} /> }
        </section>
      </EnsureAuthentication>
    );
  }

  return (
    <EnsureAuthentication showMessage={true}>
      { customer && <CustomerProfile customer={customer} /> }
    </EnsureAuthentication>
  );
};

export default CustomerIndex;