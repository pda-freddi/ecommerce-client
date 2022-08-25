import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { addItemToCart } from "../../../features/cart/cartSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./AddToCart.module.css";

const AddToCart = ({ productId }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Define local state variables
  const [ quantity, setQuantity ] = useState(1);
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Input change handler
  const handleInputChange = ({ target }) => {
    setQuantity(target.value);
  };

  // Define payload to be sent to the server
  const payload = { productId: productId, quantity: quantity };

  // Define submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      return navigate("/login", { state: { from: location}, replace: true });
    }
    setStatus("loading");
    setError(null);
    dispatch(addItemToCart(payload))
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
        <label htmlFor="quantity-add" className={styles.label}>
          Quantity
        </label>
        <input
          id="quantity-add"
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
            value="Add to Cart"
          />
        }
        </form>
      { 
        status === "succeeded" 
        && 
        <>
        <p className={styles.successMessage}>Item was added to the cart!</p>
        <Link to="/cart" className={styles.link}>View Cart</Link>
        </>
      }
      { error && <p className={styles.errorMessage}>{error}</p> }
      { 
        error === "This product is already in the cart."
        &&
        <Link to="/cart" className={styles.link}>View cart</Link>
      }
    </div>
  );
};

export default AddToCart;