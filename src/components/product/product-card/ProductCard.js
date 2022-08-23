import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {

  // To do: add buttons to select quantity and add to cart feature

  return (
    <article className={styles.container}>
      <img src={`http://localhost:8000${product.thumbnail}`} alt={product.displayName} className={styles.image} />
      <Link to={`/products/${product.name}`} className={styles.link}>
        <h3 className={styles.title}>{product.displayName}</h3>
      </Link>
      <p className={styles.price}>${product.price}</p>
    </article>
  );
};

export default ProductCard;