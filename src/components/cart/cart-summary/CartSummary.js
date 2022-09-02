import React from "react";
import CartItem from "../cart-item/CartItem.js";
import emptyCartIcon from "../../../icons/empty-cart.png";
import moneyIcon from "../../../icons/money.png";
import shippingIcon from "../../../icons/shipping.png";
import styles from "./CartSummary.module.css";

const CartSummary = ({ cart }) => {

  // Default message to render if the cart is empty
  let cartItems = (
    <p className={styles.emptyMessage}>
      <img src={emptyCartIcon} alt="" className={styles.icon} />
      Cart is empty!
    </p>
  );

  if (cart.items.length > 0) {
    cartItems = cart.items.map(item => <CartItem item={item} key={item.id} />);
  }

  return (
    <div className={styles.container}>
      { cartItems }
      <p className={styles.total}>
        <img src={moneyIcon} alt="" className={styles.icon} />
        Total: ${cart.total}
      </p>
      <p className={styles.shipping}>
        <img src={shippingIcon} alt="" className={styles.icon} />
        Shipping: free
      </p>
    </div>
  );
};

export default CartSummary;