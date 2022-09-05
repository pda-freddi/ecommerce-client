import React from "react";
import styles from "./OrderItem.module.css";

const OrderItem = ({ item }) => {

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
    </article>
  );
};

export default OrderItem;