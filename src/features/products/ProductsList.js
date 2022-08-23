import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../hooks/useFeatureState.js";
import { useParams } from "react-router-dom";
import { getProducts } from "./productsSlice.js";
import LoadingSpinner from "../../components/utils/loading-spinner/LoadingSpinner.js";
import ProductCard from "../../components/product/product-card/ProductCard.js";
import styles from "./ProductsList.module.css";

const ProductsList = () => {
  // Define variables used in the component
  const dispatch = useDispatch();
  const { products, status, error } = useFeatureState("products");
  const { categories } = useFeatureState("categories");
  const { categoryName } = useParams();

  // Populate products in state if not already there
  useEffect(() => {
    if (!products) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

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

  // Render all products if no category was specified in the URL
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