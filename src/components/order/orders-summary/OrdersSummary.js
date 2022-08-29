import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrdersSummary.module.css";

const OrdersSummary = ({ orders }) => {
  
  let orderLinks = null;

  if (orders.length > 0) {
    orderLinks = orders.map(order => {
      return (
        <article className={styles.linkContainer} key={order.id}>
          <Link to={`${order.id}`} className={styles.link}>
            Order #{order.id}
          </Link>
          <div className={styles.detailsContainer}>
            <p className={styles.orderDetails}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className={styles.orderDetails}>Status: {order.status}</p>
            <p className={styles.orderDetails}>Total: ${order.total}</p>
          </div>
        </article>
      );
    });
  }

  return (
    <div className={styles.container}>
    { orderLinks || <p className={styles.emptyMessage}>No orders yet!</p> }
    </div>
  );
};

export default OrdersSummary;