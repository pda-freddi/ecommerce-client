import React from "react";
import listIcon from "../../../icons/list.png";
import moneyIcon from "../../../icons/money.png";
import shippingIcon from "../../../icons/shipping.png";
import styles from "./CheckoutDetails.module.css";

const CheckoutDetails = ({ cart }) => {

  const numberOfItems = cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
  
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Order Summary</h3>
      <p className={styles.text}>
        <img src={listIcon} alt="" className={styles.icon} />
        Number of Items: {numberOfItems}
      </p>
      <p className={styles.text}>
        <img src={moneyIcon} alt="" className={styles.icon} />
        Order total: ${cart.total}
      </p>
      <p className={styles.text}>
        <img src={shippingIcon} alt="" className={styles.icon} />      
        Shipping: free
      </p>
    </section>
  );
};

export default CheckoutDetails;