import React from "react";
import CartItem from "../cart-item/CartItem.js";
import styles from "./CartSummary.module.css";

const CartSummary = ({ cart }) => {

  let cartItems = <p className={styles.emptyMessage}>Cart is empty!</p>;

  if (cart.items.length > 0) {
    cartItems = cart.items.map(item => <CartItem item={item} key={item.id} />);
  }

  return (
    <section className={styles.container}>
      { cartItems }
      <p className={styles.text}>Total: ${cart.total}</p>
      <p className={styles.text}>Shipping: free</p>
    </section>
  );
};

export default CartSummary;