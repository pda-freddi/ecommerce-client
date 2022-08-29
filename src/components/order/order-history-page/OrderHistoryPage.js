import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getOrders } from "../../../features/orders/ordersSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import OrdersSummary from "../orders-summary/OrdersSummary.js";
import styles from "./OrderHistoryPage.module.css";

const OrderHistoryPage = () => {

  const dispatch = useDispatch();

  // Get orders state variables from store
  const { orders, status, error } = useFeatureState("orders");
  const shouldRefresh = useSelector(state => state.orders.shouldRefresh);

  // Populate orders state if not already there or if a refresh is required
  useEffect(() => {
    if (!orders || shouldRefresh) {
      dispatch(getOrders());
    }
  }, [dispatch, orders, shouldRefresh]);

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Order History</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { error && <p className={styles.errorMessage}>{error}</p> }
        { orders && <OrdersSummary orders={orders} /> }
      </section>
    </EnsureAuthentication>
  );
};

export default OrderHistoryPage;