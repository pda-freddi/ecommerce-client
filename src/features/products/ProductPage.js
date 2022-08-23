import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../hooks/useFeatureState.js";
import { useParams } from "react-router-dom";
import { getProducts } from "./productsSlice.js";
import LoadingSpinner from "../../components/utils/loading-spinner/LoadingSpinner.js";
import ProductDetails from "../../components/product/product-details/ProductDetails.js";
import styles from "./ProductPage.module.css";


const ProductPage = () => {
  // Define variables used in the component
  const dispatch = useDispatch();
  const { products, status, error } = useFeatureState("products");
  const { productName } = useParams();

  // Populate products state if not already there
  useEffect(() => {
    if (!products) {
      dispatch(getProducts());
    }
  });
  
  // Match the product from the URL param to a product object in state
  let productMatch;

  if (products) {
    productMatch = products.find(product => product.name === productName);
    // Return an error message if no product is found
    if (!productMatch) {
      return (
        <section className={styles.container}>
          <p className={styles.errorMessage}>Can't find a product with that name</p>
        </section>
      );
    }
  }

  return (
    <section className={styles.container}>
      { status === "loading" && <LoadingSpinner size="8px" /> }
      { status === "failed" && <p className={styles.errorMessage}>{error}</p> }
      { productMatch && <ProductDetails product={productMatch} /> }
    </section>
  );
};

export default ProductPage;