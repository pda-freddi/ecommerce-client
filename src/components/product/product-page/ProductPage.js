import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../features/products/productsSlice.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import BackButton from "../../utils/back-button/BackButton.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ProductDetails from "../product-details/ProductDetails.js";
import styles from "./ProductPage.module.css";

const ProductPage = () => {

  const dispatch = useDispatch();

  // Get products state from the store and the productName path parameter
  const { products, status, error } = useFeatureState("products");
  const { productName } = useParams();

  // Populate products state if not already there
  useEffect(() => {
    if (!products) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);
  
  // Match the product from the URL param to a product object in state
  let productMatch;

  if (products) {
    productMatch = products.find(product => product.name === productName);
    // Return an error message if no product matches
    if (!productMatch) {
      return (
        <section className={styles.container}>
          <ErrorMessage message="Couldn't find a product with this name." />
          <BackButton destination={-1}>Back</BackButton>
        </section>
      );
    }
  }

  return (
    <section className={styles.container}>
      { status === "loading" && <LoadingSpinner size="8px" /> }
      { status === "failed" && <ErrorMessage message={error} /> }
      { productMatch && <ProductDetails product={productMatch} /> }
      <BackButton destination={-1}>Back</BackButton>
    </section>
  );
};

export default ProductPage;