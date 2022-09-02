import React from "react";
import AddToCart from "../../cart/add-to-cart/AddToCart.js";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ product }) => {
  return (
    <article className={styles.container}>
      <img 
       src={`${process.env.REACT_APP_API_HOST_URL}${product.image}`} 
       alt={product.displayName} 
       className={styles.image} />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{product.displayName}</h2>
        <p className={styles.sku}>SKU: {product.SKU}</p>
        <p className={styles.info}>Price: ${product.price}</p>
        <p className={styles.info}>Description: {product.description}</p>
        {
          product.inStock ?
          <AddToCart productId={product.id} showQuantityInput={true} />
          :
          <p className={styles.inStock}>Out of stock</p>
        }
      </div>
    </article>
  );
};

export default ProductDetails;