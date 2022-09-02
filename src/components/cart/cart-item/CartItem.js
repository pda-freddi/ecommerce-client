import React from "react";
import UpdateCartItem from "../update-cart-item/UpdateCartItem.js";
import DeleteCartItem from "../delete-cart-item/DeleteCartItem.js";
import styles from "./CartItem.module.css";

const CartItem = ({ item }) => {

  const product = item.product;
  
  return (
    <article className={styles.container}>
      <img 
      src={`${process.env.REACT_APP_API_HOST_URL}${product.thumbnail}`}
      alt={product.displayName} 
      className={styles.thumbnail} />
      <div className={styles.textContainer}>
        <p className={styles.productInfo}>{product.displayName}</p>
        <p className={styles.sku}>SKU: {product.SKU}</p>
        <p className={styles.productInfo}>Price: ${product.price}</p>
        <p className={styles.productInfo}>Quantity: {item.quantity}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <UpdateCartItem item={item} />
        <DeleteCartItem item={item} />
      </div>
    </article>
  );
};

export default CartItem;