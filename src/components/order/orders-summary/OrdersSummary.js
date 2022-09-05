import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../../utils/back-button/BackButton.js";
import emptyIcon from "../../../icons/empty-box.png";
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
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
          </div>
        </article>
      );
    });
  }

  return (
      <div className={styles.container}>
        { 
          orderLinks 
          ||
          <>
            <p className={styles.emptyMessage}>
              <img src={emptyIcon} alt="" className={styles.icon} />
              No orders yet!
            </p>
            <BackButton destination={-1}>Back</BackButton>
          </>
        }
      </div>
  );
};

export default OrdersSummary;