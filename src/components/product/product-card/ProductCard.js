import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "../../cart/add-to-cart/AddToCart.js";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <article className={styles.container}>
      <img 
      src={`${process.env.REACT_APP_API_HOST_URL}${product.image}`}
      alt={product.displayName}
      className={styles.image}
      />
      <Link to={`/products/${product.name}`} className={styles.link}>
        <h3 className={styles.title}>{product.displayName}</h3>
      </Link>
      <p className={styles.price}>${product.price}</p>
      <AddToCart productId={product.id} />
    </article>
  );
};

export default ProductCard;