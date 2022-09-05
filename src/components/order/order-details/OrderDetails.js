import React from "react";
import OrderItem from "../order-item/OrderItem.js";
import DeleteOrder from "../delete-order/DeleteOrder.js";
import styles from "./OrderDetails.module.css";

const OrderDetails = ({ order }) => {
  return (
    <article className={styles.container}>

      <h3>Details</h3>
      <div className={styles.detailsContainer}>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Status: {order.status}</p>
        <p>Total: ${order.total}</p>
      </div>

      <h3>Items</h3>
      {
        order.items.map(item => <OrderItem item={item} key={item.product.id} />)
      }

      <h3>Shipping Address</h3>
      <div className={styles.addressContainer}>
        <p>Address Line 1: {order.shippingAddress.addressLine1}</p>
        { order.shippingAddress.addressLine2 && <p>Address Line 2: {order.shippingAddress.addressLine2}</p> }
        <p>City: {order.shippingAddress.city}</p>
        <p>Postal Code: {order.shippingAddress.postalCode}</p>
        <p>Country: {order.shippingAddress.country}</p>
      </div>

      { order.status === "pending" && <DeleteOrder orderId={order.id} /> }

    </article>
  );
};

export default OrderDetails;