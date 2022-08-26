import React from "react";
import styles from "./CheckoutDetails.module.css";

const CheckoutDetails = ({ cart }) => {

  const numberOfItems = cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
  
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Order Summary</h3>
      <p className={styles.text}>Number of Items: {numberOfItems}</p>
      <p className={styles.text}>Order total: ${cart.total}</p>
      <p className={styles.text}>Shipping: free</p>
    </section>
  );
};

export default CheckoutDetails;