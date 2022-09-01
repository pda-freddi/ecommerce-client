import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { addItemToCart } from "../../../features/cart/cartSlice.js";
import addToCartIcon from "../../../icons/add-cart.png";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./AddToCart.module.css";

const AddToCart = ({ productId, showQuantityInput }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Local state variables
  const [ quantity, setQuantity ] = useState(1);
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Input change handler
  const handleInputChange = ({ target }) => {
    setQuantity(target.value);
  };

  // Payload to send to the server
  const payload = { productId: productId, quantity: quantity };

  // Submit handler
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

  // Determine the form's children based on the value of showQuantityInput prop
  let formChildren;

  if (showQuantityInput) {
    formChildren = (
      <>
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
      </>
    );
  } else {
    formChildren = (
      <>
        {
            status === "loading" ?
            <LoadingSpinner size="6px" />
            :
            <button className={styles.submitButtonWithIcon} type="submit">
              <img src={addToCartIcon} alt="" className={styles.icon} />
              Add to Cart
            </button>
        }
      </>
    );
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        { formChildren }
      </form>
      { 
        status === "succeeded" 
        && 
        <>
          <p className={styles.successMessage}>Done!</p>
          <Link to="/cart" className={styles.link}>View Cart</Link>
        </>
      }
      { error && <p className={styles.errorMessage}>{error}</p> }
      { 
        error === "This product is already in the cart."
        &&
        <Link to="/cart" className={styles.link}>View cart</Link>
      }
    </>
  );
};

export default AddToCart;