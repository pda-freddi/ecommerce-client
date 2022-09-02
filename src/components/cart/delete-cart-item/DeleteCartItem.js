import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemInCart } from "../../../features/cart/cartSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import deleteIcon from "../../../icons/delete.png";
import errorIcon from "../../../icons/error.png";
import successIcon from "../../../icons/check.png";
import styles from "./DeleteCartItem.module.css";

const DeleteCartItem = ({ item }) => {

  const cartItemId = item.id;

  const dispatch = useDispatch();

  // Local state variable
  const [ status, setStatus ] = useState("idle");

  // Delete button click handler
  const handleDelete = () => {
    setStatus("loading");
    dispatch(deleteItemInCart(cartItemId))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
      })
      .catch(error => {
        setStatus("failed");
      })
  };

  // Render a different element depending on the value of the "state" variable
  let element;
  switch (status) {
    case "loading":
      element = <LoadingSpinner size="6px" margin="0px 5px" />;
      break;
    case "failed":
      element = (
        <p className={styles.message}>
          <img src={errorIcon} alt="" className={styles.statusIcon} />
          Error
        </p>
      );
      break;
    case "succeeded":
      element = (
        <p className={styles.message}>
          <img src={successIcon} alt="Success" className={styles.statusIcon} />
        </p>
      );
      break;
    default:
      element = (
        <button className={styles.button} onClick={handleDelete}>
          <img src={deleteIcon} alt="Delete" className={styles.icon} />
        </button>
      );
  }

  return (
    <>
      { element }
    </>
  );
};

export default DeleteCartItem;