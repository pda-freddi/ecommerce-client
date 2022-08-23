import React from "react";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ product }) => {

  // To do: add buttons with cart features

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
      </section>
      
    </article>
  );
};

export default ProductDetails;