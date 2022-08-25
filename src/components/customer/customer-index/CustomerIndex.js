import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCustomerInfo } from "../../../features/customer/customerSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import CustomerProfile from "../customer-profile/CustomerProfile.js"
import styles from "./CustomerIndex.module.css";

const CustomerIndex = () => {

  const dispatch = useDispatch();
  const { customer, status, error } = useFeatureState("customer");
  const shouldRefresh = useSelector(state => state.customer.shouldRefresh);

  useEffect(() => {
    if (!customer || shouldRefresh) {
      dispatch(getCustomerInfo());
    }
  }, [dispatch, customer, shouldRefresh]);

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { status === "failed" && <p className={styles.errorMessage}>{error}</p> }
        { customer && <CustomerProfile customer={customer} /> }
      </section>
    </EnsureAuthentication>
  );
};

export default CustomerIndex;