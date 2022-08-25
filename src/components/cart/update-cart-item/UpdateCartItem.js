import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemInCart } from "../../../features/cart/cartSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./UpdateCartItem.module.css";

const UpdateCartItem = ({ item }) => {

  const cartItemId = item.id;

  const dispatch = useDispatch();

  // Local state variables
  const [ quantity, setQuantity ] = useState(item.quantity);
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Input change handler
  const handleInputChange = ({ target }) => {
    setQuantity(target.value);
  };

  // Payload to send to the server
  const payload = { quantity };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    dispatch(updateItemInCart({ cartItemId, payload }))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        setError(null);
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      });
  };
   
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="quantity-update" className={styles.label}>
          Quantity
        </label>
        <input
          id="quantity-update"
          className={styles.input}
          name="quantity"
          type="number"
          value={quantity}
          onChange={handleInputChange}
          required={true}
          min="1"
          max="99"
        />
        {
          status === "loading" ?
          <LoadingSpinner size="6px" />
          :
          <input 
            className={styles.submitButton}
            type="submit"
            value="Update"
          />
        }
        </form>
      { status === "succeeded" && <p className={styles.successMessage}>Item was updated!</p> }
      { error && <p className={styles.errorMessage}>{error}</p> }
    </div>
  );
};

export default UpdateCartItem;