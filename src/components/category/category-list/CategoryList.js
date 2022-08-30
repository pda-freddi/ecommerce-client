import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCategories } from "../../../features/categories/categoriesSlice.js";
import { NavLink, Outlet } from "react-router-dom";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import categoriesIcon from "../../../icons/category.png";
import styles from "./CategoryList.module.css";

const CategoryList = () => {

  const dispatch = useDispatch();

  // Get categories state from the store
  const { categories, status, error } = useFeatureState("categories");

  // Populate categories state if it's not already there
  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>
          <img src={categoriesIcon} alt="" className={styles.icon} />
          Categories
        </h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { status === "failed" && <ErrorMessage message={error} /> }
        <div className={styles.linksContainer}>
          { categories &&
            categories.map(category =>
              <NavLink
              to={`/categories/${category.name}`}
              key={category.id}
              className={({ isActive }) => isActive ? styles.navActive : styles.link}
              >
                {category.displayName}
              </NavLink>
            )
          }
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default CategoryList;