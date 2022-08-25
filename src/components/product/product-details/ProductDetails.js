import React from "react";
import AddToCart from "../../cart/add-to-cart/AddToCart.js";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ product }) => {
  return (
    <article className={styles.container}>
      <section className={styles.imgContainer}>
        <img 
         src={`http://localhost:8000${product.image}`} 
         alt={product.displayName} 
         className={styles.image} />
      </section>
      <section className={styles.textContainer}>
        <h2>{product.displayName}</h2>
        <p>Price: ${product.price}</p>
        <p>Description:</p>
        <p>{product.description}</p>
        <AddToCart productId={product.id} />
      </section>
    </article>
  );
};

export default ProductDetails;