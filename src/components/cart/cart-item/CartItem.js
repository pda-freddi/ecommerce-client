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
        <p>{product.displayName}</p>
        <p>SKU: {product.SKU}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <UpdateCartItem item={item} />
      <DeleteCartItem item={item} />
    </article>
  );
};

export default CartItem;