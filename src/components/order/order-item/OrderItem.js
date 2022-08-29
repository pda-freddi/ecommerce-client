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
        <p>{product.displayName}</p>
        <p>SKU: {product.SKU}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </article>
  );
};

export default OrderItem;