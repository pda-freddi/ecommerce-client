import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getOrders } from "../../../features/orders/ordersSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import OrderDetails from "../order-details/OrderDetails.js";
import BackButton from "../../utils/back-button/BackButton.js";
import styles from "./OrderPage.module.css";

const OrderPage = () => {

  const dispatch = useDispatch();

  // Order ID path parameter
  const { orderId } = useParams();

  // Orders state
  const { orders, status, error } = useFeatureState("orders");
  const shouldRefresh = useSelector(state => state.orders.shouldRefresh);

  // Populate orders state or refresh if necessary
  useEffect(() => {
    if (!orders || shouldRefresh) {
      dispatch(getOrders());
    }
  }, [dispatch, orders, shouldRefresh]);

  // Match the order ID path parameter with an order object in state
  let order = null;

  if (orders) {
    order = orders.find(order => order.id === parseInt(orderId));
  }

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Order #{orderId}</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { error && <ErrorMessage message={error} /> }
        { 
          orders && 
          (
            order ? 
            <OrderDetails order={order} /> 
            :
            <ErrorMessage message="Can't find that order!" />
          )
        }
        <BackButton destination={-1}>Back</BackButton>
      </section>
    </EnsureAuthentication>
  );
};

export default OrderPage;