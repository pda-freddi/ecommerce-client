import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { useLocation, useParams } from "react-router-dom";
import { getProducts } from "../../../features/products/productsSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ProductCard from "../product-card/ProductCard.js";
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
      <>
        <h2 className={styles.title}>
          Search results for: <span className={styles.searchTerm}>
          { unformattedTerm || term.replaceAll("-", " ") }</span>
        </h2>
        <section className={styles.container}>
          { 
            filteredProducts.length > 0 ?
            filteredProducts.map(product => 
              <ProductCard product={product} key={product.id} />
            )
            :
            <p className={styles.errorMessage}>No products found.</p>
          }
        </section>
      </>
    );
  }


  // Filter products by category if the latter was specified in the URL
  if (categoryName && categories) {
    const categoryMatch = categories.find(category => category.name === categoryName);
    if (!categoryMatch) {
      return <p className={styles.errorMessage}>Invalid category.</p>;
    }
    return (
      <section className={styles.container}>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { status === "failed" && <p className={styles.errorMessage}>{error}</p> }
        { products && products.filter(product => product.categoryId === categoryMatch.id).map(product => 
            <ProductCard product={product} key={product.id} />
          )
        }
      </section>
    );
  }

  // Render all products if no category or search term were specified in the URL
  return (
    <section className={styles.container}>
    { status === "loading" && <LoadingSpinner size="8px" /> }
    { status === "failed" && <p className={styles.errorMessage}>{error}</p>}
    { products &&
      products.map(product => 
        <ProductCard product={product} key={product.id} />
      )
    }
    </section>
  );
};

export default ProductsList;