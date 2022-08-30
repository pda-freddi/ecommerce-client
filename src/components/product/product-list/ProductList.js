import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { useLocation, useParams } from "react-router-dom";
import { getProducts } from "../../../features/products/productsSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import ProductCard from "../product-card/ProductCard.js";
import BackButton from "../../utils/back-button/BackButton.js";
import styles from "./ProductList.module.css";

const ProductsList = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  // Get products and categories state from the store
  const { products, status, error } = useFeatureState("products");
  const { categories } = useFeatureState("categories");

  // Get categoryName path parameter
  const { categoryName } = useParams();

  // Get term URL search parameter
  const term = (new URL(document.location)).searchParams.get("term");
  // And the original term passed as state in the location object
  const unformattedTerm = location.state?.term;

  // Populate products in state if not already there
  useEffect(() => {
    if (!products) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  // Filter products by search term if the latter was specified in the URL
  if (term && products) {
    const filteredProducts = products.filter(product => product.name.includes(term));
    return (
      <section className={styles.container}>
        <h2 className={styles.searchTitle}>
          Search results for: <span className={styles.searchTerm}>
          { unformattedTerm || term.replaceAll("-", " ") }</span>
        </h2>
        <div className={styles.cardsContainer}>
          { 
            filteredProducts.length > 0 ?
            filteredProducts.map(product => 
              <ProductCard product={product} key={product.id} />
            )
            :
            <ErrorMessage message="No products found." />
          }
        </div>
        <BackButton destination="/products">Back to products</BackButton>
      </section>
    );
  }

  // Filter products by category if the latter was specified in the URL
  if (categoryName && categories) {
    const categoryMatch = categories.find(category => category.name === categoryName);
    if (!categoryMatch) {
      return (
        <section className={styles.container}>
          <ErrorMessage message="Invalid category." />
          <BackButton destination="/products">Back to products</BackButton>
        </section>
      );
    }
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>Products in "{categoryMatch.displayName}" category</h2>
        <div className={styles.cardsContainer}>
          { status === "loading" && <LoadingSpinner size="8px" /> }
          { status === "failed" && <ErrorMessage message={error} /> }
          { products && products.filter(product => product.categoryId === categoryMatch.id).map(product => 
              <ProductCard product={product} key={product.id} />
            )
          }
        </div>
        <BackButton destination="/products">Back to products</BackButton>
      </section>
    );
  }

  // Render all products if no category or search term were specified in the URL
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Products</h2>
      <p className={styles.message}>Browse all products below or select a category to filter</p>
      { status === "loading" && <LoadingSpinner size="8px" /> }
      { status === "failed" && <ErrorMessage message={error} /> }
      <div className={styles.cardsContainer}>
        { products &&
          products.map(product => 
            <ProductCard product={product} key={product.id} />
          )
        }
      </div>
    </section>
  );
};

export default ProductsList;