import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "./features/products/productsSlice.js";
import { getCategories } from "./features/categories/categoriesSlice.js";
import { getCustomerInfo } from './features/customer/customerSlice.js';
import { login } from "./features/auth/authSlice.js";

function App() {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const error = useSelector(state => state.products.error);
  const status = useSelector(state => state.products.status);

  const handleClick = () => {
    // dispatch(getProducts());
    // dispatch(getCategories());
    // dispatch(getCustomerInfo());
    dispatch(login({
      email: "testuser@example.com",
      password: "Test2022!"
    }))
    dispatch(getCustomerInfo());
  };

  const productsListing = () => {
    return products.map(product => {
      return (
        <>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </>
      );
    });
  };

  if (status === "loading") {
    return (
      <div>Loading...</div>
    );
  }

  if (status === "failed") {
    return (
      <div>{error}</div>
    )
  }

  return (
    <>
      <div>{products ? productsListing() : "Nothing to show yet"}</div>
      <button  onClick={handleClick}>Get Products</button>
    </>
  );
}

export default App;