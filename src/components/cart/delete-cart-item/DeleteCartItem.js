import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemInCart } from "../../../features/cart/cartSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./DeleteCartItem.module.css";

const DeleteCartItem = ({ item }) => {

  const cartItemId = item.id;

  const dispatch = useDispatch();

  // Local state variables
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Delete button click handler
  const handleClick = () => {
    setStatus("loading");
    setError(null);
    dispatch(deleteItemInCart(cartItemId))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        setError(null);
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      })
  };

  return (
    <div className={styles.container}>
      {
        status === "loading" ?
        <LoadingSpinner size="6px" />
        :
        <button className={styles.button} onClick={handleClick}>
          Delete
        </button>
      }
      { error && <p className={styles.errorMessage}>{error}</p> }
    </div>
  );
};

export default DeleteCartItem;