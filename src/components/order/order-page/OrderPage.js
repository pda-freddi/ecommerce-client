import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getOrders } from "../../../features/orders/ordersSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import OrderDetails from "../order-details/OrderDetails.js";
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
        { error && <p className={styles.errorMessage}>{error}</p> }
        { 
          orders && 
          (
            order ? 
            <OrderDetails order={order} /> 
            : 
            <p className={styles.emptyMessage}>No order found!</p>
          )
        }
      </section>
    </EnsureAuthentication>
  );
};

export default OrderPage;