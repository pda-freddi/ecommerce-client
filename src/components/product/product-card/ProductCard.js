import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "../../cart/add-to-cart/AddToCart.js";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <article className={styles.container}>
      <Link to={`/products/${product.name}`} className={styles.link}>
        <img 
        src={`${process.env.REACT_APP_API_HOST_URL}${product.thumbnail}`}
        alt={product.displayName}
        className={styles.image}
        />
        <h3 className={styles.title}>{product.displayName}</h3>
      </Link>
      <p className={styles.price}>${product.price}</p>
      {
        product.inStock ?
        <AddToCart productId={product.id} showQuantityInput={false} />
        :
        <p className={styles.inStock}>Out of stock</p>
      }

    </article>
  );
};

export default ProductCard;