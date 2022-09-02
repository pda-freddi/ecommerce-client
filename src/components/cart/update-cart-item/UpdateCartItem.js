import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemInCart } from "../../../features/cart/cartSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import updateIcon from "../../../icons/refresh.png";
import errorIcon from "../../../icons/error.png";
import successIcon from "../../../icons/check.png";
import styles from "./UpdateCartItem.module.css";

const UpdateCartItem = ({ item }) => {

  const cartItemId = item.id;

  const dispatch = useDispatch();

  // Local state variables
  const [ quantity, setQuantity ] = useState(item.quantity);
  const [ status, setStatus ] = useState("idle");

  // Input change handler
  const handleInputChange = ({ target }) => {
    setQuantity(target.value);
  };

  // Payload to send to the server
  const payload = { quantity };

  // Submit handler
  const handleUpdate = () => {
    setStatus("loading");
    dispatch(updateItemInCart({ cartItemId, payload }))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
      })
      .catch(error => {
        setStatus("failed");
      });
  };

  // Render different elements depending on the value of the "state" variable
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
        <button className={styles.button} onClick={handleUpdate}>
          <img src={updateIcon} alt="Update" className={styles.icon} />
        </button>
      );
  }

  return (
    <>
      <input
        id="quantity-update"
        className={styles.input}
        aria-label="quantity"
        name="quantity"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
        max="99"
      />
      { element }
    </>
  );
};

export default UpdateCartItem;