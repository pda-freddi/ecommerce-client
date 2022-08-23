import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCategories } from "../../../features/categories/categoriesSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import { Link, Outlet } from "react-router-dom";
import styles from "./CategoryList.module.css";

const CategoryList = () => {
  // Define variables used in the component
  const dispatch = useDispatch();
  const { categories, status, error } = useFeatureState("categories");

  // Set up effect
  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  // Render component
  return (
    <>
      <section className={styles.container}>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { status === "failed" && <p className={styles.errorMessage}>{error}</p>}
        { categories &&
          categories.map(category =>
            <Link
            to={`/categories/${category.name}`}
            key={category.id}
            className={styles.link}
            >
              {category.displayName}
            </Link>
          )
        }
      </section>
      <Outlet />
    </>
  );
};

export default CategoryList;